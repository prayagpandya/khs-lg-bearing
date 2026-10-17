export interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

export const company = {
  name: 'KHS-LG',
  legalName: 'KHS Innovation & Engineering LLP',
  tagline: 'Precision in Motion',
  headline: ['Precision', 'In Motion'],
  legacyHeadline: 'The Name Behind Unstoppable Motion',
  intro:
  'KHS Innovation & Engineering LLP is a one-stop destination for all types of bearing solutions. With over 50+ years of experience, KHS-LG has emerged as a leading bearings provider in the market and has worked with various notable companies and organizations functioning across a diverse range of industries.',
  shortIntro:
  'Precision bearing solutions trusted across industries worldwide — engineered for reliable motion, performance and industrial excellence.',
  experience: '50+ years of experience',
  certification: 'ISO 9001:2015',
  email: 'info@khsbearings.com',
  emailHref: 'mailto:info@khsbearings.com',
  salesEmail: 'sales@khsbearings.com',
  salesEmailHref: 'mailto:sales@khsbearings.com',
  phone: '+91 022 6978 6106',
  phoneHref: 'tel:+912269786106',
  factoryOffice: [
    'KHS Innovation & Engineering LLP',
    '196, Raj Rajeshwari Compound,',
    '(Opp. Bombay Rayon Fashion Ltd.),',
    'Near Sonale Police Station,',
    'Sonale, Bhiwandi – 421302.'
  ].join('\n'),
  registeredOffice: [
    '4A Karim Building,',
    '1st Floor,',
    '142/144, B. P. Lane,',
    'Mumbai (M. Corp),',
    'Mumbai – 400 003.'
  ].join('\n'),
  corporateOffice: [
    'KHS Innovation & Engineering LLP',
    'A-2403, Marathon Futurex,',
    'Mafatlal Mills Compound,',
    'N M Joshi Marg,',
    'Lower Parel East,',
    'Mumbai,',
    'Maharashtra 400013.'
  ].join('\n'),
  zonalOffices: ['Ahmedabad', 'Bangalore', 'Delhi', 'Pune'],
  website: 'https://khslg.com/'
};

export const COMPANY_PHONE = company.phone;
// Preserve the existing WhatsApp destination; it is not the approved call number.
export const COMPANY_PHONE_RAW = '919175275964';
export const COMPANY_WHATSAPP_URL = `https://wa.me/${COMPANY_PHONE_RAW}`;

export const stats: Stat[] = [
  { value: 50, suffix: '+', label: 'Years of Industry Experience', note: 'Built across generations' },
  { value: 13500, suffix: '+', label: 'KHS-LG SKUs', note: 'Across industrial motion categories' },
  { value: 12000, suffix: '+', label: 'Customers Served', note: 'Across industrial markets' },
  { value: 25, suffix: '+', label: 'Export Countries', note: 'International market reach' }
];

export const markets: { country: string; lat: number; lon: number }[] = [
  { country: 'India', lat: 19.0760, lon: 72.8777 },
  { country: 'Bahrain', lat: 26.0667, lon: 50.5577 },
  { country: 'Oman', lat: 21.4735, lon: 55.9754 },
  { country: 'Bangladesh', lat: 23.685, lon: 90.3563 },
  { country: 'Belarus', lat: 53.7098, lon: 27.9534 },
  { country: 'Brazil', lat: -14.235, lon: -51.9253 },
  { country: 'Bulgaria', lat: 42.7339, lon: 25.4858 },
  { country: 'UAE', lat: 23.4241, lon: 53.8478 },
  { country: 'Egypt', lat: 26.8206, lon: 30.8025 },
  { country: 'Greece', lat: 39.0742, lon: 21.8243 },
  { country: 'Hungary', lat: 47.1625, lon: 19.5033 },
  { country: 'Kenya', lat: -0.0236, lon: 37.9062 },
  { country: 'Lebanon', lat: 33.8547, lon: 35.8623 },
  { country: 'Lithuania', lat: 55.1694, lon: 23.8813 },
  { country: 'Poland', lat: 51.9194, lon: 19.1451 },
  { country: 'Qatar', lat: 25.3548, lon: 51.1839 },
  { country: 'Russia', lat: 55.7558, lon: 37.6173 },
  { country: 'Saudi Arabia', lat: 23.8859, lon: 45.0792 },
  { country: 'Serbia', lat: 44.0165, lon: 21.0059 },
  { country: 'South Africa', lat: -30.5595, lon: 22.9375 },
  { country: 'Sri Lanka', lat: 7.8731, lon: 80.7718 },
  { country: 'Tanzania', lat: -6.369, lon: 34.8888 },
  { country: 'Turkey', lat: 38.9637, lon: 35.2433 },
  { country: 'Ukraine', lat: 48.3794, lon: 31.1656 },
  { country: 'USA', lat: 37.0902, lon: -95.7129 },
  { country: 'Nepal', lat: 28.3949, lon: 84.124 },
  { country: 'Zimbabwe', lat: -19.0154, lon: 29.1549 },
  { country: 'Nigeria', lat: 9.082, lon: 8.6753 }
];


export const timeline = [
{
  step: 'Foundation',
  title: 'A one-stop bearing destination',
  body: 'KHS Innovation & Engineering LLP was built around a single idea — become the one-stop destination for every type of bearing solution.'
},
{
  step: 'Experience',
  title: 'Over 50 years in motion',
  body: 'More than five decades of hands-on bearing experience across manufacturing, industrial and automobile applications.'
},
{
  step: 'Engineering',
  title: 'High technology support',
  body: 'The products and services offered by KHS-LG are high technology, assisting manufacturers in their product design.'
},
{
  step: 'Expansion',
  title: '12,000+ Customers, 13,500+ SKUs',
  body: 'A comprehensive range of bearings, linear motion and power transmission components supported by a dependable distribution network.'
},
{
  step: 'Global Presence',
  title: 'Exporting to 25+ countries',
  body: 'Industrial motion solutions shipped to markets across Asia, Europe, Africa, the Middle East and the Americas.'
}];


export const inspectionProcess = [
{ code: '01', name: 'Measure', body: 'Dimensional checks before anything moves forward.' },
{ code: '02', name: 'Inspect', body: 'Surfaces, rings and rolling elements reviewed in detail.' },
{ code: '03', name: 'Verify', body: 'Each batch verified against the order specification.' },
{ code: '04', name: 'Precision', body: 'Only bearings that meet the standard continue.' },
{ code: '05', name: 'Dispatch', body: 'Packed and released for dispatch to the customer.' }];