import { FormEvent, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRightIcon,
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  DownloadIcon,
  FileTextIcon,
  LayersIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  XIcon
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/layout/PageHero';
import { BearingGlyph } from '../components/ui/BearingGlyph';
import { TechnicalLabel } from '../components/ui/SectionHeading';
import {
  CatalogueRecord,
  catalogues,
  CatalogueLead,
  searchCatalogues,
  submitCatalogueLead
} from '../data/catalogues';
import { useSeo } from '../hooks/useSeo';

interface DownloadForm {
  fullName: string;
  companyName: string;
  mobile: string;
  email: string;
  city: string;
  industry: string;
  message: string;
}

const EMPTY_FORM: DownloadForm = {
  fullName: '',
  companyName: '',
  mobile: '',
  email: '',
  city: '',
  industry: '',
  message: ''
};

interface CategoryNode {
  id: string;
  label: string;
  code?: string;
  subcategories?: { id: string; label: string; count?: number }[];
}

const CATEGORY_TREE: CategoryNode[] = [
  {
    id: 'bearings',
    label: 'Bearings',
    code: '01',
    subcategories: [
      { id: 'all-bearings', label: 'All Bearings' },
      { id: 'rolling-bearings', label: 'Rolling Bearings' },
      { id: 'needle-roller', label: 'Needle Roller Bearings' },
      { id: 'bearing-units', label: 'Bearing Units & Housings' },
      { id: 'plain-rod-ends', label: 'Rod Ends & Plain Bearings' },
      { id: 'clutches-bushes', label: 'Clutches & Bushes' }
    ]
  },
  {
    id: 'linear-shafts',
    label: 'Linear Shafts',
    code: '02',
    subcategories: [
      { id: 'all-shafts', label: 'All Linear Shafts' },
      { id: 'shaft-custom-made', label: 'Custom-made' },
      { id: 'shaft-s-st', label: 'S-ST' },
      { id: 'shaft-s-stu', label: 'S-STU' },
      { id: 'shaft-st', label: 'ST' },
      { id: 'shaft-stu', label: 'STU' },
      { id: 'shaft-was-solid', label: 'WAS - Solid Shaft' },
      { id: 'hard-chrome-shafts', label: 'Hard-Chrome Shafts' },
      { id: 'shafts-with-support', label: 'Shafts with Support' },
      { id: 'shaft-supporting-units', label: 'Shaft Supporting Units' }
    ]
  },
  {
    id: 'linear-motion',
    label: 'Linear Motion',
    code: '03',
    subcategories: [
      { id: 'all-linear', label: 'All Linear Motion' },
      { id: 'linear-motion-bearings', label: 'Linear Motion Bearings' },
      { id: 'dual-shaft-guides', label: 'Dual Shaft Guides' },
      { id: 'linear-motion-shafts-with-support', label: 'Supported Shaft Rails' }
    ]
  },
  {
    id: 'power-transmission',
    label: 'Power Transmission',
    code: '04',
    subcategories: [
      { id: 'all-power', label: 'All Belts' },
      { id: 'v-belts', label: 'V-Belts' },
      { id: 'timing-belts', label: 'Timing Belts' }
    ]
  },
  {
    id: 'brands',
    label: 'Partner Brands',
    code: '05',
    subcategories: [
      { id: 'brand-iko', label: 'IKO Nippon Thompson' },
      { id: 'brand-won', label: 'WON ST Linear' },
      { id: 'brand-stieber', label: 'STIEBER Clutch' },
      { id: 'brand-ina-fag', label: 'INA / FAG' }
    ]
  }
];

export function Catalogue() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'az' | 'za' | 'default'>('default');
  const [selectedCatalogue, setSelectedCatalogue] = useState<CatalogueRecord | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const hasExpandedCategory = Object.values(expandedCategories).some(Boolean);

  const downloadButtonRef = useRef<HTMLButtonElement | null>(null);

  // Active category & subcategory from URL params (defaults to all catalogues)
  const activeCategory = params.get('category') ?? 'all';
  const activeSub = params.get('sub') ?? '';

  useSeo({
    title: 'Product Catalogues & Brochures',
    description: 'Explore KHS-LG technical brochures, product catalogues, and engineering documentation for precision industrial bearings, linear shafts, and motion systems.',
    path: '/catalogue'
  });

  const scrollToCatalogueTop = () => {
    const target = document.getElementById('catalogue-content-top');
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
    const target = document.getElementById('catalogue-content-top');
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 90;
      if (window.scrollY > topOffset + 50) {
        window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
      }
    }
  }, [activeCategory, activeSub]);

  const handleCategoryHeaderClick = (catId: string) => {
    const isCurrentlyExpanded = Boolean(expandedCategories[catId]);
    if (isCurrentlyExpanded) {
      setExpandedCategories((prev) => ({ ...prev, [catId]: false }));
      if (activeCategory === catId) {
        handleSelectCategory('all');
      }
    } else {
      setExpandedCategories((prev) => ({ ...prev, [catId]: true }));
      handleSelectCategory(catId);
    }
  };

  const handleSelectCategory = (categoryId: string, subId = '') => {
    const nextParams = new URLSearchParams();
    if (categoryId !== 'all') {
      nextParams.set('category', categoryId);
    }
    if (subId && !subId.startsWith('all-')) {
      nextParams.set('sub', subId);
    }
    setParams(nextParams);
    setMobileSidebarOpen(false);
  };

  const getCategoryCount = (catId: string) => {
    if (catId === 'bearings') return catalogues.filter((c) => c.group === 'Bearings').length;
    if (catId === 'linear-shafts') return catalogues.filter((c) => c.group === 'Linear Shafts').length;
    if (catId === 'linear-motion') return catalogues.filter((c) => c.group === 'Linear Motion').length;
    if (catId === 'power-transmission') return catalogues.filter((c) => c.group === 'Power Transmission').length;
    if (catId === 'brands') {
      const brandCat = CATEGORY_TREE.find((c) => c.id === 'brands');
      return brandCat?.subcategories?.length ?? 4;
    }
    return 0;
  };

  // Filter catalogue items based on activeCategory, activeSub, and search query
  const filteredCatalogues = useMemo(() => {
    let list = catalogues;

    // Apply category filter
    if (activeCategory === 'bearings') {
      list = list.filter((c) => c.group === 'Bearings');
      if (activeSub === 'rolling-bearings') {
        const rollingIds = ['taper-roller-bearings', 'spherical-roller-bearings', 'deep-groove-ball-bearings', 'miniature-ball-bearings', 'cylindrical-roller-bearings', 'self-aligning-ball-bearings', 'precision-angular-contact-bearings', 'thrust-ball-bearings', 'cylindrical-roller-thrust-bearings', 'spherical-roller-thrust-bearings'];
        list = list.filter((c) => rollingIds.includes(c.id));
      } else if (activeSub === 'needle-roller') {
        const needleIds = ['machined-type-needle-roller-bearings', 'drawn-cup-needle-roller-bearings', 'thrust-needle-roller-bearings', 'needle-roller-and-cage-assemblies', 'flat-roller-cages'];
        list = list.filter((c) => needleIds.includes(c.id));
      } else if (activeSub === 'bearing-units') {
        list = list.filter((c) => c.id === 'pillow-block-bearings');
      } else if (activeSub === 'plain-rod-ends') {
        const plainIds = ['rod-end-bearings', 'radial-spherical-plain-bearings', 'stud-and-yoke-track-roller-bearings', 'track-roller-bearings'];
        list = list.filter((c) => plainIds.includes(c.id));
      } else if (activeSub === 'clutches-bushes') {
        const clutchIds = ['one-way-clutch', 'drawn-cup-needle-roller-clutches', 'permaglide-dry-bush'];
        list = list.filter((c) => clutchIds.includes(c.id));
      }
    } else if (activeCategory === 'linear-shafts') {
      list = list.filter((c) => c.group === 'Linear Shafts');
      if (activeSub && !activeSub.startsWith('all-')) {
        list = list.filter((c) => c.id === activeSub);
      }
    } else if (activeCategory === 'linear-motion') {
      list = list.filter((c) => c.group === 'Linear Motion');
      if (activeSub && !activeSub.startsWith('all-')) {
        list = list.filter((c) => c.id === activeSub);
      }
    } else if (activeCategory === 'power-transmission' || activeCategory === 'v-belts') {
      list = list.filter((c) => c.group === 'Power Transmission');
      if (activeSub === 'timing-belts') {
        list = list.filter((c) => c.id.includes('timing'));
      } else if (activeSub === 'v-belts') {
        list = list.filter((c) => !c.id.includes('timing'));
      }
    } else if (activeCategory === 'brands') {
      if (activeSub === 'brand-iko') {
        const ikoIds = ['machined-type-needle-roller-bearings', 'stud-and-yoke-track-roller-bearings', 'radial-spherical-plain-bearings', 'linear-motion-bearings', 'rod-end-bearings', 'cylindrical-roller-bearings'];
        list = list.filter((c) => ikoIds.includes(c.id));
      } else if (activeSub === 'brand-won') {
        const wonIds = ['linear-motion-bearings', 'linear-motion-shafts-with-support', 'dual-shaft-guides', 'shaft-st', 'shaft-was-solid'];
        list = list.filter((c) => wonIds.includes(c.id));
      } else if (activeSub === 'brand-stieber') {
        const stieberIds = ['one-way-clutch', 'drawn-cup-needle-roller-clutches', 'permaglide-dry-bush'];
        list = list.filter((c) => stieberIds.includes(c.id));
      } else if (activeSub === 'brand-ina-fag') {
        const inaIds = ['taper-roller-bearings', 'spherical-roller-bearings', 'deep-groove-ball-bearings', 'cylindrical-roller-bearings', 'needle-roller-and-cage-assemblies'];
        list = list.filter((c) => inaIds.includes(c.id));
      }
    }

    // Apply search query
    if (query.trim()) {
      list = searchCatalogues(query, list);
    }

    // Apply sort
    if (sort === 'az') {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === 'za') {
      return [...list].sort((a, b) => b.title.localeCompare(a.title));
    }
    return list;
  }, [activeCategory, activeSub, query, sort]);

  const activeNode = CATEGORY_TREE.find((c) => c.id === activeCategory);
  const activeSubNode = activeNode?.subcategories?.find((s) => s.id === activeSub);

  const openDownload = (catalogue: CatalogueRecord, button?: HTMLButtonElement) => {
    downloadButtonRef.current = button ?? null;
    setSelectedCatalogue(catalogue);
  };

  const closeDownload = () => {
    setSelectedCatalogue(null);
    window.setTimeout(() => downloadButtonRef.current?.focus(), 0);
  };

  return (
    <main className="min-h-screen bg-ink-950 text-steel-100">
      <PageHero
        code="KHS-LG / Technical Documentation"
        eyebrow="Download Engineering Catalogues & Brochures"
        lines={['Product', 'Catalogues']}
        body="Access comprehensive technical brochures, 2D/3D specifications, and product data sheets across our full bearing and linear motion range."
        showCatalogueBearing={false}
      />

      <div className="border-b border-ink-800 bg-ink-900/60">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="inline-flex items-center gap-2 border border-ink-700 bg-ink-950 px-3.5 py-2 font-mono text-[11px] uppercase tracking-tech text-steel-200 hover:border-signal lg:hidden"
              aria-label="Toggle Category Navigation"
            >
              <SlidersHorizontalIcon className="h-4 w-4 text-signal" />
              Categories ({filteredCatalogues.length})
            </button>
            <div className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-tech text-steel-400 sm:flex">
              <span className="text-signal">KHS-LG</span>
              <span>/</span>
              <span>{activeNode ? activeNode.label : 'All Catalogues'}</span>
              {activeSubNode && (
                <>
                  <span>/</span>
                  <span className="text-steel-200">{activeSubNode.label}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3 sm:flex-initial">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-steel-500" aria-hidden />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search brochures..."
                className="w-full border border-ink-700 bg-ink-950 py-2 pl-9 pr-8 font-mono text-[11px] text-steel-100 placeholder:text-steel-600 focus:border-signal focus:outline-none"
                aria-label="Search brochures"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-steel-500 hover:text-signal"
                  aria-label="Clear search"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as 'az' | 'za' | 'default')}
              className="border border-ink-700 bg-ink-950 px-3 py-2 font-mono text-[11px] uppercase tracking-tech text-steel-300 focus:border-signal focus:outline-none"
              aria-label="Sort brochures"
            >
              <option value="default">Default Order</option>
              <option value="az">A – Z</option>
              <option value="za">Z – A</option>
            </select>
          </div>
        </div>
      </div>

      <div id="catalogue-content-top" className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[330px_1fr] lg:gap-10 xl:grid-cols-[360px_1fr]">
          {/* ================= LEFT SIDEBAR (CATEGORY TREE - STICKY) ================= */}
          <aside
            data-lenis-prevent
            className={`fixed inset-y-0 left-0 z-50 w-80 transform bg-ink-950 p-6 shadow-2xl transition-transform duration-300 ease-in-out lg:sticky lg:top-24 lg:self-start lg:z-10 lg:w-full lg:transform-none lg:bg-transparent lg:p-0 lg:shadow-none ${
              mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            <div
              data-lenis-prevent
              className={`lg:border lg:border-ink-800 lg:bg-ink-900/90 lg:p-5 lg:backdrop-blur-md transition-all duration-300 overscroll-contain ${
                hasExpandedCategory
                  ? 'catalogue-sidebar-scroll lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2'
                  : 'lg:overflow-hidden'
              }`}
            >
              {/* Mobile Close Bar */}
              <div className="flex items-center justify-between border-b border-ink-800 pb-4 lg:hidden">
                <span className="font-display text-sm font-bold uppercase tracking-wider text-steel-100">
                  Brochure Hierarchy
                </span>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-steel-400 hover:text-signal"
                  aria-label="Close sidebar"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Sidebar Header & All Catalogues Reset */}
              <div className="mb-4 flex items-center justify-between gap-2 border-b border-ink-800 pb-3">
                <div className="flex items-center gap-2">
                  <LayersIcon className="h-4 w-4 text-signal" aria-hidden />
                  <span className="font-mono text-xs font-bold uppercase tracking-tech text-steel-200">
                    Brochure Hierarchy
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleSelectCategory('all');
                    setExpandedCategories({});
                    scrollToCatalogueTop();
                  }}
                  data-active={activeCategory === 'all' || !activeCategory}
                  className={`sidebar-view-all-btn inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeCategory === 'all' || !activeCategory
                      ? 'border-signal bg-signal/15 text-signal shadow-[0_0_10px_rgba(245,196,0,0.25)]'
                      : 'border-ink-700 bg-ink-950/80 text-steel-300 hover:border-signal/50 hover:text-signal hover:bg-ink-900'
                  }`}
                >
                  <span>All Catalogues</span>
                  <span className="count-badge rounded bg-signal/20 px-1.5 py-0.5 text-[10px] font-bold text-signal">
                    {catalogues.length}
                  </span>
                </button>
              </div>

              {/* Tree View: Categories -> Subcategories */}
              <nav aria-label="Catalogue Hierarchy Navigation" className="space-y-2.5">
                {CATEGORY_TREE.map((cat) => {
                  const isCategoryExpanded = Boolean(expandedCategories[cat.id]);
                  const isCategoryActive = activeCategory === cat.id && isCategoryExpanded;
                  const catCatalogueCount = getCategoryCount(cat.id);

                  return (
                    <div
                      key={cat.id}
                      className={`product-tree-category-box border transition-all duration-200 ${
                        isCategoryActive
                          ? 'active-tree-category border-signal/60 bg-ink-800/90'
                          : 'border-ink-800/80 bg-ink-950/60 hover:border-ink-700'
                      }`}
                    >
                      {/* 1. Category Header Row - Whole row toggles dropdown */}
                      <button
                        type="button"
                        onClick={() => handleCategoryHeaderClick(cat.id)}
                        aria-expanded={isCategoryExpanded}
                        data-active={isCategoryActive}
                        className={`product-tree-category-btn group flex w-full items-center justify-between px-3.5 py-3 text-left transition-colors ${
                          isCategoryActive ? 'category-active-row bg-ink-800/90 text-signal' : 'text-steel-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="category-code font-mono text-xs font-bold text-signal">
                            {cat.code}
                          </span>
                          <span className="category-name font-display text-sm font-bold uppercase tracking-wider truncate">
                            {cat.label}
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
                            {catCatalogueCount}
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
                      {isCategoryExpanded && cat.subcategories && (
                        <div className="border-t border-ink-800/60 py-2">
                          <div className="ml-3.5 space-y-0.5 border-l border-ink-800 pl-2.5">
                            {cat.subcategories.map((sub) => {
                              const isSubSelected =
                                activeCategory === cat.id &&
                                (activeSub === sub.id || (!activeSub && sub.id.startsWith('all-')));

                              return (
                                <button
                                  key={sub.id}
                                  type="button"
                                  onClick={() => handleSelectCategory(cat.id, sub.id)}
                                  data-active={isSubSelected}
                                  className={`product-tree-subcat-btn group flex w-full items-center justify-between py-2 pr-2 text-left text-xs sm:text-[13px] transition-colors ${
                                    isSubSelected
                                      ? 'bg-signal/15 font-semibold text-signal'
                                      : 'text-steel-400 hover:bg-ink-900 hover:text-steel-200'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate min-w-0 font-display text-[13px] font-semibold uppercase tracking-wide">
                                    <span className="text-signal/70">&bull;</span>
                                    <span className="truncate">{sub.label}</span>
                                  </div>
                                  <ChevronRightIcon
                                    className={`h-3.5 w-3.5 transition-transform ${
                                      isSubSelected ? 'translate-x-0.5 text-signal' : 'text-ink-600 group-hover:text-steel-500'
                                    }`}
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Quick Contact Box in Sidebar */}
              <div className="mt-5 border border-ink-800 bg-ink-900/60 p-3.5">
                <span className="font-mono text-[9px] uppercase tracking-tech text-signal">Custom Engineering</span>
                <p className="mt-1 font-display text-[12px] font-bold uppercase text-steel-100">
                  Need OEM Specifications?
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-steel-400">
                  Contact our engineering team for customized drawings, shaft machining, or non-standard dimensions.
                </p>
                <Link
                  to="/contact"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-tech text-signal hover:underline"
                >
                  Inquire now →
                </Link>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT MAIN AREA (CATALOGUE GRID) ================= */}
          <section className="min-w-0">
            {/* Header info */}
            <div className="mb-6 flex flex-col gap-2 border-b border-ink-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <TechnicalLabel code={activeNode?.code ?? 'ALL'}>
                  {activeNode ? activeNode.label : 'Full Catalogue Portfolio'}
                </TechnicalLabel>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-steel-50 sm:text-3xl">
                  {activeSubNode ? activeSubNode.label : activeNode?.label ?? 'All Product Catalogues'}
                </h2>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-tech text-steel-500">
                Showing <span className="font-bold text-signal">{filteredCatalogues.length}</span> catalogues
              </div>
            </div>

            {/* Cards Grid */}
            {filteredCatalogues.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCatalogues.map((item, index) => (
                  <ReferenceCatalogueCard
                    key={item.id}
                    catalogue={item}
                    index={index}
                    onDownload={openDownload}
                  />
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-ink-700 bg-ink-900/40 p-12 text-center">
                <FileTextIcon className="mx-auto h-8 w-8 text-steel-600" />
                <p className="mt-4 font-mono text-[11px] uppercase tracking-tech text-steel-400">
                  No matching catalogues found
                </p>
                <p className="mt-2 text-sm text-steel-500">
                  Try clearing your search term or select another category from the sidebar.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    handleSelectCategory('all');
                  }}
                  className="mt-6 border border-signal/60 bg-signal/10 px-4 py-2 font-mono text-[11px] uppercase tracking-tech text-signal hover:bg-signal hover:text-ink-950"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Download Form Modal */}
      {selectedCatalogue && (
        <CatalogueDownloadModal catalogue={selectedCatalogue} onClose={closeDownload} />
      )}
    </main>
  );
}

/**
 * Catalogue Card strictly following the reference image layout:
 * - Product Title on top
 * - High-res transparent product image in center
 * - "DOWNLOAD Brochure" action at bottom
 */
export function ReferenceCatalogueCard({
  catalogue,
  onDownload
}: {
  catalogue: CatalogueRecord;
  index: number;
  onDownload: (catalogue: CatalogueRecord, button?: HTMLButtonElement) => void;
}) {
  return (
    <article className="catalogue-card group flex h-full flex-col justify-between border border-ink-800 bg-ink-900/70 p-5 transition-all duration-300 hover:border-signal/50 hover:bg-ink-800/80 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
      {/* 1. TOP: Product Title & Category */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="catalogue-card-title font-display text-lg font-bold uppercase tracking-tight text-steel-50 transition-colors group-hover:text-signal sm:text-xl">
            {catalogue.title}
          </h3>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-tech text-steel-500">
            {catalogue.categoryTag ? catalogue.categoryTag.split(' ')[0] : 'KHS-LG'}
          </span>
        </div>

        {catalogue.series.length > 0 && (
          <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-tech text-steel-500">
            {catalogue.series.slice(0, 3).join(' · ')}
          </p>
        )}
      </div>

      {/* 2. CENTER: Clean Product Image Frame */}
      <div className="catalogue-card-img-frame relative my-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-md border border-ink-800/80 bg-ink-950/70 p-4 transition-colors group-hover:border-ink-700 sm:h-52">
        <div className="industrial-grid absolute inset-0 opacity-15" aria-hidden />

        {catalogue.image ? (
          <img
            src={catalogue.image}
            alt={catalogue.title}
            className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-32 w-32 opacity-80">
            <BearingGlyph
              shape={catalogue.group === 'Bearings' ? 'ball' : 'linear'}
              rollers={12}
            />
          </div>
        )}
      </div>

      {/* 3. BOTTOM: Actions matching reference UI ("DOWNLOAD Brochure") */}
      <div className="mt-auto pt-2">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={(e) => onDownload(catalogue, e.currentTarget)}
            className="catalogue-card-download-btn flex flex-1 items-center justify-center gap-2 rounded border border-signal/80 bg-signal/10 px-4 py-2.5 font-display text-[11px] font-bold uppercase tracking-[0.15em] text-signal transition-all hover:bg-signal hover:text-ink-950 active:scale-[0.98]"
            aria-label={`Download brochure for ${catalogue.title}`}
          >
            <DownloadIcon className="h-3.5 w-3.5" aria-hidden />
            <span>DOWNLOAD Brochure</span>
          </button>

          <Link
            to={`/catalogue/${catalogue.id}`}
            className="catalogue-card-link-btn inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border border-ink-700 bg-ink-950 text-steel-400 transition-colors hover:border-signal hover:text-signal"
            title="View Details"
            aria-label={`View details for ${catalogue.title}`}
          >
            <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * Lead capture modal for downloading brochures and catalogues
 */
export function CatalogueDownloadModal({
  catalogue,
  onClose
}: {
  catalogue: CatalogueRecord;
  onClose: () => void;
}) {
  const [form, setForm] = useState<DownloadForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof DownloadForm, string>>>({});
  const [state, setState] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && state !== 'processing') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, state]);

  const update =
    (key: keyof DownloadForm) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((cur) => ({ ...cur, [key]: event.target.value }));
      setErrors((cur) => ({ ...cur, [key]: undefined }));
    };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<keyof DownloadForm, string>> = {};
    if (!form.fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!form.companyName.trim()) next.companyName = 'Please enter your company name.';
    if (!/^\+?[\d\s().-]{8,}$/.test(form.mobile.trim()))
      next.mobile = 'Please enter a valid mobile number.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
      next.email = 'Please enter a valid email address.';
    if (!form.city.trim()) next.city = 'Please enter your city.';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState('processing');
    window.setTimeout(() => {
      try {
        submitCatalogueLead(catalogue, form);
        if (catalogue.pdfUrl) {
          const link = document.createElement('a');
          link.href = catalogue.pdfUrl;
          link.download = catalogue.pdfFileName || `${catalogue.id}.pdf`;
          link.target = '_blank';
          link.rel = 'noreferrer';
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
        setState('success');
      } catch {
        setState('error');
      }
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-ink-950/85 px-4 py-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalogue-download-heading"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && state !== 'processing') onClose();
      }}
    >
      <div className="relative my-auto grid max-h-[calc(100vh-3rem)] w-full max-w-4xl overflow-y-auto border border-ink-700 bg-ink-950 shadow-2xl lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left Side: Product Details */}
        <div className="relative flex min-h-52 flex-col justify-between overflow-hidden border-b border-ink-800 bg-ink-900/90 p-7 lg:border-b-0 lg:border-r sm:p-8">
          <div className="industrial-grid absolute inset-0 opacity-20" aria-hidden />

          <div className="relative">
            <span className="font-mono text-[10px] uppercase tracking-tech text-signal">
              KHS-LG Documentation
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase text-steel-50 sm:text-3xl">
              {catalogue.title}
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-steel-400">
              {catalogue.description}
            </p>
          </div>

          <div className="relative my-6 flex h-36 items-center justify-center">
            {catalogue.image ? (
              <img
                src={catalogue.image}
                alt={catalogue.title}
                className="max-h-full max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
              />
            ) : (
              <BearingGlyph shape="ball" rollers={12} className="h-28 w-28" />
            )}
          </div>

          {catalogue.series.length > 0 && (
            <div className="relative border-t border-ink-800 pt-3">
              <span className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                Series Covered
              </span>
              <p className="mt-1 font-mono text-[11px] text-steel-300">
                {catalogue.series.join(' · ')}
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Lead Capture Form */}
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close download form"
            className="absolute right-4 top-4 p-2 text-steel-500 hover:text-signal"
          >
            <XIcon className="h-5 w-5" aria-hidden />
          </button>

          {state === 'success' ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <CheckCircle2Icon className="h-12 w-12 text-signal" aria-hidden />
              <p className="mt-5 font-mono text-[10px] uppercase tracking-tech text-signal">
                Request Confirmed
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase text-steel-50">
                Your brochure download is ready!
              </h3>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-steel-400">
                Thank you for your interest. A copy has been opened in your browser, and our technical engineering department will follow up with complete specifications if needed.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 border border-signal bg-signal px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-ink-950 hover:bg-signal-bright"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              <TechnicalLabel code="Free Access">Product Catalogue Download</TechnicalLabel>
              <h2
                id="catalogue-download-heading"
                className="mt-2 pr-6 font-display text-2xl font-bold uppercase leading-tight text-steel-50"
              >
                Enter your details to download brochure
              </h2>
              <p className="mt-2 text-xs text-steel-400">
                Please complete the form below to instantly access official technical drawings and load ratings.
              </p>

              {state === 'error' && (
                <p className="mt-4 border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-200">
                  An error occurred. Please try again.
                </p>
              )}

              <form onSubmit={submit} noValidate className="mt-6 grid gap-3.5 sm:grid-cols-2">
                <CatalogueField
                  ref={firstInputRef}
                  id="cat-name"
                  label="Full Name"
                  value={form.fullName}
                  onChange={update('fullName')}
                  error={errors.fullName}
                  required
                />
                <CatalogueField
                  id="cat-company"
                  label="Company Name"
                  value={form.companyName}
                  onChange={update('companyName')}
                  error={errors.companyName}
                  required
                />
                <CatalogueField
                  id="cat-mobile"
                  label="Mobile Number"
                  type="tel"
                  value={form.mobile}
                  onChange={update('mobile')}
                  error={errors.mobile}
                  required
                />
                <CatalogueField
                  id="cat-email"
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  error={errors.email}
                  required
                />
                <CatalogueField
                  id="cat-city"
                  label="City / Location"
                  value={form.city}
                  onChange={update('city')}
                  error={errors.city}
                  required
                />
                <CatalogueField
                  id="cat-industry"
                  label="Industry / Application"
                  value={form.industry}
                  onChange={update('industry')}
                  placeholder="e.g. Automation, CNC, Steel"
                />
                <div className="sm:col-span-2">
                  <label htmlFor="cat-msg" className="field-label">
                    Specific Requirements (Optional)
                  </label>
                  <textarea
                    id="cat-msg"
                    rows={2}
                    value={form.message}
                    onChange={update('message')}
                    className="field-input resize-y text-xs"
                    placeholder="Provide shaft sizes, stroke lengths, or bearing numbers..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={state === 'processing'}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded bg-signal px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink-950 transition-colors hover:bg-signal-bright disabled:cursor-wait disabled:opacity-75 sm:col-span-2"
                >
                  {state === 'processing' ? 'Processing...' : 'Download Technical Brochure'}
                  <DownloadIcon className="h-4 w-4" aria-hidden />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const CatalogueField = forwardRef<
  HTMLInputElement,
  {
    id: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
    required?: boolean;
    placeholder?: string;
  }
>(({ id, label, value, onChange, type = 'text', error, required, ...props }, ref) => (
  <div>
    <label htmlFor={id} className="field-label text-xs">
      {label} {required && <span className="text-signal">*</span>}
    </label>
    <input
      ref={ref}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`field-input text-xs ${error ? 'border-red-400/80' : ''}`}
      aria-invalid={Boolean(error)}
      {...props}
    />
    {error && (
      <p className="mt-1 text-[11px] text-red-300" role="alert">
        {error}
      </p>
    )}
  </div>
));
