import { prisma } from "@/lib/db/prisma";
import { signJwtAccesToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const res = NextResponse.json(
    {
      message: "Logout success",
    },
    { status: 200 }
  );

  res.cookies.delete("accesToken");

  return res;
}
