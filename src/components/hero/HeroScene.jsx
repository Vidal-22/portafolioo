"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

const CYAN = new THREE.Color("#22d3ee");
const BLUE = new THREE.Color("#4f7cff");
const VIOLET = new THREE.Color("#8b5cf6");

/** Textura radial suave para que los puntos brillen (sin postprocesado). */
function useGlowTexture() {
  return useMemo(() => {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.75)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/** PRNG determinista para que la red sea igual en cada carga. */
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/* Núcleo: halo fresnel + jaula geodésica                              */
/* ------------------------------------------------------------------ */

const fresnelVertex = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vP;
  void main() {
    vN = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vV = normalize(-mv.xyz);
    vP = position;
    gl_Position = projectionMatrix * mv;
  }
`;

const fresnelFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uA;
  uniform vec3 uB;
  varying vec3 vN;
  varying vec3 vV;
  varying vec3 vP;
  void main() {
    float f = pow(1.0 - abs(dot(vN, vV)), 2.6);
    float scan = 0.5 + 0.5 * sin(vP.y * 18.0 - uTime * 2.2);
    vec3 col = mix(uA, uB, clamp(0.5 + 0.5 * sin(uTime * 0.6 + vP.y * 1.5), 0.0, 1.0));
    float a = f * (0.75 + 0.25 * scan);
    gl_FragColor = vec4(col * (1.0 + f), a);
  }
`;

function Core({ simple }) {
  const cage = useRef();
  const inner = useRef();
  const halo = useRef();
  const haloMat = useRef();

  const cageGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.62, 1)), []);
  const innerGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.42, 0)), []);
  const vertsGeo = useMemo(() => new THREE.IcosahedronGeometry(1.62, 1), []);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uA: { value: CYAN.clone() }, uB: { value: VIOLET.clone() } }),
    []
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (haloMat.current) haloMat.current.uniforms.uTime.value = t;
    if (cage.current) {
      cage.current.rotation.y += dt * 0.12;
      cage.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (inner.current) {
      inner.current.rotation.y -= dt * 0.22;
      inner.current.rotation.z += dt * 0.08;
    }
    if (halo.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.015;
      halo.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={halo}>
        <sphereGeometry args={[1.38, simple ? 32 : 64, simple ? 32 : 64]} />
        <shaderMaterial
          ref={haloMat}
          vertexShader={fresnelVertex}
          fragmentShader={fresnelFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <group ref={cage}>
        <lineSegments geometry={cageGeo}>
          <lineBasicMaterial color={BLUE} transparent opacity={0.55} blending={THREE.AdditiveBlending} />
        </lineSegments>
        <points geometry={vertsGeo}>
          <pointsMaterial color={CYAN} size={0.06} sizeAttenuation transparent opacity={0.95} />
        </points>
      </group>

      <lineSegments ref={inner} geometry={innerGeo}>
        <lineBasicMaterial color={VIOLET} transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Anillos orbitales con "paquetes de datos"                           */
/* ------------------------------------------------------------------ */

function OrbitRing({ radius, tilt, speed, color, nodes, glow }) {
  const group = useRef();
  const dots = useRef();

  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(nodes * 3);
    for (let i = 0; i < nodes; i++) {
      const a = (i / nodes) * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * radius;
      pos[i * 3 + 1] = Math.sin(a) * radius;
      pos[i * 3 + 2] = 0;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [nodes, radius]);

  useFrame((_, dt) => {
    if (dots.current) dots.current.rotation.z += dt * speed;
  });

  return (
    <group ref={group} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.0065, 6, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.42} blending={THREE.AdditiveBlending} />
      </mesh>
      <points ref={dots} geometry={nodeGeo}>
        <pointsMaterial
          color={color}
          map={glow}
          size={0.32}
          sizeAttenuation
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Red de partículas conectadas (plexus)                               */
/* ------------------------------------------------------------------ */

function Network({ count, glow }) {
  const group = useRef();

  const { pointsGeo, linesGeo } = useMemo(() => {
    const rand = mulberry32(22);
    const pts = [];
    for (let i = 0; i < count; i++) {
      // cáscara esférica achatada alrededor del núcleo
      const r = 2.7 + rand() * 3.2;
      const th = rand() * Math.PI * 2;
      const ph = Math.acos(2 * rand() - 1);
      pts.push(
        new THREE.Vector3(
          r * Math.sin(ph) * Math.cos(th) * 1.25,
          r * Math.cos(ph) * 0.8,
          r * Math.sin(ph) * Math.sin(th) * 0.9
        )
      );
    }
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    pts.forEach((p, i) => {
      pos.set([p.x, p.y, p.z], i * 3);
      const c = CYAN.clone().lerp(VIOLET, rand());
      col.set([c.r, c.g, c.b], i * 3);
    });
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pg.setAttribute("color", new THREE.BufferAttribute(col, 3));

    const seg = [];
    const maxDist = 1.55;
    for (let i = 0; i < count; i++) {
      let links = 0;
      for (let j = i + 1; j < count && links < 3; j++) {
        if (pts[i].distanceTo(pts[j]) < maxDist) {
          seg.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          links++;
        }
      }
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    return { pointsGeo: pg, linesGeo: lg };
  }, [count]);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.035;
  });

  return (
    <group ref={group}>
      <points geometry={pointsGeo}>
        <pointsMaterial
          vertexColors
          map={glow}
          size={0.16}
          sizeAttenuation
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.16} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Geometrías flotantes                                                */
/* ------------------------------------------------------------------ */

function Floater({ position, geometry, color, speed = 1, scale = 1 }) {
  const ref = useRef();
  const base = useMemo(() => new THREE.Vector3(...position), [position]);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (!ref.current) return;
    ref.current.position.set(base.x, base.y + Math.sin(t) * 0.18, base.z);
    ref.current.rotation.x = t * 0.5;
    ref.current.rotation.y = t * 0.7;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Rig: parallax con el puntero + reacción al scroll                   */
/* ------------------------------------------------------------------ */

function Rig({ pointer, children }) {
  const ref = useRef();
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = 1 - Math.pow(0.002, dt); // suavizado independiente del framerate
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    g.rotation.y += (pointer.current.x * 0.35 + scroll * 0.6 - g.rotation.y) * k;
    g.rotation.x += (-pointer.current.y * 0.22 + scroll * 0.25 - g.rotation.x) * k;
    const s = 1 - scroll * 0.12;
    g.scale.x += (s - g.scale.x) * k;
    g.scale.y = g.scale.z = g.scale.x;
  });
  return <group ref={ref}>{children}</group>;
}

function Scene({ simple, pointer }) {
  const glow = useGlowTexture();
  return (
    <Rig pointer={pointer}>
      <Core simple={simple} />
      <OrbitRing radius={2.05} tilt={[1.2, 0.2, 0]} speed={0.35} color={CYAN} nodes={3} glow={glow} />
      <OrbitRing radius={2.4} tilt={[1.75, -0.55, 0.3]} speed={-0.22} color={VIOLET} nodes={4} glow={glow} />
      {!simple && (
        <OrbitRing radius={2.75} tilt={[0.6, 0.9, -0.2]} speed={0.15} color={BLUE} nodes={2} glow={glow} />
      )}
      <Network count={simple ? 55 : 130} glow={glow} />
      {!simple && (
        <>
          <Floater position={[-3.1, 1.6, 0.6]} color={CYAN} speed={0.9} scale={0.32} geometry={<octahedronGeometry args={[1, 0]} />} />
          <Floater position={[3.2, -1.4, 0.4]} color={VIOLET} speed={0.7} scale={0.28} geometry={<torusKnotGeometry args={[0.8, 0.22, 64, 8]} />} />
          <Floater position={[2.7, 2.0, -0.8]} color={BLUE} speed={1.1} scale={0.26} geometry={<boxGeometry args={[1, 1, 1]} />} />
          <Floater position={[-2.6, -2.0, -0.4]} color={CYAN} speed={0.8} scale={0.24} geometry={<tetrahedronGeometry args={[1, 0]} />} />
        </>
      )}
    </Rig>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

export default function HeroScene({ simple = false, reduced = false, active = true, onReady }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 45 }}
      dpr={simple ? [1, 1.5] : [1, 2]}
      gl={{ antialias: !simple, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : active ? "always" : "never"}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <Scene simple={simple} pointer={pointer} />
    </Canvas>
  );
}
