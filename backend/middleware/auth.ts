import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayloadT } from "../types/jwt.types";

const JWT_SECRET = process.env.JWT_SECRET!;

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      code: "NOT_AUTHENTICATED",
      message: "Not authenticated",
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayloadT;
    req.user = payload;
    next();
  } catch {
      return res.status(401).json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid credentials",
      });
  }
}
