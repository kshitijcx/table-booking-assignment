import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserDataType {
  name: string;
  date: string;
  slot: string;
  email: string;
  tables: number;
}

export async function GET() {
  const data = await prisma.customer.findMany();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const userData: UserDataType = await req.json();
  const resp = await prisma.customer.create({
    data: userData,
  });

  type SlotType = {
    slot1?: boolean;
    slot2?: boolean;
    slot3?: boolean;
  };

  const slotToUpdate: SlotType = {};

  switch (userData.slot) {
    case "10:00 am":
      slotToUpdate.slot1 = true;
      break;
    case "12:00 pm":
      slotToUpdate.slot2 = true;
      break;
    case "2:00 pm":
      slotToUpdate.slot3 = true;
      break;
    default:
      throw new Error("Invalid time. Valid times are 10, 12, and 2.");
  }

  await prisma.dateTimeSlot.upsert({
    where: { date: userData.date },
    update: slotToUpdate,
    create: {
      date: userData.date,
      slot1: userData.slot === "10:00 am",
      slot2: userData.slot === "12:00 pm",
      slot3: userData.slot === "2:00 pm",
    },
  });
  return NextResponse.json(resp);
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const resp = await prisma.customer.delete({ where: { id: data.id } });
  return NextResponse.json(resp);
}
