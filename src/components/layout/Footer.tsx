import { Link } from 'react-router-dom';
import { MailIcon, PhoneIcon, ArrowUpRightIcon, DownloadIcon } from 'lucide-react';
import { company, COMPANY_WHATSAPP_URL, SOCIAL_LINKS } from '../../data/company';
import { Logo } from './Navbar';
import {
  WhatsAppIcon,
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon
} from '../ui/SocialIcons';

const FOOTER_NAV = [
  {
    title: 'Products',
    links: [
      { label: 'Ball Bearings', to: '/products?category=rolling-bearings&sub=ball-bearings' },
      { label: 'Roller Bearings', to: '/products?category=rolling-bearings&sub=roller-bearings' },
      { label: 'Bearing Units & Housings', to: '/products?category=bearing-units-housings' },
      { label: 'Linear Motion Systems', to: '/products?category=linear-motion' },
      { label: 'Linear Shafts & Supports', to: '/products?category=linear-shafts' },
      { label: 'Rod Ends & Spherical Plain', to: '/products?category=rod-ends-track-rollers' },
      { label: 'Bushes & One-Way Clutches', to: '/products?category=clutches-bushes' },
      { label: 'Power Transmission Belts', to: '/products?category=power-transmission' }
    ]
  },
  {
    title: 'Partner Brands',
    links: [
      { label: 'IKO (Japan)', to: '/our-brands/iko' },
      { label: 'WON ST (South Korea)', to: '/our-brands/won' },
      { label: 'STIEBER (Germany)', to: '/our-brands/stieber' },
      { label: 'TPI Bearings (Taiwan)', to: '/our-brands/tpi' },
      { label: 'HIWIN Motion (Taiwan)', to: '/our-brands/hiwin' },
      { label: 'All Global Brands', to: '/our-brands' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Product Range', to: '/products' },
      { label: 'Dimensional Bearing Search', to: '/bearing-search' },
      { label: 'Download Brochures', to: '/products' },
      { label: 'Industries Served', to: '/industries' },
      { label: 'Quality & Inspection', to: '/quality' },
      { label: 'Precision Engineering Blog', to: '/blog' }
    ]
  }
];

const FOOTER_BRAND_LOGOS = [
  { name: 'IKO', logo: '/assets/brands/iko-logo.webp', to: '/our-brands/iko' },
  { name: 'WON ST', logo: '/assets/brands/won-logo.webp', to: '/our-brands/won' },
  { name: 'STIEBER', logo: '/assets/brands/stieber-logo.webp', to: '/our-brands/stieber' },
  { name: 'TPI', logo: '/assets/brands/tpi-logo.webp', to: '/our-brands/tpi' },
  { name: 'HIWIN', logo: '/assets/brands/hiwin-logo.webp', to: '/our-brands/hiwin' },
  { name: 'KHS-LG', logo: '/assets/brands/khs-lg-logo.webp', to: '/products' }
];

export function Footer() {
  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case 'whatsapp':
        return <WhatsAppIcon className="h-4 w-4" />;
      case 'linkedin':
        return <LinkedInIcon className="h-4 w-4" />;
      case 'instagram':
        return <InstagramIcon className="h-4 w-4" />;
      case 'facebook':
        return <FacebookIcon className="h-4 w-4" />;
      case 'youtube':
        return <YouTubeIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <footer className="relative border-t border-signal/20 bg-ink-950 overflow-hidden">
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full opacity-[0.08] blur-[100px]"
        style={{ background: 'radial-gradient(circle, #F5C400 0%, transparent 70%)' }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_0.9fr_0.9fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-steel-400">
              {company.legalName} — precision bearings, linear motion and power transmission solutions trusted across industries worldwide.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 border border-signal/30 bg-ink-900/80 px-3 py-1 font-mono text-[10px] uppercase tracking-tech text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_6px_#F5C400]" />
              {company.certification} • 50+ Years Experience
            </div>

            {/* Social Media & WhatsApp Links */}
            <div className="mt-8 border-t border-ink-800/80 pt-6">
              <p className="font-mono text-[10px] uppercase tracking-tech text-steel-400 font-semibold mb-3">
                Connect With Us
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border border-ink-700 bg-ink-900/80 text-steel-300 transition-all duration-200 ${
                      item.icon === 'whatsapp'
                        ? 'hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]'
                        : item.icon === 'linkedin'
                        ? 'hover:border-[#0077b5] hover:bg-[#0077b5]/10 hover:text-[#0077b5]'
                        : item.icon === 'instagram'
                        ? 'hover:border-[#E1306C] hover:bg-[#E1306C]/10 hover:text-[#E1306C]'
                        : item.icon === 'facebook'
                        ? 'hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:text-[#1877F2]'
                        : 'hover:border-[#FF0000] hover:bg-[#FF0000]/10 hover:text-[#FF0000]'
                    }`}
                  >
                    {getSocialIcon(item.icon)}
                  </a>
                ))}
              </div>

              {/* Direct WhatsApp Action Pill */}
              <a
                href={COMPANY_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-md border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1.5 font-mono text-[11px] font-semibold text-[#25D366] transition-all duration-200 hover:bg-[#25D366] hover:text-ink-950"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {FOOTER_NAV.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-mono text-[10px] uppercase tracking-tech text-signal font-semibold">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs sm:text-sm text-steel-400 transition-colors duration-200 hover:text-signal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-tech text-signal font-semibold">
              Contact & Locations
            </h2>
            <ul className="mt-5 space-y-3 text-xs sm:text-sm text-steel-300">
              <li>
                <a
                  className="flex items-center gap-2.5 transition-colors hover:text-signal text-steel-400"
                  href={company.emailHref}
                >
                  <MailIcon className="h-4 w-4 text-signal shrink-0" aria-hidden />
                  <span className="truncate">{company.email}</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2.5 transition-colors hover:text-signal text-steel-400"
                  href={company.phoneHref}
                >
                  <PhoneIcon className="h-4 w-4 text-signal shrink-0" aria-hidden />
                  <span>{company.phone}</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2.5 transition-colors hover:text-[#25D366] text-steel-400"
                  href={COMPANY_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366] shrink-0" aria-hidden />
                  <span>WhatsApp: +91 91752 75964</span>
                </a>
              </li>
            </ul>

            <div className="mt-5 border-t border-ink-800 pt-4">
              <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                Head Office
              </p>
              <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-steel-400">
                {company.factoryOffice}
              </p>
              <Link
                to="/contact"
                className="group mt-3 inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wider text-signal hover:underline"
              >
                Our Locations
                <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Global Brand Partners Showcase Strip */}
        <div className="mt-12 border-t border-ink-800/80 pt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <span className="font-mono text-[10px] uppercase tracking-tech text-steel-400 font-semibold">
              Authorized Distribution & Global Brands:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {FOOTER_BRAND_LOGOS.map((b) => (
                <Link
                  key={b.name}
                  to={b.to}
                  title={`Explore ${b.name} products`}
                  className="flex h-9 items-center justify-center rounded-md bg-white px-3 py-1 transition-all duration-200 hover:scale-105 hover:shadow-md border border-slate-200 shadow-2xs"
                >
                  <img src={b.logo} alt={b.name} className="max-h-6 w-auto object-contain" loading="lazy" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-ink-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500">
            <li>
              <Link className="transition-colors hover:text-signal" to="/contact">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-signal" to="/contact">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
