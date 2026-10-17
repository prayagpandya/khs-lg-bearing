import { useEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon } from 'lucide-react';
import { BearingScene } from '../3d/BearingScene';
import { MagneticButton } from '../ui/MagneticButton';
import { company } from '../../data/company';
import { useIsTouch, useReducedMotion } from '../../hooks/useEnvironment';
import { useLoader } from '../../context/LoaderContext';

interface PartItem {
  code: string;
  name: string;
  y: number; // percentage from top
  targetX: number; // percentage from left where product dot sits on the 3D part
}

const PART_ITEMS: PartItem[] = [
  {
    code: 'C-01',
    name: 'Outer Ring',
    y: 19,
    targetX: 45.0
  },
  {
    code: 'C-02',
    name: 'Outer Raceway',
    y: 29,
    targetX: 47.8
  },
  {
    code: 'C-03',
    name: 'Rolling Elements',
    y: 39,
    targetX: 49.5
  },
  {
    code: 'C-04',
    name: 'Cage',
    y: 49,
    targetX: 51.0
  },
  {
    code: 'C-05',
    name: 'Inner Raceway',
    y: 59,
    targetX: 55.6
  },
  {
    code: 'C-06',
    name: 'Inner Ring',
    y: 69,
    targetX: 63.5
  }
];

/**
 * Hero + scroll-driven bearing exploration.
 * Clean technical list with no background color and direct connecting leader lines to product dots.
 * No mouse drag interaction.
 */
export function Hero3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const { phase } = useLoader();

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start start', 'end end']
  });

  const explode = useTransform(scrollYProgress, [0.22, 0.55, 0.82, 0.95], [0, 1, 1, 0]);
  const rings = useTransform(scrollYProgress, [0.3, 0.46, 0.9, 1], [0, 1, 1, 0]);
  const spin = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.62, 1.1]);
  const cameraZ = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [4.9, 3.5, 3.9, 5.4]);
  const cameraY = useTransform(scrollYProgress, [0, 0.6, 1], [1.1, 0.5, 1.3]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.16], [0, -40]);

  // Seamless intro transition: 0 = centered behind loading logo, 1 = hero position on right
  const introProgress = useMotionValue(phase === 'done' ? 1 : 0);

  useEffect(() => {
    if (phase === 'completing') {
      const controls = animate(introProgress, 1, {
        duration: reduced ? 0 : 1.35,
        ease: [0.16, 1, 0.3, 1]
      });
      return () => controls.stop();
    } else if (phase === 'done') {
      introProgress.set(1);
    }
  }, [phase, introProgress, reduced]);

  const targetModelX = touch ? 0.45 : 1.1;

  const dynamicModelX = useTransform(introProgress, (t) => {
    if (t >= 1) return targetModelX;
    return targetModelX * t;
  });

  const dynamicScale = useTransform(introProgress, (t) => {
    if (t >= 1) return 1;
    return 1.25 + (1 - 1.25) * t;
  });

  const dynamicCameraY = useTransform([introProgress, cameraY], ([t, cy]) => {
    const targetY = typeof cy === 'number' ? cy : 1.1;
    if (t >= 1) return targetY;
    return 0 + (targetY - 0) * t;
  });

  const dynamicCameraZ = useTransform([introProgress, cameraZ], ([t, cz]) => {
    const targetZ = typeof cz === 'number' ? cz : 4.9;
    if (t >= 1) return targetZ;
    return 4.6 + (targetZ - 4.6) * t;
  });

  // Entrance animation for hero copy once loading completes
  const copyEntranceOpacity = useTransform(introProgress, [0.15, 0.7], [0, 1]);
  const copyEntranceY = useTransform(introProgress, [0.15, 0.8], [30, 0]);

  return (
    <section
      ref={wrap}
      aria-label="KHS-LG precision bearings"
      className="relative h-[220vh] w-full bg-ink-950">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="industrial-grid absolute inset-0 opacity-40" aria-hidden />
        <BearingScene
          className="absolute inset-0"
          explode={explode}
          rings={rings}
          spin={spin}
          cameraZ={dynamicCameraZ}
          cameraY={dynamicCameraY}
          scale={dynamicScale}
          modelX={dynamicModelX}
          /* Centered straight-on framing for loading screen */
          initialCamera={[0, 0, 4.6]} />
        
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
            'radial-gradient(circle at 65% 50%, rgba(245,196,0,0.04) 0%, rgba(5,6,8,0) 50%, rgba(6,8,12,0.40) 100%)'
          }} />

        {/* Hero copy */}
        <motion.div
          style={{
            opacity: reduced ? 1 : useTransform([heroOpacity, copyEntranceOpacity], ([ho, eo]) => (ho as number) * (eo as number)),
            y: reduced ? 0 : useTransform([heroY, copyEntranceY], ([hy, ey]) => (hy as number) + (ey as number))
          }}
          className="pointer-events-none absolute inset-0 z-[3] flex flex-col justify-end pb-10 sm:pb-14">
          
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
            <div className="pointer-events-auto max-w-3xl">
              <div className="inline-flex items-center gap-3 border border-signal/40 bg-ink-900/90 px-4 py-2 backdrop-blur-md shadow-[0_0_18px_rgba(245,196,0,0.16)]">
                <span className="h-2 w-2 rounded-full bg-signal animate-pulse shadow-[0_0_8px_#F5C400]" />
                <span className="font-mono text-xs sm:text-[13px] uppercase tracking-tech text-steel-200 font-semibold">
                  ISO 9001:2015 <span className="text-signal mx-1.5">•</span> 50+ YEARS OF INDUSTRIAL EXPERIENCE
                </span>
              </div>
              <h1 className="mt-5 font-display text-[clamp(3.4rem,11vw,9rem)] font-bold uppercase leading-[0.84] text-steel-50">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className="block">
                    Precision
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="block text-gradient-gold drop-shadow-[0_4px_35px_rgba(245,196,0,0.4)]">
                    In Motion
                  </motion.span>
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg">
                Bearings, linear motion and power transmission solutions for OEMs, machine manufacturers, maintenance teams and industrial applications worldwide.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton
                  as="a"
                  href="#products"
                  variant="ghost"
                  className="btn-magnetic border border-steel-700 bg-ink-900/80 px-6 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-steel-50 backdrop-blur hover:border-signal">
                  Explore Products
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="/contact"
                  variant="primary"
                  className="btn-magnetic border border-signal bg-signal px-6 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-ink-950 shadow-[0_0_20px_rgba(245,196,0,0.35)] transition-all duration-300 hover:bg-ink-950 hover:text-signal hover:shadow-[0_0_25px_rgba(245,196,0,0.6)]">
                  Request Quote
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Technical Parts List with No Background Color & Direct Connecting Leader Lines */}
        <ExplodedPartsOverlay progress={scrollYProgress} />

        <div className="pointer-events-none absolute bottom-6 right-5 z-[3] hidden items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-steel-500 sm:flex sm:right-8">
          Scroll to explore
          <ArrowDownIcon className="h-3.5 w-3.5 animate-bounce text-signal" aria-hidden />
        </div>
      </div>
    </section>
  );
}

