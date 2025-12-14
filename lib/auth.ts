import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: number;
  role: "USER" | "ADMIN";
}

export function generateToken(user: { id: number; role: string }) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  } catch {
    return null;
  }
}
