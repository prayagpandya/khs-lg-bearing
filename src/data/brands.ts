export type BrandCategory = {
  name: string;
  description: string;
  image: string;
};

export type BrandFeature = {
  title: string;
  description: string;
};

export type BrandDefinition = {
  slug: string;
  name: string;
  company: string;
  country: string;
  tag: string;
  accent: string;
  accentSoft: string;
  category: string;
  summary: string;
  heroHeading: string[];
  heroDescription: string;
  aboutHeading: string;
  about: string[];
  categoriesHeading: string;
  categories: BrandCategory[];
  whyHeading: string;
  features: BrandFeature[];
  applicationsHeading: string;
  applications: string[];
  applicationImage: string;
  ctaHeading: string;
  ctaDescription: string;
  productLabel: string;
  productImage: string;
  logo: string;
};

export const brands: BrandDefinition[] = [
  {
    slug: 'iko',
    name: 'IKO',
    company: 'Nippon Thompson',
    country: 'Japan',
    tag: 'NIPPON THOMPSON · JAPAN',
    accent: '#d84d4d',
    accentSoft: 'rgba(216, 77, 77, 0.16)',
    logo: '/assets/brands/iko-logo.webp',
    category: 'Precision bearings / linear motion',
    summary: 'High-precision needle roller bearings and linear motion solutions.',
    heroHeading: ['Precision', 'in motion.'],
    heroDescription: 'High-precision bearing and linear motion solutions engineered for demanding industrial applications.',
    aboutHeading: 'Precision where motion matters.',
    about: [
      'IKO (Nippon Thompson Japan) is a Japanese manufacturer specializing in precision bearings, needle roller bearings and linear motion products. Its product portfolio supports applications where accuracy, compact construction, smooth movement and dependable service are important.',
      'IKO products are used across industrial machinery, automation, robotics, machine tools, semiconductor equipment and other precision applications.'
    ],
    categoriesHeading: 'IKO product categories',
    categories: [
      { name: 'Needle roller bearings', description: 'Compact rolling solutions for applications with limited radial space.', image: '/assets/products/machined-needle-roller-bearing.png' },
      { name: 'Cam & roller followers', description: 'Track-running components for controlled linear or oscillating motion.', image: '/assets/products/track-roller-bearing-stud-yoke.png' },
      { name: 'Spherical plain bearings', description: 'Articulating bearing solutions for alignment and oscillating movement.', image: '/assets/products/radial-spherical-plain-bearing.png' },
      { name: 'Linear motion bearings', description: 'Guided movement components for precise machine travel.', image: '/assets/products/linear-motion-bearing.png' },
      { name: 'Rod end bearings', description: 'Compact joint components for linkages and adjustable mechanisms.', image: '/rod-end.png' },
      { name: 'Cylindrical roller bearings', description: 'Radial load support for demanding industrial assemblies.', image: '/assets/products/cylindrical-roller-bearing.png' }
    ],
    whyHeading: 'Why IKO?',
    features: [
      { title: 'High-precision engineering', description: 'Precision-focused components for demanding motion applications.' },
      { title: 'Compact design', description: 'Bearing and motion solutions designed for space-conscious machinery.' },
      { title: 'High load capability', description: 'Solutions designed for demanding industrial loads depending on product series.' },
      { title: 'Smooth motion', description: 'Products for controlled rotary and linear movement.' },
      { title: 'Long service life', description: 'Engineered for dependable operation when correctly selected and maintained.' },
      { title: 'Industrial application range', description: 'Suitable product families for automation, machinery and precision equipment.' }
    ],
    applicationsHeading: 'IKO applications',
    applications: ['Automation', 'Robotics', 'Machine tools', 'Packaging machinery', 'Semiconductor equipment', 'Medical equipment', 'Printing machinery', 'Precision machinery'],
    applicationImage: '/assets/products/linear-motion-shaft-with-support.png',
    ctaHeading: 'Looking for an IKO product or series?',
    ctaDescription: 'Send us the IKO part number or your application requirement and our team can help you identify the appropriate product or series.',
    productLabel: 'Needle roller / linear motion',
    productImage: '/assets/products/needle-roller-and-cage-assembly.png'
  },
  {
    slug: 'won',
    name: 'WON ST',
    company: 'WON Linear Motion',
    country: 'South Korea',
    tag: 'WON LINEAR MOTION · KOREA',
    accent: '#4c9fd7',
    accentSoft: 'rgba(76, 159, 215, 0.16)',
    logo: '/assets/brands/won-logo.webp',
    category: 'Linear motion systems',
    summary: 'Precision linear motion systems and components for industrial automation.',
    heroHeading: ['Precision', 'linear motion.'],
    heroDescription: 'Precision linear motion components for smooth, accurate and reliable industrial movement.',
    aboutHeading: 'Motion with a measured response.',
    about: [
      'WON ST is a Korean manufacturer specializing in linear motion components and precision motion systems. Its product portfolio includes linear guides, LM units, shafts, bushings, ball splines and other motion components used in automation and precision machinery.',
      'WON ST solutions are relevant to applications where smooth movement, positioning accuracy, rigidity and dependable operation are important.'
    ],
    categoriesHeading: 'WON product categories',
    categories: [
      { name: 'Super ball bush', description: 'Recirculating ball bushing assemblies for guided linear travel.', image: '/assets/products/linear-motion-bearing.png' },
      { name: 'Linear motion shafts', description: 'Precision shafts designed to work with linear bearing systems.', image: '/assets/products/linear-motion-shaft.png' },
      { name: 'Slide units', description: 'Ready-to-integrate units for compact guided movement.', image: '/assets/products/dual-shaft-guide.png' },
      { name: 'Cross roller guideways', description: 'Rigid guidance for accurate positioning and controlled travel.', image: '/assets/products/dual-shaft-guide.png' },
      { name: 'Linear ball bushings', description: 'Low-friction linear supports for automation equipment.', image: '/assets/products/linear-motion-bearing.png' },
      { name: 'TR guide ways', description: 'Guided motion components for precision machinery assemblies.', image: '/assets/products/linear-motion-shaft-with-support.png' },
      { name: 'Compact ball splines', description: 'Linear and rotary motion capability in a compact profile.', image: '/assets/products/linear-motion-shaft.png' },
      { name: 'Housing type ball bushings', description: 'Housed linear bearings for simplified machine integration.', image: '/assets/products/dual-shaft-guide.png' }
    ],
    whyHeading: 'Why WON?',
    features: [
      { title: 'High-precision linear motion', description: 'Components developed for controlled and repeatable machine travel.' },
      { title: 'Smooth movement', description: 'Guidance solutions for consistent linear operation.' },
      { title: 'High rigidity', description: 'Product families suited to applications where stiffness is important.' },
      { title: 'Low friction', description: 'Rolling-element guidance designed to support efficient movement.' },
      { title: 'Long service life', description: 'Dependable operation when the component is correctly selected and maintained.' },
      { title: 'Automation-ready solutions', description: 'Linear motion formats suited to automation and precision machinery.' }
    ],
    applicationsHeading: 'WON applications',
    applications: ['Automation', 'Robotics', 'Machine tools', 'Packaging machinery', 'Semiconductor equipment', 'Electronics manufacturing', 'Medical equipment', 'Precision machinery'],
    applicationImage: '/assets/products/dual-shaft-guide.png',
    ctaHeading: 'Looking for a WON product or series?',
    ctaDescription: 'Send us the WON part number, shaft size or application requirement and our team can help identify the appropriate product or series.',
    productLabel: 'Linear motion guide',
    productImage: '/assets/products/linear-motion-bearing.png'
  },
  {
    slug: 'stieber',
    name: 'STIEBER',
    company: 'Stieber Clutch',
    country: 'Germany',
    tag: 'STIEBER · GERMANY',
    accent: '#4fae8b',
    accentSoft: 'rgba(79, 174, 139, 0.16)',
    logo: '/assets/brands/stieber-logo.webp',
    category: 'Freewheels / overrunning clutches',
    summary: 'Freewheels, overrunning clutches and backstops for demanding drive systems.',
    heroHeading: ['German engineering.', 'Controlled motion.'],
    heroDescription: 'Freewheels, overrunning clutches and backstop solutions for demanding industrial drive systems.',
    aboutHeading: 'Controlled torque. Reliable motion.',
    about: [
      'STIEBER specializes in freewheels, overrunning clutches and backstop solutions for industrial drive systems. Its products are used where controlled motion, reverse-rotation prevention and dependable torque transmission are important.',
      'The brand brings German engineering heritage to drive applications where the right clutch or freewheel selection matters to the overall machine.'
    ],
    categoriesHeading: 'STIEBER product series',
    categories: [
      { name: 'ASNU series', description: 'Overrunning clutch solutions for controlled one-way torque transmission.', image: '/assets/products/one-way-clutch-bearing.png' },
      { name: 'AS series', description: 'Freewheel components for industrial drive and indexing applications.', image: '/assets/products/drawn-cup-needle-roller-clutch.png' },
      { name: 'CSK series', description: 'Compact clutch formats for integrated machine arrangements.', image: '/assets/products/one-way-clutch-bearing.png' },
      { name: 'CSK P series', description: 'Protected freewheel configurations for selected drive applications.', image: '/assets/products/drawn-cup-needle-roller-clutch.png' },
      { name: 'CSK PP series', description: 'Sealed options for applications requiring additional protection.', image: '/assets/products/one-way-clutch-bearing.png' },
      { name: 'DC series', description: 'Industrial clutch solutions for demanding torque transmission requirements.', image: '/assets/products/permaglide-dry-bush.png' }
    ],
    whyHeading: 'Why STIEBER?',
    features: [
      { title: 'German engineering', description: 'Engineering heritage focused on dependable industrial drive components.' },
      { title: 'Reliable torque transmission', description: 'Freewheel and clutch solutions for controlled drive behavior.' },
      { title: 'High load and torque capability', description: 'Performance depends on the selected series and application conditions.' },
      { title: 'Long service life', description: 'Designed for dependable operation when correctly specified and maintained.' },
      { title: 'Robust industrial construction', description: 'Product families built around demanding drive-system requirements.' },
      { title: 'Demanding drive systems', description: 'Suitable solutions for selected conveyors, gearboxes and industrial drives.' }
    ],
    applicationsHeading: 'STIEBER applications',
    applications: ['Conveyors', 'Gearboxes', 'Industrial drives', 'Material handling', 'Mining equipment', 'Packaging machinery', 'Machine tools', 'Fans & blowers', 'Heavy machinery', 'Automation systems'],
    applicationImage: '/assets/products/drawn-cup-needle-roller-clutch.png',
    ctaHeading: 'Looking for a STIEBER product or series?',
    ctaDescription: 'Send us the Stieber part number, torque requirement or application details and our team can help identify the appropriate product or series.',
    productLabel: 'Freewheel / clutch',
    productImage: '/assets/products/one-way-clutch-bearing.png'
  },
  {
    slug: 'tpi',
    name: 'TPI',
    company: 'Tung Pei Industrial Co., Ltd.',
    country: 'Taiwan',
    tag: 'TUNG PEI INDUSTRIAL · TAIWAN',
    accent: '#2B8FD4',
    accentSoft: 'rgba(43, 143, 212, 0.16)',
    logo: '/assets/brands/tpi-logo.webp',
    category: 'Precision ball bearings / miniature bearings',
    summary: 'World-class precision deep groove ball bearings and miniature bearings engineered in Taiwan.',
    heroHeading: ['Precision ball', 'bearings.'],
    heroDescription: 'High-speed, ultra-quiet precision deep groove ball bearings engineered for automotive, electric motor, and precision machinery applications.',
    aboutHeading: 'Quiet running. Extreme precision.',
    about: [
      'TPI (Tung Pei Industrial Co., Ltd.) is Taiwan premier manufacturer of high-precision ball bearings, established in technical collaboration with global bearing leaders.',
      'Renowned for ultra-low noise, high rotational speeds, and extended fatigue life, TPI bearings are trusted globally across electric motors, two-wheelers, home appliances, automotive alternators, and precision automation.'
    ],
    categoriesHeading: 'TPI product categories',
    categories: [
      { name: 'Deep groove ball bearings', description: 'Versatile rolling bearings supporting radial and light axial loads at high speeds.', image: '/assets/products/deep-groove-ball-bearing.png' },
      { name: 'Miniature ball bearings', description: 'Compact precision bearings for small motors, instruments, and precision drives.', image: '/assets/products/deep-groove-ball-bearing.png' },
      { name: 'Shielded & sealed bearings', description: 'Pre-lubricated bearings with rubber seals or steel shields for maintenance-free life.', image: '/assets/products/deep-groove-ball-bearing.png' },
      { name: 'Angular contact bearings', description: 'Combined radial and axial load capacity for high-speed machine spindles.', image: '/assets/products/angular-contact-ball-bearing.png' },
      { name: 'Self-aligning ball bearings', description: 'Accommodates shaft deflection and mounting misalignments smoothly.', image: '/assets/products/self-aligning-ball-bearing.png' },
      { name: 'EMQ electric motor bearings', description: 'Specially tested for whisper-quiet vibration levels and motor reliability.', image: '/assets/products/deep-groove-ball-bearing.png' }
    ],
    whyHeading: 'Why TPI?',
    features: [
      { title: 'Ultra-low vibration & noise', description: 'Electric Motor Quality (EMQ) tested for quiet, smooth running.' },
      { title: 'High-speed rotational capability', description: 'Precision-ground raceways support demanding high-RPM duties.' },
      { title: 'Premium vacuum-degassed steel', description: 'High purity steel composition ensures extended fatigue life.' },
      { title: 'Advanced sealing options', description: 'Non-contact, contact, and labyrinth seal configurations.' },
      { title: 'Pre-lubricated maintenance-free', description: 'Factory greased with high-performance synthetic lubricants.' },
      { title: 'Global automotive quality', description: 'Manufactured under stringent IATF 16949 and ISO 9001 standards.' }
    ],
    applicationsHeading: 'TPI applications',
    applications: ['Electric Motors', 'Automotive Alternators & Starters', 'Motorcycles & Two-Wheelers', 'Industrial Fans & Blowers', 'Power Tools', 'Pumps & Compressors', 'Home Appliances', 'Agricultural Equipment'],
    applicationImage: '/assets/products/deep-groove-ball-bearing.png',
    ctaHeading: 'Looking for a TPI bearing specification?',
    ctaDescription: 'Send us the TPI part number or dimensional requirement (bore, OD, width) and our technical team will quote competitive prices with prompt delivery.',
    productLabel: 'Deep groove ball bearing',
    productImage: '/assets/products/deep-groove-ball-bearing.png'
  },
  {
    slug: 'hiwin',
    name: 'HIWIN',
    company: 'HIWIN Technologies Corp.',
    country: 'Taiwan',
    tag: 'HIWIN TECHNOLOGIES · TAIWAN',
    accent: '#009E44',
    accentSoft: 'rgba(0, 158, 68, 0.16)',
    logo: '/assets/brands/hiwin-logo.webp',
    category: 'Linear guideways / ballscrews / motion systems',
    summary: 'Global technology leader in precision linear guideways, ballscrews, and industrial motion control.',
    heroHeading: ['High-tech', 'motion control.'],
    heroDescription: 'World-class linear guideways, precision ballscrews, and multi-axis motion modules for high-speed CNC machinery, semiconductor, and industrial automation.',
    aboutHeading: 'HI-tech WINner in precision motion.',
    about: [
      'HIWIN is recognized worldwide as a pioneer in motion control technology, offering an extensive range of precision linear guideways, ground and rolled ballscrews, and linear modules.',
      'From semiconductor manufacturing and CNC machine tools to automated packaging and robotics, HIWIN components deliver high positioning accuracy, high load capacity, and exceptional rigidity.'
    ],
    categoriesHeading: 'HIWIN product categories',
    categories: [
      { name: 'Heavy load linear guides (HG)', description: 'Four-row circular-arc groove design with high rigidity and high load ratings.', image: '/assets/products/dual-shaft-guide.png' },
      { name: 'Low profile linear guides (EG)', description: 'Compact low assembly height for space-constrained automated machinery.', image: '/assets/products/dual-shaft-guide.png' },
      { name: 'Miniature linear guides (MG)', description: 'Compact Gothic-arch contact linear rails for medical and semiconductor equipment.', image: '/assets/products/dual-shaft-guide.png' },
      { name: 'Precision ground ballscrews', description: 'High-lead ground ballscrews for high-speed, high-precision positioning.', image: '/assets/products/linear-motion-shaft.png' },
      { name: 'Rolled ballscrews', description: 'Cost-effective high-efficiency ballscrew assemblies for general automation.', image: '/assets/products/linear-motion-shaft.png' },
      { name: 'Linear motion blocks & carriages', description: 'Interchangeable block designs with flange and square block formats.', image: '/assets/products/linear-motion-bearing.png' }
    ],
    whyHeading: 'Why HIWIN?',
    features: [
      { title: 'Equal four-directional load ratings', description: 'Engineered to withstand loads from radial, reverse-radial and lateral directions.' },
      { title: 'Self-aligning capability', description: 'Absorbs installation error smoothly even with slight surface irregularities.' },
      { title: 'High positioning accuracy', description: 'Rolling motion friction coefficient is only 1/50th of conventional sliding guides.' },
      { title: 'Interchangeable rails and blocks', description: 'Enables quick replacement and convenient modular field assembly.' },
      { title: 'SynchMotion quiet technology', description: 'Ball separator design dampens noise and retains grease lubrication.' },
      { title: 'Extensive global stock', description: 'Widely specified across leading machine tool builders worldwide.' }
    ],
    applicationsHeading: 'HIWIN applications',
    applications: ['CNC Machine Tools', 'Industrial Automation', 'Semiconductor Assembly', 'Robotics & Pick-and-Place', 'Packaging Machinery', 'Medical Equipment', 'Laser Cutting Machines', '3D Printing'],
    applicationImage: '/assets/products/dual-shaft-guide.png',
    ctaHeading: 'Need HIWIN rails, blocks, or ballscrews?',
    ctaDescription: 'Share your HIWIN block/rail model (e.g., HGH, HGW, EGH, MGN) or travel stroke length and our team will provide prompt pricing and availability.',
    productLabel: 'Linear guideway & block',
    productImage: '/assets/products/dual-shaft-guide.png'
  }
];

export const getBrand = (slug?: string) => brands.find((brand) => brand.slug === slug);
