export function updateParticles(particles, dt, settings, accumulator) {
  accumulator.value += settings.rate * dt;
  while (accumulator.value >= 1 && particles.length < settings.max) {
    particles.push({ x: (Math.random() - .5) * 16, y: 8, z: (Math.random() - .5) * 14, speed: 4 + Math.random() * 2, age: 0, life: 1.8 + Math.random() * .5 }); accumulator.value--;
  }
  accumulator.value = Math.min(accumulator.value, 1);
  for (const p of particles) { p.age += dt; p.speed += 3 * dt; p.y -= p.speed * dt; p.x += settings.wind * .012 * dt; }
  return particles.filter(p => p.age < p.life && p.y > 0 && Math.abs(p.x) < 12);
}
