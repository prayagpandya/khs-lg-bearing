import { geoNaturalEarth1, geoPath } from 'd3-geo';
import worldTopology from 'world-atlas/countries-110m.json';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import { useEffect, useMemo, useState } from 'react';
import { TechnicalLabel } from '../ui/SectionHeading';
import { exportCountries } from '../../data/network';
import { NetworkInfoPanel } from './NetworkInfoPanel';

const worldLocationIds: Record<string, string> = {
  bahrain: '48',
  bangladesh: '50',
  belarus: '112',
  brazil: '76',
  bulgaria: '100',
  uae: '784',
  egypt: '818',
  greece: '300',
  hungary: '348',
  kenya: '404',
  lebanon: '422',
  lithuania: '440',
  nepal: '524',
  nigeria: '566',
  oman: '512',
  poland: '616',
  qatar: '634',
  russia: '643',
  'saudi-arabia': '682',
  serbia: '688',
  'south-africa': '710',
  'sri-lanka': '144',
  tanzania: '834',
  turkey: '792',
  ukraine: '804',
  usa: '840',
  zimbabwe: '716'
};

const WORLD_WIDTH = 1010;
const WORLD_HEIGHT = 666;
const worldGeoJson = feature(worldTopology as unknown as Topology, 'countries');
const projection = geoNaturalEarth1().fitExtent(
  [[30, 28], [WORLD_WIDTH - 30, WORLD_HEIGHT - 28]],
  worldGeoJson
);
const pathGenerator = geoPath(projection);

function projectPoint(longitude: number, latitude: number): [number, number] {
  const point = projection([longitude, latitude]);
  if (!point) {
    throw new Error(`Unable to project geographic point: ${longitude}, ${latitude}`);
  }
  return point;
}

function createRoutePath(originPoint: [number, number], destinationPoint: [number, number], index: number) {
  const [originX, originY] = originPoint;
  const [destinationX, destinationY] = destinationPoint;
  const midpointX = (originX + destinationX) / 2;
  const midpointY = Math.min(originY, destinationY) - 34 - (index % 4) * 10;
  return `M ${originX} ${originY} Q ${midpointX} ${midpointY} ${destinationX} ${destinationY}`;
}

const regionDescriptions: Record<string, string> = {
  'Middle East': 'This market represents a strategically relevant international region within KHS-LG\'s export footprint, supporting industrial demand and technical partnership opportunities across the Middle East.',
  'North America': 'North America remains an important export market represented in KHS-LG\'s international footprint, connecting bearing solutions to advanced industrial and manufacturing demand.',
  'South America': 'South America represents an export opportunity aligned with KHS-LG\'s global supply footprint, supporting industrial demand across the region.',
  Africa: 'Africa is an important export market for KHS-LG, reflecting the company\'s reach across diverse industrial and infrastructure sectors.',
  Europe: 'Europe represents an established export market within KHS-LG\'s international footprint, connecting Indian engineering capability with industrial demand across the region.',
  'South Asia': 'South Asia remains a strategically relevant sourcing and export region within KHS-LG\'s international footprint, supporting cross-border industrial demand.'
};

