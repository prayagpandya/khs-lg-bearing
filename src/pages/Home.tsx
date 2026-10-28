import { Hero3D } from '../components/sections/Hero3D';
import { BearingSearch } from '../components/sections/BearingSearch';
import { MotionSection } from '../components/sections/MotionSection';
import { StatsSection } from '../components/sections/StatsSection';
import { BrandPartnersSection } from '../components/sections/BrandPartnersSection';
import { Products3D } from '../components/sections/Products3D';
import { IndustriesSection } from '../components/sections/IndustriesSection';
import { GlobalPresence } from '../components/sections/GlobalPresence';
import { CTASection } from '../components/sections/CTASection';
import { useSeo } from '../hooks/useSeo';
import { company, stats } from '../data/company';

export function Home() {
  useSeo({
    title: 'Precision in Motion — Bearings, Linear Motion & Power Transmission',
    description:
      'KHS-LG — precision bearing solutions engineered for reliable motion. 50+ years of experience, 12,000+ customers served, 13,500+ KHS-LG SKUs, exporting to 25+ countries.',
    path: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: company.legalName,
      alternateName: 'KHS-LG',
      url: company.website,
      email: company.email,
      telephone: company.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '196, Raj Rajeshwari Compound, Near Sonale Police Station, Sonale',
        addressLocality: 'Bhiwandi',
        addressRegion: 'Maharashtra',
        postalCode: '421302',
        addressCountry: 'IN'
      },
      slogan: 'Precision in Motion',
      description: company.intro,
      knowsAbout: stats.map((s) => `${s.value}${s.suffix} ${s.label}`)
    }
  });

  return (
    <main>
      <Hero3D />
      <MotionSection />
      <StatsSection />
      <BrandPartnersSection />
      <Products3D limit={6} />
      <BearingSearch />
      <IndustriesSection />
      <GlobalPresence code="06 / Global" />
      <CTASection />
    </main>
  );
}
