import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const GOLD = '#C9A45C';
const GOLD_LIGHT = '#F2D9A0';

// Same geometry as the 2D <Monogram>, remapped from the 0-100 SVG viewBox
// into a centred -1.3..1.3 3D space (x right, y up, z flat).
function toVec3(x: number, y: number): THREE.Vector3 {
  return new THREE.Vector3(((x - 50) / 50) * 1.3, (-(y - 50) / 50) * 1.3, 0);
}

const STROKES: THREE.Vector3[][] = [
  [toVec3(40, 24), toVec3(22, 76)],
  [toVec3(40, 24), toVec3(58, 76)],
  [toVec3(28.84, 56.24), toVec3(51.16, 56.24)],
  [toVec3(42, 76), toVec3(42, 26), toVec3(60, 50), toVec3(78, 26), toVec3(78, 76)],
];

function Stroke({ points }: { points: THREE.Vector3[] }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0);
    // Bold, chunky tube radius — reads clearly at a glance instead of
    // disappearing into a thin wire outline.
    return new THREE.TubeGeometry(curve, 64, 0.11, 16, false);
  }, [points]);

  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial
        color={GOLD}
        emissive={GOLD}
        emissiveIntensity={0.35}
        metalness={0.85}
        roughness={0.22}
      />
    </mesh>
  );
}

/** A soft ring "medallion" frame behind the letters — adds presence/scale
 * without adding visual clutter. */
function MedallionRing() {
  const geometry = useMemo(() => new THREE.TorusGeometry(1.68, 0.028, 16, 96), []);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={GOLD_LIGHT} metalness={0.6} roughness={0.35} transparent opacity={0.55} />
    </mesh>
  );
}

function RotatingMonogram() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const canTilt = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    // Faster, livelier base spin, plus a gentle breathing scale pulse so it
    // never feels static even when nobody's moving the mouse.
    group.current.rotation.y += delta * 0.55;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.035;
    group.current.scale.setScalar(pulse);

    if (canTilt) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * -0.3, 0.06);
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        group.current.rotation.y + pointer.x * 0.22,
        0.03,
      );
    }
  });

  return (
    <group ref={group}>
      <MedallionRing />
      {STROKES.map((points, i) => (
        <Stroke key={i} points={points} />
      ))}
    </group>
  );
}

/** The optional lightweight 3D A × M monogram. Lazy-loaded and only ever
 * mounted once WebGL support + reduced-motion have been checked by
 * <Monogram3D> — this file is pure Three.js/R3F, code-split into its own
 * chunk (see vite.config.ts) so it never delays the initial page render. */
export default function MonogramScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 3, 4]} intensity={1.6} />
      <pointLight position={[-3, -2, 2.5]} intensity={0.9} color={GOLD_LIGHT} />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#FFFDF8" />
      <RotatingMonogram />
    </Canvas>
  );
}
