import { createHash, randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

const recipient = "sales@dianshangmats.com";
const brands = { artisanpads: "artisanpads.com", dianshangmats: "dianshangmats.com" };
const buckets = new Map();
const active = new Set();
const maxFileBytes = 2 * 1024 * 1024;

export class InquiryError extends Error {
  constructor(message, status = 503, details = {}) {
    super(message);
    this.status = status;
    Object.assign(this, details);
  }
}

function text(value, limit = 1000) {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string" || value.length > limit || value.includes("\0")) {
    throw new InquiryError("Please shorten the form fields and try again.", 400);
  }
  return value.trim();
}

export function normalizeInquiry(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new InquiryError("Invalid inquiry.", 400);
  }
  if (body.website) throw new InquiryError("Please submit the form manually.", 400);
  const name = text(body.name, 120);
  const email = text(body.email ?? body.businessEmail, 254);
  if (!name || !/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(email)) {
    throw new InquiryError("Please enter your name and a valid email address.", 400);
  }
  const id = text(body.requestId, 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    throw new InquiryError("Please reload the form and try again.", 400);
  }
  const fields = {
    name, email,
    company: text(body.company ?? body.companyName, 200),
    country: text(body.country ?? body.countryOrRegion, 120),
    phone: text(body.phone ?? body.phoneOrWhatsapp ?? body.whatsapp, 120),
    product: text(body.product, 4000),
    quantity: text(body.quantity ?? body.estimatedQuantity, 120),
    message: text(body.message ?? body.detailedRequirements, 12000)
  };
  for (const key of ["requiredShape", "requiredSize", "requiredThickness", "material",
    "surfaceTexture", "logoRequirements", "printingRequirements", "packagingRequirements",
    "targetMarket", "expectedDeliveryDate", "page", "type"]) {
    if (body[key] !== undefined) fields[key] = text(body[key], 2000);
  }
  if (body.customization !== undefined) {
    if (!Array.isArray(body.customization) || body.customization.length > 20) {
      throw new InquiryError("Invalid customization options.", 400);
    }
    fields.customization = body.customization.map(value => text(value, 120)).join(", ");
  }
  const attachments = body.attachments ?? [];
  if (!Array.isArray(attachments) || attachments.length > 3) {
    throw new InquiryError("Please attach no more than 3 files (2 MB total).", 400);
  }
  let bytes = 0;
  const files = attachments.map(file => {
    const name = text(file?.name, 150);
    const content = text(file?.content, Math.ceil(maxFileBytes / 3) * 4 + 4);
    if (!name || /[\\/\r\n]/.test(name) || !/\.(jpg|jpeg|png|pdf|ai)$/i.test(name) ||
      !content || content.length % 4 !== 0 ||
      !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(content)) {
      throw new InquiryError("Use JPG, PNG, PDF or AI files with safe filenames.", 400);
    }
    const decoded = Buffer.from(content, "base64");
    bytes += decoded.length;
    if (bytes > maxFileBytes) throw new InquiryError("Attachments must total 2 MB or less.", 413);
    return { name, content, size: decoded.length };
  });
  return { id, fields, attachments: files };
}

function rateLimit(brand, email) {
  const now = Date.now();
  for (const [key, bucket] of buckets) if (bucket.until <= now) buckets.delete(key);
  for (const [key, limit, interval] of [
    [brand + ":all", 30, 60000], [brand + ":" + email.toLowerCase(), 5, 3600000]
  ]) {
    const bucket = buckets.get(key) || { count: 0, until: now + interval };
    if (bucket.count >= limit || buckets.size > 1000) {
      throw new InquiryError("Too many inquiries. Please wait or email sales@dianshangmats.com.", 429);
    }
    bucket.count++;
    buckets.set(key, bucket);
  }
}

export function privateDirectory(brand, cwd, override) {
  const domain = brands[brand];
  if (!domain) throw new InquiryError("Unknown website.");
  const marker = "/domains/" + domain + "/";
  const normalized = cwd.replaceAll("\\", "/");
  const start = normalized.indexOf(marker);
  const expected = start >= 0
    ? path.resolve(normalized.slice(0, start) + "/domains/" + domain + "/private-inquiries")
    : null;
  if (process.env.NODE_ENV === "production") {
    if (!expected || (override && path.resolve(override) !== expected)) {
      throw new InquiryError("Inquiry storage is unavailable. Please email sales@dianshangmats.com.");
    }
    return expected;
  }
  if (!override || !path.isAbsolute(override)) throw new InquiryError("Configure private inquiry storage.");
  return path.resolve(override);
}

async function atomicWrite(file, record) {
  const temporary = file + "." + randomUUID() + ".tmp";
  try {
    await fs.writeFile(temporary, JSON.stringify(record, null, 2), { flag: "wx", mode: 0o600 });
    await fs.rename(temporary, file);
  } finally {
    await fs.unlink(temporary).catch(() => {});
  }
}

