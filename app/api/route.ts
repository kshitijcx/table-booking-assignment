import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.customer.findMany();
  console.log(data);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const userData = await req.json();
  console.log(userData);
  const resp = await prisma.customer.create({
    data: userData,
  });
  console.log(resp);
  return NextResponse.json(resp);
}
