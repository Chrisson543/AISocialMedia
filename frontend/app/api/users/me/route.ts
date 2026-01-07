import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api-helpers";
import { UserT } from "@/app/types";

export async function GET() {
  try {
    const data = await apiFetch<UserT>("/users/me", {
      method: "GET",
      redirectOn401: false, // ✅ critical
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    // If backend says unauthorized, return 401 to the client
    const msg = error?.message ?? "Unauthorized";
    if (msg === "Not authenticated" || msg === "Unauthorized") {
      return NextResponse.json({ message: msg }, { status: 401 });
    }

    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
