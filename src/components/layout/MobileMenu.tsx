import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { company, COMPANY_WHATSAPP_URL, SOCIAL_LINKS } from '../../data/company';
import { WhatsAppIcon, LinkedInIcon, InstagramIcon, FacebookIcon, YouTubeIcon } from '../ui/SocialIcons';
import { cn } from '../../utils/cn';
import { ProductMobileMenu } from './ProductMegaMenu';
import { BrandMobileMenu } from './BrandMegaMenu';

export function MobileMenu({ open, onClose }: {open: boolean;onClose: () => void;}) {
  const { pathname } = useLocation();
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [brandsExpanded, setBrandsExpanded] = useState(false);

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-0 z-mobile-menu overflow-y-auto bg-ink-950 xl:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu">
        
          <div className="industrial-grid absolute inset-0 opacity-30" aria-hidden />
          <div className="relative flex min-h-full flex-col px-5 pb-10 pt-6 sm:px-8">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-tech text-steel-500">
                KHS-LG / <span className="text-signal">Navigation</span>
              </p>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex items-center gap-2 border border-steel-500/30 px-3 py-2 font-mono text-[10px] uppercase tracking-tech text-steel-300">
              
                <XIcon className="h-4 w-4" aria-hidden />
                Close
              </button>
            </div>

            <ul className="mt-10 flex-1 space-y-1">
              {NAV_ITEMS.map((item, i) =>
            <motion.li
              key={item.to}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.36,
                delay: 0.05 + i * 0.045,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="border-b border-ink-700">
              
                  {item.to === '/products' ? <>
                    <button
                    type="button"
                    onClick={() => setProductsExpanded((value) => !value)}
                    aria-expanded={productsExpanded}
                    className="flex w-full items-center justify-between py-4 font-display text-3xl font-semibold uppercase tracking-[0.04em] text-steel-50">
                      <span>{item.label}</span>
                      <span className={cn('h-1.5 w-1.5 rounded-full', productsExpanded ? 'bg-signal' : 'bg-ink-600')} aria-hidden />
                    </button>
                    {productsExpanded && <div className="pb-4 pl-2"><ProductMobileMenu onNavigate={onClose} /></div>}
                    </> : item.to === '/our-brands' ? <>
                    <button
                    type="button"
                    onClick={() => setBrandsExpanded((value) => !value)}
                    aria-expanded={brandsExpanded}
                    className="flex w-full items-center justify-between py-4 font-display text-3xl font-semibold uppercase tracking-[0.04em] text-steel-50">
                      <span>{item.label}</span>
                      <span className={cn('h-1.5 w-1.5 rounded-full', brandsExpanded ? 'bg-signal' : 'bg-ink-600')} aria-hidden />
                    </button>
                    {brandsExpanded && <div className="pb-4 pl-2"><BrandMobileMenu onNavigate={onClose} /></div>}
                    </> : <NavLink
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                cn(
                  'flex items-center justify-between py-4 font-display text-3xl font-semibold uppercase tracking-[0.04em] transition-colors',
                  isActive ? 'text-signal' : 'text-steel-50'
                )
                }>
                
                    {({ isActive }) =>
                <>
                        <span>{item.label}</span>
                        <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      isActive ? 'bg-signal' : 'bg-ink-600'
                    )} />
                  
                      </>
                }
                  </NavLink>}
                </motion.li>
            )}
            </ul>

            <div className="mt-8 space-y-5 border-t border-ink-800 pt-6">
              {/* WhatsApp Call to Action */}
              <a
                href={COMPANY_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-2.5 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 font-mono text-xs font-semibold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-ink-950"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Chat with us on WhatsApp</span>
              </a>

              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-700 bg-ink-900/80 text-steel-400 hover:text-signal hover:border-signal/50 transition-colors"
                  >
                    {item.icon === 'whatsapp' ? (
                      <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                    ) : item.icon === 'linkedin' ? (
                      <LinkedInIcon className="h-4 w-4" />
                    ) : item.icon === 'instagram' ? (
                      <InstagramIcon className="h-4 w-4" />
                    ) : item.icon === 'facebook' ? (
                      <FacebookIcon className="h-4 w-4" />
                    ) : (
                      <YouTubeIcon className="h-4 w-4" />
                    )}
                  </a>
                ))}
              </div>

              <div className="space-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-steel-500">
                <a className="block hover:text-signal transition-colors" href={company.emailHref}>
                  {company.email}
                </a>
                <a className="block hover:text-signal transition-colors" href={company.phoneHref}>
                  {company.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}