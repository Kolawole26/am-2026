import { lazy, Suspense, useEffect, useState } from 'react';
import { WeddingRings } from '@/components/common/WeddingRings';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const WeddingRingsScene = lazy(() => import('./WeddingRingsScene'));

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface WeddingRings3DProps {
  size?: number;
  /** Responsive Tailwind sizing (e.g. a clamp() width/height + aspect-square).
   * When provided, this drives the box size instead of the fixed `size` px
   * value — use it for hero-scale placements that should grow with the
   * viewport rather than stay pinned to one pixel size. */
  className?: string;
}

/**
 * Progressive-enhancement wrapper: renders the static 2D rings immediately
 * (no layout shift, nothing to wait for), then swaps in the lazy-loaded 3D
 * scene once we've confirmed WebGL is available and the visitor hasn't asked
 * for reduced motion. Any failure — no WebGL, a low-power device, a runtime
 * error in the 3D scene — falls back to the static mark instead of breaking
 * the page.
 */
export function WeddingRings3D({ size = 220, className }: WeddingRings3DProps) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) return;
    // Defer the WebGL probe slightly so it never competes with
    // above-the-fold rendering work.
    const check = () => setReady(detectWebGL());
    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(check);
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(check, 300);
    return () => window.clearTimeout(timeoutId);
  }, [reduced]);

  const boxStyle = className ? undefined : { width: size, height: size };
  const boxClassName = className ?? '';

  const fallback = (
    <div style={boxStyle} className={`flex items-center justify-center ${boxClassName}`}>
      <WeddingRings size={className ? size * 0.75 : size * 0.6} tone="gold" />
    </div>
  );

  if (reduced || !ready) return fallback;

  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <div style={boxStyle} className={boxClassName}>
          <WeddingRingsScene />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
