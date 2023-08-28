import { NextRequest, NextResponse } from "next/server";
import { BadRequest, Succes } from "@/lib/responses";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    let addUser: any = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        login: body.login,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return BadRequest([{ message: "email_exists" }]);
    }
  }

  return Succes();
}

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      login: true,
      password: true
    },
  });

  return NextResponse.json(users);
}