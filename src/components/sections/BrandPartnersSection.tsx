import { ArrowUpRightIcon, ShieldCheckIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TechnicalLabel } from '../ui/SectionHeading';

interface PartnerBrand {
  name: string;
  country: string;
  specialty: string;
  logo: string;
  href: string;
  accent: string;
}

const PARTNER_BRANDS: PartnerBrand[] = [
  {
    name: 'IKO',
    country: 'Japan',
    specialty: 'Needle Bearings & Linear Motion',
    logo: '/assets/brands/iko-logo.webp',
    href: '/our-brands/iko',
    accent: '#d84d4d'
  },
  {
    name: 'WON ST',
    country: 'South Korea',
    specialty: 'Precision Linear Guides & Bushings',
    logo: '/assets/brands/won-logo.webp',
    href: '/our-brands/won',
    accent: '#4c9fd7'
  },
  {
    name: 'STIEBER',
    country: 'Germany',
    specialty: 'Freewheels & Overrunning Clutches',
    logo: '/assets/brands/stieber-logo.webp',
    href: '/our-brands/stieber',
    accent: '#4fae8b'
  },
  {
    name: 'TPI',
    country: 'Taiwan',
    specialty: 'Precision Deep Groove Ball Bearings',
    logo: '/assets/brands/tpi-logo.webp',
    href: '/our-brands/tpi',
    accent: '#2B8FD4'
  },
  {
    name: 'HIWIN',
    country: 'Taiwan',
    specialty: 'Linear Guideways & Precision Ballscrews',
    logo: '/assets/brands/hiwin-logo.webp',
    href: '/our-brands/hiwin',
    accent: '#009E44'
  },
  {
    name: 'KHS-LG',
    country: 'Global OEM',
    specialty: '13,500+ SKUs Proprietary Bearings',
    logo: '/assets/brands/khs-lg-logo.webp',
    href: '/products',
    accent: '#F5C400'
  }
];

export function BrandPartnersSection() {
  return (
    <section
      aria-label="Global Brand Partners"
      className="relative border-b border-ink-700 bg-ink-950 py-14 lg:py-20 overflow-hidden"
    >
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-ink-800 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TechnicalLabel code="Partners">Global Industrial Ecosystem</TechnicalLabel>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 font-mono text-[10px] text-signal font-semibold">
                <ShieldCheckIcon className="h-3 w-3" />
                Authorized & Direct Supply
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-steel-50 sm:text-5xl">
              World-Class Brand Partners
            </h2>
          </div>
          <div className="flex flex-col sm:items-end">
            <p className="max-w-md text-xs sm:text-sm text-steel-400">
              Trusted engineering brands supplied with verified authenticity, full manufacturer traceability, and technical factory support.
            </p>
            <Link
              to="/our-brands"
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-tech text-signal hover:underline"
            >
              <span>Explore all brands</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Brand Logos Showcase Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNER_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              to={brand.href}
              className="group relative flex flex-col items-center justify-between rounded-xl border border-ink-800 bg-ink-900/60 p-4 sm:p-5 text-center transition-all duration-300 hover:border-signal/50 hover:bg-ink-900 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:-translate-y-1"
            >
              {/* White Logo Container Box */}
              <div className="flex h-16 sm:h-20 w-full items-center justify-center rounded-lg bg-white px-3 py-2 shadow-xs border border-slate-100 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-md">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-11 sm:max-h-14 max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Brand Meta */}
              <div className="mt-4 w-full">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="font-display text-sm sm:text-base font-bold uppercase text-steel-100 group-hover:text-signal transition-colors">
                    {brand.name}
                  </span>
                  <ArrowUpRightIcon className="h-3 w-3 text-steel-500 opacity-0 transition-all group-hover:opacity-100 group-hover:text-signal" />
                </div>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-steel-400 font-medium">
                  {brand.country}
                </p>
                <p className="mt-1.5 font-sans text-[10px] text-steel-500 line-clamp-1">
                  {brand.specialty}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
