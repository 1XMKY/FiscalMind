// src/app/dashboard/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";        // correcto: ../ desde /dashboard a /auth.ts
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | FiscalMind",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // usa tu página de login personalizada y conserva la intención de volver al dashboard
    redirect(`/signin?callbackUrl=${encodeURIComponent("/dashboard")}`);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Hola, {session.user?.name ?? session.user?.email}</p>

      <div style={{ marginTop: 16 }}>
        <Link href="/dashboard/taxes">Ir a mis impuestos</Link>
      </div>
    </main>
  );
}
