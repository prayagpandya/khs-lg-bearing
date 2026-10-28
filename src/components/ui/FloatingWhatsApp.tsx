import { useState } from 'react';
import { COMPANY_WHATSAPP_URL } from '../../data/company';
import { WhatsAppIcon } from './SocialIcons';
import { MessageSquareTextIcon, XIcon } from 'lucide-react';

export function FloatingWhatsApp() {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 sm:bottom-8 sm:right-8">
      {/* Interactive Tooltip Callout */}
      {tooltipVisible && (
        <div className="relative mb-1 hidden items-center gap-2 rounded-lg border border-emerald-500/30 bg-ink-950/95 px-3.5 py-2 text-xs font-mono text-steel-200 shadow-2xl backdrop-blur-md transition-all sm:flex animate-fade-in">
          <MessageSquareTextIcon className="h-4 w-4 text-[#25D366] shrink-0" aria-hidden />
          <span>Need technical guidance? <strong>Chat on WhatsApp</strong></span>
          <button
            type="button"
            onClick={() => setTooltipVisible(false)}
            aria-label="Dismiss WhatsApp hint"
            className="ml-1 text-steel-500 hover:text-steel-200 transition-colors"
          >
            <XIcon className="h-3.5 w-3.5" aria-hidden />
          </button>
          {/* Arrow pointing down to button */}
          <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-emerald-500/30 bg-ink-950" />
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={COMPANY_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with KHS-LG on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] hover:shadow-[0_8px_32px_rgba(37,211,102,0.65)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Pulsing ring animation */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none group-hover:hidden"
          aria-hidden
        />

        <WhatsAppIcon className="relative h-7 w-7 text-white transition-transform duration-300 group-hover:scale-105" aria-hidden />
      </a>
    </div>
  );
}
