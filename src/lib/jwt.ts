import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "3h",
};

export function signJwtAccesToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret_key!, options);

  return token;
}

export async function verifyJwt(token: string | undefined) {
  if (!token) return null;

  try {
    const secret_key = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = jose.jwtVerify(token, secret_key!);

    return payload;
  } catch (error) {
    return null;
  } 
}

export function decodeJwt(token: string) {
  try {
    const payload = jwt.decode(token);

    return payload as JwtPayload;
  } catch (error) {
    return null;
  }
}
