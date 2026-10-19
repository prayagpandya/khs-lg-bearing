import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpRightIcon
} from 'lucide-react';

export interface MotionProduct {
  id: string;
  name: string;
  category: string;
  pillarId: '01' | '02' | '03';
  pillarName: string;
  code: string;
  headline: string;
  image: string;
  link: string;
}

export const MOTION_PRODUCTS: MotionProduct[] = [
  // Pillar 01: Bearings
  {
    id: 'pillow-blocks',
    name: 'Pillow Block Bearings',
    category: 'Bearing Units',
    pillarId: '01',
    pillarName: 'Bearings',
    code: 'PBB / UCP Series',
    headline: 'Mounted Units • Self-Aligning',
    image: '/assets/products/pillow-block-bearing.png',
    link: '/products?category=bearing-units-housings'
  },
  {
    id: 'spherical-roller',
    name: 'Spherical Roller Bearings',
    category: 'Roller Bearings',
    pillarId: '01',
    pillarName: 'Bearings',
    code: 'SRB 222 / 223 Series',
    headline: 'Heavy Radial • Shock Resistant',
    image: '/assets/products/spherical-roller-bearing.png',
    link: '/products?category=rolling-bearings'
  },
  {
    id: 'deep-groove',
    name: 'Deep Groove Ball Bearings',
    category: 'Ball Bearings',
    pillarId: '01',
    pillarName: 'Bearings',
    code: '6000 – 6300 Series',
    headline: 'High Velocity • Low Friction',
    image: '/assets/products/deep-groove-ball-bearing.png',
    link: '/products?category=rolling-bearings&sub=ball-bearings'
  },
  {
    id: 'taper-roller',
    name: 'Taper Roller Bearings',
    category: 'Roller Bearings',
    pillarId: '01',
    pillarName: 'Bearings',
    code: '30000 / 32000 Series',
    headline: 'Combined Radial & Axial Thrust',
    image: '/assets/products/taper-roller-bearing.png',
    link: '/products?category=rolling-bearings'
  },

  // Pillar 02: Linear Motion
  {
    id: 'linear-shafts',
    name: 'Linear Shafts & Rails',
    category: 'Linear Motion',
    pillarId: '02',
    pillarName: 'Linear Motion',
    code: 'SBR / TBR Series',
    headline: 'Hard Chrome • Induction H6',
    image: '/assets/products/linear-motion-shaft-with-support.png',
    link: '/products?category=linear-shafts'
  },
  {
    id: 'linear-bushings',
    name: 'Linear Motion Bushings',
    category: 'Linear Motion',
    pillarId: '02',
    pillarName: 'Linear Motion',
    code: 'LM / LME / LMK Series',
    headline: 'Axial Travel • Low Friction',
    image: '/assets/products/linear-motion-bearing.png',
    link: '/products?category=linear-motion'
  },
  {
    id: 'dual-shaft-guide',
    name: 'Dual Shaft Linear Guides',
    category: 'Linear Motion',
    pillarId: '02',
    pillarName: 'Linear Motion',
    code: 'SGR / OSGR Series',
    headline: 'High Rigidity • Smooth Glide',
    image: '/assets/products/dual-shaft-guide.png',
    link: '/products?category=linear-motion'
  },
  {
    id: 'shaft-support',
    name: 'Shaft End Support Units',
    category: 'Linear Motion',
    pillarId: '02',
    pillarName: 'Linear Motion',
    code: 'SK / SHF Series',
    headline: 'Precision Aluminum End Mounts',
    image: '/assets/products/shaft-support-unit.png',
    link: '/products?category=linear-shafts'
  },

  // Pillar 03: Power Transmission
  {
    id: 'v-belts',
    name: 'Power Transmission V-Belts',
    category: 'Power Transmission',
    pillarId: '03',
    pillarName: 'Power Trans.',
    code: 'Classical & Wedge Series',
    headline: 'High Torque • Heat & Oil Resistant',
    image: '/assets/products/v-belt.png',
    link: '/products?category=power-transmission'
  },
  {
    id: 'timing-belts',
    name: 'Industrial Timing Belts',
    category: 'Power Transmission',
    pillarId: '03',
    pillarName: 'Power Trans.',
    code: 'HTD / STD / RPP Series',
    headline: 'Synchronous Drives • Zero Slip',
    image: '/assets/products/timing-belt.png',
    link: '/products?category=power-transmission'
  },
  {
    id: 'clutches-bushes',
    name: 'One-Way Clutch Bearings',
    category: 'Power Transmission',
    pillarId: '03',
    pillarName: 'Power Trans.',
    code: 'CSK / CSK-PP Series',
    headline: 'Backstop & Overrunning Drives',
    image: '/assets/products/one-way-clutch-bearing.png',
    link: '/products?category=power-transmission'
  },
  {
    id: 'permaglide-bush',
    name: 'Dry Permaglide Bushes',
    category: 'Power Transmission',
    pillarId: '03',
    pillarName: 'Power Trans.',
    code: 'PAP Series (PTFE/Composite)',
    headline: 'Self-Lubricating • Maintenance-Free',
    image: '/assets/products/permaglide-dry-bush.png',
    link: '/products?category=power-transmission'
  }
];

const PILLARS = [
  { id: '01' as const, name: 'Bearings', startIndex: 0 },
  { id: '02' as const, name: 'Linear Motion', startIndex: 4 },
  { id: '03' as const, name: 'Power Trans.', startIndex: 8 }
];

const TOTAL_PRODUCTS = MOTION_PRODUCTS.length; // 12
const AUTOPLAY_INTERVAL = 2600; // ms per slide

