import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowUpRightIcon,
  CheckIcon,
  RotateCcwIcon,
  SearchIcon,
  XIcon,
  LayersIcon,
  SlidersHorizontalIcon
} from 'lucide-react';
import { cn } from '../../utils/cn';
import {
  BearingFilters,
  BearingRecord,
  filterProducts,
  getProductSuggestions
} from '../../data/bearingSearch';

const EMPTY_RANGE = { min: '', max: '' };
const EMPTY_FILTERS: BearingFilters = {
  query: '',
  innerDiameter: EMPTY_RANGE,
  outerDiameter: EMPTY_RANGE,
  width: EMPTY_RANGE
};

const RANGE_FIELDS = [
  { key: 'innerDiameter', label: 'Inner Diameter', symbol: 'd' },
  { key: 'outerDiameter', label: 'Outer Diameter', symbol: 'D' },
  { key: 'width', label: 'Width', symbol: 'B' }
] as const;

function hasRangeValue(filters: BearingFilters) {
  return RANGE_FIELDS.some(({ key }) => filters[key].min || filters[key].max);
}

function rangeError(filters: BearingFilters) {
  return RANGE_FIELDS.find(({ key }) => {
    const range = filters[key];
    return range.min && range.max && Number(range.min) > Number(range.max);
  })?.label;
}

