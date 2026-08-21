import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const GOLD = '#C9A45C';
const GOLD_LIGHT = '#F2D9A0';
const DIAMOND_COLOR = '#EAF2FF';

interface RingPlacement {
  position: [number, number, number];
  rotation: [number, number, number];
  hasGem?: boolean;
}

const RINGS: RingPlacement[] = [
  { position: [-0.42, 0.06, 0.14], rotation: [THREE.MathUtils.degToRad(-58), THREE.MathUtils.degToRad(18), 0] },
  {
    position: [0.42, -0.06, -0.14],
    rotation: [THREE.MathUtils.degToRad(-58), THREE.MathUtils.degToRad(-18), 0],
    hasGem: true,
  },
];

const RING_RADIUS = 0.62;
const RING_TUBE = 0.095;

/** A small brilliant-cut-style stone in a gold prong setting, perched on
 * top of the band — the one deliberately subtle sparkle accent. */
function Diamond() {
  const gemGeometry = useMemo(() => new THREE.OctahedronGeometry(0.1, 0), []);
  const settingGeometry = useMemo(() => new THREE.SphereGeometry(0.08, 16, 16), []);

  return (
    <group position={[0, RING_RADIUS + RING_TUBE - 0.02, 0]}>
      <mesh geometry={settingGeometry} scale={[1, 0.55, 1]} position={[0, -0.03, 0]}>
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh geometry={gemGeometry} position={[0, 0.06, 0]} rotation={[0.15, 0.4, 0]} scale={[1, 1.3, 1]}>
        <meshPhysicalMaterial
          color={DIAMOND_COLOR}
          metalness={0}
          roughness={0.03}
          transmission={0.6}
          thickness={0.15}
          ior={2.42}
          clearcoat={1}
          clearcoatRoughness={0}
          emissive={DIAMOND_COLOR}
          emissiveIntensity={0.12}
        />
      </mesh>
    </group>
  );
}

function Ring({ position, rotation, hasGem }: RingPlacement) {
  const geometry = useMemo(() => new THREE.TorusGeometry(RING_RADIUS, RING_TUBE, 24, 96), []);

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={geometry} castShadow>
        <meshPhysicalMaterial
          color={GOLD}
          emissive={GOLD}
          emissiveIntensity={0.22}
          metalness={0.95}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {hasGem && <Diamond />}
    </group>
  );
}

function RotatingRings() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const canTilt = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    // Same lively base spin + breathing pulse as the original monogram, so
    // the hero's motion language stays identical after the swap.
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
      {RINGS.map((ring, i) => (
        <Ring key={i} {...ring} />
      ))}
    </group>
  );
}

/** The optional lightweight 3D gold wedding rings. Lazy-loaded and only ever
 * mounted once WebGL support + reduced-motion have been checked by
 * <WeddingRings3D> — this file is pure Three.js/R3F, code-split into its own
 * chunk (see vite.config.ts) so it never delays the initial page render. */
export default function WeddingRingsScene() {
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
      <pointLight position={[1, 1.5, 2]} intensity={0.6} color="#FFFFFF" />
      <RotatingRings />
    </Canvas>
  );
}