export function ExportFootprintSection() {
  const [selectedCountryId, setSelectedCountryId] = useState('uae');
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => document.visibilityState === 'visible');

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!isDocumentVisible || exportCountries.length < 2) return;
    const timeoutId = window.setTimeout(() => {
      const currentIndex = exportCountries.findIndex((country) => country.id === selectedCountryId);
      const nextIndex = (currentIndex + 1) % exportCountries.length;
      setSelectedCountryId(exportCountries[nextIndex].id);
    }, 3000);
    return () => window.clearTimeout(timeoutId);
  }, [selectedCountryId, timerResetKey, isDocumentVisible]);

  const selectCountry = (countryId: string) => {
    setSelectedCountryId(countryId);
    setTimerResetKey((current) => current + 1);
  };

  const selectedCountry = useMemo(() => {
    return exportCountries.find((country) => country.id === selectedCountryId) ?? exportCountries[0];
  }, [selectedCountryId]);
  const exportCount = exportCountries.length;

  const regionSummary = useMemo(() => {
    const map = new Map<string, number>();
    exportCountries.forEach((country) => {
      map.set(country.region, (map.get(country.region) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([label, count]) => ({ label, count }));
  }, []);

  const origin = projectPoint(78.9629, 20.5937);

  return (
    <section aria-label="Export footprint" className="relative overflow-hidden border-y border-ink-700 bg-ink-900 py-12 lg:py-16">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full border border-signal/10" aria-hidden />
      <div className="pointer-events-none absolute -left-12 bottom-10 h-72 w-72 rounded-full border border-signal/10" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <TechnicalLabel code="Global reach">From India to the world.</TechnicalLabel>
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">Global reach</p>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold uppercase leading-[0.92] text-steel-50">Export footprint</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-steel-400">
            KHS-LG's international footprint extends across diverse markets, connecting Indian engineering capability with customers and industrial applications around the world.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_0.9fr] lg:items-stretch">
          <div className="rounded-[22px] border border-ink-700 bg-ink-950/70 p-2 sm:p-5">
            <div className="relative overflow-hidden rounded-[18px] border border-ink-700 bg-[#070b10] p-2 sm:p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,245,138,0.08),transparent_30%),radial-gradient(circle_at_56%_70%,rgba(255,245,138,0.05),transparent_32%)]" aria-hidden />
              <svg viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="relative z-10 h-[360px] w-full md:h-[400px] lg:h-[400px] xl:h-[min(560px,40vw)]" role="img" aria-label="World export footprint map">
                <defs>
                  <filter id="export-map-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                <g aria-hidden="true" fill="#131b22" stroke="#59636b" strokeWidth="1.1">
                  {worldGeoJson.features.map((location, index) => {
                    const locationId = String(Number(location.id ?? ''));
                    const isExportMarket = Object.values(worldLocationIds).includes(locationId);
                    const isSelected = locationId === worldLocationIds[selectedCountryId];
                    const isHovered = locationId === worldLocationIds[hoveredCountryId ?? ''];
                    return (
                      <path
                        key={`${locationId}-${index}`}
                        data-map-id={locationId}
                        d={pathGenerator(location) ?? undefined}
                        fill={isSelected || isHovered ? '#3b3926' : isExportMarket ? '#192027' : '#10171d'}
                        stroke={isSelected || isHovered ? '#fff58a' : '#59636b'}
                        strokeWidth={isSelected || isHovered ? 1.8 : 1.1}
                        opacity={isExportMarket || isSelected || isHovered ? 1 : 0.86}
                      />
                    );
                  })}
                </g>

                {exportCountries.map((country, index) => {
                  const target = projectPoint(country.longitude, country.latitude);
                  return (
                    <path
                      key={`${country.id}-route`}
                      d={createRoutePath(origin, target, index)}
                      fill="none"
                      stroke="rgba(255,245,138,0.7)"
                      strokeWidth="1.4"
                      strokeDasharray="5 11"
                      className="route-draw"
                      style={{ animationDelay: `${(index % 10) * 150}ms` }}
                    />
                  );
                })}

                <g aria-label="India origin">
                  <circle cx={origin[0]} cy={origin[1]} r="18" fill="rgba(0,240,255,0.18)" className="network-pulse" />
                  <circle cx={origin[0]} cy={origin[1]} r="7" fill="#00F0FF" stroke="#A5F3FC" strokeWidth="2" filter="url(#export-map-glow)" />
                  <text x={origin[0] + 12} y={origin[1] - 12} fill="#00F0FF" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">INDIA</text>
                  <text x={origin[0] + 12} y={origin[1] + 2} fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">ORIGIN</text>
                </g>

                {exportCountries.map((country) => {
                  const position = projectPoint(country.longitude, country.latitude);
                  const active = country.id === selectedCountryId;
                  const hovered = country.id === hoveredCountryId;
                  return (
                    <g
                      key={country.id}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${country.country} export market`}
                      onClick={() => selectCountry(country.id)}
                      onMouseEnter={() => setHoveredCountryId(country.id)}
                      onMouseLeave={() => setHoveredCountryId(null)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          selectCountry(country.id);
                        }
                      }}
                    >
                      <title>{country.country} - Export Market</title>
                      <circle cx={position[0]} cy={position[1]} r={active || hovered ? 7 : 4.5} fill={active || hovered ? '#fff58a' : '#e1b84f'} stroke="#fff5b0" strokeWidth={active || hovered ? 1.6 : 1} filter={active || hovered ? 'url(#export-map-glow)' : undefined} />
                      <circle cx={position[0]} cy={position[1]} r={active ? 15 : 9} fill="rgba(255,245,138,0.12)" className={active ? 'network-pulse' : ''} />
                      {hovered && <text x={position[0] + 10} y={position[1] - 10} fill="#fff58a" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1">{country.country.toUpperCase()}</text>}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <NetworkInfoPanel
              title={selectedCountry.country}
              subtitle="Export Market"
              detailLabel="Region"
              detailValue={selectedCountry.region}
              description={regionDescriptions[selectedCountry.region] ?? 'This export market is part of KHS-LG\'s international distribution footprint, supporting access to diverse industrial demand.'}
              accentLabel="Active"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[16px] border border-ink-700 bg-ink-950/70 p-5">
            <p className="font-display text-4xl font-semibold uppercase text-signal">{exportCount}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">Export Countries</p>
          </div>
          <div className="rounded-[16px] border border-ink-700 bg-ink-950/70 p-5">
            <p className="font-display text-xl font-semibold uppercase text-signal">India</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">Origin</p>
          </div>
          <div className="rounded-[16px] border border-ink-700 bg-ink-950/70 p-5">
            <p className="font-display text-xl font-semibold uppercase text-signal">Global</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-steel-500">Supply Reach</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {regionSummary.map(({ label, count }) => (
            <div key={label} className="rounded-full border border-ink-700 bg-ink-950/70 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-steel-400">
              {label} <span className="ml-2 text-signal">{count} markets</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
