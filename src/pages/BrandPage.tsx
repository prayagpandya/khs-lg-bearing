import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DownloadIcon,
  FileTextIcon,
  LayersIcon,
  MessageCircleIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  XIcon
} from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { brands, getBrand } from '../data/brands';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import { MagneticButton } from '../components/ui/MagneticButton';
import { BearingGlyph } from '../components/ui/BearingGlyph';
import { company, COMPANY_WHATSAPP_URL } from '../data/company';
import {
  getBrandProductTree,
  getAllBrandProducts
} from '../data/brandTree';
import type { TreeProduct } from '../data/productTree';
import { useSeo } from '../hooks/useSeo';
import { NoProductFoundNotice } from '../components/ui/NoProductFoundNotice';

export function BrandPage() {
  const { slug } = useParams();
  const brand = getBrand(slug);

  if (!brand) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-950 px-5 pt-24">
        <div className="text-center">
          <TechnicalLabel code="404" className="justify-center">Brand not found</TechnicalLabel>
          <h1 className="mt-5 font-display text-5xl font-bold uppercase text-steel-50">No such brand</h1>
          <Link to="/our-brands" className="mt-8 inline-flex font-mono text-[10px] uppercase tracking-tech text-signal">
            Back to Our Brands
          </Link>
        </div>
      </main>
    );
  }

  return <BrandPageContent brand={brand} />;
}

