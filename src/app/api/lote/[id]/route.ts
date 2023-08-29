import { prisma } from "@/lib/db/prisma";
import { Succes } from "@/lib/responses";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const body = await req.json();

  const updatedLote = await prisma.lote.update({
    where: {
      id: Number(context.params.id),
    },
    data: body,
  });

  return Succes(updatedLote);
}

export async function DELETE(
  _: NextRequest,
  context: { params: { id: string } }
) {
  const deletedLote = await prisma.lote.delete({
    where: {
      id: Number(context.params.id),
    },
  });

  return Succes(deletedLote);
}