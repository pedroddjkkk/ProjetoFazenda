import { prisma } from "@/lib/db/prisma";
import { signJwtAccesToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user)
    return NextResponse.json({
      message: "Invalid email or password",
      status: 400,
    });

  const token = signJwtAccesToken({
    id: user?.id,
    email: user?.email,
    name: user?.name,
    login: user?.login,
  });

  cookies().set("accesToken", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 3,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({
    message: "Login success",
    status: 200,
  });
}
