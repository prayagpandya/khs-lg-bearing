import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';

interface IndustryItem {
  code: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const PRIMARY_INDUSTRIES: IndustryItem[] = [
  {
    code: '01',
    name: 'Packaging & Processing',
    description: 'Bearings, linear motion, shafts and power transmission components for continuous and repeatable packaging machinery movement.',
    image: '/images/industries/packaging-machine.webp',
    link: '/industries?sector=packaging-textile'
  },
  {
    code: '02',
    name: 'Machine Tools & CNC',
    description: 'Precision motion components for machining systems and equipment requiring controlled rotational and linear movement.',
    image: '/images/industries/cnc-automation.webp',
    link: '/industries?sector=automation-machine-tools'
  },
  {
    code: '03',
    name: 'Automotive',
    description: 'Bearing and motion components for rotating assemblies, transmission systems and automotive production applications.',
    image: '/images/industries/automotive-drivetrain.webp',
    link: '/industries?sector=automotive-assemblies'
  },
  {
    code: '04',
    name: 'Gearbox & Power Transmission',
    description: 'Bearing and drive components for radial loads, combined loads and continuous torque transmission.',
    image: '/images/industries/steel-rolling-mill.webp',
    link: '/industries?sector=steel-rolling-mills'
  },
  {
    code: '05',
    name: 'Material Handling & Conveyors',
    description: 'Motion components for conveying, lifting, warehousing and continuous material movement systems.',
    image: '/images/industries/overhead-crane.webp',
    link: '/industries?sector=material-handling-cranes'
  },
  {
    code: '06',
    name: 'Automation & Robotics',
    description: 'Precision linear and rotational components for automated machinery, positioning systems and special-purpose equipment.',
    image: '/images/industries/electric-motor.webp',
    link: '/industries?sector=electric-motors'
  }
];

export function IndustriesSection({ hideHeading = false }: { hideHeading?: boolean } = {}) {
  return (
    <section
      aria-label="Industries served"
      className={`relative border-t border-ink-700 bg-ink-950 ${hideHeading ? 'py-8 lg:py-14' : 'py-16 lg:py-24'}`}>
      
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        {!hideHeading && (
          <SectionHeading
            code="04 / Industries"
            eyebrow="Application Engineering"
            lines={['Motion Across', 'Industries.']}
            body="Precision bearing, linear motion and transmission components specified around actual machine duty, loads and operating environments."
          />
        )}

        {/* 6 Primary Industry Cards with Links to Detailed Industry Profiles */}
        <div className={`${hideHeading ? 'mt-2' : 'mt-12'} grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
          {PRIMARY_INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.name} delay={i * 0.05} className="h-full">
              <article className="group relative flex h-full flex-col justify-between overflow-hidden border border-ink-800 bg-ink-900/90 p-7 transition-all duration-300 hover:border-signal/50 hover:bg-ink-900 lg:p-8">
                <div>
                  {/* Top Bar with Number code */}
                  <div className="flex items-center justify-between border-b border-ink-800 pb-3">
                    <span className="font-mono text-xs font-bold text-signal">
                      {industry.code}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-signal/40 group-hover:bg-signal transition-colors" />
                  </div>

                  {/* Real Industrial Machinery Drawing Visual with White Background */}
                  <Link
                    to={industry.link}
                    className="relative my-5 block h-48 w-full overflow-hidden rounded border border-ink-700 bg-white p-3.5 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)]"
                  >
                    <img
                      src={industry.image}
                      alt={`${industry.name} Industrial Machinery`}
                      className="relative max-h-full max-w-full object-contain transition-transform duration-500 ease-precision group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  {/* Title & Description */}
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-steel-50 transition-colors group-hover:text-signal">
                    <Link to={industry.link} className="hover:underline">
                      {industry.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-steel-400">
                    {industry.description}
                  </p>
                </div>

                {/* Bottom Action Link to Specific Industry Sector Tab */}
                <div className="mt-6 border-t border-ink-800 pt-4">
                  <Link
                    to={industry.link}
                    className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-signal transition-colors group-hover:text-signal-bright"
                  >
                    View Industry
                    <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>

                <div
                  className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-signal shadow-[0_0_8px_#F5C400] transition-[width] duration-400 ease-precision group-hover:w-full"
                  aria-hidden
                />
              </article>
            </Reveal>
          ))}
        </div>

        {/* VIEW MORE INDUSTRIES CTA */}
        {!hideHeading && (
          <div className="mt-14 flex justify-center">
            <Reveal delay={0.15}>
              <Link
                to="/industries"
                data-cursor="open"
                className="group inline-flex items-center gap-3 border border-signal bg-signal px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-ink-950 shadow-[0_0_20px_rgba(245,196,0,0.3)] transition-all duration-300 hover:bg-signal-bright hover:shadow-[0_0_30px_rgba(245,196,0,0.55)] hover:scale-[1.02]">
                View More Industries
                <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 ease-precision group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}