export function smtpTransport(env = process.env) {
  if (!env.SMTP_PASS) throw new InquiryError("Email notification is unavailable. Please email sales@dianshangmats.com.");
  const host = env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(env.SMTP_PORT || 465);
  if (host !== "smtp.hostinger.com" || ![465, 587].includes(port) ||
      (env.SMTP_USER && env.SMTP_USER !== recipient)) {
    throw new InquiryError("Email configuration is invalid.");
  }
  return nodemailer.createTransport({
    host, port, secure: port === 465, requireTLS: true,
    auth: { user: recipient, pass: env.SMTP_PASS },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    disableFileAccess: true, disableUrlAccess: true,
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true }
  });
}

export async function deliverInquiry(brand, body, options = {}) {
  const lead = normalizeInquiry(body);
  const fingerprint = createHash("sha256")
    .update(JSON.stringify({ fields: lead.fields, attachments: lead.attachments })).digest("hex");
  const cwd = await fs.realpath(options.cwd || process.cwd());
  const directory = privateDirectory(brand, cwd, options.directory || process.env.INQUIRY_STORAGE_DIR);
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
  const directoryStat = await fs.lstat(directory);
  if (directoryStat.isSymbolicLink() || !directoryStat.isDirectory()) throw new InquiryError("Unsafe storage location.");
  await fs.chmod(directory, 0o700);
  const filename = path.join(directory, lead.id + ".json");
  const key = directory + ":" + lead.id;
  if (active.has(key)) throw new InquiryError("This inquiry is still being processed. Please wait.", 409);
  active.add(key);
  let record;
  try {
    try {
      const existingStat = await fs.lstat(filename);
      if (!existingStat.isFile() || existingStat.isSymbolicLink()) throw new InquiryError("Unsafe inquiry file.");
      record = JSON.parse(await fs.readFile(filename, "utf8"));
      if (record.fingerprint !== fingerprint) throw new InquiryError("Inquiry changed. Please reload and resubmit.", 409);
      if (record.status === "sent") return { ok: true, id: lead.id, saved: true, emailAccepted: true };
      if (["sending", "unknown"].includes(record.status)) {
        throw new InquiryError("Delivery is being checked. Please contact sales with reference " + lead.id + ".", 409, { id: lead.id, saved: true });
      }
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    rateLimit(brand, lead.fields.email);
    if (!record) {
      record = {
        id: lead.id, brand, fingerprint, createdAt: new Date().toISOString(),
        status: "pending", fields: lead.fields, attachments: lead.attachments
      };
      await fs.writeFile(filename, JSON.stringify(record, null, 2), { flag: "wx", mode: 0o600 });
    }
    let transport;
    try {
      transport = options.transport || smtpTransport();
    } catch {
      throw new InquiryError("Your inquiry was saved, but email notification is unavailable. Please email sales with reference " + lead.id + ".", 503, { id: lead.id, saved: true });
    }
    record.status = "sending";
    await atomicWrite(filename, record);
    const displayName = brand === "artisanpads" ? "ArtisanPads" : "DianShangMats";
    let info;
    try {
      info = await transport.sendMail({
        from: { name: displayName + " Website", address: recipient },
        to: recipient, replyTo: lead.fields.email,
        subject: "[" + displayName + "] New inquiry " + lead.id,
        messageId: "<" + lead.id + "@" + brands[brand] + ">",
        text: [
          "Website: " + brands[brand], "Reference: " + lead.id,
          "Received: " + record.createdAt, "",
          ...Object.entries(lead.fields).map(([key, value]) => key + ": " + value)
        ].join("\n"),
        attachments: lead.attachments.map(file => ({
          filename: file.name, content: Buffer.from(file.content, "base64"),
          contentType: "application/octet-stream"
        }))
      });
      if (!info.accepted?.some(address => String(address).toLowerCase() === recipient)) {
        throw Object.assign(new Error("Recipient rejected"), { code: "EENVELOPE" });
      }
    } catch (error) {
      record.status = ["ETIMEDOUT", "ESOCKET", "ECONNECTION"].includes(error.code) ? "unknown" : "failed";
      record.failureCode = /^[A-Z0-9_]{1,30}$/.test(error.code || "") ? error.code : "DELIVERY_FAILED";
      await atomicWrite(filename, record).catch(() => {});
      throw new InquiryError("Your inquiry was saved, but email delivery was not confirmed. Please email sales with reference " + lead.id + ".", 503, { id: lead.id, saved: true });
    }
    record.status = "sent";
    record.mailMessageId = info.messageId;
    record.sentAt = new Date().toISOString();
    await atomicWrite(filename, record);
    return { ok: true, id: lead.id, saved: true, emailAccepted: true };
  } finally {
    active.delete(key);
  }
}

export function errorResponse(error) {
  if (error instanceof InquiryError) {
    return { status: error.status, body: {
      ok: false, error: error.message, saved: Boolean(error.saved), ...(error.id ? { id: error.id } : {})
    }};
  }
  return { status: 503, body: { ok: false, error: "We could not confirm your inquiry. Your form has not been cleared. Please email sales@dianshangmats.com.", saved: false } };
}
