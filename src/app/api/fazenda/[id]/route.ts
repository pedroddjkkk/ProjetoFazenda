import { prisma } from "@/lib/db/prisma";
import { BadRequest, Succes, Unauthorized } from "@/lib/responses";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const body = await req.json();

  const updatedFazenda = await prisma.fazenda.update({
    where: {
      id: Number(context.params.id),
    },
    data: body,
  });

  return Succes(updatedFazenda);
}

export async function DELETE(
  _: NextRequest,
  context: { params: { id: string } }
) {
  const deletedFazenda = await prisma.fazenda.delete({
    where: {
      id: Number(context.params.id),
    },
  });

  return Succes(deletedFazenda);
}