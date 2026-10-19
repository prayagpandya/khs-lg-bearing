import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/RevealText';
import { ProductMotionSlider } from './ProductMotionSlider';

export function MotionSection() {
  return (
    <section
      aria-labelledby="motion-heading"
      className="relative overflow-hidden border-t border-ink-700 bg-ink-900 py-6 sm:py-8 lg:py-10">
      
      <div className="industrial-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[1600px] gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-14">
        <div className="min-w-0 lg:col-span-6 xl:col-span-6">
          <SectionHeading
            code="01 / Company"
            eyebrow="INDUSTRIAL EXPERIENCE. GLOBAL REACH."
            lines={['One Source for', 'Industrial Motion.']}
            className="max-w-none" />
          
          <div id="motion-heading" className="sr-only">
            One source for industrial motion
          </div>

          <Reveal delay={0.1}>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-steel-300">
              KHS Innovation & Engineering LLP is a one-stop solution for all types of bearings, linear motion and power transmission requirements. Backed by over 50 years of industry experience, we support OEMs, machine manufacturers, maintenance teams and industrial distributors with a comprehensive product range, technical application support, quality-controlled supply and dependable availability across India and international markets.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <dl className="mt-4 sm:mt-5 grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-3">
              {[
                { k: 'Experience', v: '50+ Years', sub: 'Built across generations' },
                { k: 'Quality Control', v: 'ISO 9001:2015', sub: 'Verified industrial standards' },
                { k: 'Inventory Depth', v: '13,500+ SKUs', sub: 'Bearings, shafts & drives' }
              ].map((item) => (
                <div key={item.k} className="bg-ink-950 p-3 sm:p-3.5">
                  <dt className="font-mono text-[9px] uppercase tracking-tech text-steel-500">
                    {item.k}
                  </dt>
                  <dd className="mt-1 font-display text-base sm:text-lg font-bold uppercase leading-tight text-steel-50">
                    {item.v}
                  </dd>
                  <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-tech text-steel-500">
                    {item.sub}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-6">
              <Link
                to="/about"
                data-cursor="open"
                className="group inline-flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-steel-50 transition-colors hover:text-signal">
                About KHS-LG
                <span className="relative h-px w-10 bg-signal transition-all duration-300 ease-precision group-hover:w-16" />
                <ArrowUpRightIcon className="h-4 w-4 text-signal" aria-hidden />
              </Link>
              <Link
                to="/products"
                className="font-mono text-xs uppercase tracking-tech text-steel-400 hover:text-signal transition-colors flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                Explore 13,500+ SKUs &rarr;
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Complete KHS-LG Product Family Composition — Single-Product Auto-Moving Slider */}
        <div className="min-w-0 lg:col-span-6 xl:col-span-6">
          <Reveal delay={0.12} className="relative w-full">
            <ProductMotionSlider />
          </Reveal>
        </div>
      </div>
    </section>
  );
}