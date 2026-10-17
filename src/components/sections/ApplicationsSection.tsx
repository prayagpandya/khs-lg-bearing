import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRightIcon, CheckCircle2Icon, CogIcon, ShieldAlertIcon, WrenchIcon } from 'lucide-react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { BearingGlyph } from '../ui/BearingGlyph';
import { applicationSectors } from '../../data/applications';

/** Where motion matters — Comprehensive industrial applications extracted from khslg.com */
export function ApplicationsSection({ hideHeading = false }: { hideHeading?: boolean } = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sectorParam = searchParams.get('sector') || searchParams.get('tab') || location.hash.replace('#', '');
    if (sectorParam) {
      const foundIndex = applicationSectors.findIndex(
        (s) =>
          s.id.toLowerCase() === sectorParam.toLowerCase() ||
          s.code === sectorParam ||
          parseInt(s.code, 10) === parseInt(sectorParam, 10)
      );
      if (foundIndex !== -1) {
        setActive(foundIndex);
        // Smooth scroll to the sector tabs so user lands right at the selected content
        const timer = setTimeout(() => {
          const el = document.getElementById('sector-tabs');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams, location.hash]);

  const handleSelectTab = (index: number) => {
    setActive(index);
    const targetSector = applicationSectors[index];
    if (targetSector) {
      setSearchParams({ sector: targetSector.id }, { replace: true });
    }
  };

  const current = applicationSectors[active] ?? applicationSectors[0];

  return (
    <section
      id="sector-tabs"
      aria-label="Applications"
      className={`relative border-t border-ink-700 bg-ink-950 scroll-mt-24 ${hideHeading ? 'py-10 lg:py-16' : 'py-14 lg:py-20'}`}>
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        {!hideHeading && (
          <SectionHeading
            code="05 / Applications"
            eyebrow="Verified KHS-LG application areas"
            lines={['Where motion', 'Matters']}
          />
        )}

        {/* Sector Navigation & Content Grid */}
        <div className={`${hideHeading ? 'mt-4' : 'mt-12'} grid items-start gap-10 lg:grid-cols-[0.95fr_1.35fr] lg:gap-14`}>
          
          {/* Left Column: Sector Index (Sticky with NO scrollbar) */}
          <div className="lg:sticky lg:top-24 self-start border border-ink-800 bg-ink-900/80 p-4 sm:p-5 backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between border-b border-ink-800 pb-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-tech text-signal">
                Industry Sectors ({applicationSectors.length})
              </span>
              <span className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                khslg.com Verified
              </span>
            </div>

            <ul className="divide-y divide-ink-800" role="tablist" aria-label="Application sectors">
              {applicationSectors.map((sector, i) => {
                const isActive = active === i;
                return (
                  <li key={sector.id} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectTab(i)}
                      className={`group flex w-full items-center justify-between gap-4 px-3 py-3 text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-ink-800/80 text-signal pl-4'
                          : 'text-steel-300 hover:bg-ink-800/40 hover:text-steel-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`font-mono text-xs font-bold tracking-tech transition-colors ${
                            isActive ? 'text-signal' : 'text-steel-400 group-hover:text-steel-200'
                          }`}
                        >
                          {sector.code.replace(/^APP\s*\/\s*/i, '')}
                        </span>
                        <span className="font-display text-sm font-semibold uppercase tracking-wider truncate sm:text-base">
                          {sector.name}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-all ${
                            isActive ? 'bg-signal shadow-[0_0_8px_rgba(245,180,0,0.8)]' : 'bg-transparent'
                          }`}
                        />
                        <span
                          className={`h-px transition-all duration-300 ${
                            isActive ? 'w-6 bg-signal' : 'w-2 bg-ink-700 group-hover:w-4 group-hover:bg-steel-500'
                          }`}
                          aria-hidden
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Detailed Sector Profile */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-8"
              >
                {/* Sector Header Card */}
                <div className="border border-ink-800 bg-ink-900/90 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-tech text-signal">
                      {current.code.replace(/^APP\s*\/\s*/i, '')} &bull; Verified KHS-LG Industry Sector
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                      Standard ISO 9001:2015
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-bold uppercase leading-tight text-steel-50 sm:text-3xl lg:text-4xl">
                    {current.name}
                  </h2>
                  <p className="mt-2 font-display text-sm uppercase tracking-wide text-signal/90 sm:text-base">
                    {current.tagline}
                  </p>

                  <p className="mt-5 text-sm leading-relaxed text-steel-300 sm:text-base">
                    {current.overview}
                  </p>

                  {/* Engineering Highlight */}
                  <div className="mt-6 border-l-2 border-signal bg-ink-950/60 p-4 font-mono text-xs uppercase tracking-wide text-steel-300">
                    <span className="font-bold text-signal">Engineering note: </span>
                    {current.highlight}
                  </div>
                </div>

                {/* Equipment CAD Blueprint Drawing Card */}
                {current.equipmentImage && (
                  <div className="border border-ink-800 bg-ink-900/90 p-5 sm:p-7">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-ink-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_rgba(245,196,0,0.8)]" />
                        <h3 className="font-mono text-xs font-bold uppercase tracking-tech text-steel-200">
                          {current.code.replace(/^APP\s*\/\s*/i, '')} / Equipment CAD Blueprint Schematic
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-tech text-steel-400">
                        Technical Line Illustration &bull; KHS-LG Motion Guidance
                      </span>
                    </div>

                    <div className="group relative flex min-h-[220px] sm:min-h-[280px] md:min-h-[320px] items-center justify-center overflow-hidden rounded border border-ink-800 bg-white/95 p-4 sm:p-6 transition-colors dark:bg-[#0c1017]">
                      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
                      <img
                        src={current.equipmentImage}
                        alt={current.equipmentTitle ?? `${current.name} Equipment Schematic`}
                        className="relative z-10 max-h-[300px] w-auto max-w-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      {current.equipmentTitle && (
                        <div className="absolute bottom-2.5 right-3.5 z-20 rounded bg-ink-950/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-tech text-steel-400 backdrop-blur-sm border border-ink-800/80">
                          {current.equipmentTitle}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Machinery & Equipment List */}
                <div className="border border-ink-800 bg-ink-900/80 p-6 sm:p-8">
                  <div className="flex items-center gap-2.5">
                    <CogIcon className="h-4 w-4 text-signal" aria-hidden />
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-tech text-steel-200">
                      Typical Machinery & Sub-Assemblies
                    </h3>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {current.machinery.map((machine) => (
                      <div
                        key={machine}
                        className="flex items-start gap-2.5 border border-ink-800 bg-ink-950/70 p-3 text-xs text-steel-300 sm:text-sm"
                      >
                        <CheckCircle2Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" aria-hidden />
                        <span>{machine}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operating Demands */}
                <div className="border border-ink-800 bg-ink-900/80 p-6 sm:p-8">
                  <div className="flex items-center gap-2.5">
                    <ShieldAlertIcon className="h-4 w-4 text-signal" aria-hidden />
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-tech text-steel-200">
                      Operating Demands & Environmental Challenges
                    </h3>
                  </div>

                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {current.operatingConditions.map((cond) => (
                      <li
                        key={cond}
                        className="flex items-start gap-2 border-l border-ink-700 pl-3 text-xs leading-relaxed text-steel-400"
                      >
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended KHS-LG Bearings */}
                <div className="border border-ink-800 bg-ink-900/80 p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <WrenchIcon className="h-4 w-4 text-signal" aria-hidden />
                      <h3 className="font-mono text-[11px] font-bold uppercase tracking-tech text-steel-200">
                        Recommended KHS-LG Bearings & Components
                      </h3>
                    </div>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-tech text-signal hover:underline"
                    >
                      View all products <ArrowUpRightIcon className="h-3 w-3" aria-hidden />
                    </Link>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {current.bearings.map((b) => (
                      <Link
                        key={b.slug}
                        to={`/products?product=${b.slug}`}
                        className="group flex items-center justify-between border border-ink-700 bg-ink-950 p-4 transition-all duration-200 hover:border-signal hover:bg-ink-800"
                      >
                        <span className="font-display text-sm font-semibold uppercase text-steel-100 group-hover:text-signal">
                          {b.name}
                        </span>
                        <ArrowUpRightIcon
                          className="h-4 w-4 text-steel-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                          aria-hidden
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Request Technical Assistance */}
                <div className="flex flex-col items-center justify-between gap-5 border border-signal/40 bg-ink-950 p-6 sm:flex-row sm:p-7">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-tech text-signal">
                      KHS-LG Application Engineering Support
                    </p>
                    <p className="mt-1 text-sm text-steel-300">
                      Need custom load calculations or shaft tolerance matching for {current.name}?
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex shrink-0 items-center gap-2 bg-signal px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.14em] text-ink-950 transition-all hover:bg-signal-bright shadow-[0_4px_14px_rgba(245,180,0,0.3)]"
                  >
                    Consult an Engineer
                    <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}