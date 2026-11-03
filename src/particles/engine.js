export function createParticle(width, height) {
  return { x: Math.random() * width, y: -15, speed: height * (0.5 + Math.random() * 0.4), age: 0, life: 1.8 + Math.random() * 0.5, length: 8 + Math.random() * 10 };
}
export function updateParticles(particles, dt, width, height, settings, accumulator) {
  accumulator.value += settings.rate * dt;
  while (accumulator.value >= 1 && particles.length < settings.max) {
    particles.push(createParticle(width, height)); accumulator.value--;
  }
  accumulator.value = Math.min(accumulator.value, 1);
  for (const p of particles) { p.age += dt; p.speed += 120 * dt; p.y += p.speed * dt; p.x += settings.wind * dt; }
  return particles.filter(p => p.age < p.life && p.y < height + 20 && p.x > -30 && p.x < width + 30);
}
export function drawParticles(ctx, particles, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(156, 215, 255, .75)'; ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (const p of particles) { ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - 2, p.y - p.length); }
  ctx.stroke();
}
