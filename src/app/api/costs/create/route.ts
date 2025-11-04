import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { campaignName, channelName, channelType, amountCents, note, incurredOn } = body as {
      campaignName: string;
      channelName: string;
      channelType?: string;
      amountCents: number;
      note?: string | null;
      incurredOn?: string | null;
    };
    if (!campaignName || !channelName || !amountCents || amountCents <= 0) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const campaign = await prisma.campaign.upsert({
      where: { name: campaignName },
      update: {},
      create: { name: campaignName },
    });

    const channel = await prisma.channel.upsert({
      where: { name: channelName },
      update: channelType ? { type: channelType as any } : {},
      create: { name: channelName, type: (channelType as any) ?? "OTHER" },
    });

    const cost = await prisma.cost.create({
      data: {
        campaignId: campaign.id,
        channelId: channel.id,
        amountCents,
        note: note ?? undefined,
        incurredOn: incurredOn ? new Date(incurredOn) : undefined,
      },
    });

    return NextResponse.json({ id: cost.id });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


