import { NextResponse } from "next/server";

export function Unauthorized(error = "unauthorized" as string | any) {
  return new Response(JSON.stringify({ error }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function NotFound(error = "not found" as string | any) {
  return new Response(JSON.stringify({ error }), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function InternalServerError(
  error = "internal server error" as string | any
) {
  return new Response(JSON.stringify({ error }), {
    status: 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function BadRequest(error = "bad request" as string | any) {
  return new Response(JSON.stringify({ error }), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function Conflict(error = "conflict" as string | any) {
  return NextResponse.json(
    {
      message: error,
    },
    {
      status: 409,
    }
  );
}

export function Succes(message = "succes" as string | any) {
  return NextResponse.json(
    {
      message,
    },
    {
      status: 200,
    }
  );
}