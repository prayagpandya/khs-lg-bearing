import { CountUp } from '../ui/CountUp';
import { TechnicalLabel } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { stats, Stat } from '../../data/company';

/** Industrial data dials — with larger numbers symmetrically in the center. */
export function StatsSection() {
  return (
    <section
      aria-label="KHS-LG in numbers"
      className="relative border-t border-ink-700 bg-ink-950 py-12 lg:py-18">
      
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <Reveal>
          <TechnicalLabel code="02 / Scale">Verified company figures</TechnicalLabel>
        </Reveal>

        <div className="mt-12 grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const isCenter = i === 1 || i === 2;
            return (
              <Dial
                key={stat.label}
                stat={stat}
                index={i}
                isCenter={isCenter}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Dial({
  stat,
  index,
  isCenter
}: {
  stat: Stat;
  index: number;
  isCenter: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden bg-ink-950 p-7 transition-all duration-300 hover:bg-ink-900 lg:p-9 ${
        isCenter ? 'ring-1 ring-signal/20' : ''
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
            {String(index + 1).padStart(2, '0')}
          </p>
          <div className="flex items-center gap-2">
            {isCenter && (
              <span className="font-mono text-[9px] font-semibold uppercase tracking-tech text-signal/90 border border-signal/30 bg-signal/10 px-1.5 py-0.5 rounded-sm">
                Scale
              </span>
            )}
            <span
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:bg-signal group-hover:shadow-[0_0_8px_#F5C400] ${
                isCenter ? 'bg-signal shadow-[0_0_6px_#F5C400]' : 'bg-signal/30'
              }`}
            />
          </div>
        </div>

        <p
          className={
            isCenter
              ? 'mt-4 font-display text-[clamp(2.6rem,5vw,4.2rem)] font-bold leading-none text-gradient-gold drop-shadow-[0_2px_18px_rgba(245,196,0,0.25)] tabular-nums'
              : 'mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-bold leading-none text-steel-50 transition-colors duration-300 group-hover:text-signal tabular-nums'
          }
        >
          <CountUp value={stat.value} suffix={stat.suffix} />
        </p>

        <p className="mt-4 font-display text-base font-semibold uppercase tracking-[0.14em] text-signal">
          {stat.label}
        </p>
        <p className="mt-1.5 text-xs text-steel-500">{stat.note}</p>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 h-0.5 transition-[width] duration-500 ease-precision bg-signal shadow-[0_0_8px_#F5C400] ${
          isCenter ? 'w-full opacity-70 group-hover:opacity-100' : 'w-0 group-hover:w-full'
        }`}
        aria-hidden
      />
    </div>
  );
}