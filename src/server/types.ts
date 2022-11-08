import type { JwtPayload } from "jsonwebtoken";

export interface BodyCredentials {
  username: string;
  password: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}
