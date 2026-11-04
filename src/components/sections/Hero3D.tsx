import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { useReducedMotion } from '../../hooks/useEnvironment';
import { useLoader } from '../../context/LoaderContext';

/**
 * Hero section with background video showcasing KHS-LG precision products.
 * Text is arranged on the left side with a smooth directional gradient scrim
 * so the product in the video (rotating bearings and linear motion guides)
 * is fully visible, prominent, and unobstructed.
 */
export function Hero3D() {
  const reduced = useReducedMotion();
  const { phase } = useLoader();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Ensure autoplay works reliably across mobile & desktop browsers
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser blocked unmuted autoplay
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
      className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden bg-[#05070B] flex items-center"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          poster="/assets/videos/hero-poster.jpg"
          className="h-full w-full object-cover object-[center_right] sm:object-center transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 1 : 0.9 }}
        >
          <source src="/assets/videos/homepage-hero.mp4" type="video/mp4" />
        </video>

        {/* Directional scrim: darker on the left for text legibility, clear on the right so product shines */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05070B]/95 via-[#05070B]/75 via-40% to-transparent sm:via-[#05070B]/55 lg:via-[#05070B]/25 z-[1]"
          aria-hidden
        />

        {/* Bottom smooth fade into MotionSection */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05070B] via-[#05070B]/60 to-transparent z-[1]"
          aria-hidden
        />

        {/* Top subtle vignette under navbar */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#05070B]/80 to-transparent z-[1]"
          aria-hidden
        />

        {/* Technical Grid overlay at subtle opacity */}
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-15 z-[1]" aria-hidden />
      </div>

      {/* Hero Content (Positioned Left to Keep Product in Video Fully Visible) */}
      <div className="relative z-[2] mx-auto flex h-full min-h-[92vh] sm:min-h-screen w-full max-w-[1600px] flex-col justify-center px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:pt-36">
        <div className="max-w-2xl lg:max-w-[560px] xl:max-w-[640px]">
          {/* ISO Certification Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.1 }}
            className="hero-badge inline-flex items-center gap-2.5 rounded-full border border-signal/40 bg-ink-900/90 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(245,196,0,0.18)]"
          >
            <span className="h-2 w-2 rounded-full bg-signal animate-pulse shadow-[0_0_8px_#F5C400]" />
            <span className="font-mono text-xs sm:text-[13px] uppercase tracking-tech text-steel-200 font-semibold">
              ISO 9001:2015 <span className="text-signal mx-1.5">•</span> 50+ YEARS OF INDUSTRIAL EXPERIENCE
            </span>
          </motion.div>

          {/* Display Headline */}
          <h1 className="mt-5 font-display text-[clamp(2.85rem,7.5vw,6.5rem)] font-bold uppercase leading-[0.88] text-steel-50">
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
                className="block text-gradient-gold drop-shadow-[0_4px_35px_rgba(245,196,0,0.45)]"
              >
                In Motion
              </motion.span>
            </span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: reduced ? 0 : 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg"
          >
            Bearings, linear motion and power transmission solutions for OEMs, machine manufacturers, maintenance teams and industrial applications worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              as="a"
              href="#products"
              variant="ghost"
              className="btn-magnetic border border-steel-700 bg-ink-900/80 px-6 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-steel-50 backdrop-blur hover:border-signal"
            >
              Explore Products
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/contact"
              variant="primary"
              className="btn-magnetic border border-signal bg-signal px-6 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-ink-950 shadow-[0_0_20px_rgba(245,196,0,0.35)] transition-all duration-300 hover:bg-ink-950 hover:text-signal hover:shadow-[0_0_25px_rgba(245,196,0,0.6)]"
            >
              Request Quote
            </MagneticButton>
          </motion.div>

          {/* Micro Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.6 }}
            className="hero-stats-border mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 max-w-lg"
          >
            <div>
              <div className="font-display text-xl sm:text-2xl font-bold text-signal">13,500+</div>
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-tech text-steel-400">SKUs Stocked</div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl font-bold text-signal">25+</div>
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-tech text-steel-400">Countries</div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl font-bold text-signal">50+</div>
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-tech text-steel-400">Years Legacy</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Bottom Bar: Audio Toggle, Showcase indicator, Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 inset-x-5 sm:inset-x-8 z-[3] flex items-center justify-between">
        {/* Left: Product in Action Tag */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 rounded-full border border-signal/30 bg-ink-950/80 px-3.5 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-tech text-steel-300">
            KHS-LG Precision Series
          </span>
        </div>

        {/* Center: Scroll cue */}
        <a
          href="#company-motion"
          className="pointer-events-auto mx-auto sm:mx-0 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-tech text-steel-400 transition-colors hover:text-signal"
        >
          Scroll to explore
          <ArrowDownIcon className="h-3.5 w-3.5 animate-bounce text-signal" aria-hidden />
        </a>

        {/* Right: Sound Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/80 px-3 py-1.5 backdrop-blur-md transition-all hover:border-signal/50 hover:bg-ink-900"
          aria-label={isMuted ? 'Turn video sound on' : 'Mute video sound'}
        >
          {isMuted ? (
            <VolumeXIcon className="h-3.5 w-3.5 text-steel-400" />
          ) : (
            <Volume2Icon className="h-3.5 w-3.5 text-signal animate-pulse" />
          )}
          <span className="font-mono text-[10px] uppercase tracking-tech text-steel-300">
            {isMuted ? 'Sound Off' : 'Sound On'}
          </span>
        </button>
      </div>
    </section>
  );
}
