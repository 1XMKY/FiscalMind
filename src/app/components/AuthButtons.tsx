"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="inline-block border border-[#22325B] text-[#22325B] px-5 py-2 rounded-md hover:bg-[#22325B] hover:text-white transition"
      >
        Cerrar sesión
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="inline-block bg-[#22325B] text-white px-5 py-2 rounded-md shadow hover:-translate-y-0.5 transition"
    >
      Iniciar sesión
    </button>
  );
}
