"use client";

const pending = new Map<string, string>();

async function attachments(files?: FileList | File[]) {
  const selected = files ? Array.from(files) : [];
  if (selected.length > 3 || selected.reduce((sum, file) => sum + file.size, 0) > 2 * 1024 * 1024) {
    throw new Error("Please attach no more than 3 files, totaling 2 MB or less.");
  }
  return Promise.all(selected.map(file => new Promise<{name: string; content: string}>((resolve, reject) => {
    if (!/\.(jpg|jpeg|png|pdf|ai)$/i.test(file.name)) {
      reject(new Error("Use JPG, PNG, PDF or AI attachments.")); return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the attachment. Please select it again."));
    reader.onload = () => resolve({ name: file.name, content: String(reader.result).split(",")[1] });
    reader.readAsDataURL(file);
  })));
}

export async function sendInquiry(body: Record<string, unknown>, files?: FileList | File[]) {
  const payload = { ...body, attachments: await attachments(files) };
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(payload)));
  const fingerprint = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  const storageKey = "inquiry-request:" + fingerprint;
  let stored: string | null = null;
  try { stored = sessionStorage.getItem(storageKey); } catch {}
  const requestId = stored || pending.get(fingerprint) || crypto.randomUUID();
  if (pending.size > 20) pending.clear();
  pending.set(fingerprint, requestId);
  try { sessionStorage.setItem(storageKey, requestId); } catch {}
  let response;
  try {
    response = await fetch("/api/inquiries", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, requestId })
    });
  } catch {
    throw new Error("Delivery was not confirmed. Your form has not been cleared. Please retry or email sales@dianshangmats.com.");
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true || result?.saved !== true || result?.emailAccepted !== true || result?.id !== requestId) {
    throw new Error(result?.error || "Delivery was not confirmed. Please retry or email sales@dianshangmats.com.");
  }
  pending.delete(fingerprint);
  try { sessionStorage.removeItem(storageKey); } catch {}
  return result as {ok: true; id: string; saved: true; emailAccepted: true};
}
