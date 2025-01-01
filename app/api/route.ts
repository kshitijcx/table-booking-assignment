import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const userData = await req.json();
  // const resp = await prisma.customer.create()
  console.log(userData);
  return NextResponse.json({ msg: "done" });
}
