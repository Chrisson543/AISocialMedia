import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api-helpers";
import { UserT } from "@/app/types";

export async function GET(
  _req: Request,
  context: { params: Promise<{ term: string }> }
) {
  try {
    // ✅ params is async in newer Next.js
    const { term } = await context.params;

    if (!term) {
      return NextResponse.json([], { status: 200 });
    }

    const data = await apiFetch<UserT[]>(
      `/users/search/${encodeURIComponent(term)}`,
      {
        method: "GET",
        redirectOn401: false,
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Search route error:", error);

    return NextResponse.json(
      { message: error?.message ?? "Search failed" },
      { status: 500 }
    );
  }
}
