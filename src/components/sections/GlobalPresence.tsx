import React, { useState } from 'react';
import { Globe } from '../3d/Globe';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { markets } from '../../data/company';
import { useNearViewport } from '../../hooks/useNearViewport';

export function GlobalPresence({ code = '06 / Global' }: { code?: string }) {
  const [ref, near] = useNearViewport<HTMLDivElement>();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const exportMarkets = markets.filter((m) => m.country !== 'India');
  const isIndiaHovered = hoveredCountry?.toLowerCase() === 'india';

  return (
    <section
      ref={ref}
      aria-label="Global presence"
      className="relative border-t border-ink-700 bg-ink-900 py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background technical grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F5C400 1px, transparent 1px), linear-gradient(to bottom, #F5C400 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center xl:gap-12">
          {/* Left Column: Heading & Space-Efficient Country Chips (NO Scrollbar) */}
          <div className="lg:col-span-6 xl:col-span-6">
            <SectionHeading
              code={code}
              eyebrow="25+ EXPORT COUNTRIES"
              lines={['Motion Shipped', 'Worldwide.']}
              body="KHS-LG products are supplied across 25+ countries, supporting OEMs, distributors and industrial customers across Asia, Europe, Africa, the Middle East and the Americas."
            />

            <Reveal delay={0.12}>
              {/* Compact Origin Hub Pill & Export Counter */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-b border-ink-800 pb-2.5">
                <button
                  type="button"
                  onMouseEnter={() => setHoveredCountry('India')}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => setHoveredCountry('India')}
                  className={`flex items-center gap-2 rounded px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isIndiaHovered
                      ? 'bg-cyan-400 text-ink-950 shadow-[0_0_14px_rgba(0,240,255,0.6)] scale-[1.02]'
                      : 'border border-cyan-400/50 bg-cyan-950/40 text-cyan-400 hover:bg-cyan-900/50'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full rounded-full bg-cyan-400 animate-ping opacity-75" />
                    <span className="relative h-2 w-2 rounded-full bg-cyan-400" />
                  </span>
                  <span>★ Origin: Mumbai, India (Global Supply Hub)</span>
                </button>

                <span className="font-mono text-[10px] uppercase text-steel-500">
                  {exportMarkets.length} Export Destinations
                </span>
              </div>

              {/* Space-Efficient Country Chips (NO SCROLLBAR — fits all destinations cleanly) */}
              <div className="mt-3.5 flex flex-wrap gap-1.5 sm:gap-2">
                {exportMarkets.map((m) => {
                  const isHovered = hoveredCountry?.toLowerCase() === m.country.toLowerCase();
                  return (
                    <button
                      key={m.country}
                      type="button"
                      onMouseEnter={() => setHoveredCountry(m.country)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => setHoveredCountry(m.country)}
                      className={`group inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-all duration-150 ${
                        isHovered
                          ? 'border-signal bg-signal text-ink-950 font-bold shadow-[0_0_12px_rgba(245,196,0,0.5)] scale-105 z-10'
                          : 'border-ink-800/90 bg-ink-950/70 text-steel-400 hover:border-signal/50 hover:text-signal hover:bg-ink-900'
                      }`}
                    >
                      <span
                        className={`h-1 w-1 rounded-full transition-colors ${
                          isHovered ? 'bg-ink-950' : 'bg-steel-500 group-hover:bg-signal'
                        }`}
                        aria-hidden
                      />
                      <span>{m.country}</span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Helper Cue */}
              <p className="mt-3.5 flex items-center gap-2 font-mono text-[10px] text-steel-500">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                <span>Hover any country to center on the globe • Drag to rotate 360° freely</span>
              </p>
            </Reveal>
          </div>

          {/* Right Column: 360° Movable Slate Globe */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[560px] xl:max-w-[600px] mx-auto flex items-center justify-center p-3">
              {/* Radial ambient glow backdrop */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(245,196,0,0.20) 0%, rgba(245,196,0,0.04) 50%, transparent 70%)'
                }}
                aria-hidden
              />

              {near && (
                <Globe
                  className="h-full w-full"
                  hoveredCountry={hoveredCountry}
                  onHoverCountry={setHoveredCountry}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}