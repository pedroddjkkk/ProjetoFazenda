import { prisma } from "@/lib/db/prisma";
import { Succes } from "@/lib/responses";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const body = await req.json();

  const updatedRacao = await prisma.racao.update({
    where: {
      id: Number(context.params.id),
    },
    data: body,
  });

  return Succes(updatedRacao);
}

export async function DELETE(
  _: NextRequest,
  context: { params: { id: string } }
) {
  const deletedRacao = await prisma.racao.delete({
    where: {
      id: Number(context.params.id),
    },
  });

  return Succes(deletedRacao);
}