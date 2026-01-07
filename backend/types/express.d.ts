import { JwtPayloadT } from "./jwt.types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadT;
    }
  }
}

export {};
