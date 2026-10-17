import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MenuIcon, MoonIcon, SearchIcon, SunIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { MobileMenu } from './MobileMenu';
import { ProductMegaMenu } from './ProductMegaMenu';
import { BrandMegaMenu } from './BrandMegaMenu';
import { NAV_ITEMS } from '../../data/navigation';
import { getLatestPosts, searchPosts } from '../../data/blog';
import { useTheme } from '../../hooks/useTheme';


export function Logo({ className }: {className?: string;}) {
  return (
    <Link
      to="/"
      aria-label="KHS-LG home"
      className={cn(
        'group inline-flex items-center transition-transform duration-300 ease-precision hover:scale-[1.02]',
        className
      )}>
      <div className="flex items-center justify-center rounded-md bg-black px-3 py-1.5 sm:px-3.5 sm:py-2 border border-neutral-800 shadow-sm transition-all duration-300 group-hover:border-signal/40">
        <img
          src="/khslogo-clean.png"
          alt="KHS-LG"
          className="khs-logo block h-8 w-auto object-contain object-left transition-all duration-300 drop-shadow-[0_2px_10px_rgba(245,196,0,0.22)] group-hover:drop-shadow-[0_4px_22px_rgba(245,196,0,0.45)] sm:h-10 lg:h-11"
        />
      </div>
    </Link>
  );
}

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const productsCloseTimer = useRef<number | null>(null);
  const brandsCloseTimer = useRef<number | null>(null);
  const { theme, toggleTheme } = useTheme();
  const searchResults = searchQuery.trim() ? searchPosts(searchQuery).slice(0, 5) : getLatestPosts().slice(0, 5);

  useEffect(() => {
    setProductsOpen(false);
    setBrandsOpen(false);
    if (productsCloseTimer.current) window.clearTimeout(productsCloseTimer.current);
    if (brandsCloseTimer.current) window.clearTimeout(brandsCloseTimer.current);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [searchOpen]);

  const openSearch = () => {
    setSearchOpen(true);
    setSearchQuery('');
  };

  const openProducts = () => {
    if (productsCloseTimer.current) window.clearTimeout(productsCloseTimer.current);
    setProductsOpen(true);
  };

  const scheduleProductsClose = () => {
    if (productsCloseTimer.current) window.clearTimeout(productsCloseTimer.current);
    productsCloseTimer.current = window.setTimeout(() => setProductsOpen(false), 180);
  };

  const openBrands = () => {
    if (brandsCloseTimer.current) window.clearTimeout(brandsCloseTimer.current);
    setBrandsOpen(true);
  };

  const scheduleBrandsClose = () => {
    if (brandsCloseTimer.current) window.clearTimeout(brandsCloseTimer.current);
    brandsCloseTimer.current = window.setTimeout(() => setBrandsOpen(false), 180);
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        data-scrolled={scrolled}
        className={cn(
          'fixed inset-x-0 top-0 z-navigation flex items-center justify-center transition-all duration-300 ease-precision',
          scrolled ?
          'navbar-scrolled h-16 border-b border-signal/25 bg-ink-950/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.7),0_1px_0_rgba(245,196,0,0.12)] lg:h-[72px]' :
          'navbar-at-top h-16 border-b border-transparent bg-transparent lg:h-[84px]'
        )}>
        
        <nav
          aria-label="Primary"
          className="mx-auto flex h-full w-full max-w-[1600px] flex-row items-center justify-between gap-6 px-5 sm:px-8">
          
          <Logo />

          <ul className="hidden items-center gap-6 xl:flex 2xl:gap-8">
            {NAV_ITEMS.map((item) => {
              const isCurrent = item.to === location.pathname;
              const isProducts = item.to === '/products';
              const isBrands = item.to === '/our-brands';

              return (
                <li
                  key={item.to}
                  className={isProducts || isBrands ? 'relative' : undefined}
                  onMouseEnter={() => {
                    if (isProducts) openProducts();
                    else if (isBrands) openBrands();
                  }}
                  onMouseLeave={() => {
                    if (isProducts) scheduleProductsClose();
                    else if (isBrands) scheduleBrandsClose();
                  }}>
                  {isProducts ? <>
                    <NavLink
                      to={item.to}
                      onClick={() => {
                        setProductsOpen(false);
                      }}
                      data-product-menu-trigger="true"
                      aria-expanded={productsOpen}
                      aria-haspopup="true"
                      className={cn(
                        'group relative whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ease-precision',
                        isCurrent ? 'text-signal' : 'text-steel-300 hover:text-steel-50'
                      )}>
                      <span className="2xl:hidden">{item.short}</span>
                      <span className="hidden 2xl:inline">{item.label}</span>
                      <span
                        className={cn(
                          'absolute -bottom-1.5 left-0 h-px bg-signal transition-[width] duration-300 ease-precision',
                          isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                        )} />
                    </NavLink>
                    <ProductMegaMenu
                      open={productsOpen}
                      onClose={() => setProductsOpen(false)}
                      scrolled={scrolled}
                      onMouseEnter={openProducts}
                      onMouseLeave={scheduleProductsClose}
                    />
                  </> : isBrands ? <>
                    <NavLink
                      to={item.to}
                      onClick={() => {
                        setBrandsOpen(false);
                      }}
                      data-brand-menu-trigger="true"
                      aria-expanded={brandsOpen}
                      aria-haspopup="true"
                      className={cn(
                        'group relative whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ease-precision',
                        isCurrent ? 'text-signal' : 'text-steel-300 hover:text-steel-50'
                      )}>
                      <span className="2xl:hidden">{item.short}</span>
                      <span className="hidden 2xl:inline">{item.label}</span>
                      <span className={cn('absolute -bottom-1.5 left-0 h-px bg-signal transition-[width] duration-300 ease-precision', isCurrent ? 'w-full' : 'w-0 group-hover:w-full')} />
                    </NavLink>
                    <BrandMegaMenu
                      open={brandsOpen}
                      onClose={() => setBrandsOpen(false)}
                      scrolled={scrolled}
                      onMouseEnter={openBrands}
                      onMouseLeave={scheduleBrandsClose}
                    />
                  </> : <NavLink
                    to={item.to}
                    className={cn(
                      'group relative whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ease-precision',
                      isCurrent ? 'text-signal' : 'text-steel-300 hover:text-steel-50'
                    )}>
                    <span className="2xl:hidden">{item.short}</span>
                    <span className="hidden 2xl:inline">{item.label}</span>
                    <span className={cn('absolute -bottom-1.5 left-0 h-px bg-signal transition-[width] duration-300 ease-precision', isCurrent ? 'w-full' : 'w-0 group-hover:w-full')} />
                  </NavLink>}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <div ref={searchRef} className="relative flex items-center gap-1">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search articles"
                aria-expanded={searchOpen}
                className="navbar-icon-btn flex h-10 w-10 items-center justify-center rounded-full text-steel-300 transition-colors hover:text-signal hover:bg-white/5">
                <SearchIcon className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle light and dark theme"
                className="navbar-icon-btn flex h-10 w-10 items-center justify-center rounded-full text-steel-300 transition-colors hover:text-signal hover:bg-white/5">
                {theme === 'dark' ? <SunIcon className="h-4 w-4" aria-hidden /> : <MoonIcon className="h-4 w-4" aria-hidden />}
              </button>
              {searchOpen && <div className="absolute right-0 top-[calc(100%+12px)] z-menu-panel w-[min(92vw,440px)] border border-ink-600 bg-ink-950 p-3 shadow-2xl">
                <div className="flex items-center gap-3 border border-ink-600 px-3 focus-within:border-signal">
                  <SearchIcon className="h-4 w-4 shrink-0 text-signal" aria-hidden />
                  <input ref={searchInputRef} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search articles..." aria-label="Search articles" className="min-w-0 flex-1 bg-transparent py-3 font-mono text-sm text-steel-50 placeholder:text-steel-500 outline-none" />
                  <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close article search" className="text-steel-500 hover:text-signal"><XIcon className="h-4 w-4" aria-hidden /></button>
                </div>
                <div className="mt-3 max-h-[min(52vh,360px)] overflow-y-auto">
                  <p className="px-2 pb-2 font-mono text-[9px] uppercase tracking-tech text-steel-500">{searchQuery.trim() ? `${searchResults.length} matching articles` : 'Latest articles'}</p>
                  {searchResults.length > 0 ? searchResults.map((post) => <Link key={post.slug} to={`/blog/${post.slug}`} onClick={() => setSearchOpen(false)} className="block border-t border-ink-700 px-2 py-3 transition-colors hover:bg-ink-800"><span className="block font-display text-base font-semibold uppercase leading-tight text-steel-50">{post.title}</span><span className="mt-1 block font-mono text-[9px] uppercase tracking-tech text-steel-500"><span className="text-signal">{post.category}</span> / {post.date}</span></Link>) : <p className="border-t border-ink-700 px-2 py-5 font-mono text-xs text-steel-500">No articles found</p>}
                </div>
              </div>}
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-2 border border-steel-500/30 px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-tech text-steel-300 transition-colors duration-200 ease-precision hover:border-signal hover:text-signal xl:hidden">
              
              <MenuIcon className="h-4 w-4" aria-hidden />
              Menu
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>);

}