import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;
  const timeSlots = await prisma.dateTimeSlot.findFirst({ where: { date } });
  return NextResponse.json(timeSlots);
}
