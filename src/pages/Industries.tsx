import { PageHero } from '../components/layout/PageHero';
import { ApplicationsSection } from '../components/sections/ApplicationsSection';
import { CTASection } from '../components/sections/CTASection';
import { useSeo } from '../hooks/useSeo';

export function Industries() {
  useSeo({
    title: 'Industries',
    description:
    'KHS-LG supplies bearing solutions across manufacturing, industrial and automobile industries, with 12,000+ OEMs served.',
    path: '/industries'
  });

  return (
    <main>
      <PageHero
        code="Industries"
        eyebrow="Manufacturing · Industrial · Automobile"
        lines={['Motion that', 'Industries trust']}
        body="Bearings supplied to 12,000+ OEMs across manufacturing, industrial and automobile applications, backed by 50+ years of experience." />
      
      <ApplicationsSection hideHeading />
      <CTASection />
    </main>);

}