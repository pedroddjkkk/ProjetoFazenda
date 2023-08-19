import jwt from "jsonwebtoken";
require("dotenv").config();

const DEFAULT_SIGN_OPTION = {
  expiresIn: "3h",
};

export function signJwtAccesToken(payload, options = DEFAULT_SIGN_OPTION){
  const secret_key = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret_key, options);

  return token;
}

export function verifyJwt(token){
  if(!token) return null;
  
  try {
    const secret_key = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret_key);

    return payload;
  } catch (error) {
    return null;
  }
}

export function decodeJwt(token){
  try {
    const payload = jwt.decode(token);

    return payload;
  } catch (error) {
    return null;
  }
}