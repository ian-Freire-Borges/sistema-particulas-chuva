import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { updateParticles } from '../particles/engine';
export default function RainCanvas({ settings }) {
  const container = useRef(null); const settingsRef = useRef(settings); settingsRef.current = settings;
  useEffect(() => {
    const el = container.current, scene = new THREE.Scene(); scene.background = new THREE.Color('#162438'); scene.fog = new THREE.Fog('#162438', 13, 38);
    const camera = new THREE.PerspectiveCamera(48, 1, .1, 100); camera.position.set(11, 9, 15);
    const renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); el.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, 2.5, 0); controls.enableDamping = true; controls.minDistance = 7; controls.maxDistance = 32; controls.maxPolarAngle = Math.PI / 2.05;
    scene.add(new THREE.HemisphereLight(0x9bc5ef, 0x202a2c, 2));
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(28, 28), new THREE.MeshStandardMaterial({ color: 0x263e48, roughness: .35 })); ground.rotation.x = -Math.PI / 2; scene.add(ground);
    const grid = new THREE.GridHelper(28, 28, 0x66828a, 0x405b63); grid.position.y = .01; scene.add(grid);
    const building = new THREE.Group();
    const walls = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 3), new THREE.MeshStandardMaterial({ color: 0x738c91 })); walls.position.y = 1.5; building.add(walls);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(3.2, 1.5, 4), new THREE.MeshStandardMaterial({ color: 0x394c5b })); roof.rotation.y = Math.PI / 4; roof.position.y = 3.75; building.add(roof);
    const door = new THREE.Mesh(new THREE.BoxGeometry(.8, 1.7, .08), new THREE.MeshStandardMaterial({ color: 0x26313c })); door.position.set(0, .85, 1.52); building.add(door); scene.add(building);
    const positions = new Float32Array(1200 * 6), geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    const material = new THREE.LineBasicMaterial({ color: 0xa5ddff, transparent: true, opacity: .75 }); const rain = new THREE.LineSegments(geometry, material); rain.frustumCulled = false; scene.add(rain);
    let particles = [], last = 0, frame; const accumulator = { value: 0 };
    const resize = () => { const { width, height } = el.getBoundingClientRect(); if (!width || !height) return; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, false); };
    const observer = new ResizeObserver(resize); observer.observe(el); resize();
    const render = now => {
      const dt = last ? Math.min((now - last) / 1000, .05) : 0; last = now; particles = updateParticles(particles, dt, settingsRef.current, accumulator);
      particles.forEach((p, i) => { const j = i * 6; positions[j] = p.x; positions[j + 1] = p.y; positions[j + 2] = p.z; positions[j + 3] = p.x - settingsRef.current.wind * .0005; positions[j + 4] = p.y + .22; positions[j + 5] = p.z; });
      geometry.setDrawRange(0, particles.length * 2); geometry.attributes.position.needsUpdate = true; controls.update(); renderer.render(scene, camera); frame = requestAnimationFrame(render);
    }; frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); controls.dispose(); scene.traverse(object => { object.geometry?.dispose(); if (Array.isArray(object.material)) object.material.forEach(m => m.dispose()); else object.material?.dispose(); }); renderer.dispose(); el.removeChild(renderer.domElement); };
  }, []);
  return <div ref={container} className="rain-canvas" role="img" aria-label="Cena tridimensional de uma casa sob chuva. Arraste para girar a câmera." />;
}
