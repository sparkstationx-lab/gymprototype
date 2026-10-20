import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const DumbbellCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      if (canvas) canvas.style.display = 'none';
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    camera.position.z = 9;

    scene.add(new THREE.AmbientLight(0x8fb4e0, 0.7));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const orangeLight = new THREE.PointLight(0xff6a1f, 2.2, 20);
    orangeLight.position.set(4, -2, 3);
    scene.add(orangeLight);

    const iceLight = new THREE.PointLight(0x7fd0ff, 1.8, 20);
    iceLight.position.set(-4, 2, 3);
    scene.add(iceLight);

    const steel = new THREE.MeshStandardMaterial({
      color: 0x2b3b55,
      metalness: 0.7,
      roughness: 0.35,
    });
    const chrome = new THREE.MeshStandardMaterial({
      color: 0xcfd8e6,
      metalness: 0.8,
      roughness: 0.25,
    });
    const glow = new THREE.MeshStandardMaterial({
      color: 0xff6a1f,
      emissive: 0xff6a1f,
      emissiveIntensity: 0.5,
      metalness: 0.3,
      roughness: 0.4,
    });
    const ice = new THREE.MeshStandardMaterial({
      color: 0x7fd0ff,
      emissive: 0x7fd0ff,
      emissiveIntensity: 0.5,
    });

    const group = new THREE.Group();

    const addPart = (
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      x: number
    ) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.z = Math.PI / 2;
      mesh.position.x = x;
      group.add(mesh);
      return mesh;
    };

    // Dumbbell center handle & inner glow
    addPart(new THREE.CylinderGeometry(0.13, 0.13, 5, 24), chrome, 0);
    addPart(new THREE.CylinderGeometry(0.17, 0.17, 1.2, 24), glow, 0);

    // Weights & accent rings
    [-1, 1].forEach((s) => {
      addPart(new THREE.CylinderGeometry(1.25, 1.25, 0.34, 48), steel, s * 1.45);
      addPart(new THREE.CylinderGeometry(0.95, 0.95, 0.3, 48), steel, s * 1.85);
      addPart(new THREE.CylinderGeometry(0.22, 0.22, 0.3, 24), glow, s * 2.1);

      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(1.25, 0.03, 8, 64),
        ice
      );
      torus.rotation.y = Math.PI / 2;
      torus.position.x = s * 1.63;
      group.add(torus);
    });

    scene.add(group);

    // Particles background
    const N = 160;
    const pa = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) {
      pa[i] = (Math.random() - 0.5) * 18;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pa, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x7fd0ff,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const points = new THREE.Points(particleGeo, particleMat);
    scene.add(points);

    /* Keyframes per section: [x, y, rotX, rotY, rotZ, scale] */
    const Keyframes = [
      [2.3, 0, 0.3, -0.6, 0.25, 1],
      [-2.7, 0, 0.1, 1.2, -0.2, 0.8],
      [2.9, 0.2, 0.6, 2.4, 0.3, 0.7],
      [-2.9, 0, -0.3, 3.6, 0.6, 0.65],
      [2.9, -0.2, 0.2, 4.6, -0.4, 0.7],
      [3.3, 0.8, 1.1, 5.8, 0, 0.55],
      [-3.1, 0, 0.4, 7, 0.2, 0.6],
      [2.7, -0.3, 0, 8.4, 0.1, 0.8],
    ];

    let sections: HTMLElement[] = [];
    let sectionTops: number[] = [];
    let cur = Keyframes[0].slice();
    let pointerX = 0;
    let animationFrameId: number;

    const smoothStep = (x: number) => {
      const clamped = Math.min(1, Math.max(0, x));
      return clamped * clamped * (3 - 2 * clamped);
    };

    const updateSize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      sections = Array.from(document.querySelectorAll('main > section'));
      sectionTops = sections.map(
        (s) => s.getBoundingClientRect().top + window.scrollY
      );
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', updateSize);

    const handlePointerMove = (e: PointerEvent) => {
      pointerX = e.clientX / window.innerWidth - 0.5;
    };
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });

    const animate = (t: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (document.hidden) return;

      if (sections.length === 0 || sectionTops.length === 0) {
        sections = Array.from(document.querySelectorAll('main > section'));
        sectionTops = sections.map(
          (s) => s.getBoundingClientRect().top + window.scrollY
        );
      }

      const isMobile = window.innerWidth < 760;
      const scrollPos = window.scrollY + window.innerHeight * 0.5;

      let currentIdx = 0;
      sectionTops.forEach((top, j) => {
        if (top <= scrollPos) currentIdx = j;
      });

      const secHeight = sections[currentIdx]?.offsetHeight || window.innerHeight;
      const progress = smoothStep(
        ((scrollPos - (sectionTops[currentIdx] || 0)) / secHeight - 0.35) / 0.65
      );

      const targetA = Keyframes[Math.min(currentIdx, Keyframes.length - 1)];
      const targetB =
        Keyframes[Math.min(currentIdx + 1, Keyframes.length - 1)];
      const lerpSpeed = reduce ? 1 : 0.07;

      for (let n = 0; n < 6; n++) {
        const valA = targetA[n];
        const valB = targetB[n];
        const interpolated = valA + (valB - valA) * progress;
        cur[n] += (interpolated - cur[n]) * lerpSpeed;
      }

      group.position.set(
        cur[0] * (isMobile ? 0.15 : 1),
        isMobile ? cur[1] + 1.2 : cur[1],
        0
      );
      group.rotation.set(
        cur[2],
        cur[3] + (reduce ? 0 : t * 0.0003),
        cur[4]
      );
      group.scale.setScalar(cur[5] * (isMobile ? 0.55 : 1));

      points.position.y = (window.scrollY * 0.002) % 4;
      camera.position.x += (pointerX * 0.8 - camera.position.x) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('orientationchange', updateSize);
      window.removeEventListener('pointermove', handlePointerMove);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      steel.dispose();
      chrome.dispose();
      glow.dispose();
      ice.dispose();
    };
  }, []);

  return <canvas id="gl" ref={canvasRef} aria-hidden="true" />;
};