function BrandPageContent({ brand }: { brand: typeof brands[number] }) {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [mobileTreeOpen, setMobileTreeOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(params.get('product'));

  // Categories & Subcategories expanded state (initially all collapsed)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});

  const activeCategoryId = params.get('category') ?? '';
  const activeSubcategoryId = params.get('sub') ?? '';
  const activeProductSlug = params.get('product') ?? '';

  const brandTree = useMemo(() => getBrandProductTree(brand.slug), [brand.slug]);
  const brandProducts = useMemo(() => getAllBrandProducts(brand.slug), [brand.slug]);

  useSeo({
    title: `${brand.name} | ${brand.category} - KHS-LG`,
    description: `KHS-LG supplies authentic ${brand.name} (${brand.company}) ${brand.category}. Sourcing, quotes, technical specifications, and factory supply for industrial machinery and automation.`,
    path: `/our-brands/${brand.slug}`
  });

  // Sync expanded states if navigated via URL params
  useEffect(() => {
    if (activeProductSlug) {
      const match = brandProducts.find((p) => p.id === activeProductSlug);
      if (match) {
        setExpandedCategories((prev) => ({ ...prev, [match.categoryId]: true }));
        setExpandedSubcategories((prev) => ({ ...prev, [match.subcategoryId]: true }));
        setSelectedProductId(match.id);
      }
    } else if (activeSubcategoryId) {
      for (const cat of brandTree) {
        const sub = cat.subcategories.find((s) => s.id === activeSubcategoryId);
        if (sub) {
          setExpandedCategories((prev) => ({ ...prev, [cat.id]: true }));
          setExpandedSubcategories((prev) => ({ ...prev, [sub.id]: true }));
          break;
        }
      }
    } else if (activeCategoryId) {
      setExpandedCategories((prev) => ({ ...prev, [activeCategoryId]: true }));
    }
  }, [activeCategoryId, activeSubcategoryId, activeProductSlug, brandProducts, brandTree]);

  // Click & Toggle Handlers - Bi-directional whole-tab toggles
  const handleCategoryClick = (categoryId: string) => {
    const isExpanded = expandedCategories[categoryId] ?? false;
    if (isExpanded) {
      setExpandedCategories((prev) => ({ ...prev, [categoryId]: false }));
    } else {
      setExpandedCategories((prev) => ({ ...prev, [categoryId]: true }));
      selectCategory(categoryId);
    }
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    const isExpanded = expandedSubcategories[subcategoryId] ?? false;
    if (isExpanded) {
      setExpandedSubcategories((prev) => ({ ...prev, [subcategoryId]: false }));
    } else {
      setExpandedSubcategories((prev) => ({ ...prev, [subcategoryId]: true }));
      selectSubcategory(categoryId, subcategoryId);
    }
  };

  const selectAll = () => {
    setParams({});
    setSelectedProductId(null);
    setQuery('');
    setExpandedCategories({});
    setExpandedSubcategories({});
    setMobileTreeOpen(false);
  };

  const selectCategory = (categoryId: string) => {
    const next = new URLSearchParams();
    next.set('category', categoryId);
    setParams(next);
    setSelectedProductId(null);
    setExpandedCategories((prev) => ({ ...prev, [categoryId]: true }));
    setMobileTreeOpen(false);
  };

  const selectSubcategory = (categoryId: string, subcategoryId: string) => {
    const next = new URLSearchParams();
    next.set('category', categoryId);
    next.set('sub', subcategoryId);
    setParams(next);
    setSelectedProductId(null);
    setExpandedCategories((prev) => ({ ...prev, [categoryId]: true }));
    setExpandedSubcategories((prev) => ({ ...prev, [subcategoryId]: true }));
    setMobileTreeOpen(false);
  };

  const selectProduct = (product: TreeProduct) => {
    const next = new URLSearchParams();
    next.set('category', product.categoryId);
    next.set('sub', product.subcategoryId);
    next.set('product', product.id);
    setParams(next);
    setSelectedProductId(product.id);
    setExpandedCategories((prev) => ({ ...prev, [product.categoryId]: true }));
    setExpandedSubcategories((prev) => ({ ...prev, [product.subcategoryId]: true }));
    setMobileTreeOpen(false);

    const el = document.getElementById(`product-${product.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Filter products based on search and hierarchy selection
  const filteredProducts = useMemo(() => {
    let list = brandProducts;

    if (activeCategoryId) {
      list = list.filter((p) => p.categoryId === activeCategoryId);
    }

    if (activeSubcategoryId) {
      list = list.filter((p) => p.subcategoryId === activeSubcategoryId);
    }

    if (activeProductSlug) {
      list = list.filter((p) => p.id === activeProductSlug);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) =>
        [p.name, p.code, p.categoryName, p.subcategoryName, p.short, p.description, ...(p.series ?? [])]
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }

    return list;
  }, [brandProducts, activeCategoryId, activeSubcategoryId, activeProductSlug, query]);

  const currentCategory = brandTree.find((c) => c.id === activeCategoryId);
  const currentSubcategory = currentCategory?.subcategories.find((s) => s.id === activeSubcategoryId);
  const currentProduct = brandProducts.find((p) => p.id === activeProductSlug);

  const quoteHref = `/contact?brand=${encodeURIComponent(brand.name)}`;
  const whatsappMessage = `Hello KHS-LG, I am looking for a ${brand.name} product. Product/Series: ______. Please assist.`;
  const accentStyle = { '--brand-accent': brand.accent, '--brand-accent-soft': brand.accentSoft } as CSSProperties;

  return (
    <main style={accentStyle} className="bg-ink-950">
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden border-b border-ink-700 bg-ink-950 pb-8 pt-12 sm:pb-10 sm:pt-16 lg:pb-12 lg:pt-18">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20"
          style={{ background: `radial-gradient(circle at 60% 35%, ${brand.accentSoft}, transparent 55%)` }}
          aria-hidden
        />
        <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <div className="mt-2 sm:mt-4">
              {brand.logo && (
                <div className="mb-6 inline-flex items-center rounded-xl bg-white px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-slate-100 transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} official logo`}
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
              )}
              <TechnicalLabel code={brand.tag}>{brand.company}</TechnicalLabel>
              <div className="mt-5 flex items-center gap-4">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: brand.accent, boxShadow: `0 0 24px ${brand.accent}` }}
                  aria-hidden
                />
                <span className="font-mono text-[10px] uppercase tracking-tech text-steel-500">{brand.country}</span>
              </div>
              <h1 className="mt-4 max-w-3xl font-display text-[clamp(3.5rem,8vw,7.5rem)] font-bold uppercase leading-[0.83] text-steel-50">
                {brand.heroHeading[0]}<br />
                <span style={{ color: brand.accent }}>{brand.heroHeading[1]}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-steel-400">{brand.heroDescription}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton to={quoteHref} variant="yellow">Request a Quote</MagneticButton>
                <MagneticButton
                  href={`${COMPANY_WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`}
                  variant="ghost"
                  icon={<MessageCircleIcon className="h-4 w-4" aria-hidden />}
                >
                  WhatsApp
                </MagneticButton>
              </div>
            </div>
          </div>
          <div className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center overflow-hidden border border-ink-700 bg-ink-900 p-10">
            <div className="absolute inset-0 industrial-grid opacity-20" aria-hidden />
            <div className="absolute inset-12 rounded-full border" style={{ borderColor: brand.accentSoft }} aria-hidden />
            <div className="absolute inset-24 rounded-full border" style={{ borderColor: brand.accentSoft }} aria-hidden />
            <img
              src={brand.productImage}
              alt={`${brand.name} ${brand.productLabel}`}
              className="relative z-10 max-h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out hover:scale-105"
            />
            <span className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-tech text-steel-600">{brand.productLabel}</span>
            <span className="absolute right-5 top-5 font-mono text-[9px] uppercase tracking-tech" style={{ color: brand.accent }}>
              KHS-LG / {brand.name}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Brand Products Explorer Section (Products Page Layout: Side Navbar Left + Products Right) */}
      <section id="brand-products" aria-label={`${brand.name} Product Catalog`} className="relative border-b border-ink-700 bg-ink-950 py-12 lg:py-16">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="mb-8 flex flex-col gap-3 border-b border-ink-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <TechnicalLabel code={`02 / ${brand.name} Products`}>{brand.categoriesHeading}</TechnicalLabel>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase text-steel-50 sm:text-5xl">
                Brand-Wise Products & Series
              </h2>
            </div>
            <p className="max-w-md text-sm text-steel-400">
              Explore specialized {brand.name} precision motion products available for immediate quotation and technical supply.
            </p>
          </div>

          {/* Mobile Filter & Search Bar */}
          <div className="mb-6 flex flex-col gap-3 lg:hidden">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileTreeOpen(true)}
                className="flex flex-1 items-center justify-between border border-ink-700 bg-ink-900 px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-steel-50 hover:border-signal"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontalIcon className="h-4 w-4 text-signal" aria-hidden />
                  {brand.name} Categories & Navigation
                </span>
                <span className="bg-signal/20 px-2 py-0.5 font-mono text-[10px] text-signal">
                  {filteredProducts.length} items
                </span>
              </button>
            </div>

            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" aria-hidden />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${brand.name} products, series, specifications...`}
                className="w-full border border-ink-700 bg-ink-900 py-2.5 pl-9 pr-8 font-mono text-xs text-steel-100 placeholder:text-steel-600 focus:border-signal focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-steel-500 hover:text-steel-200"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* 2-Column Grid: Left Side Navbar + Right Products Grid */}
          <div className="grid items-start gap-8 lg:grid-cols-[330px_1fr] xl:grid-cols-[360px_1fr] lg:gap-10">
            {/* Desktop Side Product Navbar (Sticky Tree View) */}
            <aside className="hidden lg:block lg:sticky lg:top-24 self-start">
              <div className="border border-ink-800 bg-ink-900/90 p-5 backdrop-blur-md">
                {brand.logo && (
                  <div className="mb-4 flex items-center justify-center rounded-lg bg-white p-3 shadow-xs border border-slate-100">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-h-9 max-w-full object-contain"
                    />
                  </div>
                )}
                {/* Search Bar in Sidebar */}
                <div className="mb-5">
                  <div className="relative">
                    <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-steel-500" aria-hidden />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={`Search ${brand.name} range...`}
                      className="w-full border border-ink-700 bg-ink-950 py-2 pl-8 pr-7 font-mono text-xs text-steel-100 placeholder:text-steel-600 focus:border-signal focus:outline-none"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-steel-500 hover:text-steel-200"
                      >
                        <XIcon className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Sidebar Header & All Products Reset */}
                <div className="mb-4 flex items-center justify-between border-b border-ink-800 pb-3">
                  <div className="flex items-center gap-2">
                    <LayersIcon className="h-3.5 w-3.5" style={{ color: brand.accent }} aria-hidden />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-tech text-steel-200">
                      {brand.name} Hierarchy
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={selectAll}
                    className={`font-mono text-[10px] uppercase tracking-wider transition-colors ${
                      !activeCategoryId && !activeSubcategoryId && !activeProductSlug
                        ? 'text-signal font-semibold underline'
                        : 'text-steel-500 hover:text-signal'
                    }`}
                  >
                    View All ({brandProducts.length})
                  </button>
                </div>

                {/* Tree View: Categories -> Subcategories -> Products */}
                <nav aria-label={`${brand.name} Hierarchy Navigation`} className="space-y-2">
                  {brandTree.map((category) => {
                    const isCategoryExpanded = expandedCategories[category.id] ?? false;
                    const isCategoryActive = activeCategoryId === category.id;
                    const catProductCount = category.subcategories.reduce(
                      (acc, sub) => acc + sub.products.length,
                      0
                    );

                    return (
                      <div key={category.id} className="border border-ink-800/80 bg-ink-950/60">
                        {/* 1. Category Header Row - Whole row is interactive button */}
                        <button
                          type="button"
                          onClick={() => handleCategoryClick(category.id)}
                          aria-expanded={isCategoryExpanded}
                          className={`group flex w-full items-center justify-between px-3 py-3 text-left transition-colors ${
                            isCategoryActive ? 'bg-ink-800/90 text-signal' : 'hover:bg-ink-800/50 text-steel-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="font-mono text-[9px] font-bold text-signal">
                              {category.code}
                            </span>
                            <span className="font-display text-xs font-bold uppercase tracking-wider truncate">
                              {category.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono text-[9px] text-steel-500">
                              {catProductCount}
                            </span>
                            <span className="p-0.5 text-steel-400 group-hover:text-signal transition-colors">
                              {isCategoryExpanded ? (
                                <ChevronDownIcon className="h-3.5 w-3.5 text-signal" />
                              ) : (
                                <ChevronRightIcon className="h-3.5 w-3.5" />
                              )}
                            </span>
                          </div>
                        </button>

                        {/* 2. Subcategories List (Shown if Category is expanded) */}
                        {isCategoryExpanded && (
                          <div className="border-t border-ink-800/60 py-1.5">
                            {category.subcategories.map((subcategory) => {
                              const isSubExpanded = expandedSubcategories[subcategory.id] ?? false;
                              const isSubActive = activeSubcategoryId === subcategory.id;

                              return (
                                <div key={subcategory.id} className="ml-3 border-l border-ink-800 pl-2">
                                  {/* Subcategory Row - Whole row is interactive button */}
                                  <button
                                    type="button"
                                    onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
                                    aria-expanded={isSubExpanded}
                                    className={`group flex w-full items-center justify-between py-2 pr-2 text-left transition-colors ${
                                      isSubActive ? 'text-signal font-semibold' : 'text-steel-400 hover:text-steel-200'
                                    }`}
                                  >
                                    <div className="flex items-center gap-1.5 truncate min-w-0 font-display text-[11px] uppercase tracking-wide">
                                      <span className="text-steel-600">&bull;</span>
                                      <span className="truncate">{subcategory.name}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <span className="font-mono text-[9px] text-steel-600">
                                        ({subcategory.products.length})
                                      </span>
                                      <span className="p-0.5 text-steel-500 group-hover:text-signal transition-colors">
                                        {isSubExpanded ? (
                                          <ChevronDownIcon className="h-3 w-3 text-signal" />
                                        ) : (
                                          <ChevronRightIcon className="h-3 w-3" />
                                        )}
                                      </span>
                                    </div>
                                  </button>

                                  {/* 3. Products List (Shown if Subcategory is expanded) */}
                                  {isSubExpanded && (
                                    <div className="ml-3 space-y-1 border-l border-ink-800/80 py-1 pl-2">
                                      {subcategory.products.map((prod) => {
                                        const isProdActive = activeProductSlug === prod.id;

                                        return (
                                          <button
                                            key={prod.id}
                                            type="button"
                                            onClick={() => selectProduct(prod)}
                                            className={`group flex w-full items-center justify-between py-1 text-left font-mono text-[10px] transition-colors ${
                                              isProdActive
                                                ? 'font-bold text-signal'
                                                : 'text-steel-500 hover:text-steel-200'
                                            }`}
                                          >
                                            <span className="truncate pr-2">
                                              - {prod.name}
                                            </span>
                                            {prod.pdfUrl && (
                                              <span
                                                className="shrink-0 text-signal/80 group-hover:text-signal"
                                                title="Technical PDF catalogue available"
                                              >
                                                <FileTextIcon className="h-2.5 w-2.5" />
                                              </span>
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Product Grid & Detailed Content */}
            <div className="min-w-0">
              {/* Active Filter Bar & Breadcrumb */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-ink-800 pb-4">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-tech text-steel-400">
                  <button
                    type="button"
                    onClick={selectAll}
                    className="hover:text-signal transition-colors"
                  >
                    All {brand.name} Products
                  </button>

                  {currentCategory && (
                    <>
                      <span className="text-steel-600">/</span>
                      <button
                        type="button"
                        onClick={() => selectCategory(currentCategory.id)}
                        className="hover:text-signal transition-colors text-steel-300"
                      >
                        {currentCategory.name}
                      </button>
                    </>
                  )}

                  {currentSubcategory && (
                    <>
                      <span className="text-steel-600">/</span>
                      <button
                        type="button"
                        onClick={() => selectSubcategory(currentCategory!.id, currentSubcategory.id)}
                        className="hover:text-signal transition-colors text-steel-300"
                      >
                        {currentSubcategory.name}
                      </button>
                    </>
                  )}

                  {currentProduct && (
                    <>
                      <span className="text-steel-600">/</span>
                      <span className="text-signal font-semibold">{currentProduct.name}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-tech text-steel-500">
                    Showing <strong className="text-steel-100">{filteredProducts.length}</strong> of{' '}
                    {brandProducts.length}
                  </span>

                  {(activeCategoryId || activeSubcategoryId || activeProductSlug || query) && (
                    <button
                      type="button"
                      onClick={selectAll}
                      className="inline-flex items-center gap-1 border border-ink-700 bg-ink-900 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-signal hover:bg-ink-800"
                    >
                      <XIcon className="h-3 w-3" /> Clear filters
                    </button>
                  )}
                </div>
              </div>

              {/* No Results Fallback with Custom Sourcing Notice */}
              {filteredProducts.length === 0 ? (
                <NoProductFoundNotice
                  query={query}
                  onReset={selectAll}
                  className="my-6"
                />
              ) : (
                /* Products Cards Grid */
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedProductId === product.id;

                    return (
                      <article
                        key={product.id}
                        id={`product-${product.id}`}
                        className={`group relative flex flex-col border bg-ink-900 transition-all duration-300 ${
                          isSelected
                            ? 'border-signal ring-1 ring-signal shadow-[0_0_20px_rgba(245,180,0,0.15)]'
                            : 'border-ink-800 hover:border-ink-600 hover:bg-ink-900/90'
                        }`}
                      >
                        {/* Top Card Bar: Code & Motion Badges */}
                        <div className="flex items-start justify-between gap-3 border-b border-ink-800/80 p-5 pb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-tech"
                              style={{ borderColor: brand.accent, backgroundColor: brand.accentSoft, color: brand.accent }}
                            >
                              {product.code}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                              {product.subcategoryName}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] uppercase tracking-tech text-steel-400">
                            {product.motion}
                          </span>
                        </div>

                        {/* Image Showcase Container */}
                        <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-ink-950 p-6 sm:h-56">
                          <div
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{
                              background: `radial-gradient(circle, ${brand.accentSoft} 0%, transparent 68%)`
                            }}
                            aria-hidden
                          />

                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="relative z-10 max-h-40 max-w-[200px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-32 w-32">
                              <BearingGlyph
                                shape={product.id.includes('shaft') || product.id.includes('linear') ? 'linear' : 'ball'}
                                rollers={12}
                              />
                            </div>
                          )}
                        </div>

                        {/* Card Body: Title, Short, Features */}
                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                          <h3 className="font-display text-xl font-bold uppercase leading-tight text-steel-50 group-hover:text-signal transition-colors">
                            {product.name}
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-steel-400">
                            {product.short}
                          </p>

                          {/* Series chips */}
                          {product.series && product.series.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {product.series.slice(0, 4).map((s) => (
                                <span
                                  key={s}
                                  className="border border-ink-800 bg-ink-950 px-2 py-0.5 font-mono text-[9px] uppercase text-steel-400"
                                >
                                  {s}
                                </span>
                              ))}
                              {product.series.length > 4 && (
                                <span className="px-1 font-mono text-[9px] text-steel-500">
                                  +{product.series.length - 4} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Card Footer Actions */}
                          <div className="mt-auto pt-6 flex flex-col gap-2">
                            {/* Download PDF button if catalogue available */}
                            {product.pdfUrl && (
                              <a
                                href={product.pdfUrl}
                                download={product.pdfFileName ?? true}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 border border-signal/60 bg-signal/10 px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-signal transition-colors hover:bg-signal hover:text-ink-950"
                                title={`Download ${product.pdfTitle ?? product.name + ' catalogue'}`}
                              >
                                <DownloadIcon className="h-3.5 w-3.5" />
                                <span>Download PDF</span>
                              </a>
                            )}

                            {/* Direct Request Quote Link */}
                            <Link
                              to={`/contact?brand=${encodeURIComponent(brand.name)}&product=${encodeURIComponent(product.name)}`}
                              className="flex w-full items-center justify-center gap-2 border border-ink-700 bg-ink-950 px-3 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-steel-200 transition-colors hover:border-signal hover:text-signal"
                            >
                              <span>Request a Quote</span>
                              <ArrowUpRightIcon className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Drawer Modal */}
        {mobileTreeOpen && (
          <div className="fixed inset-0 z-modal flex bg-ink-950/80 backdrop-blur-sm lg:hidden">
            <div className="relative flex h-full w-[85%] max-w-sm flex-col border-r border-ink-700 bg-ink-900 p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-ink-800 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-tech text-signal">
                  {brand.name} Categories
                </span>
                <button
                  type="button"
                  onClick={() => setMobileTreeOpen(false)}
                  className="p-1 text-steel-400 hover:text-signal"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 flex-1 overflow-y-auto space-y-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="w-full border border-ink-800 bg-ink-950 p-2 text-left font-display text-xs font-semibold uppercase text-signal"
                >
                  View All Products ({brandProducts.length})
                </button>

                {brandTree.map((category) => {
                  const isCatExpanded = expandedCategories[category.id] ?? false;

                  return (
                    <div key={category.id} className="border border-ink-800 bg-ink-950/60 p-2">
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(category.id)}
                        className="flex w-full items-center justify-between py-1 text-left font-display text-xs font-bold uppercase text-steel-100"
                      >
                        <span>{category.name}</span>
                        {isCatExpanded ? <ChevronDownIcon className="h-4 w-4 text-signal" /> : <ChevronRightIcon className="h-4 w-4" />}
                      </button>

                      {isCatExpanded && (
                        <div className="mt-2 space-y-2 border-l border-ink-800 pl-3">
                          {category.subcategories.map((sub) => (
                            <div key={sub.id}>
                              <button
                                type="button"
                                onClick={() => selectSubcategory(category.id, sub.id)}
                                className="w-full py-1 text-left font-display text-[11px] uppercase text-steel-300 hover:text-signal"
                              >
                                &bull; {sub.name} ({sub.products.length})
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. About Section */}
      <section className="bg-ink-900 py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <TechnicalLabel code="03 / About">About {brand.name}</TechnicalLabel>
            <h2 className="mt-5 max-w-md font-display text-4xl font-bold uppercase leading-none text-steel-50 sm:text-5xl">
              {brand.aboutHeading}
            </h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-steel-400">
            {brand.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Engineering Section */}
      <section className="relative overflow-hidden border-y border-ink-700 bg-ink-950 py-14 lg:py-20">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <TechnicalLabel code="04 / Engineering">{brand.whyHeading}</TechnicalLabel>
          <div className="mt-8 grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-2 xl:grid-cols-3">
            {brand.features.map((feature, index) => (
              <article key={feature.title} className="bg-ink-950 p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="flex h-8 w-8 items-center justify-center border" style={{ borderColor: brand.accentSoft }}>
                    <CheckIcon className="h-4 w-4" style={{ color: brand.accent }} aria-hidden />
                  </span>
                  <span className="font-mono text-[9px] tracking-tech text-steel-600">0{index + 1}</span>
                </div>
                <h3 className="mt-10 font-display text-xl font-semibold uppercase text-steel-50">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-500">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Applications Section */}
      <section className="bg-ink-900 py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden border border-ink-700 bg-ink-950">
            <div className="absolute inset-0 industrial-grid opacity-20" aria-hidden />
            <img
              src={brand.applicationImage}
              alt={`${brand.name} application component`}
              className="relative h-full w-full object-contain p-10 transition-transform duration-700 hover:scale-105"
            />
            <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-tech text-steel-600">
              {brand.name} / application focus
            </span>
          </div>
          <div>
            <TechnicalLabel code="05 / Applications">{brand.applicationsHeading}</TechnicalLabel>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase text-steel-50 sm:text-6xl">Motion, specified.</h2>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {brand.applications.map((application) => (
                <li
                  key={application}
                  className="flex items-center gap-3 border-b border-ink-700 pb-3 font-display text-base font-semibold uppercase text-steel-300"
                >
                  <span className="h-1.5 w-1.5 shrink-0" style={{ backgroundColor: brand.accent }} aria-hidden />
                  {application}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. CTA Next Step Section */}
      <section className="relative overflow-hidden border-t border-ink-700 bg-ink-950 py-16 lg:py-24">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1100px] px-5 text-center sm:px-8">
          <TechnicalLabel code="06 / Next step" className="justify-center">
            Talk to KHS-LG about {brand.name}
          </TechnicalLabel>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold uppercase leading-[0.88] text-steel-50">
            {brand.ctaHeading}
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-steel-400">
            {brand.ctaDescription}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton to={quoteHref} variant="yellow">Request a Quote</MagneticButton>
            <MagneticButton
              href={`${COMPANY_WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`}
              variant="ghost"
              icon={<MessageCircleIcon className="h-4 w-4" aria-hidden />}
            >
              Send part number on WhatsApp
            </MagneticButton>
          </div>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-tech text-steel-600">
            {company.email} · {company.phone}
          </p>
        </div>
      </section>

      {/* 7. Continue Through Portfolio */}
      <section className="border-t border-ink-700 bg-ink-900 py-16">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
          <TechnicalLabel code="Explore other brands">Continue through the portfolio</TechnicalLabel>
          <div className="mt-6 grid gap-px border border-ink-700 bg-ink-700 md:grid-cols-3">
            {brands
              .filter((item) => item.slug !== brand.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  to={`/our-brands/${item.slug}`}
                  className="group flex items-center justify-between bg-ink-950 p-6 hover:bg-ink-900 transition-colors"
                >
                  <span>
                    <strong
                      className="block font-display text-2xl uppercase text-steel-50 group-hover:text-[var(--brand-accent)]"
                      style={{ '--brand-accent': item.accent } as CSSProperties}
                    >
                      {item.name}
                    </strong>
                    <small className="font-mono text-[9px] uppercase tracking-tech text-steel-600">{item.tag}</small>
                  </span>
                  <ArrowUpRightIcon className="h-4 w-4 text-steel-600 group-hover:text-signal transition-colors" aria-hidden />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
