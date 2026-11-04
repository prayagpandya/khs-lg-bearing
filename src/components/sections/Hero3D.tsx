import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useEnvironment';
import { useLoader } from '../../context/LoaderContext';

/**
 * Hero section with background video showcasing KHS-LG precision products.
 *
 * Responsiveness & Layout Architecture:
 * - Video is dead-center (object-cover object-center) on all viewports.
 * - On narrower/mobile screens, video crops symmetrically from both left and right ends,
 *   keeping the centered product in full focus.
 * - On mobile: content is vertically distributed (headline at top, action buttons & stats
 *   at bottom), leaving the middle ~35-45vh completely open and clear for the centered product.
 * - On desktop: content is docked to the left (max-w-[420px] to max-w-[460px]), leaving
 *   the center and right completely unobstructed for the product.
 * - Buttons and text have dedicated high-contrast styles that remain crisp in both themes.
 */
export function Hero3D() {
  const reduced = useReducedMotion();
  const { phase } = useLoader();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Reliable autoplay handling across all mobile and desktop browsers
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      }
    }
  }, [isMuted]);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const isReady = phase === 'done' || phase === 'completing';

  return (
    <section
      aria-label="KHS-LG precision bearings"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#05070B] flex flex-col justify-between"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          poster="/assets/videos/hero-poster.jpg"
          className="h-full w-full object-cover object-center transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 1 : 0.92 }}
        >
          <source src="/assets/videos/homepage-hero.mp4" type="video/mp4" />
        </video>

        {/* Desktop-only Left Scrim: Only covers the left text area, keeping center product 100% bright */}
        <div
          className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-[42%] xl:w-[38%] bg-gradient-to-r from-[#05070B]/95 via-[#05070B]/50 to-transparent z-[1]"
          aria-hidden
        />

        {/* Top subtle vignette under navbar (masks video top watermark & blends navbar) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-[#05070B]/90 via-[#05070B]/50 to-transparent z-[1]"
          aria-hidden
        />

        {/* Bottom smooth fade into next section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#05070B] via-[#05070B]/60 to-transparent z-[1]"
          aria-hidden
        />

        {/* Subtle grid accent */}
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-10 z-[1]" aria-hidden />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-[2] mx-auto flex h-full min-h-[100svh] w-full max-w-[1600px] flex-col justify-between px-5 pt-20 pb-8 sm:px-8 sm:pt-24 sm:pb-10 lg:flex-row lg:items-center lg:justify-start lg:pt-28 lg:pb-16">
        
        {/* Left Column / Mobile Top+Bottom Content */}
        <div className="flex flex-col justify-between h-full min-h-[calc(100svh-7rem)] sm:min-h-[calc(100svh-8.5rem)] lg:min-h-0 lg:justify-center w-full max-w-full lg:max-w-[440px] xl:max-w-[480px]">
          
          {/* SECTION A: Headline & Badge (Top on mobile, top of block on desktop) */}
          <div className="pt-2 sm:pt-4 lg:pt-0">
            {/* ISO Certification Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : 0.1 }}
              className="hero-badge inline-flex items-center gap-2 rounded-full border border-signal/40 bg-ink-950/85 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(245,196,0,0.2)]"
            >
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse shadow-[0_0_8px_#F5C400]" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-tech text-white font-semibold">
                ISO 9001:2015 <span className="text-signal mx-1">•</span> 50+ YEARS EXPERIENCE
              </span>
            </motion.div>

            {/* Display Headline - Compact width on desktop so it never overlaps the center product */}
            <h1 className="mt-3 sm:mt-4 font-display text-[clamp(2.5rem,7vw,4.8rem)] font-bold uppercase leading-[0.88] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={isReady ? { y: '0%' } : { y: '105%' }}
                  transition={{ duration: 0.8, delay: reduced ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="block"
                >
                  Precision
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={isReady ? { y: '0%' } : { y: '105%' }}
                  transition={{ duration: 0.8, delay: reduced ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="block text-gradient-gold drop-shadow-[0_4px_35px_rgba(245,196,0,0.5)]"
                >
                  In Motion
                </motion.span>
              </span>
            </h1>

            {/* Desktop Description Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : 0.4 }}
              className="mt-4 hidden lg:block text-sm sm:text-base leading-relaxed text-slate-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
            >
              Bearings, linear motion and power transmission solutions for OEMs, machine manufacturers, maintenance teams and industrial applications worldwide.
            </motion.p>
          </div>

          {/* SECTION B: OPEN WINDOW ON MOBILE (The product in the video is in center here!) */}
          <div className="flex-1 min-h-[28vh] sm:min-h-[35vh] lg:hidden" aria-hidden />

          {/* SECTION C: Action Buttons & Stats (Bottom on mobile, bottom of block on desktop) */}
          <div className="mt-auto lg:mt-6">
            {/* Mobile-only compact description with background scrim */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isReady ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block lg:hidden text-xs sm:text-sm text-slate-200 mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] max-w-sm"
            >
              Precision bearings & linear motion solutions engineered for reliable industrial performance.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : 0.45 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              {/* Explore Products Button - explicitly styled so it is ALWAYS high contrast */}
              <a
                href="#products"
                className="hero-btn-explore inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/60 bg-[#0B0F17]/85 px-5 py-3 sm:px-6 sm:py-3.5 font-display text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-signal hover:bg-black hover:text-signal hover:shadow-[0_0_20px_rgba(245,196,0,0.5)] active:scale-[0.98]"
              >
                Explore Products
              </a>

              {/* Request Quote Button */}
              <a
                href="/contact"
                className="hero-btn-quote inline-flex items-center justify-center gap-2 rounded-md border-2 border-signal bg-signal px-5 py-3 sm:px-6 sm:py-3.5 font-display text-xs font-bold uppercase tracking-widest text-ink-950 shadow-[0_0_20px_rgba(245,196,0,0.4)] transition-all duration-300 hover:bg-ink-950 hover:text-signal hover:shadow-[0_0_25px_rgba(245,196,0,0.7)] active:scale-[0.98]"
              >
                Request Quote
              </a>
            </motion.div>

            {/* Micro Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.6, delay: reduced ? 0 : 0.55 }}
              className="hero-stats-border mt-5 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/15 pt-4 max-w-sm sm:max-w-md"
            >
              <div>
                <div className="font-display text-lg sm:text-2xl font-bold text-signal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">13,500+</div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-tech text-slate-300">SKUs Stocked</div>
              </div>
              <div>
                <div className="font-display text-lg sm:text-2xl font-bold text-signal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">25+</div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-tech text-slate-300">Countries</div>
              </div>
              <div>
                <div className="font-display text-lg sm:text-2xl font-bold text-signal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">50+</div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-tech text-slate-300">Years Legacy</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Empty Right Column (>60% of viewport is clear for the centered/right product!) */}
        <div className="hidden lg:flex flex-1 items-center justify-center pointer-events-none" aria-hidden />
      </div>

      {/* Floating Bottom Bar: Showcase Tag, Scroll Cue & Sound Toggle */}
      <div className="pointer-events-none absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-8 z-[3] flex items-center justify-between">
        {/* Left: Product in Action Tag */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 rounded-full border border-signal/30 bg-ink-950/80 px-3.5 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-tech text-slate-200 font-semibold">
            KHS-LG Precision Series
          </span>
        </div>

        {/* Center: Scroll cue */}
        <a
          href="#company-motion"
          className="pointer-events-auto hidden sm:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-slate-300 transition-colors hover:text-signal drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
        >
          Scroll to explore
          <ArrowDownIcon className="h-3.5 w-3.5 animate-bounce text-signal" aria-hidden />
        </a>

        {/* Right: Sound Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          className="pointer-events-auto ml-auto flex items-center gap-2 rounded-full border border-white/20 bg-ink-950/85 px-3 py-1.5 backdrop-blur-md transition-all hover:border-signal hover:bg-ink-900 shadow-md"
          aria-label={isMuted ? 'Turn video sound on' : 'Mute video sound'}
        >
          {isMuted ? (
            <VolumeXIcon className="h-3.5 w-3.5 text-slate-300" />
          ) : (
            <Volume2Icon className="h-3.5 w-3.5 text-signal animate-pulse" />
          )}
          <span className="font-mono text-[10px] uppercase tracking-tech text-slate-200">
            {isMuted ? 'Sound Off' : 'Sound On'}
          </span>
        </button>
      </div>
    </section>
  );
}
