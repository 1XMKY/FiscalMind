// src/app/api/users/[id]/route.ts
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

// Next 15: params puede ser Promise, lo tipamos y lo await-eamos
type Ctx = { params: Promise<{ id: string }> };

function parseId(idStr: string) {
  const id = Number(idStr);
  if (!Number.isInteger(id) || id <= 0) throw new Error("invalid-id");
  return id;
}

/** GET /api/users/[id] */
export async function GET(_req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const user = await prisma.user.findUnique({ where: { id: parseId(id) } });
    if (!user) return Response.json({ error: "not found" }, { status: 404 });
    return Response.json(user);
  } catch (e: any) {
    if (e?.message === "invalid-id") {
      return Response.json({ error: "bad id" }, { status: 400 });
    }
    return Response.json({ error: "server error" }, { status: 500 });
  }
}

/** PATCH /api/users/[id]  (parcial: name/email) */
export async function PATCH(req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const numId = parseId(id);

    const body = await req.json();
    const data: { email?: string; name?: string } = {};
    if (typeof body.email === "string") data.email = body.email;
    if (typeof body.name === "string") data.name = body.name;

    if (Object.keys(data).length === 0) {
      return Response.json({ error: "no fields to update" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: numId },
      data,
    });
    return Response.json(updated);
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      // unique constraint (email duplicado)
      return Response.json({ error: "email already exists" }, { status: 409 });
    }
    if (e?.message === "invalid-id") {
      return Response.json({ error: "bad id" }, { status: 400 });
    }
    return Response.json({ error: "not found" }, { status: 404 });
  }
}

/** DELETE /api/users/[id] */
export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const removed = await prisma.user.delete({ where: { id: parseId(id) } });
    return Response.json(removed);
  } catch (e: any) {
    if (e?.message === "invalid-id") {
      return Response.json({ error: "bad id" }, { status: 400 });
    }
    return Response.json({ error: "not found" }, { status: 404 });
  }
}
