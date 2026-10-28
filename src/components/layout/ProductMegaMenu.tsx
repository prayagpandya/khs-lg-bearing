import { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { powerTransmissionLinks, productFamilies } from '../../data/productFamilies';
import { cn } from '../../utils/cn';

type Family = (typeof productFamilies)[number];
type SelectedCategory = { kind: 'family'; family: Family } | { kind: 'power' };

const menuLinkClass = 'group flex min-w-0 items-center gap-3 border-b border-[#C9C9C6]/70 py-2.5 text-[13px] leading-[1.7] text-[#181818] transition-colors hover:bg-[#DCDCD8] hover:text-[#B99B00]';

function CategoryRow({ label, count, onSelect }: { label: string; count?: number; onSelect: () => void }) {
  return <button type="button" onClick={onSelect} className="group flex w-full items-center justify-between gap-5 border-b border-[#C9C9C6] py-4 text-left transition-colors hover:bg-[#DCDCD8]">
    <span className="relative font-display text-[12px] font-bold uppercase tracking-[0.12em] text-[#222222] transition-colors group-hover:text-[#B99B00]">
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-5 bg-[#D4B72C] transition-all group-hover:w-10" aria-hidden />
    </span>
    <span className="flex shrink-0 items-center gap-3 text-[#555555]">
      {count !== undefined && <span className="font-mono text-[9px] uppercase tracking-[0.12em]">{count} products</span>}
      <ChevronRightIcon className="h-4 w-4 text-[#D4B72C] transition-transform group-hover:translate-x-1" aria-hidden />
    </span>
  </button>;
}

function ProductList({ selected, onBack, onNavigate }: { selected: SelectedCategory; onBack: () => void; onNavigate: () => void }) {
  if (selected.kind === 'power') return <div className="animate-[fadeIn_180ms_ease-out]">
    <button type="button" onClick={onBack} className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#555555] hover:text-[#B99B00]"><ArrowLeftIcon className="h-3 w-3" aria-hidden /> Back to product categories</button>
    <div className="mt-6 border-b border-[#C9C9C6] pb-3"><h2 className="font-display text-[12px] font-bold uppercase tracking-[0.12em] text-[#222222]">Power Transmission</h2><span className="mt-2 block h-px w-8 bg-[#D4B72C]" aria-hidden /></div>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {powerTransmissionLinks.map((item) => <Link key={item.id} to={item.href} onClick={onNavigate} className="group flex items-center justify-between border-b border-[#C9C9C6]/70 px-3 py-3 text-[13px] text-[#181818] transition-colors hover:bg-[#DCDCD8] hover:text-[#B99B00]"><span>{item.title}</span><ArrowRightIcon className="h-3.5 w-3.5 text-[#D4B72C] transition-transform group-hover:translate-x-1" aria-hidden /></Link>)}
    </div>
  </div>;

  const { family } = selected;
  return <div className="animate-[fadeIn_180ms_ease-out]">
    <button type="button" onClick={onBack} className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#555555] hover:text-[#B99B00]"><ArrowLeftIcon className="h-3 w-3" aria-hidden /> Back to product categories</button>
    <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#C9C9C6] pb-3"><div><h2 className="font-display text-[12px] font-bold uppercase tracking-[0.12em] text-[#222222]">{family.title}</h2><span className="mt-2 block h-px w-8 bg-[#D4B72C]" aria-hidden /></div><span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#555555]">{family.products.length} products</span></div>
    <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
      {family.products.map((product) => <Link key={product.id} to={`/products?product=${product.id}`} onClick={onNavigate} className={menuLinkClass}><span className="min-w-0">{product.title}</span><ArrowRightIcon className="ml-auto h-3 w-3 shrink-0 -translate-x-1 text-[#B99B00] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden /></Link>)}
    </div>
  </div>;
}

function ProductMenuContent({ mobile, onNavigate }: { mobile?: boolean; onNavigate: () => void }) {
  const [selected, setSelected] = useState<SelectedCategory | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [mobile]);

  const chooseFamily = (family: Family) => setSelected({ kind: 'family', family });
  const choosePower = () => setSelected({ kind: 'power' });

  return <div className={cn(mobile ? 'space-y-4' : 'min-h-[250px]')}>
    {selected ? <ProductList selected={selected} onBack={() => setSelected(null)} onNavigate={onNavigate} /> : <div className="animate-[fadeIn_180ms_ease-out]">
      <div className={cn('grid gap-x-8', mobile ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3')}>
        {productFamilies.map((family) => <CategoryRow key={family.id} label={family.title} count={family.products.length} onSelect={() => chooseFamily(family)} />)}
        <CategoryRow label="Power Transmission" onSelect={choosePower} />
      </div>
    </div>}
  </div>;
}

export function ProductMegaMenu({
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
    const onPointerDown = (event: PointerEvent) => { const target = event.target as Element; if (target.closest('[data-product-menu-trigger]')) return; if (!menuRef.current?.contains(target)) onClose(); };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('pointerdown', onPointerDown); document.removeEventListener('keydown', onKeyDown); };
  }, [open, onClose]);

  if (!open) return null;
  return <>
      <div className="fixed inset-x-0 bottom-0 z-menu-backdrop bg-ink-950/35" style={{ top: scrolled ? '70px' : '84px' }} aria-hidden />
    <div
      ref={menuRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn('fixed inset-x-0 z-menu-panel border-y border-[#C9C9C6] bg-[#E9E9E7] text-[#181818] shadow-[0_12px_35px_rgba(0,0,0,0.16)] animate-[fadeIn_180ms_ease-out]', scrolled ? 'top-[64px] lg:top-[70px]' : 'top-16 lg:top-[84px]')}
      role="region"
      aria-label="KHS-LG product navigation">
      <div className="mx-auto max-h-[min(500px,calc(100vh-96px))] w-full max-w-[1400px] overflow-y-auto px-5 py-6 sm:px-8 lg:py-7">
        <div className="mb-6 border-b border-[#C9C9C6] pb-4"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#B99B00]">KHS-LG Products</p><p className="mt-1 text-[13px] text-[#555555]">Explore our industrial bearing and power transmission solutions.</p></div>
        <ProductMenuContent onNavigate={onClose} />
      </div>
    </div>
  </>;
}

export function ProductMobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return <div className="bg-[#E9E9E7] p-4 text-[#181818]"><ProductMenuContent mobile onNavigate={onNavigate} /></div>;
}