export function BearingSearch() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<BearingFilters>(EMPTY_FILTERS);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    return filters.query.trim() ? getProductSuggestions(filters.query) : [];
  }, [filters.query]);

  const liveMatches = useMemo(() => {
    if (!filters.query.trim() && !hasRangeValue(filters)) return null;
    return filterProducts(filters);
  }, [filters]);

  const errorField = rangeError(filters);

  useEffect(() => {
    const closeSuggestions = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('[data-bearing-search]')) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener('click', closeSuggestions);
    return () => document.removeEventListener('click', closeSuggestions);
  }, []);

  const updateQuery = (query: string) => {
    setFilters((current) => ({ ...current, query }));
    setSuggestionsOpen(Boolean(query.trim()));
  };

  const updateRange = (key: (typeof RANGE_FIELDS)[number]['key'], side: 'min' | 'max', value: string) => {
    if (value && !/^\d*(\.\d*)?$/.test(value)) return;
    setFilters((current) => ({ ...current, [key]: { ...current[key], [side]: value } }));
  };

  const executeSearch = (event?: FormEvent) => {
    event?.preventDefault();
    if (errorField) return;
    setSuggestionsOpen(false);

    const searchParams = new URLSearchParams();
    if (filters.query.trim()) {
      searchParams.set('q', filters.query.trim());
    }
    if (filters.innerDiameter.min) searchParams.set('d_min', filters.innerDiameter.min);
    if (filters.innerDiameter.max) searchParams.set('d_max', filters.innerDiameter.max);
    if (filters.outerDiameter.min) searchParams.set('D_min', filters.outerDiameter.min);
    if (filters.outerDiameter.max) searchParams.set('D_max', filters.outerDiameter.max);
    if (filters.width.min) searchParams.set('B_min', filters.width.min);
    if (filters.width.max) searchParams.set('B_max', filters.width.max);

    const qs = searchParams.toString();
    navigate(qs ? `/bearing-search?${qs}` : '/bearing-search');
  };

  const chooseSuggestion = (record: BearingRecord) => {
    setSuggestionsOpen(false);
    navigate(`/bearing-search?q=${encodeURIComponent(record.partNumber)}`);
  };

  const reset = () => {
    setFilters({
      ...EMPTY_FILTERS,
      innerDiameter: { ...EMPTY_RANGE },
      outerDiameter: { ...EMPTY_RANGE },
      width: { ...EMPTY_RANGE }
    });
    setSuggestionsOpen(false);
    inputRef.current?.focus();
  };

  const onQueryKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') setSuggestionsOpen(false);
    if (event.key === 'Enter') executeSearch();
  };

  return (
    <section
      aria-labelledby="bearing-search-heading"
      className="relative overflow-hidden border-y border-ink-700 bg-ink-900 py-14 lg:py-18"
      data-bearing-search
    >
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div className="pointer-events-none absolute -right-28 top-16 h-80 w-80 rounded-full border border-signal/10 opacity-50" aria-hidden />
      <div className="pointer-events-none absolute -right-16 top-28 h-56 w-56 rounded-full border border-signal/10 opacity-50" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-tech text-steel-500">
            <span className="h-px w-8 bg-signal" />
            Precision Motion Lookup
            <span className="h-px w-8 bg-signal" />
          </p>
          <h2
            id="bearing-search-heading"
            className="mt-5 font-display text-[clamp(2.5rem,6vw,5.2rem)] font-bold uppercase leading-[0.9] text-steel-50"
          >
            Find your <span className="text-gradient-gold drop-shadow-[0_2px_18px_rgba(245,196,0,0.35)]">bearing</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-steel-400">
            Search 4,500+ SKUs by bearing designation, manufacturer part number or dimensions (d × D × B).
          </p>
        </div>

        <form onSubmit={executeSearch} className="mx-auto mt-12 max-w-6xl">
          {/* Main Query Bar */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <label htmlFor="bearing-query" className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
                Bearing / product search
              </label>
              <Link
                to="/bearing-search"
                className="font-mono text-[10px] uppercase tracking-tech text-signal hover:underline inline-flex items-center gap-1"
              >
                Open Full Dimension Finder <ArrowUpRightIcon className="h-3 w-3" />
              </Link>
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <SearchIcon
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-signal"
                  aria-hidden
                />
                <input
                  ref={inputRef}
                  id="bearing-query"
                  value={filters.query}
                  onChange={(event) => updateQuery(event.target.value)}
                  onFocus={() => setSuggestionsOpen(Boolean(filters.query.trim()))}
                  onKeyDown={onQueryKeyDown}
                  placeholder="Search by bearing number, series or product name (e.g. 6204, NJ 205, GE 20, UCP 205)"
                  autoComplete="off"
                  className="w-full border border-ink-600 bg-ink-950 px-11 py-4 font-mono text-sm text-steel-50 placeholder:text-steel-500 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal/40 shadow-inner"
                />
                {filters.query && (
                  <button
                    type="button"
                    onClick={() => updateQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-steel-500 hover:text-signal"
                    aria-label="Clear bearing search"
                  >
                    <XIcon className="h-4 w-4" aria-hidden />
                  </button>
                )}

                {/* Autocomplete Suggestions */}
                {suggestionsOpen && suggestions.length > 0 && (
                  <ul
                    className="absolute left-0 right-0 top-full z-20 mt-1 max-h-80 overflow-y-auto rounded-b border border-ink-600 bg-ink-950 shadow-2xl divide-y divide-ink-800"
                    role="listbox"
                    aria-label="Bearing suggestions"
                  >
                    {suggestions.map((record) => (
                      <li key={record.id}>
                        <button
                          type="button"
                          onClick={() => chooseSuggestion(record)}
                          className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-ink-900 group"
                          role="option"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <strong className="font-mono text-sm text-signal group-hover:underline">
                                {record.partNumber}
                              </strong>
                              <span className="rounded bg-ink-900 px-1.5 py-0.5 font-mono text-[9px] uppercase text-steel-400">
                                {record.series}
                              </span>
                            </div>
                            <span className="mt-0.5 block text-xs text-steel-400">
                              {record.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-steel-300 bg-ink-900/80 px-2 py-1 rounded">
                              {record.innerDiameter} × {record.outerDiameter} × {record.width} mm
                            </span>
                            <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0 text-steel-500 group-hover:text-signal transition-colors" />
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-signal px-6 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 shadow-[0_2px_14px_rgba(245,196,0,0.32)] transition-all hover:bg-signal-bright hover:shadow-[0_4px_22px_rgba(245,196,0,0.55)] sm:min-w-52"
              >
                <SearchIcon className="h-4 w-4" aria-hidden /> Search bearing
              </button>
            </div>
          </div>

          {/* Dimensional Search Inputs */}
          <div className="mt-10 border-t border-ink-700 pt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-tech text-signal">
                  Dimensional search
                </p>
                <p className="mt-2 text-sm text-steel-500">
                  Set any range. Empty fields are ignored.
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-tech text-steel-600">
                All dimensions in mm
              </span>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {RANGE_FIELDS.map(({ key, label, symbol }) => (
                <fieldset key={key} className="min-w-0">
                  <legend className="font-display text-base font-semibold uppercase tracking-[0.12em] text-steel-50">
                    {label} <span className="font-mono text-xs text-signal">({symbol})</span>
                  </legend>
                  <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <input
                      aria-label={`${label} minimum in millimetres`}
                      inputMode="decimal"
                      value={filters[key].min}
                      onChange={(event) => updateRange(key, 'min', event.target.value)}
                      placeholder="Min"
                      className={cn(
                        'min-w-0 border bg-ink-950 px-3 py-3 font-mono text-sm text-steel-50 placeholder:text-steel-600 focus:outline-none focus:ring-1 shadow-inner',
                        errorField === label
                          ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/30'
                          : 'border-ink-600 focus:border-signal focus:ring-signal/40'
                      )}
                    />
                    <span className="text-steel-600">-</span>
                    <input
                      aria-label={`${label} maximum in millimetres`}
                      inputMode="decimal"
                      value={filters[key].max}
                      onChange={(event) => updateRange(key, 'max', event.target.value)}
                      placeholder="Max"
                      className={cn(
                        'min-w-0 border bg-ink-950 px-3 py-3 font-mono text-sm text-steel-50 placeholder:text-steel-600 focus:outline-none focus:ring-1 shadow-inner',
                        errorField === label
                          ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/30'
                          : 'border-ink-600 focus:border-signal focus:ring-signal/40'
                      )}
                    />
                  </div>
                </fieldset>
              ))}
            </div>

            {errorField && (
              <p className="mt-5 flex items-center gap-2 font-mono text-xs text-red-300" role="alert">
                <XIcon className="h-3.5 w-3.5" aria-hidden />
                Minimum value cannot be greater than maximum value.
              </p>
            )}

            {/* Bottom Actions and Live Match Counter */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {liveMatches !== null && (
                  <div className="flex items-center gap-2 font-mono text-xs text-signal">
                    <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_#F5C400] animate-pulse" />
                    <span>
                      <strong>{liveMatches.length}</strong> matching bearing specification
                      {liveMatches.length === 1 ? '' : 's'} available
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 border border-ink-600 px-5 py-3 font-mono text-[10px] uppercase tracking-tech text-steel-400 transition-colors hover:border-signal hover:text-signal"
                >
                  <RotateCcwIcon className="h-3.5 w-3.5" aria-hidden /> Reset
                </button>
                <button
                  type="button"
                  onClick={() => executeSearch()}
                  disabled={Boolean(errorField) || !hasRangeValue(filters)}
                  className="inline-flex items-center justify-center gap-2 border border-signal bg-signal/10 px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-signal shadow-[0_0_12px_rgba(245,196,0,0.18)] transition-all hover:bg-signal hover:text-ink-950 disabled:cursor-not-allowed disabled:border-ink-600 disabled:bg-transparent disabled:text-steel-600"
                >
                  <CheckIcon className="h-4 w-4" aria-hidden /> Search by dimensions
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