export function ProductMotionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TOTAL_PRODUCTS);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TOTAL_PRODUCTS) % TOTAL_PRODUCTS);
  }, []);

  const goToPillar = useCallback((startIndex: number) => {
    setDirection(startIndex >= currentIndex ? 1 : -1);
    setCurrentIndex(startIndex);
  }, [currentIndex]);

  // Guaranteed continuous autoplay loop timer — moves automatically without freezing
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TOTAL_PRODUCTS);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const currentProduct = MOTION_PRODUCTS[currentIndex];
  const activePillarId = currentProduct.pillarId;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-ink-700 bg-ink-950 p-4 sm:p-5 shadow-2xl"
      role="region"
      aria-label="Comprehensive Motion Portfolio Single-Product Slider"
    >
      {/* Top Header & Navigation Arrows */}
      <div className="flex items-center justify-between border-b border-ink-800 pb-2.5">
        <div className="flex items-center gap-2">
          <LayersIcon className="h-4 w-4 text-signal shrink-0" aria-hidden />
          <span className="font-mono text-xs font-bold uppercase tracking-tech text-steel-200">
            Comprehensive Motion Portfolio
          </span>
        </div>

        {/* Left & Right Navigation Arrows */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous product"
            className="flex h-6 w-6 sm:h-6.5 sm:w-6.5 items-center justify-center rounded border border-ink-800 bg-ink-900 text-steel-400 hover:border-signal/50 hover:bg-ink-800 hover:text-signal transition-colors"
          >
            <ChevronLeftIcon className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next product"
            className="flex h-6 w-6 sm:h-6.5 sm:w-6.5 items-center justify-center rounded border border-ink-800 bg-ink-900 text-steel-400 hover:border-signal/50 hover:bg-ink-800 hover:text-signal transition-colors"
          >
            <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </div>

      {/* 3 Core Pillars Categories Bar */}
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {PILLARS.map((p) => {
          const isActive = activePillarId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => goToPillar(p.startIndex)}
              className={`rounded border py-1.5 px-1 text-center transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-signal bg-signal/15 shadow-[0_0_10px_rgba(245,196,0,0.2)]'
                  : 'border-ink-800 bg-ink-900/80 hover:border-ink-700 hover:bg-ink-900'
              }`}
            >
              <span
                className={`block font-mono text-[8.5px] uppercase tracking-tech font-bold transition-colors ${
                  isActive ? 'text-signal' : 'text-steel-500'
                }`}
              >
                {p.id}
              </span>
              <span
                className={`block font-display text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isActive ? 'text-steel-50' : 'text-steel-400'
                }`}
              >
                {p.name}
              </span>
            </button>
          );
        })}
      </div>



      {/* SINGLE PRODUCT HERO SLIDE (Big Image, Clean Minimal Content) */}
      <div className="relative mt-2.5 overflow-hidden rounded-lg border border-ink-800 bg-ink-900/70 p-3 sm:p-4 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* Slide Header: Pillar & Code Tag */}
            <div className="flex w-full items-center justify-between font-mono text-[8.5px] uppercase tracking-wider text-steel-400 pb-1.5 border-b border-ink-800/80">
              <span className="inline-flex items-center gap-1.5 font-bold text-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                Pillar {currentProduct.pillarId} • {currentProduct.pillarName}
              </span>
              <span className="text-steel-400 font-semibold">{currentProduct.code}</span>
            </div>

            {/* BIG HERO PRODUCT IMAGE */}
            <div className="relative my-2.5 sm:my-3.5 flex h-40 sm:h-48 md:h-52 w-full items-center justify-center">
              {/* Radial ambient glow behind product image */}
              <div
                className="pointer-events-none absolute h-32 sm:h-40 w-32 sm:w-40 rounded-full opacity-25 blur-2xl transition-colors duration-500"
                style={{
                  background:
                    currentProduct.pillarId === '01'
                      ? '#F5C400'
                      : currentProduct.pillarId === '02'
                      ? '#00F0FF'
                      : '#FB923C'
                }}
              />
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="relative max-h-full max-w-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Product Name & Subtitle - Clean, Bold, Minimal */}
            <div className="mt-1">
              <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-steel-50 leading-tight">
                {currentProduct.name}
              </h3>
              <p className="mt-0.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-signal font-semibold">
                {currentProduct.headline}
              </p>
            </div>

            {/* Bottom Meta & Explore Link */}
            <div className="mt-3 pt-2 w-full border-t border-ink-800/80 flex items-center justify-between">
              <span className="font-mono text-[9px] text-steel-500 uppercase tracking-tech">
                Item {String(currentIndex + 1).padStart(2, '0')} / {String(TOTAL_PRODUCTS).padStart(2, '0')}
              </span>
              <Link
                to={currentProduct.link}
                className="group/link inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-wider text-signal hover:text-signal-light transition-colors"
              >
                <span>Explore Specifications</span>
                <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dot Strip */}
      <div className="mt-2.5 flex items-center justify-between px-1">
        <div className="flex items-center gap-1 sm:gap-1.5">
          {MOTION_PRODUCTS.map((prod, i) => {
            const isCurrent = currentIndex === i;
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => {
                  setDirection(i >= currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                aria-label={`Go to product ${i + 1}: ${prod.name}`}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  isCurrent
                    ? 'w-5 bg-signal shadow-[0_0_8px_rgba(245,196,0,0.6)]'
                    : 'w-1.5 bg-ink-800 hover:bg-steel-600'
                }`}
              />
            );
          })}
        </div>

        <div className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
          <span className="font-bold text-signal">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span> / {String(TOTAL_PRODUCTS).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
