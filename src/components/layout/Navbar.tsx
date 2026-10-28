import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  XIcon,
  ArrowRightIcon,
  ChevronRightIcon
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { MobileMenu } from './MobileMenu';
import { ProductMegaMenu } from './ProductMegaMenu';
import { BrandMegaMenu } from './BrandMegaMenu';
import { NAV_ITEMS } from '../../data/navigation';
import { ALL_TREE_PRODUCTS, TreeProduct } from '../../data/productTree';
import { BearingGlyph } from '../ui/BearingGlyph';
import { WhatsAppIcon } from '../ui/SocialIcons';
import { COMPANY_WHATSAPP_URL } from '../../data/company';
import { useTheme } from '../../hooks/useTheme';
import { NoProductFoundNotice } from '../ui/NoProductFoundNotice';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="KHS-LG home"
      className={cn(
        'group inline-flex items-center transition-transform duration-300 ease-precision hover:scale-[1.02]',
        className
      )}
    >
      <div className="khs-logo-box flex items-center justify-center rounded-md bg-black px-3 py-1.5 sm:px-3.5 sm:py-2 border border-neutral-800 shadow-sm transition-all duration-300 group-hover:border-signal/40">
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
  const navigate = useNavigate();
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

  // Search product matching logic
  const matchingProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      // Default to prominent motion solutions
      return ALL_TREE_PRODUCTS.slice(0, 6);
    }
    const q = searchQuery.trim().toLowerCase();
    return ALL_TREE_PRODUCTS.filter((prod) => {
      const target = [
        prod.name,
        prod.code,
        prod.categoryName,
        prod.subcategoryName,
        prod.short,
        prod.description,
        prod.motion,
        ...(prod.series ?? [])
      ]
        .join(' ')
        .toLowerCase();
      return target.includes(q);
    }).slice(0, 8);
  }, [searchQuery]);

  useEffect(() => {
    setProductsOpen(false);
    setBrandsOpen(false);
    setSearchOpen(false);
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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [searchOpen]);

  const handleProductSelect = (product: TreeProduct) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(
      `/products?category=${encodeURIComponent(product.categoryId)}&sub=${encodeURIComponent(product.subcategoryId)}&product=${encodeURIComponent(product.id)}#product-${product.id}`
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (matchingProducts.length > 0) {
      handleProductSelect(matchingProducts[0]);
    } else {
      setSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
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
          scrolled
            ? 'navbar-scrolled h-16 border-b border-signal/25 bg-ink-950/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.7),0_1px_0_rgba(245,196,0,0.12)] lg:h-[72px]'
            : 'navbar-at-top h-16 border-b border-transparent bg-transparent lg:h-[84px]'
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-full w-full max-w-[1600px] flex-row items-center justify-between gap-4 px-4 sm:gap-6 sm:px-8"
        >
          <Logo />

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-5 xl:flex 2xl:gap-8">
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
                  }}
                >
                  {isProducts ? (
                    <>
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
                        )}
                      >
                        <span className="2xl:hidden">{item.short}</span>
                        <span className="hidden 2xl:inline">{item.label}</span>
                        <span
                          className={cn(
                            'absolute -bottom-1.5 left-0 h-px bg-signal transition-[width] duration-300 ease-precision',
                            isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                          )}
                        />
                      </NavLink>
                      <ProductMegaMenu
                        open={productsOpen}
                        onClose={() => setProductsOpen(false)}
                        scrolled={scrolled}
                        onMouseEnter={openProducts}
                        onMouseLeave={scheduleProductsClose}
                      />
                    </>
                  ) : isBrands ? (
                    <>
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
                        )}
                      >
                        <span className="2xl:hidden">{item.short}</span>
                        <span className="hidden 2xl:inline">{item.label}</span>
                        <span
                          className={cn(
                            'absolute -bottom-1.5 left-0 h-px bg-signal transition-[width] duration-300 ease-precision',
                            isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                          )}
                        />
                      </NavLink>
                      <BrandMegaMenu
                        open={brandsOpen}
                        onClose={() => setBrandsOpen(false)}
                        scrolled={scrolled}
                        onMouseEnter={openBrands}
                        onMouseLeave={scheduleBrandsClose}
                      />
                    </>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={cn(
                        'group relative whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ease-precision',
                        isCurrent ? 'text-signal' : 'text-steel-300 hover:text-steel-50'
                      )}
                    >
                      <span className="2xl:hidden">{item.short}</span>
                      <span className="hidden 2xl:inline">{item.label}</span>
                      <span
                        className={cn(
                          'absolute -bottom-1.5 left-0 h-px bg-signal transition-[width] duration-300 ease-precision',
                          isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                        )}
                      />
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right-Side Action Panel: "Find My Product" Search Bar + WhatsApp + Theme + Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* FIND MY PRODUCT Search Bar Container */}
            <div ref={searchRef} className="relative flex items-center">
              {/* Desktop & Tablet Visible Search Input */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative hidden sm:flex items-center"
              >
                <SearchIcon
                  className="pointer-events-none absolute left-3.5 h-3.5 w-3.5 text-signal"
                  aria-hidden
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    if (!searchOpen) setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Find my product..."
                  aria-label="Find my product"
                  className="h-9 w-40 rounded-full border border-ink-700/80 bg-ink-900/90 pl-9 pr-8 font-mono text-xs text-steel-50 placeholder:text-steel-400 backdrop-blur-md transition-all duration-300 focus:w-60 focus:border-signal focus:bg-ink-950 focus:outline-none focus:ring-1 focus:ring-signal/40 md:w-48 md:focus:w-72 lg:w-56 lg:focus:w-80 shadow-inner"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Clear product search"
                    className="absolute right-2.5 text-steel-500 hover:text-signal transition-colors"
                  >
                    <XIcon className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </form>

              {/* Mobile Search Trigger Icon (< sm) */}
              <button
                type="button"
                onClick={() => {
                  setSearchOpen((prev) => !prev);
                  setTimeout(() => searchInputRef.current?.focus(), 50);
                }}
                aria-label="Find my product"
                aria-expanded={searchOpen}
                className="navbar-icon-btn flex h-9 w-9 items-center justify-center rounded-full text-steel-300 transition-colors hover:text-signal hover:bg-white/5 sm:hidden"
              >
                <SearchIcon className="h-4 w-4" aria-hidden />
              </button>

              {/* LIVE DROPDOWN RESULTS PANEL */}
              {searchOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-menu-panel w-[min(94vw,460px)] rounded-xl border border-ink-700/90 bg-ink-950/95 p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_0_1px_rgba(245,196,0,0.18)] backdrop-blur-xl">
                  {/* Mobile Search Input Header (shown on mobile when drawer opens) */}
                  <div className="flex sm:hidden items-center gap-2 border-b border-ink-700 pb-2 mb-2.5">
                    <SearchIcon className="h-4 w-4 text-signal shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Find my product..."
                      autoFocus
                      className="min-w-0 flex-1 bg-transparent font-mono text-xs text-steel-50 placeholder:text-steel-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="text-steel-400 hover:text-signal p-1"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between border-b border-ink-800 pb-2.5 px-1">
                    <p className="font-mono text-[10px] uppercase tracking-tech text-steel-400 font-semibold">
                      {searchQuery.trim() ? (
                        <span>
                          Matching Products{' '}
                          <span className="text-signal">({matchingProducts.length})</span>
                        </span>
                      ) : (
                        <span>Featured Motion Products</span>
                      )}
                    </p>
                    {searchQuery.trim() && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                        }}
                        className="font-mono text-[10px] text-signal hover:underline inline-flex items-center gap-1"
                      >
                        View all <ChevronRightIcon className="h-3 w-3" />
                      </button>
                    )}
                  </div>

                  {/* Matching Products List */}
                  <div className="mt-2.5 max-h-[min(60vh,420px)] space-y-1.5 overflow-y-auto pr-1">
                    {matchingProducts.length > 0 ? (
                      matchingProducts.map((prod) => (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => handleProductSelect(prod)}
                          className="group flex w-full items-center gap-3 rounded-lg border border-transparent p-2 text-left transition-all hover:border-signal/40 hover:bg-ink-900/90"
                        >
                          {/* Product Image Thumbnail */}
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-ink-700/60 bg-ink-900 p-1 group-hover:border-signal/50">
                            {prod.image ? (
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="h-full w-full object-contain transition-transform group-hover:scale-105"
                                loading="lazy"
                              />
                            ) : (
                              <BearingGlyph
                                type={
                                  prod.id.includes('shaft') || prod.id.includes('linear')
                                    ? 'linear'
                                    : 'ball'
                                }
                                className="h-6 w-6 text-signal"
                              />
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-display text-xs font-semibold text-steel-50 group-hover:text-signal transition-colors truncate">
                                {prod.name}
                              </span>
                              <span className="shrink-0 rounded bg-ink-800 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-steel-400">
                                {prod.code}
                              </span>
                            </div>
                            <p className="mt-0.5 font-mono text-[10px] text-steel-400 truncate">
                              <span className="text-steel-500">{prod.categoryName}</span> &bull;{' '}
                              {prod.motion}
                            </p>
                            {prod.series && prod.series.length > 0 && (
                              <p className="mt-0.5 text-[10px] text-steel-500 truncate">
                                Series: {prod.series.slice(0, 3).join(', ')}
                              </p>
                            )}
                          </div>

                          <ArrowRightIcon className="h-4 w-4 shrink-0 text-steel-600 transition-all group-hover:translate-x-1 group-hover:text-signal" />
                        </button>
                      ))
                    ) : (
                      <div className="py-2">
                        <NoProductFoundNotice
                          query={searchQuery}
                          compact
                          className="my-1"
                        />
                      </div>
                    )}
                  </div>

                  {/* Dropdown Footer */}
                  <div className="mt-2.5 border-t border-ink-800/80 pt-2 flex items-center justify-between text-[11px] font-mono text-steel-400 px-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        navigate('/bearing-search');
                      }}
                      className="text-steel-400 hover:text-signal hover:underline inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Dimensional Search</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        navigate('/products');
                      }}
                      className="font-semibold text-signal hover:underline inline-flex items-center gap-1"
                    >
                      All Products <ArrowRightIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Quick-Chat in Navbar */}
            <a
              href={COMPANY_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp (+91 91752 75964)"
              aria-label="Chat on WhatsApp"
              className="navbar-icon-btn hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-[#25D366] transition-colors hover:bg-[#25D366]/15 hover:text-[#25D366]"
            >
              <WhatsAppIcon className="h-4 w-4" aria-hidden />
            </a>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
              className="navbar-icon-btn flex h-9 w-9 items-center justify-center rounded-full text-steel-300 transition-colors hover:text-signal hover:bg-white/5"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-4 w-4" aria-hidden />
              ) : (
                <MoonIcon className="h-4 w-4" aria-hidden />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-2 border border-steel-500/30 px-3 py-2 font-mono text-[10px] uppercase tracking-tech text-steel-300 transition-colors duration-200 ease-precision hover:border-signal hover:text-signal xl:hidden"
            >
              <MenuIcon className="h-4 w-4" aria-hidden />
              Menu
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
