import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      baseUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      fullUrl,
      channelName,
      channelType,
    } = body as {
      baseUrl: string;
      utmSource: string;
      utmMedium: string;
      utmCampaign: string;
      utmContent?: string | null;
      utmTerm?: string | null;
      fullUrl: string;
      channelName: string;
      channelType: string;
    };

    if (!baseUrl || !utmSource || !utmMedium || !utmCampaign || !fullUrl || !channelName || !channelType) {
      return NextResponse.json({ error: "Missing required input" }, { status: 400 });
    }

    const channel = await prisma.channel.upsert({
      where: { name: channelName },
      update: { type: channelType as any },
      create: { name: channelName, type: channelType as any },
    });

    const campaign = await prisma.campaign.upsert({
      where: { name: utmCampaign },
      update: {},
      create: { name: utmCampaign },
    });

    const utm = await prisma.uTMLink.create({
      data: {
        baseUrl,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent: utmContent ?? undefined,
        utmTerm: utmTerm ?? undefined,
        fullUrl,
        campaignId: campaign.id,
        channelId: channel.id,
      },
    });

    return NextResponse.json({ id: utm.id });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


