import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Stub webhook: map event payload dari Whop menjadi Event SIGNUP/PURCHASE
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    // Contoh payload minimal yang diharapkan
    // { type: "purchase" | "signup", campaign: "<utm_campaign>", fullUrl: "<full_url>", valueCents?: number, customerId?: string, metadata?: any }

    const type = String(payload.type || "").toUpperCase();
    const utmCampaign = String(payload.campaign || "");
    const fullUrl = String(payload.fullUrl || "");

    if (!utmCampaign || !fullUrl) {
      return NextResponse.json({ error: "campaign/fullUrl required" }, { status: 400 });
    }

    const utm = await prisma.uTMLink.findFirst({ where: { fullUrl } });
    if (!utm) return NextResponse.json({ error: "UTM not found" }, { status: 404 });

    const evType = type === "PURCHASE" || type === "ORDER" ? "PURCHASE" : type === "SIGNUP" ? "SIGNUP" : "CLICK";

    const event = await prisma.event.create({
      data: {
        type: evType as any,
        valueCents: payload.valueCents ?? null,
        customerId: payload.customerId ?? null,
        metadata: payload.metadata ?? null,
        utmLinkId: utm.id,
        campaignId: utm.campaignId,
      },
    });

    // Jika PURCHASE, buat record Conversion terpisah untuk query cepat
    if (event.type === "PURCHASE" && event.valueCents) {
      await prisma.conversion.create({
        data: { eventId: event.id, valueCents: event.valueCents },
      });
    }

    return NextResponse.json({ id: event.id });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


