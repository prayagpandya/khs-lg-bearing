import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  SearchIcon,
  RotateCcwIcon,
  DownloadIcon,
  ArrowUpRightIcon,
  CheckIcon,
  FilterIcon,
  SlidersHorizontalIcon,
  TableIcon,
  LayoutGridIcon,
  CopyIcon,
  CheckCheckIcon,
  XIcon,
  FileTextIcon
} from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import {
  bearingRecords,
  filterProducts,
  BearingRecord,
  BEARING_CATEGORIES,
  BearingFilters
} from '../data/bearingSearch';
import { BearingGlyph } from '../components/ui/BearingGlyph';
import { WhatsAppIcon } from '../components/ui/SocialIcons';
import { COMPANY_WHATSAPP_URL } from '../data/company';
import { useSeo } from '../hooks/useSeo';
import { NoProductFoundNotice } from '../components/ui/NoProductFoundNotice';

const RANGE_FIELDS = [
  { key: 'innerDiameter', label: 'Inner Diameter', symbol: 'd', unit: 'mm' },
  { key: 'outerDiameter', label: 'Outer Diameter', symbol: 'D', unit: 'mm' },
  { key: 'width', label: 'Width / Height', symbol: 'B', unit: 'mm' }
] as const;

export function BearingSearchPage() {
  const [params, setParams] = useSearchParams();

  // Read URL query params
  const initialQuery = params.get('q') ?? params.get('search') ?? '';
  const initialDMin = params.get('d_min') ?? '';
  const initialDMax = params.get('d_max') ?? '';
  const initialOuterMin = params.get('D_min') ?? '';
  const initialOuterMax = params.get('D_max') ?? '';
  const initialBMin = params.get('B_min') ?? '';
  const initialBMax = params.get('B_max') ?? '';
  const initialCategory = params.get('category') ?? 'All Categories';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [innerDiameter, setInnerDiameter] = useState({ min: initialDMin, max: initialDMax });
  const [outerDiameter, setOuterDiameter] = useState({ min: initialOuterMin, max: initialOuterMax });
  const [width, setWidth] = useState({ min: initialBMin, max: initialBMax });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortBy, setSortBy] = useState<'partNumber' | 'innerDiameter' | 'outerDiameter' | 'load'>('innerDiameter');

  useSeo({
    title: 'Bearing Specifications & Dimensional Search',
    description:
      'Search KHS-LG bearings by part number, designation, inner diameter (d), outer diameter (D), and width (B). Filter precision bearings and download technical PDF catalogues.',
    path: '/bearing-search'
  });

  // Sync state if URL changes
  useEffect(() => {
    const q = params.get('q') ?? params.get('search') ?? '';
    const dMin = params.get('d_min') ?? '';
    const dMax = params.get('d_max') ?? '';
    const DMin = params.get('D_min') ?? '';
    const DMax = params.get('D_max') ?? '';
    const BMin = params.get('B_min') ?? '';
    const BMax = params.get('B_max') ?? '';
    const cat = params.get('category') ?? 'All Categories';

    setQuery(q);
    setInnerDiameter({ min: dMin, max: dMax });
    setOuterDiameter({ min: DMin, max: DMax });
    setWidth({ min: BMin, max: BMax });
    setSelectedCategory(cat);
  }, [params]);

  // Push updates to URL
  const updateUrlParams = (
    newQuery: string,
    newCat: string,
    d: { min: string; max: string },
    D: { min: string; max: string },
    B: { min: string; max: string }
  ) => {
    const next = new URLSearchParams();
    if (newQuery.trim()) next.set('q', newQuery.trim());
    if (newCat && newCat !== 'All Categories') next.set('category', newCat);
    if (d.min) next.set('d_min', d.min);
    if (d.max) next.set('d_max', d.max);
    if (D.min) next.set('D_min', D.min);
    if (D.max) next.set('D_max', D.max);
    if (B.min) next.set('B_min', B.min);
    if (B.max) next.set('B_max', B.max);
    setParams(next, { replace: true });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrlParams(val, selectedCategory, innerDiameter, outerDiameter, width);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    updateUrlParams(query, cat, innerDiameter, outerDiameter, width);
  };

  const handleRangeChange = (
    key: 'innerDiameter' | 'outerDiameter' | 'width',
    side: 'min' | 'max',
    val: string
  ) => {
    if (val && !/^\d*(\.\d*)?$/.test(val)) return;

    if (key === 'innerDiameter') {
      const next = { ...innerDiameter, [side]: val };
      setInnerDiameter(next);
      updateUrlParams(query, selectedCategory, next, outerDiameter, width);
    } else if (key === 'outerDiameter') {
      const next = { ...outerDiameter, [side]: val };
      setOuterDiameter(next);
      updateUrlParams(query, selectedCategory, innerDiameter, next, width);
    } else {
      const next = { ...width, [side]: val };
      setWidth(next);
      updateUrlParams(query, selectedCategory, innerDiameter, outerDiameter, next);
    }
  };

  const handleReset = () => {
    setQuery('');
    setSelectedCategory('All Categories');
    setInnerDiameter({ min: '', max: '' });
    setOuterDiameter({ min: '', max: '' });
    setWidth({ min: '', max: '' });
    setParams({});
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter and sort results
  const filteredResults = useMemo(() => {
    const filters: BearingFilters = {
      query,
      innerDiameter,
      outerDiameter,
      width,
      category: selectedCategory
    };

    const list = filterProducts(filters, bearingRecords);

    return [...list].sort((a, b) => {
      if (sortBy === 'innerDiameter') return a.innerDiameter - b.innerDiameter;
      if (sortBy === 'outerDiameter') return a.outerDiameter - b.outerDiameter;
      if (sortBy === 'load') return b.dynamicLoadRating - a.dynamicLoadRating;
      return a.partNumber.localeCompare(b.partNumber);
    });
  }, [query, selectedCategory, innerDiameter, outerDiameter, width, sortBy]);

  const hasActiveFilters = Boolean(
    query.trim() ||
      selectedCategory !== 'All Categories' ||
      innerDiameter.min ||
      innerDiameter.max ||
      outerDiameter.min ||
      outerDiameter.max ||
      width.min ||
      width.max
  );

  return (
    <main className="bg-ink-950 min-h-screen">
      <PageHero
        code="Bearing Finder"
        eyebrow="Precision Motion Lookup · Dimensional Search Engine"
        lines={['Search by Dimensions,', 'Part Number or Series']}
        body="Find the exact bearing specification for your assembly. Search by bore diameter (d), outer diameter (D), width (B), or manufacturer part number with technical load ratings and downloadable CAD catalogues."
      />

      <section className="relative border-b border-ink-800 bg-ink-900 py-10 lg:py-14">
        <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-8">
          {/* Main Search Panel */}
          <div className="rounded-xl border border-ink-700 bg-ink-950 p-5 shadow-2xl md:p-8">
            {/* Top Search Input */}
            <div className="relative">
              <label htmlFor="search-input" className="font-mono text-xs uppercase tracking-tech text-steel-400 font-semibold mb-2 block">
                Bearing Designation / Part Number / Series
              </label>
              <div className="relative flex items-center">
                <SearchIcon className="pointer-events-none absolute left-4 h-5 w-5 text-signal" />
                <input
                  id="search-input"
                  type="text"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder="e.g. 6204, NJ 205, 30205, GE 20 ES, SI 12, UCP 205, LM 20..."
                  className="w-full rounded-lg border border-ink-700 bg-ink-900 px-12 py-3.5 font-mono text-sm text-steel-50 placeholder:text-steel-500 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal/40"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => handleQueryChange('')}
                    className="absolute right-4 text-steel-400 hover:text-signal p-1"
                    aria-label="Clear query"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="mt-6">
              <span className="font-mono text-[10px] uppercase tracking-tech text-steel-500 block mb-2">
                Filter by Category
              </span>
              <div className="flex flex-wrap gap-2">
                {BEARING_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-all ${
                        isSelected
                          ? 'border-signal bg-signal text-ink-950 font-bold shadow-[0_0_12px_rgba(245,196,0,0.3)]'
                          : 'border-ink-700 bg-ink-900/60 text-steel-300 hover:border-steel-500 hover:text-steel-100'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dimensional Search Fields */}
            <div className="mt-8 border-t border-ink-800 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-signal">
                    Dimensional Filter (Metric mm)
                  </h3>
                  <p className="font-mono text-xs text-steel-400 mt-0.5">
                    Specify acceptable size boundaries. Leave empty to ignore any limit.
                  </p>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 border border-ink-700 bg-ink-900 px-3 py-1.5 font-mono text-xs text-steel-400 hover:border-signal hover:text-signal transition-colors self-start sm:self-auto rounded"
                  >
                    <RotateCcwIcon className="h-3.5 w-3.5" />
                    Reset All Filters
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {RANGE_FIELDS.map(({ key, label, symbol }) => {
                  const range =
                    key === 'innerDiameter' ? innerDiameter : key === 'outerDiameter' ? outerDiameter : width;
                  const isInvalid =
                    range.min && range.max && Number(range.min) > Number(range.max);

                  return (
                    <div key={key} className="rounded-lg border border-ink-800 bg-ink-900/50 p-3.5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display text-xs font-semibold uppercase text-steel-200">
                          {label}{' '}
                          <span className="font-mono text-signal">({symbol})</span>
                        </span>
                        <span className="font-mono text-[10px] text-steel-500">mm</span>
                      </div>

                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={range.min}
                          onChange={(e) => handleRangeChange(key, 'min', e.target.value)}
                          placeholder="Min mm"
                          className={`w-full rounded border bg-ink-950 px-3 py-2 font-mono text-xs text-steel-50 placeholder:text-steel-600 focus:outline-none focus:ring-1 ${
                            isInvalid
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                              : 'border-ink-700 focus:border-signal focus:ring-signal/30'
                          }`}
                        />
                        <span className="text-steel-600 font-mono text-xs">-</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={range.max}
                          onChange={(e) => handleRangeChange(key, 'max', e.target.value)}
                          placeholder="Max mm"
                          className={`w-full rounded border bg-ink-950 px-3 py-2 font-mono text-xs text-steel-50 placeholder:text-steel-600 focus:outline-none focus:ring-1 ${
                            isInvalid
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                              : 'border-ink-700 focus:border-signal focus:ring-signal/30'
                          }`}
                        />
                      </div>
                      {isInvalid && (
                        <p className="text-[10px] text-red-400 mt-1 font-mono">
                          Min cannot be greater than Max
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick Bore Dimension Presets */}
              <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-tech text-steel-500 mr-1">
                  Common Bore (d):
                </span>
                {[10, 12, 15, 17, 20, 25, 30, 35, 40, 50].map((bore) => (
                  <button
                    key={bore}
                    type="button"
                    onClick={() => {
                      const next = { min: String(bore), max: String(bore) };
                      setInnerDiameter(next);
                      updateUrlParams(query, selectedCategory, next, outerDiameter, width);
                    }}
                    className={`rounded border px-2 py-0.5 font-mono text-[11px] transition-colors ${
                      innerDiameter.min === String(bore) && innerDiameter.max === String(bore)
                        ? 'border-signal bg-signal/20 text-signal font-bold'
                        : 'border-ink-700 bg-ink-950 text-steel-400 hover:border-signal hover:text-signal'
                    }`}
                  >
                    {bore} mm
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Bar: Count, Sort, View Mode */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-ink-800 pb-4">
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-wider text-steel-100">
                Specifications Result{' '}
                <span className="text-signal">({filteredResults.length})</span>
              </p>
              <p className="font-mono text-xs text-steel-400">
                {hasActiveFilters
                  ? `Showing filtered bearings matching your criteria out of ${bearingRecords.length} records.`
                  : `Showing all standard industrial bearing specifications.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-steel-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded border border-ink-700 bg-ink-950 px-2.5 py-1.5 font-mono text-xs text-steel-200 focus:border-signal focus:outline-none"
                >
                  <option value="innerDiameter">Bore (d) Min → Max</option>
                  <option value="outerDiameter">Outer Dia (D)</option>
                  <option value="partNumber">Part Number (A-Z)</option>
                  <option value="load">Dynamic Load (Cr)</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex rounded border border-ink-700 bg-ink-950 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  aria-label="Table view"
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'table' ? 'bg-signal text-ink-950' : 'text-steel-400 hover:text-steel-100'
                  }`}
                >
                  <TableIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-signal text-ink-950' : 'text-steel-400 hover:text-steel-100'
                  }`}
                >
                  <LayoutGridIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          {filteredResults.length > 0 ? (
            viewMode === 'table' ? (
              /* ENGINEERING TABLE VIEW */
              <div className="mt-6 overflow-x-auto rounded-xl border border-ink-700 bg-ink-950 shadow-xl">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-ink-700 bg-ink-900/90 text-[10px] uppercase tracking-tech text-steel-400">
                    <tr>
                      <th className="py-3.5 pl-5 pr-3">Part Number</th>
                      <th className="py-3.5 px-3">Product Family</th>
                      <th className="py-3.5 px-3 text-center">Bore d (mm)</th>
                      <th className="py-3.5 px-3 text-center">Outer D (mm)</th>
                      <th className="py-3.5 px-3 text-center">Width B (mm)</th>
                      <th className="py-3.5 px-3 text-right">Cr (kN)</th>
                      <th className="py-3.5 px-3 text-right">C0r (kN)</th>
                      <th className="py-3.5 px-3 text-center">Brochure</th>
                      <th className="py-3.5 pl-3 pr-5 text-right">Inquiry / Quote</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-800">
                    {filteredResults.map((item) => (
                      <tr
                        key={item.id}
                        className="transition-colors hover:bg-ink-900/80 group"
                      >
                        {/* Part Number */}
                        <td className="py-3.5 pl-5 pr-3 font-semibold text-steel-50">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-signal group-hover:underline">
                              {item.partNumber}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(item.partNumber, item.id)}
                              title="Copy Part Number"
                              className="text-steel-600 hover:text-steel-200 p-1"
                            >
                              {copiedId === item.id ? (
                                <CheckCheckIcon className="h-3.5 w-3.5 text-emerald-400" />
                              ) : (
                                <CopyIcon className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                          <span className="text-[10px] text-steel-500 font-sans">{item.series}</span>
                        </td>

                        {/* Product Family */}
                        <td className="py-3.5 px-3 text-steel-300 font-sans">
                          <Link
                            to={`/products?product=${item.slug}`}
                            className="hover:text-signal transition-colors"
                          >
                            {item.name}
                          </Link>
                        </td>

                        {/* Dimensions: d, D, B */}
                        <td className="py-3.5 px-3 text-center">
                          <span className="inline-block rounded bg-ink-900 px-2 py-0.5 text-signal font-bold">
                            {item.innerDiameter}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="inline-block rounded bg-ink-900 px-2 py-0.5 text-steel-200">
                            {item.outerDiameter}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="inline-block rounded bg-ink-900 px-2 py-0.5 text-steel-300">
                            {item.width}
                          </span>
                        </td>

                        {/* Load Ratings */}
                        <td className="py-3.5 px-3 text-right text-steel-300">
                          {item.dynamicLoadRating.toFixed(1)}
                        </td>
                        <td className="py-3.5 px-3 text-right text-steel-400">
                          {item.staticLoadRating.toFixed(1)}
                        </td>

                        {/* Brochure PDF */}
                        <td className="py-3.5 px-3 text-center">
                          {item.pdfUrl ? (
                            <a
                              href={item.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-steel-400 hover:text-signal transition-colors"
                              title="Download PDF Catalogue"
                            >
                              <DownloadIcon className="h-3.5 w-3.5" />
                              <span>PDF</span>
                            </a>
                          ) : (
                            <span className="text-steel-600">-</span>
                          )}
                        </td>

                        {/* Quote Action */}
                        <td className="py-3.5 pl-3 pr-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`https://wa.me/919175275964?text=${encodeURIComponent(
                                `Hello KHS-LG, I need a quotation for bearing Part Number: ${item.partNumber} (${item.name}, Size: ${item.innerDiameter}x${item.outerDiameter}x${item.width}mm).`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded bg-[#25D366]/10 px-2 py-1 text-[11px] font-semibold text-[#25D366] hover:bg-[#25D366] hover:text-ink-950 transition-colors"
                              title="Inquire via WhatsApp"
                            >
                              <WhatsAppIcon className="h-3 w-3" />
                              <span>Quote</span>
                            </a>
                            <Link
                              to={`/contact?subject=Inquiry%20for%20${encodeURIComponent(item.partNumber)}`}
                              className="text-steel-400 hover:text-signal p-1"
                              title="Email Inquiry"
                            >
                              <ArrowUpRightIcon className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* CARD GRID VIEW */
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredResults.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col rounded-xl border border-ink-800 bg-ink-950 p-5 shadow-lg transition-all hover:border-signal/40 hover:bg-ink-900/60"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-base font-bold text-signal">
                          {item.partNumber}
                        </span>
                        <p className="mt-0.5 text-xs text-steel-400 font-sans">{item.name}</p>
                      </div>
                      <span className="rounded bg-ink-900 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-steel-400">
                        {item.series}
                      </span>
                    </div>

                    {/* Dimensions Pill Matrix */}
                    <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg border border-ink-800 bg-ink-900/80 p-2.5 text-center font-mono">
                      <div>
                        <span className="text-[10px] text-steel-500 uppercase block">d (bore)</span>
                        <span className="text-sm font-bold text-signal">{item.innerDiameter} mm</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-steel-500 uppercase block">D (outer)</span>
                        <span className="text-sm font-bold text-steel-200">{item.outerDiameter} mm</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-steel-500 uppercase block">B (width)</span>
                        <span className="text-sm font-bold text-steel-300">{item.width} mm</span>
                      </div>
                    </div>

                    {/* Load Ratings */}
                    <div className="mt-3 flex items-center justify-between font-mono text-xs text-steel-400 px-1">
                      <span>Cr: <strong className="text-steel-200">{item.dynamicLoadRating} kN</strong></span>
                      <span>C0r: <strong className="text-steel-200">{item.staticLoadRating} kN</strong></span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 pt-4 border-t border-ink-800/80 flex items-center justify-between gap-2">
                      {item.pdfUrl ? (
                        <a
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-steel-400 hover:text-signal transition-colors"
                        >
                          <DownloadIcon className="h-3.5 w-3.5" />
                          Brochure
                        </a>
                      ) : (
                        <Link
                          to={`/products?product=${item.slug}`}
                          className="font-mono text-xs text-steel-500 hover:text-steel-200"
                        >
                          Details
                        </Link>
                      )}

                      <a
                        href={`https://wa.me/919175275964?text=${encodeURIComponent(
                          `Hello KHS-LG, I need a quotation for Part Number: ${item.partNumber} (${item.name}, Size: ${item.innerDiameter}x${item.outerDiameter}x${item.width}mm).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md bg-signal px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-wider text-ink-950 transition-all hover:bg-signal-bright"
                      >
                        <WhatsAppIcon className="h-3 w-3" />
                        Get Quote
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* NO RESULTS STATE with Custom Sourcing & Best Price Guarantee */
            <div className="mt-8">
              <NoProductFoundNotice
                query={query}
                dimensions={
                  innerDiameter.min || innerDiameter.max || outerDiameter.min || outerDiameter.max || width.min || width.max
                    ? `d=${innerDiameter.min || 'any'}-${innerDiameter.max || 'any'}mm, D=${outerDiameter.min || 'any'}-${outerDiameter.max || 'any'}mm, B=${width.min || 'any'}-${width.max || 'any'}mm`
                    : undefined
                }
                onReset={handleReset}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
