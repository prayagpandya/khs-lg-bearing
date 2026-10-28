import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brands } from '../../data/brands';
import { cn } from '../../utils/cn';

export function BrandMegaMenu({
  open,
  onClose,
  scrolled = false,
  onMouseEnter,
  onMouseLeave
}: {
  open: boolean;
  onClose: () => void;
  scrolled?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element;
      if (target.closest('[data-brand-menu-trigger]')) return;
      if (!menuRef.current?.contains(target)) onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-menu-backdrop bg-ink-950/35" style={{ top: scrolled ? '70px' : '84px' }} aria-hidden />
      <div
        ref={menuRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cn('fixed inset-x-0 z-menu-panel border-y border-ink-700 bg-ink-950 shadow-2xl animate-[fadeIn_180ms_ease-out]', scrolled ? 'top-[64px] lg:top-[70px]' : 'top-16 lg:top-[84px]')}
        role="region"
        aria-label="KHS-LG brand navigation">
        <div className="mx-auto max-h-[min(560px,calc(100vh-96px))] w-full max-w-[1500px] overflow-y-auto px-5 py-6 sm:px-8 lg:py-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-ink-800 pb-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal font-semibold">Our brands</p>
              <p className="mt-1 text-xs text-steel-400">Authorized & premium global industrial partner brands supplied by KHS-LG.</p>
            </div>
            <Link to="/our-brands" onClick={onClose} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-tech text-steel-400 transition-colors hover:text-signal">
              View all brands <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to={`/our-brands/${brand.slug}`}
                onClick={onClose}
                className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-ink-800 bg-ink-950/90 p-4 transition-all duration-200 hover:border-signal/50 hover:bg-ink-900 hover:shadow-lg"
                style={{ '--brand-accent': brand.accent, '--brand-accent-soft': brand.accentSoft } as CSSProperties}
              >
                <span
                  className="absolute left-0 top-0 h-0.5 w-8 bg-[var(--brand-accent)] transition-all duration-300 group-hover:w-full"
                  aria-hidden
                />

                <div>
                  {/* Clean High-Contrast Logo Container */}
                  <div className="mb-3 flex h-14 w-full items-center justify-center rounded-md bg-white p-2.5 shadow-xs border border-slate-100 transition-transform duration-200 group-hover:scale-[1.02]">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-h-10 max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-lg font-bold uppercase tracking-[0.03em] text-steel-50 group-hover:text-signal transition-colors">
                      {brand.name}
                    </span>
                    <ArrowUpRightIcon
                      className="h-3.5 w-3.5 text-steel-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: brand.accent }}>
                    {brand.tag}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-steel-400 line-clamp-2">
                    {brand.summary}
                  </p>
                </div>

                <span className="mt-4 inline-flex items-center gap-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-steel-400 group-hover:text-signal">
                  Explore {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function BrandMobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-2 border-l border-ink-700 pl-4">
      {brands.map((brand) => (
        <Link
          key={brand.slug}
          to={`/our-brands/${brand.slug}`}
          onClick={onNavigate}
          className="group flex items-center justify-between border-b border-ink-800 py-2.5 text-steel-300"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-20 items-center justify-center rounded bg-white p-1.5 shadow-xs border border-slate-200">
              <img src={brand.logo} alt={brand.name} className="max-h-7 max-w-full object-contain" />
            </div>
            <span>
              <strong className="block font-display text-sm uppercase text-steel-50 group-hover:text-signal">
                {brand.name}
              </strong>
              <small className="font-mono text-[9px] uppercase tracking-tech" style={{ color: brand.accent }}>
                {brand.country}
              </small>
            </span>
          </div>
          <ArrowUpRightIcon className="h-4 w-4 text-steel-600 group-hover:text-signal" aria-hidden />
        </Link>
      ))}
      <Link to="/our-brands" onClick={onNavigate} className="pt-2 font-mono text-[10px] uppercase tracking-tech text-signal">
        View all brands &rarr;
      </Link>
    </div>
  );
}
