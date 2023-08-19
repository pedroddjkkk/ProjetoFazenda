import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { BadRequest, Succes, Unauthorized } from "@/lib/responses";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  try {
    let addUser: any = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
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
    },
  });

  return NextResponse.json(users);
}
