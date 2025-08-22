// src/app/api/me/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// desde src/app/api/me hasta src/app/auth.ts = ../../auth
import { authOptions } from "../../auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
