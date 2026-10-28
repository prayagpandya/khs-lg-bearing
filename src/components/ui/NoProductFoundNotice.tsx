import { RotateCcwIcon, ArrowUpRightIcon, SparklesIcon, CheckCircle2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhatsAppIcon } from './SocialIcons';
import { company } from '../../data/company';

interface NoProductFoundNoticeProps {
  query?: string;
  dimensions?: string;
  onReset?: () => void;
  className?: string;
  compact?: boolean;
}

export function NoProductFoundNotice({
  query,
  dimensions,
  onReset,
  className = '',
  compact = false
}: NoProductFoundNoticeProps) {
  // Build personalized WhatsApp inquiry message
  const details = [
    query ? `Product/Query: "${query}"` : null,
    dimensions ? `Dimensions: ${dimensions}` : null
  ]
    .filter(Boolean)
    .join(', ');

  const whatsappText = details
    ? `Hello KHS-LG team, I searched for (${details}) on your website and couldn't find the exact match. Can you help me source this product at the best price?`
    : `Hello KHS-LG team, I am looking for a specific bearing/motion product that is not listed on your website. Can you help me source it at the best price?`;

  const whatsappHref = `https://wa.me/919175275964?text=${encodeURIComponent(whatsappText)}`;
  const contactHref = `/contact?subject=${encodeURIComponent(
    `Product Sourcing Request${details ? ` - ${details}` : ''}`
  )}`;

  if (compact) {
    return (
      <div className={`no-product-notice-compact rounded-lg border border-signal/25 bg-ink-900/90 p-4 text-center ${className}`}>
        <p className="no-product-notice-compact-title font-mono text-xs font-semibold text-steel-200">
          Can't find the product you're looking for?
        </p>
        <p className="no-product-notice-compact-subtitle mt-1 text-[11px] text-steel-400">
          Contact our team — we can get the exact product you want at the <strong className="text-signal font-bold">best price</strong>.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="no-product-whatsapp-btn inline-flex items-center gap-1.5 rounded bg-[#25D366] px-3 py-1.5 font-mono text-[11px] font-bold text-ink-950 transition-all hover:bg-[#20ba5a]"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span>Chat for Best Price</span>
          </a>
          <Link
            to={contactHref}
            className="no-product-inquire-btn inline-flex items-center gap-1 rounded border border-ink-600 bg-ink-950 px-3 py-1.5 font-mono text-[11px] text-steel-300 hover:border-signal hover:text-signal transition-colors"
          >
            <span>Inquire</span>
            <ArrowUpRightIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`no-product-notice-card relative overflow-hidden rounded-2xl border border-signal/30 bg-gradient-to-b from-ink-900/90 to-ink-950 p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] text-center ${className}`}
    >
      {/* Background glow accent */}
      <div
        className="no-product-notice-glow pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F5C400 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl">
        {/* Badge */}
        <div className="no-product-notice-badge inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-3.5 py-1 text-xs font-mono text-signal mb-4">
          <SparklesIcon className="h-3.5 w-3.5" />
          <span>Product Sourcing & Custom Requirements</span>
        </div>

        {/* Heading */}
        <h3 className="no-product-notice-title font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-steel-50 leading-tight">
          Can't find the exact product you need?
        </h3>

        {/* Core user requested message */}
        <p className="no-product-notice-subtitle mt-3 text-base sm:text-lg font-medium text-gradient-gold">
          Contact our team — we can get the product you want at the best price.
        </p>

        <p className="no-product-notice-desc mt-3 text-xs sm:text-sm leading-relaxed text-steel-300 max-w-xl mx-auto font-sans">
          With over <strong>50+ years of industry experience</strong> and access to <strong>13,500+ SKUs</strong> across bearings, linear shafts, guideways and power transmission belts, our team can locate, cross-reference, or custom-manufacture any non-standard specification.
        </p>

        {/* Feature bullets */}
        <div className="no-product-notice-features mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="no-product-notice-feature-item flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-950/70 p-3">
            <CheckCircle2Icon className="no-product-feature-icon h-4 w-4 text-signal shrink-0" />
            <span className="no-product-feature-text font-mono text-[11px] text-steel-300">Guaranteed Best Price</span>
          </div>
          <div className="no-product-notice-feature-item flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-950/70 p-3">
            <CheckCircle2Icon className="no-product-feature-icon h-4 w-4 text-signal shrink-0" />
            <span className="no-product-feature-text font-mono text-[11px] text-steel-300">Fast Technical Response</span>
          </div>
          <div className="no-product-notice-feature-item flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-950/70 p-3">
            <CheckCircle2Icon className="no-product-feature-icon h-4 w-4 text-signal shrink-0" />
            <span className="no-product-feature-text font-mono text-[11px] text-steel-300">OEM & Custom Sourcing</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* WhatsApp CTA */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="no-product-whatsapp-btn inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-ink-950 shadow-[0_4px_18px_rgba(37,211,102,0.35)] transition-all duration-200 hover:bg-[#20ba5a] hover:scale-[1.02] active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-4 w-4 text-ink-950" />
            <span>Chat on WhatsApp for Best Price</span>
          </a>

          {/* Email / Quote Form CTA */}
          <Link
            to={contactHref}
            className="no-product-quote-btn inline-flex items-center gap-2 rounded-md border border-signal/50 bg-signal/10 px-5 py-3 font-display text-xs font-semibold uppercase tracking-wider text-signal transition-all duration-200 hover:bg-signal hover:text-ink-950 hover:shadow-[0_4px_18px_rgba(245,196,0,0.3)]"
          >
            <span>Request Custom Quote</span>
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>

          {/* Reset Filters Option (if available) */}
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="no-product-reset-btn inline-flex items-center gap-1.5 rounded-md border border-ink-700 bg-ink-900 px-4 py-3 font-mono text-xs text-steel-400 hover:border-signal hover:text-signal transition-colors"
            >
              <RotateCcwIcon className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Quick Phone Call Hotline */}
        <p className="no-product-hotline mt-5 font-mono text-xs text-steel-400">
          Or speak directly to our technical desk:{' '}
          <a href={company.phoneHref} className="no-product-hotline-link text-signal hover:underline font-semibold">
            {company.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
