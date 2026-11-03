import { useEffect, useRef } from 'react';
import { updateParticles, drawParticles } from '../particles/engine';
export default function RainCanvas({ settings }) {
  const canvas = useRef(null); const settingsRef = useRef(settings); settingsRef.current = settings;
  useEffect(() => {
    const el = canvas.current, ctx = el.getContext('2d'); let particles = [], frame, last; const accumulator = { value: 0 };
    function render(now) {
      const rect = el.getBoundingClientRect(); const ratio = window.devicePixelRatio || 1;
      if (el.width !== Math.round(rect.width * ratio) || el.height !== Math.round(rect.height * ratio)) { el.width = Math.round(rect.width * ratio); el.height = Math.round(rect.height * ratio); }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const dt = last ? Math.min((now - last) / 1000, .05) : 0; last = now;
      particles = updateParticles(particles, dt, rect.width, rect.height, settingsRef.current, accumulator);
      drawParticles(ctx, particles, rect.width, rect.height); frame = requestAnimationFrame(render);
    }
    frame = requestAnimationFrame(render); return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvas} className="rain-canvas" aria-label="Simulação de chuva" />;
}
