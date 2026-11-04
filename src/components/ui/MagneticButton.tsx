import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useIsTouch, useReducedMotion } from '../../hooks/useEnvironment';

type Variant = 'primary' | 'ghost' | 'yellow' | 'outline';

export interface MagneticButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  icon?: React.ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'border-signal bg-signal text-ink-950 shadow-[0_4px_16px_rgba(245,196,0,0.32)] hover:bg-signal-bright hover:shadow-[0_6px_24px_rgba(245,196,0,0.55)] active:scale-[0.98]',
  ghost:
    'border-white/15 bg-ink-900/70 backdrop-blur-md text-steel-50 hover:border-signal hover:text-signal hover:shadow-[0_0_18px_rgba(245,196,0,0.25)] active:scale-[0.98]',
  yellow:
    'border-signal bg-signal text-ink-950 font-bold shadow-[0_4px_20px_rgba(245,196,0,0.35)] hover:bg-ink-950 hover:text-signal hover:border-signal hover:shadow-[0_0_30px_rgba(245,196,0,0.65)] hover:scale-[1.03] active:scale-[0.98]',
  outline:
    'border-slate-800 bg-white text-slate-900 font-semibold shadow-sm hover:bg-slate-950 hover:text-signal hover:border-slate-950 hover:shadow-md active:scale-[0.98]'
};

export function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  icon
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const touch = useIsTouch();
  const reduced = useReducedMotion();

  const handleMove = (e: React.PointerEvent) => {
    if (!ref.current || touch || reduced) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.14;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)';
  };

  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden border px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ease-precision',
    VARIANTS[variant],
    className
  );

  const inner = (
    <span
      ref={ref}
      className="flex items-center gap-2.5 transition-transform duration-200 ease-precision"
    >
      {children}
      {icon}
    </span>
  );

  const shared = {
    className: classes,
    onPointerMove: handleMove,
    onPointerLeave: reset,
    'data-cursor': 'open' as const
  };

  if (to) {
    return (
      <Link to={to} {...shared}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} {...shared}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} {...shared}>
      {inner}
    </button>
  );
}
