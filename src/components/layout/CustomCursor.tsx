import { useEffect, useRef, useState } from 'react';
import { useIsTouch, useReducedMotion } from '../../hooks/useEnvironment';
import { cn } from '../../utils/cn';

type CursorMode = 'default' | 'ring' | 'drag' | 'open';

const LABEL: Record<CursorMode, string> = {
  default: '',
  ring: '',
  drag: 'DRAG',
  open: 'OPEN'
};

/** Desktop-only precision cursor. Disabled on touch devices. */
export function CustomCursor() {
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const modeRef = useRef<CursorMode>('default');
  const visibleRef = useRef(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [wideEnough, setWideEnough] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setWideEnough(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setWideEnough(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const enabled = !touch && !reduced && wideEnough;

  useEffect(() => {
    if (!enabled) return;
    modeRef.current = 'default';
    visibleRef.current = false;
    setMode('default');
    setVisible(false);
    setIsClicking(false);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    const originalCursor = document.documentElement.style.cursor;
    let cursorHidden = false;
    let raf = 0;

    function renderRing() {
      const dx = pos.x - ringPos.x;
      const dy = pos.y - ringPos.y;
      const settled = Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15;
      if (settled) {
        ringPos.x = pos.x;
        ringPos.y = pos.y;
      } else {
        // Snappy lerp (0.55) so the ring follows the hand tightly with zero sluggishness
        ringPos.x += dx * 0.55;
        ringPos.y += dy * 0.55;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      }
      raf = settled ? 0 : requestAnimationFrame(renderRing);
    }

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      if (!cursorHidden) {
        cursorHidden = true;
        document.documentElement.style.cursor = 'none';
      }

      // Synchronous, zero-latency 1:1 hardware mouse tracking for the center dot
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const target = e.target instanceof Element ? e.target : null;
      const hit = target?.closest('[data-cursor]') as HTMLElement | null;
      const attr = hit?.dataset.cursor as CursorMode | undefined;
      const nextMode: CursorMode =
        attr ?? (target?.closest('a,button,input,textarea,select,[role="button"]') ? 'ring' : 'default');

      if (nextMode !== modeRef.current) {
        modeRef.current = nextMode;
        setMode(nextMode);
      }

      if (!raf) raf = requestAnimationFrame(renderRing);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const hide = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      setVisible(false);
      setIsClicking(false);
      if (cursorHidden) {
        cursorHidden = false;
        document.documentElement.style.cursor = originalCursor;
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointerout', onPointerOut);
    window.addEventListener('blur', hide);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', hide);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = originalCursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  const expanded = mode !== 'default';
  const label = LABEL[mode];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-cursor overflow-hidden">
      {/* Precision Center Dot - Zero CSS latency, tracks mouse 1:1 instantaneously */}
      <div
        ref={dot}
        className="pointer-events-none absolute left-0 top-0 will-change-transform"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 120ms linear'
        }}
      >
        <div
          className={cn(
            'custom-cursor-dot -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full flex items-center justify-center transition-transform duration-120 ease-out',
            expanded ? 'scale-75' : isClicking ? 'scale-90' : 'scale-100'
          )}
        >
          <span className="h-1 w-1 rounded-full bg-white opacity-90" />
        </div>
      </div>

      {/* Responsive Follower Ring - Smooth fluid catch-up without lagging */}
      <div
        ref={ring}
        className="pointer-events-none absolute left-0 top-0 will-change-transform"
        style={{
          opacity: visible ? (expanded ? 1 : 0.75) : 0,
          transition: 'opacity 150ms linear'
        }}
      >
        <div
          className={cn(
            'custom-cursor-ring flex items-center justify-center rounded-full font-mono text-[9px] font-bold uppercase tracking-tech',
            expanded ? 'cursor-ring-expanded' : 'cursor-ring-default',
            isClicking && 'scale-95'
          )}
          style={{
            width: expanded ? (label ? 64 : 40) : 28,
            height: expanded ? (label ? 64 : 40) : 28,
            marginLeft: expanded ? (label ? -32 : -20) : -14,
            marginTop: expanded ? (label ? -32 : -20) : -14,
            transition:
              'width 180ms cubic-bezier(0.23, 1, 0.32, 1), height 180ms cubic-bezier(0.23, 1, 0.32, 1), margin 180ms cubic-bezier(0.23, 1, 0.32, 1), background-color 180ms ease, border-color 180ms ease, transform 120ms ease'
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
