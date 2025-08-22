// src/app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Iniciar sesión</h1>
      <button onClick={() => signIn("google")} className="px-3 py-1 border rounded">
        Continuar con Google
      </button>
    </main>
  );
}
