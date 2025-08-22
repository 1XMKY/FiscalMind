// /middleware.ts
export { default } from "next-auth/middleware";

// Rutas que requieren sesión
export const config = {
  matcher: [
    "/dashboard/:path*",   // sección privada
    "/api/private/:path*", // APIs privadas
  ],
};
