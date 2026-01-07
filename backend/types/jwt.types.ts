// types/jwt.ts
export type JwtPayloadT = {
  userId: string;      // or number, match your DB
  username: string;
  displayName: string;
  profilePicture: string;
};
