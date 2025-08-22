// src/app/api/private/ping/route.ts
export async function GET() {
  return Response.json({ status: "ok", time: Date.now() });
}
