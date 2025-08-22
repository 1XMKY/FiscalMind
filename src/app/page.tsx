// app/page.tsx — Versión 2D (sin components/ ni fonts/)
"use client";

import { useEffect, useRef } from "react";

function HeroBG() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.18,
      s: Math.random() * 2 + 1.2,
    }));

    const resize = () => {
      const r = c.getBoundingClientRect();
      c.width = Math.max(1, Math.floor(r.width * DPR));
      c.height = Math.max(1, Math.floor(r.height * DPR));
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    };

    let id = 0;
    const loop = (t = 0) => {
      const { width: w, height: h } = c.getBoundingClientRect();
      ctx.clearRect(0, 0, w, h);

      const circles = [
        { x: 0.18, y: 0.25, r: 140, col: "rgba(132,168,156,0.18)" },
        { x: 0.72, y: 0.40, r: 180, col: "rgba(82,121,111,0.16)" },
        { x: 0.46, y: 0.62, r: 130, col: "rgba(202,226,213,0.15)" },
      ];
      circles.forEach((c0, i) => {
        const jx = Math.sin(t / 1100 + i) * 3;
        const jy = Math.cos(t / 1300 + i) * 3;
        ctx.beginPath();
        ctx.arc(c0.x * w + jx, c0.y * h + jy, c0.r, 0, Math.PI * 2);
        ctx.fillStyle = c0.col;
        ctx.fill();
      });

      particles.forEach((p) => {
        p.x += p.dx / 1000;
        p.y += p.dy / 1000;
        if (p.x < 0 || p.x > 1) p.dx *= -1;
        if (p.y < 0 || p.y > 1) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.s, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(202,226,213,0.85)";
        ctx.fill();
      });

      id = requestAnimationFrame(loop);
    };

    resize();
    loop();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function Home() {
  return (
    <div className="bg-[#2F3E40] text-white font-sans pt-4 md:pt-8">
      {/* Hero con fondo animado 2D */}
      <section className="px-6 pt-12">
        <div
          className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center rounded-3xl overflow-hidden"
          style={{ minHeight: 600 }}
        >
          {/* Fondo */}
          <HeroBG />

          {/* Contenido */}
          <div className="relative z-10 py-6">
            <h1 className="text-4xl font-bold leading-tight text-[#CAE2D5]">
              Declaración de impuestos<br /> para independientes y profesionales
            </h1>
            <p className="mt-4 text-[#B4C8BC]">
              Conecta tu RFC en 2 minutos, elige tu plan y deja que nuestros expertos gestionen tus impuestos.
            </p>
            <button className="mt-6 bg-[#84A89C] text-[#2F3E40] px-6 py-3 rounded-full font-semibold hover:bg-[#CAE2D5]">
              Recibe tu análisis fiscal ahora
            </button>
          </div>

          {/* Spacer para altura en grid */}
          <div className="h-[1px] md:h-[600px]" />
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="bg-[#354F52] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#CAE2D5] mb-6">Nuestros planes contables</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Plan Plataformas",
                desc: "Ideal para personas que generan ingresos en apps como Uber, Rappi o Didi.",
                features: [
                  "Declaraciones mensuales de IVA e ISR",
                  "Alta en el SAT, régimen y modalidad",
                  "Soporte especializado",
                ],
              },
              {
                title: "Plan Freelancer",
                desc: "Para freelancers y profesionistas independientes.",
                features: [
                  "Incluye Plan Plataformas",
                  "100 facturas gratuitas al mes",
                  "Soporte vía WhatsApp",
                ],
              },
              {
                title: "Plan Empresarial",
                desc: "Ideal para negocios pequeños y emprendedores.",
                features: [
                  "Incluye Plan Freelancer",
                  "Contador exclusivo",
                  "Facturación ilimitada",
                ],
              },
            ].map((plan, idx) => (
              <div key={idx} className="bg-[#2F3E40] p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-[#CAE2D5]">{plan.title}</h3>
                <p className="mt-2 text-sm text-[#B4C8BC]">{plan.desc}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#84A89C]">✔</span> {f}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-[#84A89C] text-[#2F3E40] py-2 rounded-full font-semibold hover:bg-[#CAE2D5]">
                  Activar {plan.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 text-center bg-[#2F3E40]">
        <h2 className="text-2xl font-bold text-[#CAE2D5]">¿Listo para simplificar tus impuestos?</h2>
        <p className="mt-2 text-[#B4C8BC]">Automatiza tu contabilidad con FiscalMind.</p>
        <button className="mt-6 bg-[#84A89C] text-[#2F3E40] px-8 py-3 rounded-full font-semibold hover:bg-[#CAE2D5]">
          Empezar ahora
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2E2F] text-[#B4C8BC] text-sm py-10 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p>&copy; 2025 FiscalMind. Todos los derechos reservados.</p>
          <div className="space-x-4">
            <a href="#">Términos</a>
            <a href="#">Privacidad</a>
            <a href="#">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}