import type { CSSProperties } from 'react';
import { ArrowUpRightIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brands } from '../data/brands';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useSeo } from '../hooks/useSeo';
import { useTheme } from '../hooks/useTheme';

export function OurBrands() {
  const { theme } = useTheme();
  useSeo({
    title: 'Our Brands | IKO, WON ST, STIEBER, TPI & HIWIN',
    description: 'Explore world-class precision industrial brands supplied by KHS-LG including IKO, WON ST, STIEBER, TPI, and HIWIN.',
    path: '/our-brands'
  });

  return (
    <main>
      <section className="relative overflow-hidden border-b border-ink-700 bg-ink-950 pb-6 pt-24 sm:pb-8 sm:pt-26 lg:pb-8 lg:pt-28">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, rgba(245,180,0,0.9) 0%, transparent 62%)' }}
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div className="max-w-5xl">
            <TechnicalLabel code="Our brands">Global industrial partners</TechnicalLabel>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(3rem,8vw,7.5rem)] font-bold uppercase leading-[0.86] text-steel-50">
              Engineered partners.<br />
              <span className="text-signal">Global expertise.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-400">
              KHS-LG collaborates with premier international engineering manufacturers to supply customers with world-class precision bearings, linear motion systems, and power transmission components for demanding industrial applications.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-ink-900 py-12 lg:py-18">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div className="flex flex-col gap-4 border-b border-ink-700 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <TechnicalLabel code="01 / Portfolio">Authorized & Global Brands</TechnicalLabel>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase text-steel-50 sm:text-5xl">
                Precision, motion, control.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-steel-500">
              Distinct product engineering expertise, unified through one seamless KHS-LG technical supply experience.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand, index) => (
              <article
                key={brand.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-ink-800 bg-ink-950 p-6 sm:p-8 transition-all duration-300 hover:border-signal/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                style={{ '--brand-accent': brand.accent, '--brand-accent-soft': brand.accentSoft } as CSSProperties}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 85% 5%, ${brand.accentSoft}, transparent 45%)` }}
                  aria-hidden
                />

                <div className="relative flex flex-col">
                  {/* Card Header: Number & Glowing Accent */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-tech text-steel-500">0{index + 1}</span>
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: brand.accent, boxShadow: `0 0 20px ${brand.accent}` }}
                      aria-hidden
                    />
                  </div>

                  {/* Brand Logo Container */}
                  <div className="mt-6 flex h-24 w-full items-center justify-center rounded-xl bg-white px-6 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-slate-100 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} official logo`}
                      className="max-h-16 max-w-full object-contain transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Brand Typography */}
                  <div className="mt-6">
                    <h3 className="font-display text-3xl font-bold uppercase tracking-[0.03em] text-steel-50 group-hover:text-signal transition-colors">
                      {brand.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: brand.accent }}>
                      {brand.tag}
                    </p>
                  </div>

                  {/* Summary & Category */}
                  <div className="mt-4">
                    <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">{brand.category}</p>
                    <p className="mt-3 text-sm leading-relaxed text-steel-400 line-clamp-3">{brand.summary}</p>
                  </div>
                </div>

                <div className="relative mt-8 pt-4 border-t border-ink-800/80">
                  <Link
                    to={`/our-brands/${brand.slug}`}
                    className="inline-flex w-full items-center justify-between font-display text-xs font-semibold uppercase tracking-[0.14em] text-steel-200 transition-colors hover:text-signal"
                  >
                    <span>Explore {brand.name}</span>
                    <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-signal" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* House Brand Highlight: KHS-LG */}
          <div
            className={`khs-brand-highlight-card mt-12 rounded-2xl p-8 sm:p-10 transition-all duration-300 ${
              theme === 'light'
                ? 'border-2 border-amber-300/80 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/50 shadow-[0_10px_30px_rgba(245,196,0,0.12)]'
                : 'border border-signal/40 bg-gradient-to-r from-ink-950 via-ink-900 to-ink-950 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            }`}
          >
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div
                  className={`khs-highlight-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-mono text-xs mb-4 ${
                    theme === 'light'
                      ? 'border border-amber-400 bg-amber-100/90 text-amber-900 font-bold'
                      : 'border border-signal/40 bg-signal/10 text-signal'
                  }`}
                >
                  <SparklesIcon className="h-3.5 w-3.5" />
                  <span>KHS-LG Proprietary Manufacturing</span>
                </div>
                <h3
                  className={`khs-highlight-title font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide ${
                    theme === 'light' ? 'text-slate-900' : 'text-steel-50'
                  }`}
                >
                  Engineered in-house with 50+ years of industrial legacy
                </h3>
                <p
                  className={`khs-highlight-desc mt-3 text-sm leading-relaxed max-w-2xl ${
                    theme === 'light' ? 'text-slate-700' : 'text-steel-300'
                  }`}
                >
                  Alongside leading international brands, KHS-LG manufactures over 13,500+ SKUs of specialized bearings, linear motion guides, and power transmission components, exporting to over 25+ countries worldwide with stringent ISO 9001 certified quality.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <MagneticButton to="/products" variant="yellow">
                    Explore KHS-LG Catalog
                  </MagneticButton>
                  <MagneticButton to="/contact" variant={theme === 'light' ? 'outline' : 'ghost'}>
                    Custom Sourcing Desk
                  </MagneticButton>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div
                  className={`khs-highlight-logo-box flex h-28 w-full max-w-sm items-center justify-center rounded-2xl p-6 transition-transform hover:scale-[1.02] ${
                    theme === 'light'
                      ? 'bg-slate-950 border-2 border-amber-400 shadow-[0_12px_28px_rgba(0,0,0,0.18)]'
                      : 'bg-black border border-neutral-800 shadow-2xl'
                  }`}
                >
                  <img
                    src="/assets/brands/khs-lg-logo.webp"
                    alt="KHS-LG official logo"
                    className="max-h-18 max-w-full object-contain drop-shadow-[0_4px_20px_rgba(245,196,0,0.35)]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <MagneticButton to="/contact" variant="ghost" icon={<ArrowUpRightIcon className="h-4 w-4" aria-hidden />}>
              Talk to our technical desk
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
