import { NextRequest, NextResponse } from "next/server";
import { BadRequest, Succes } from "@/lib/responses";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await prisma.fazenda.create({
      data: body,
    });
  } catch (error: any) {
    return BadRequest();
  }

  return Succes();
}

export async function GET() {
  const fazendas = await prisma.fazenda.findMany();

  return NextResponse.json(fazendas);
}