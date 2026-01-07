import { getUser, getUserOptional } from "@/lib/api-helpers";
import { redirect } from "next/navigation";
import LoginClient from "./login-client";

export default async function Login(){
  const user = await getUserOptional(); // server fetch with cookies
  if (user) redirect("/");      // ✅ server redirect
  return <LoginClient />;
}