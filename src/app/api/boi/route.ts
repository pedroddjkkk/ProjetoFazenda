import { NextRequest, NextResponse } from "next/server";
import { BadRequest, Succes } from "@/lib/responses";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await prisma.boi.create(body);
  } catch (error: any) {
    return BadRequest(error);
  }

  return Succes();
}

export async function GET() {
  const bois = await prisma.boi.findMany();

  return NextResponse.json(bois);
}