/**
 * Blueprint Exploded Parts Overlay:
 * - Part names listed in a clean technical list with NO background color
 * - Horizontal leader line starts immediately after the text with zero gap
 * - Connects directly to the pulsing product dot on that exact 3D component
 */
function ExplodedPartsOverlay({
  progress
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const overlayOpacity = useTransform(progress, [0.22, 0.30, 0.86, 0.94], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ opacity: overlayOpacity }}
      className="pointer-events-none absolute inset-0 z-[3] hidden md:block">
      {PART_ITEMS.map((item) => (
        <div
          key={item.code}
          style={{
            top: `${item.y}%`,
            left: '4%',
            width: `${item.targetX - 4}%`,
            transform: 'translateY(-50%)'
          }}
          className="absolute flex items-center justify-between pointer-events-none">
          {/* Label with NO background color, single-line typography */}
          <div className="flex items-center gap-2.5 whitespace-nowrap bg-transparent pr-3.5 flex-shrink-0">
            <span className="font-mono text-xs font-bold tracking-tech text-signal">
              {item.code}
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="font-display text-sm lg:text-base font-bold uppercase tracking-[0.14em] text-steel-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {item.name}
            </span>
          </div>

          {/* Leader line starting immediately after text with zero gap */}
          <div className="flex-1 h-px border-t border-dashed border-signal/85" />

          {/* Product Dot located directly on the 3D component */}
          <div className="relative flex items-center justify-center flex-shrink-0 ml-1.5">
            <span className="absolute h-4 w-4 rounded-full border border-signal/60 animate-ping" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal shadow-[0_0_10px_#F5C400]" />
          </div>
        </div>
      ))}
    </motion.div>
  );
}