import { NextResponse } from "next/server";
import { deliverInquiry, errorResponse } from "@/inquiry-delivery.mjs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !["https://dianshangmats.com", "https://www.dianshangmats.com"].includes(origin) &&
      process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "Please use the website inquiry form." }, { status: 403 });
  }
  try {
    if (Number(request.headers.get("content-length")) > 3 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "Attachments must total 2 MB or less." }, { status: 413 });
    }
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ ok: false, error: "Empty inquiry." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 3 * 1024 * 1024) {
        await reader.cancel();
        return NextResponse.json({ ok: false, error: "Attachments must total 2 MB or less." }, { status: 413 });
      }
      chunks.push(value);
    }
    let body;
    try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
    catch { return NextResponse.json({ ok: false, error: "Invalid inquiry." }, { status: 400 }); }
    return NextResponse.json(await deliverInquiry("dianshangmats", body));
  } catch (error) {
    const result = errorResponse(error);
    return NextResponse.json(result.body, { status: result.status });
  }
}
