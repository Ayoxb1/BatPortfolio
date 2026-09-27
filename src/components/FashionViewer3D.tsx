'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FashionViewer3DProps {
  onClose?: () => void;
}

export default function FashionViewer3D({ onClose }: FashionViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeMaterial, setActiveMaterial] = useState<'noir' | 'gold'>('noir');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const garmentGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{ fabric: THREE.MeshStandardMaterial; metal: THREE.MeshStandardMaterial } | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 360;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd97706, 0.9); // Gold amber rim
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    // High-fashion garment group
    const garmentGroup = new THREE.Group();
    scene.add(garmentGroup);
    garmentGroupRef.current = garmentGroup;

    // Materials
    const fabricMaterial = new THREE.MeshStandardMaterial({
      color: 0x111113,
      roughness: 0.7,
      metalness: 0.1,
      wireframe: false,
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Metallic Luxury Gold
      roughness: 0.25,
      metalness: 0.85,
      wireframe: false,
    });

    materialsRef.current = { fabric: fabricMaterial, metal: metalMaterial };

    // 1. Oversized Torso / Hoodie Volume (Chamfered Cylinder)
    const torsoGeo = new THREE.CylinderGeometry(0.85, 1.15, 1.6, 32, 16);
    // Add procedural fabric folds to geometry vertices
    const pos = torsoGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const angle = Math.atan2(pos.getZ(i), pos.getX(i));
      const displacement = Math.sin(y * 8 + angle * 4) * 0.04;
      pos.setX(i, pos.getX(i) + Math.cos(angle) * displacement);
      pos.setZ(i, pos.getZ(i) + Math.sin(angle) * displacement);
    }
    torsoGeo.computeVertexNormals();
    const torsoMesh = new THREE.Mesh(torsoGeo, fabricMaterial);
    garmentGroup.add(torsoMesh);

    // 2. High-Fashion Architectural Collar / Hood Hooded Ring
    const collarGeo = new THREE.TorusGeometry(0.88, 0.22, 16, 36);
    collarGeo.rotateX(Math.PI / 2.3);
    collarGeo.scale(1, 1.1, 0.9);
    const collarMesh = new THREE.Mesh(collarGeo, fabricMaterial);
    collarMesh.position.y = 0.82;
    garmentGroup.add(collarMesh);

    // 3. Luxury Golden Monogram Medallion (Center Chest)
    const medallionGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 32);
    medallionGeo.rotateX(Math.PI / 2);
    const medallionMesh = new THREE.Mesh(medallionGeo, metalMaterial);
    medallionMesh.position.set(0, 0.25, 0.92);
    garmentGroup.add(medallionMesh);

    // 4. Medallion Bat Insignia / Stylized Crest Accent
    const emblemGeo = new THREE.RingGeometry(0.12, 0.18, 24);
    const emblemMesh = new THREE.Mesh(emblemGeo, metalMaterial);
    emblemMesh.position.set(0, 0.25, 0.95);
    garmentGroup.add(emblemMesh);

    // 5. Surrounding ambient luxury particle ring
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 1.4 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      particlePos[i] = Math.cos(theta) * r;
      particlePos[i + 1] = (Math.random() - 0.5) * 2;
      particlePos[i + 2] = Math.sin(theta) * r;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    garmentGroup.add(particlePoints);

    // Animation & Interactive Orbit Drag
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !garmentGroup) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      rotationVelocityY = deltaX * 0.006;
      rotationVelocityX = deltaY * 0.006;

      garmentGroup.rotation.y += rotationVelocityY;
      garmentGroup.rotation.x += rotationVelocityX;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1 || !garmentGroup) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;
      garmentGroup.rotation.y += deltaX * 0.008;
      garmentGroup.rotation.x += deltaY * 0.008;
      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    };
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging && garmentGroup) {
        // Idle gentle float & inertia
        garmentGroup.rotation.y += 0.005;
        garmentGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.05;
      }

      particlePoints.rotation.y += 0.002;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('resize', handleResize);

      torsoGeo.dispose();
      collarGeo.dispose();
      medallionGeo.dispose();
      emblemGeo.dispose();
      particleGeo.dispose();
      fabricMaterial.dispose();
      metalMaterial.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Handle wireframe toggling
  useEffect(() => {
    if (materialsRef.current) {
      materialsRef.current.fabric.wireframe = wireframe;
      materialsRef.current.metal.wireframe = wireframe;
    }
  }, [wireframe]);

  // Handle material color scheme
  useEffect(() => {
    if (materialsRef.current) {
      if (activeMaterial === 'noir') {
        materialsRef.current.fabric.color.setHex(0x111113);
        materialsRef.current.metal.color.setHex(0xd4af37);
      } else {
        materialsRef.current.fabric.color.setHex(0x1a1a24);
        materialsRef.current.metal.color.setHex(0xffffff);
      }
    }
  }, [activeMaterial]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[360px] md:h-[390px] rounded-xl overflow-hidden bg-gradient-to-b from-[#0e0e12] to-[#050507] border border-white/20 select-none flex flex-col justify-between"
    >
      {/* Top HUD Controls */}
      <div className="relative z-10 flex items-center justify-between p-3 bg-black/60 backdrop-blur-md border-b border-white/10 text-[10px] font-mono">
        <div className="flex items-center gap-2 text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-bold text-white tracking-widest uppercase">IMAAN // 3D GARMENT INSPECTION</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              wireframe ? 'bg-amber-400/20 border-amber-400 text-amber-300' : 'bg-white/5 border-white/15 text-zinc-400 hover:text-white'
            }`}
          >
            {wireframe ? 'MALLA: ON' : 'WIREFRAME'}
          </button>
          <button
            onClick={() => setActiveMaterial(activeMaterial === 'noir' ? 'gold' : 'noir')}
            className="px-2 py-0.5 rounded border bg-white/5 border-white/15 text-zinc-400 hover:text-white transition-colors"
          >
            PALETA: {activeMaterial.toUpperCase()}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="w-5 h-5 flex items-center justify-center rounded text-zinc-400 hover:text-white hover:bg-white/10"
              title="Volver a la vista previa"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Three.js Interactive Canvas */}
      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Bottom Interactive Prompt & Telemetry */}
      <div className="relative z-10 flex items-center justify-between p-3 bg-black/70 backdrop-blur-md border-t border-white/10 text-[9px] font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-amber-400">❖</span>
          <span>ARRASTRA CON EL RATÓN PARA ROTAR 360° // MODELO EN TIEMPO REAL</span>
        </div>
        <span className="text-zinc-500 hidden sm:inline">TEX: 2K PROCEDURAL // SILHOUETTE: OVERSIZED</span>
      </div>
    </div>
  );
}
