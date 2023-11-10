import { prisma } from "@/lib/db/prisma";
import { Succes } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const body = await req.json();

  const updatedBoi = await prisma.boi.update({
    where: {
      id: Number(context.params.id),
    },
    data: {
      
    },
  });

  return Succes(updatedBoi);
}

export async function DELETE(
  _: NextRequest,
  context: { params: { id: string } }
) {
  const deletedBoi = await prisma.boi.delete({
    where: {
      id: Number(context.params.id),
    },
  });

  return Succes(deletedBoi);
}
