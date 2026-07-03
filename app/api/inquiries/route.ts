import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(1),
  companyName: z.string().optional(),
  businessEmail: z.string().email(),
  phoneOrWhatsapp: z.string().optional(),
  countryOrRegion: z.string().optional(),
  product: z.string().optional(),
  estimatedQuantity: z.string().optional(),
  requiredShape: z.string().optional(),
  requiredSize: z.string().optional(),
  requiredThickness: z.string().optional(),
  material: z.string().optional(),
  surfaceTexture: z.string().optional(),
  logoRequirements: z.string().optional(),
  printingRequirements: z.string().optional(),
  packagingRequirements: z.string().optional(),
  targetMarket: z.string().optional(),
  expectedDeliveryDate: z.string().optional(),
  detailedRequirements: z.string().optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        ok: true,
        mode: "demo",
        message: "Inquiry accepted in local demo mode. Configure DATABASE_URL to persist submissions."
      },
      { status: 202 }
    );
  }

  const { prisma } = await import("@/lib/prisma");
  const inquiry = await prisma.inquiry.create({
    data: {
      name: parsed.data.name,
      companyName: parsed.data.companyName,
      businessEmail: parsed.data.businessEmail,
      phoneOrWhatsapp: parsed.data.phoneOrWhatsapp,
      countryOrRegion: parsed.data.countryOrRegion,
      estimatedQuantity: parsed.data.estimatedQuantity,
      requiredShape: parsed.data.requiredShape,
      requiredSize: parsed.data.requiredSize,
      requiredThickness: parsed.data.requiredThickness,
      material: parsed.data.material,
      surfaceTexture: parsed.data.surfaceTexture,
      logoRequirements: parsed.data.logoRequirements,
      printingRequirements: parsed.data.printingRequirements,
      packagingRequirements: parsed.data.packagingRequirements,
      targetMarket: parsed.data.targetMarket,
      expectedDeliveryDate: parsed.data.expectedDeliveryDate,
      detailedRequirements: parsed.data.detailedRequirements
    }
  });

  return NextResponse.json({ ok: true, id: inquiry.id });
}
