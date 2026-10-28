import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ArrowUpRightIcon,
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  DownloadIcon,
  FileTextIcon,
  FilterIcon,
  LayersIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  XIcon
} from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { BearingGlyph } from '../components/ui/BearingGlyph';
import { CTASection } from '../components/sections/CTASection';
import {
  PRODUCT_CATEGORIES_TREE,
  ALL_TREE_PRODUCTS,
  TreeCategory,
  TreeSubcategory,
  TreeProduct
} from '../data/productTree';
import { useSeo } from '../hooks/useSeo';
import { NoProductFoundNotice } from '../components/ui/NoProductFoundNotice';

export function Products() {
  const [params, setParams] = useSearchParams();
  const searchParam = params.get('search') ?? '';
  const [query, setQuery] = useState(searchParam);

  useEffect(() => {
    const s = params.get('search');
    if (s !== null) {
      setQuery(s);
    }
  }, [params]);
  const [mobileTreeOpen, setMobileTreeOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(params.get('product'));

  // Categories expanded in tree (initially all collapsed)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Subcategories expanded in tree (initially all collapsed)
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});

  // Check if any category or subcategory is currently expanded
  const hasExpandedItems =
    Object.values(expandedCategories).some(Boolean) ||
    Object.values(expandedSubcategories).some(Boolean);

  // Active Category & Subcategory from URL or state
  const activeCategoryId = params.get('category') ?? '';
  const activeSubcategoryId = params.get('sub') ?? '';
  const activeProductSlug = params.get('product') ?? '';

  useSeo({
    title: 'Industrial Bearing & Motion Products Range',
    description:
      'Explore KHS-LG precision bearings, hard-chrome linear shafts, linear guideways, needle rollers and power transmission products with downloadable technical catalogues.',
    path: '/products'
  });

  // Keep expanded states in sync if navigated via URL params
  useEffect(() => {
    if (activeProductSlug) {
      const match = ALL_TREE_PRODUCTS.find((p) => p.id === activeProductSlug);
      if (match) {
        setExpandedCategories((prev) => ({ ...prev, [match.categoryId]: true }));
        setExpandedSubcategories((prev) => ({ ...prev, [match.subcategoryId]: true }));
        setSelectedProductId(match.id);
        setTimeout(() => {
          const el = document.getElementById(`product-${match.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);
      }
    } else if (activeSubcategoryId) {
      for (const cat of PRODUCT_CATEGORIES_TREE) {
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
  }, [activeCategoryId, activeSubcategoryId, activeProductSlug]);

  // Toggle Category
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const willBeExpanded = !prev[categoryId];
      if (!willBeExpanded) {
        const cat = PRODUCT_CATEGORIES_TREE.find((c) => c.id === categoryId);
        if (cat) {
          setExpandedSubcategories((subPrev) => {
            const next = { ...subPrev };
            cat.subcategories.forEach((s) => {
              delete next[s.id];
            });
            return next;
          });
        }
      }
      return { ...prev, [categoryId]: willBeExpanded };
    });
  };

  // Toggle Subcategory
  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategories((prev) => ({ ...prev, [subcategoryId]: !prev[subcategoryId] }));
  };

  const handleCategoryClick = (categoryId: string) => {
    const isExpanded = expandedCategories[categoryId] ?? false;
    if (isExpanded) {
      setExpandedCategories((prev) => ({ ...prev, [categoryId]: false }));
      const cat = PRODUCT_CATEGORIES_TREE.find((c) => c.id === categoryId);
      if (cat) {
        setExpandedSubcategories((prev) => {
          const next = { ...prev };
          cat.subcategories.forEach((s) => {
            delete next[s.id];
          });
          return next;
        });
      }
      // If this category was the active filter, clear it to show All Products and reset styling
      if (activeCategoryId === categoryId) {
        selectAll();
      }
    } else {
      setExpandedCategories((prev) => ({ ...prev, [categoryId]: true }));
      selectCategory(categoryId);
    }
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    const isExpanded = expandedSubcategories[subcategoryId] ?? false;
    if (isExpanded) {
      setExpandedSubcategories((prev) => ({ ...prev, [subcategoryId]: false }));
      if (activeSubcategoryId === subcategoryId) {
        selectCategory(categoryId);
      }
    } else {
      setExpandedSubcategories((prev) => ({ ...prev, [subcategoryId]: true }));
      selectSubcategory(categoryId, subcategoryId);
    }
  };

  const scrollToProductsTop = () => {
    const target = document.getElementById('products-content-top');
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll up to starting point if user was scrolled down when changing filter
  const isFirstFilterMount = useRef(true);
  useEffect(() => {
    if (isFirstFilterMount.current) {
      isFirstFilterMount.current = false;
      return;
    }
    const target = document.getElementById('products-content-top');
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 90;
      if (window.scrollY > topOffset + 50) {
        window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
      }
    }
  }, [activeCategoryId, activeSubcategoryId]);

  // Filter actions
  const selectAll = () => {
    setParams({});
    setSelectedProductId(null);
    setQuery('');
    setExpandedCategories({});
    setExpandedSubcategories({});
    setMobileTreeOpen(false);
    scrollToProductsTop();
  };

  const selectCategory = (categoryId: string) => {
    const next = new URLSearchParams();
    next.set('category', categoryId);
    setParams(next);
    setSelectedProductId(null);
    setExpandedCategories((prev) => ({ ...prev, [categoryId]: true }));
    setMobileTreeOpen(false);
    scrollToProductsTop();
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
    scrollToProductsTop();
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

    // Smooth scroll to product card if rendered
    const el = document.getElementById(`product-${product.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Filter products based on category, subcategory, product selection, and search query
  const filteredProducts = useMemo(() => {
    let list = ALL_TREE_PRODUCTS;

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
  }, [activeCategoryId, activeSubcategoryId, activeProductSlug, query]);

  // Current active labels for breadcrumb
  const currentCategory = PRODUCT_CATEGORIES_TREE.find((c) => c.id === activeCategoryId);
  const currentSubcategory = currentCategory?.subcategories.find((s) => s.id === activeSubcategoryId);
  const currentProduct = ALL_TREE_PRODUCTS.find((p) => p.id === activeProductSlug);

  return (
    <main className="bg-ink-950">
      <PageHero
        code="Products"
        eyebrow="Precision Motion Solutions · 4,500+ Specifications"
        lines={['Engineered for', 'Every motion']}
        body="A complete bearing, linear shaft and motion guidance range from one verified source — selected with you for the load, speed and envelope your application actually works in."
      />

      {/* Main Browse Section with Side Tree Navbar */}
      <section aria-label="Product Catalog Explorer" className="relative border-b border-ink-800 bg-ink-950 py-10 lg:py-16">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
          
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
                  Product Categories & Navigation
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
                placeholder="Search products, series, specifications..."
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

          {/* 2-Column Desktop Grid: Left Sidebar Tree + Right Product View */}
          <div className="grid items-start gap-8 lg:grid-cols-[330px_1fr] xl:grid-cols-[360px_1fr] lg:gap-10">
            
            {/* Desktop Side Product Navbar (Tree View) */}
            <aside
              data-lenis-prevent
              className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:z-10"
            >
              <div
                data-lenis-prevent
                className={`border border-ink-800 bg-ink-900/90 p-5 backdrop-blur-md transition-all duration-300 overscroll-contain ${
                  hasExpandedItems
                    ? 'catalogue-sidebar-scroll max-h-[calc(100vh-120px)] overflow-y-auto pr-2'
                    : 'overflow-hidden'
                }`}
              >
                
                {/* Search Bar in Sidebar */}
                <div className="mb-5">
                  <div className="relative">
                    <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-steel-500" aria-hidden />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search range & series..."
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
                <div className="mb-4 flex items-center justify-between gap-2 border-b border-ink-800 pb-3">
                  <div className="flex items-center gap-2">
                    <LayersIcon className="h-4 w-4 text-signal" aria-hidden />
                    <span className="font-mono text-xs font-bold uppercase tracking-tech text-steel-200">
                      Product Hierarchy
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={selectAll}
                    data-active={!activeCategoryId && !activeSubcategoryId && !activeProductSlug}
                    className={`sidebar-view-all-btn inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      !activeCategoryId && !activeSubcategoryId && !activeProductSlug
                        ? 'border-signal bg-signal/15 text-signal shadow-[0_0_10px_rgba(245,196,0,0.25)]'
                        : 'border-ink-700 bg-ink-950/80 text-steel-300 hover:border-signal/50 hover:text-signal hover:bg-ink-900'
                    }`}
                  >
                    <span>View All</span>
                    <span className="count-badge rounded bg-signal/20 px-1.5 py-0.5 text-[10px] font-bold text-signal">
                      {ALL_TREE_PRODUCTS.length}
                    </span>
                  </button>
                </div>

                {/* Tree View: Categories -> Subcategories -> Products */}
                <nav aria-label="Product Hierarchy Navigation" className="space-y-2.5">
                  {PRODUCT_CATEGORIES_TREE.map((category) => {
                    const isCategoryExpanded = expandedCategories[category.id] ?? false;
                    const isCategoryActive = activeCategoryId === category.id && isCategoryExpanded;
                    const catProductCount = category.subcategories.reduce(
                      (acc, sub) => acc + sub.products.length,
                      0
                    );

                    return (
                      <div
                        key={category.id}
                        className={`product-tree-category-box border transition-all duration-200 ${
                          isCategoryActive
                            ? 'active-tree-category border-signal/60 bg-ink-800/90'
                            : 'border-ink-800/80 bg-ink-950/60 hover:border-ink-700'
                        }`}
                      >
                        {/* 1. Category Header Row - Whole row is interactive button to toggle show/hide */}
                        <button
                          type="button"
                          onClick={() => handleCategoryClick(category.id)}
                          aria-expanded={isCategoryExpanded}
                          data-active={isCategoryActive}
                          className={`product-tree-category-btn group flex w-full items-center justify-between px-3.5 py-3 text-left transition-colors ${
                            isCategoryActive ? 'category-active-row bg-ink-800/90 text-signal' : 'text-steel-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="category-code font-mono text-xs font-bold text-signal">
                              {category.code}
                            </span>
                            <span className="category-name font-display text-sm font-bold uppercase tracking-wider truncate">
                              {category.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`category-count font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                                isCategoryActive
                                  ? 'bg-signal/20 text-signal border border-signal/30'
                                  : 'text-steel-400 bg-ink-900/60'
                              }`}
                            >
                              {catProductCount}
                            </span>
                            <span className="p-0.5 text-steel-400 group-hover:text-signal transition-colors">
                              {isCategoryExpanded ? (
                                <ChevronDownIcon className="h-4 w-4 text-signal" />
                              ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                              )}
                            </span>
                          </div>
                        </button>

                        {/* 2. Subcategories List (Shown if Category is expanded) */}
                        {isCategoryExpanded && (
                          <div className="border-t border-ink-800/60 py-2">
                            {category.subcategories.map((subcategory) => {
                              const isSubExpanded = expandedSubcategories[subcategory.id] ?? false;
                              const isSubActive = activeSubcategoryId === subcategory.id && isSubExpanded;

                              return (
                                <div key={subcategory.id} className="ml-3.5 border-l border-ink-800 pl-2.5">
                                  {/* Subcategory Row - Whole row is interactive button to toggle show/hide */}
                                  <button
                                    type="button"
                                    onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
                                    aria-expanded={isSubExpanded}
                                    data-active={isSubActive}
                                    className={`product-tree-subcat-btn group flex w-full items-center justify-between py-2 pr-2 text-left transition-colors ${
                                      isSubActive ? 'text-signal font-semibold' : 'text-steel-300 hover:text-steel-100'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 truncate min-w-0 font-display text-[13px] font-semibold uppercase tracking-wide">
                                      <span className="text-signal/70">&bull;</span>
                                      <span className="truncate">{subcategory.name}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <span className="font-mono text-[11px] text-steel-400">
                                        ({subcategory.products.length})
                                      </span>
                                      <span className="p-0.5 text-steel-400 group-hover:text-signal transition-colors">
                                        {isSubExpanded ? (
                                          <ChevronDownIcon className="h-3.5 w-3.5 text-signal" />
                                        ) : (
                                          <ChevronRightIcon className="h-3.5 w-3.5" />
                                        )}
                                      </span>
                                    </div>
                                  </button>

                                  {/* 3. Products List (Shown if Subcategory is expanded) */}
                                  {isSubExpanded && (
                                    <div className="ml-3.5 space-y-1.5 border-l border-ink-800/80 py-1.5 pl-2.5">
                                      {subcategory.products.map((prod) => {
                                        const isProdActive = activeProductSlug === prod.id;

                                        return (
                                          <button
                                            key={prod.id}
                                            type="button"
                                            onClick={() => selectProduct(prod)}
                                            className={`group flex w-full items-center justify-between py-1 text-left font-mono text-xs transition-colors ${
                                              isProdActive
                                                ? 'font-bold text-signal'
                                                : 'text-steel-400 hover:text-steel-100'
                                            }`}
                                          >
                                            <span className="truncate pr-2">
                                              - {prod.name}
                                            </span>
                                            {prod.pdfUrl && (
                                              <span
                                                className="shrink-0 text-signal/80 group-hover:text-signal"
                                                title="PDF available for download"
                                              >
                                                <FileTextIcon className="h-3 w-3" />
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

            {/* Right Column: Active Breadcrumbs, Filters, and Product Cards Grid */}
            <div id="products-content-top" className="min-w-0 scroll-mt-24">
              
              {/* Header Bar with Breadcrumb Filter trail */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-ink-800 pb-4">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-tech text-steel-400">
                  <button
                    type="button"
                    onClick={selectAll}
                    className="hover:text-signal transition-colors text-steel-300"
                  >
                    All Products
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
                    {ALL_TREE_PRODUCTS.length}
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
                            <span className="border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-tech text-signal">
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
                              background: 'radial-gradient(circle, rgba(245,180,0,0.12) 0%, transparent 68%)'
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
                              {product.series.slice(0, 3).map((s) => (
                                <span
                                  key={s}
                                  className="border border-ink-800 bg-ink-950 px-2 py-0.5 font-mono text-[9px] uppercase text-steel-400"
                                >
                                  {s}
                                </span>
                              ))}
                              {product.series.length > 3 && (
                                <span className="px-1 font-mono text-[9px] text-steel-500">
                                  +{product.series.length - 3} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Primary Application Bullet */}
                          <div className="mt-4 border-t border-ink-800/80 pt-3">
                            <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                              Application Focus:
                            </p>
                            <p className="mt-0.5 text-xs text-steel-300 truncate">
                              {product.applications[0] ?? 'General Industrial'}
                            </p>
                          </div>

                          {/* Card Footer: Action Buttons & Download PDF */}
                          <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink-800">
                            
                            {/* DOWNLOAD BROCHURE ACTION */}
                            <a
                              href={product.pdfUrl || '/assets/won-st-linear-motion-guide-catalogue.pdf'}
                              download={product.pdfFileName ?? `${product.id}-brochure.pdf`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-signal px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-wider text-ink-950 transition-all duration-200 hover:bg-signal-bright hover:shadow-[0_4px_16px_rgba(245,196,0,0.35)] active:translate-y-0.5"
                              title={`Download Brochure: ${product.pdfTitle ?? product.name}`}
                            >
                              <DownloadIcon className="h-3.5 w-3.5" aria-hidden />
                              Download Brochure
                            </a>

                            {/* Inquiry / Quote Action */}
                            <Link
                              to={`/contact?subject=Inquiry%20for%20${encodeURIComponent(product.name)}`}
                              className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wider text-steel-300 hover:text-signal transition-colors"
                            >
                              Inquire <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden />
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
      </section>

      {/* Mobile Tree Slide-Over Drawer */}
      {mobileTreeOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={() => setMobileTreeOpen(false)}
            aria-hidden
          />
          <div data-lenis-prevent className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-ink-900 p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink-800 pb-3">
              <span className="font-display text-sm font-bold uppercase tracking-wider text-steel-50">
                Products Hierarchy
              </span>
              <button
                type="button"
                onClick={() => setMobileTreeOpen(false)}
                className="p-1 text-steel-400 hover:text-signal"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-2.5">
              <button
                type="button"
                onClick={selectAll}
                className="w-full border border-ink-800 bg-ink-950 p-2.5 text-left font-display text-sm font-bold uppercase text-signal"
              >
                View All Products ({ALL_TREE_PRODUCTS.length})
              </button>

              {PRODUCT_CATEGORIES_TREE.map((category) => {
                const isCatExpanded = expandedCategories[category.id] ?? false;

                return (
                  <div key={category.id} className="border border-ink-800 bg-ink-950/60 p-2.5">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className="flex w-full items-center justify-between py-1.5 text-left font-display text-sm font-bold uppercase text-steel-100"
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
                              className="w-full py-1.5 text-left font-display text-xs font-semibold uppercase text-steel-300 hover:text-signal"
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

      <CTASection />
    </main>
  );
}