import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

export async function POST(req: Request) {
  const { email, name } = await req.json();

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: { email, name },
  });

  return Response.json(user, { status: 201 });
}
