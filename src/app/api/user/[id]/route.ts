import { prisma } from "@/lib/db/prisma";
import { BadRequest, Succes, Unauthorized } from "@/lib/responses";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const body = await req.json();

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(context.params.id),
    },
    data: body,
  });

  return Succes("User updated successfully");
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(context.params.id),
    },
  });

  return Succes("User deleted successfully");
}