import { products } from './products';

export type CatalogueGroup = 'Bearings' | 'Linear Shafts' | 'Linear Motion' | 'Power Transmission' | 'Partner Brands';

export interface CatalogueRecord {
  id: string;
  group: CatalogueGroup;
  categoryTag?: string;
  sequence: number;
  title: string;
  image?: string;
  description: string;
  keywords: string[];
  series: string[];
  productSlug?: string;
  pdfAvailable: boolean;
  pdfUrl: string | null;
  pdfFileName: string | null;
  downloadType: 'pdf' | 'external' | null;
}

export interface CatalogueLead {
  catalogueName: string;
  catalogueId: string;
  fullName: string;
  companyName: string;
  mobile: string;
  email: string;
  city: string;
  industry: string;
  message: string;
  timestamp: string;
}

export const catalogueGroups: { id: CatalogueGroup; code: string; title: string; description: string }[] = [
  { id: 'Bearings', code: '01', title: 'Bearings', description: 'Precision bearing solutions for industrial, OEM and motion applications.' },
  { id: 'Linear Shafts', code: '02', title: 'Linear Shafts', description: 'Hard-chrome shafts, supported linear rails, and precision shaft support units.' },
  { id: 'Linear Motion', code: '03', title: 'Linear Motion', description: 'Linear guideways, dual shaft guides, and recirculating ball bushing units.' },
  { id: 'Power Transmission', code: '04', title: 'Power Transmission', description: 'Power transmission solutions including timing belts and V-belts.' },
  { id: 'Partner Brands', code: '05', title: 'Partner Brands', description: 'Authoritative technical documentation from our global partner brands (IKO, WON, TPI).' }
];

export const bearingImages: Record<string, string> = {
  'taper-roller-bearings': '/assets/products/taper-roller-bearing.png',
  'spherical-roller-bearings': '/assets/products/spherical-roller-bearing.png',
  'deep-groove-ball-bearings': '/assets/products/deep-groove-roller-bearing.png',
  'miniature-ball-bearings': '/assets/products/miniature-ball-bearing.png',
  'cylindrical-roller-bearings': '/assets/products/cylindrical-roller-bearing.png',
  'cylindrical-ball-bearings': '/assets/products/cylindrical-roller-bearing.png',
  'linear-motion-shafts-with-support': '/assets/products/linear-motion-shaft-with-support.png',
  'linear-motion-bearings': '/assets/products/linear-motion-bearing.png',
  'pillow-block-bearings': '/assets/products/pillow-block-bearing.png',
  'thrust-needle-roller-bearings': '/assets/products/thrust-needle-roller-bearing.png',
  'stud-and-yoke-track-roller-bearings': '/assets/products/track-roller-bearing-stud-yoke.png',
  'machined-type-needle-roller-bearings': '/assets/products/machined-needle-roller-bearing.png',
  'rod-end-bearings': '/rod-end.png',
  'radial-spherical-plain-bearings': '/assets/products/radial-spherical-plain-bearing.png',
  'one-way-clutch': '/assets/products/one-way-clutch-bearing.png',
  'cylindrical-roller-thrust-bearings': '/assets/products/cylindrical-roller-bearing.png',
  'drawn-cup-needle-roller-clutches': '/assets/products/drawn-cup-needle-roller-clutch.png',
  'permaglide-dry-bush': '/assets/products/permaglide-dry-bush.png',
  'needle-roller-and-cage-assemblies': '/assets/products/needle-roller-and-cage-assembly.png',
  'track-roller-bearings': '/assets/products/track-roller-bearing.png',
  'flat-roller-cages': '/assets/products/flat-roller-bearing.png',
  'precision-angular-contact-bearings': '/assets/products/precision-angular-contact-bearing.png',
  'self-aligning-ball-bearings': '/assets/products/self-aligning-ball-bearing.png',
  'thrust-ball-bearings': '/assets/products/thrust-ball-bearing.png',
  'spherical-roller-thrust-bearings': '/assets/products/spherical-roller-bearing.png',
  'dual-shaft-guides': '/assets/products/dual-shaft-guide.png',
  'drawn-cup-needle-roller-bearings': '/assets/products/drawn-cup-needle-roller-bearing.png',

  // Linear Shafts series
  'shaft-custom-made': '/assets/products/shaft-custom-made.png',
  'shaft-s-st': '/assets/products/shaft-s-st.png',
  'shaft-s-stu': '/assets/products/shaft-s-stu.png',
  'shaft-st': '/assets/products/shaft-st.png',
  'shaft-stu': '/assets/products/shaft-stu.png',
  'shaft-was-solid': '/assets/products/shaft-was-solid.png',
  'hard-chrome-shafts': '/assets/products/linear-motion-shaft.png',
  'shafts-with-support': '/assets/products/linear-motion-shaft-with-support.png',
  'shaft-supporting-units': '/assets/products/shaft-support-unit.png'
};

const bearingDefinitions = [
  ['taper-roller-bearings', 'Taper Roller Bearings', 'Combined radial and axial loads in one geometry.', ['30000 Series', '32000 Series', '33000 Series']],
  ['spherical-roller-bearings', 'Spherical Roller Bearings', 'Self-aligning motion under demanding conditions.', ['22200 Series', '22300 Series', '23000 Series']],
  ['deep-groove-ball-bearings', 'Deep Groove Ball Bearings', 'The most widely used bearing type in motion systems.', ['6000 Series', '6200 Series', '6300 Series']],
  ['miniature-ball-bearings', 'Miniature Ball Bearings', 'Small envelope, precision motion.', ['MR Series', 'R Series', 'Flanged Series']],
  ['cylindrical-roller-bearings', 'Cylindrical Roller Bearings', 'High radial capacity through line contact.', ['NU Series', 'NJ Series', 'N Series']],
  ['pillow-block-bearings', 'Pillow Block Bearings', 'Mounted bearing units for dependable shaft support.', ['UC Series', 'UCP Series', 'UCF Series']],
  ['thrust-needle-roller-bearings', 'Thrust Needle Roller Bearings', 'Compact axial-load support for constrained assemblies.', ['AXK Series', 'AS Series']],
  ['stud-and-yoke-track-roller-bearings', 'Stud and Yoke Type Track Roller Bearings', 'Track-running solutions for cam, guide and conveyor applications.', ['CF Series', 'KR Series', 'NUKR Series']],
  ['machined-type-needle-roller-bearings', 'Machined Type Needle Roller Bearings', 'High radial capacity in compact precision housings.', ['NA Series', 'RNA Series', 'NKI Series']],
  ['rod-end-bearings', 'Rod End Bearings', 'Articulating linkage solutions for controlled mechanical movement.', ['SI Series', 'SA Series']],
  ['radial-spherical-plain-bearings', 'Radial Spherical Plain Bearings', 'Plain spherical motion for alignment and oscillating loads.', ['GE Series', 'GEZ Series']],
  ['one-way-clutch', 'One Way Clutch', 'One-direction motion control for overrunning and indexing systems.', ['CSK Series', 'HF Series']],
  ['cylindrical-roller-thrust-bearings', 'Cylindrical Roller Thrust Bearings', 'High axial-load capacity with robust roller contact.', ['811 Series', '812 Series']],
  ['drawn-cup-needle-roller-clutches', 'Drawn Cup Needle Roller Clutches', 'Compact one-way clutch assemblies for precision mechanisms.', ['HF Series', 'HFL Series']],
  ['permaglide-dry-bush', 'Permaglide Dry Bush', 'Maintenance-reduced dry-running bearing surfaces.', ['P Series', 'E Series']],
  ['needle-roller-and-cage-assemblies', 'Needle Roller and Cage Assemblies', 'Low-section rolling elements for compact shaft arrangements.', ['K Series', 'KZK Series']],
  ['track-roller-bearings', 'Track Roller Bearings', 'Profiled rolling support for cam and track guidance.', ['NATR Series', 'NUTR Series']],
  ['flat-roller-cages', 'Flat Roller Cages', 'Guided roller cage assemblies for linear precision systems.', ['Flat Cage Series']],
  ['precision-angular-contact-bearings', 'Precision Angular Contact Bearings', 'High-speed precision support for combined radial and axial loads.', ['7000 Series', '7200 Series', '7300 Series']],
  ['self-aligning-ball-bearings', 'Self-Aligning Ball Bearings', 'Compensate for shaft and housing alignment variation.', ['1200 Series', '1300 Series', '2200 Series']],
  ['thrust-ball-bearings', 'Thrust Ball Bearings', 'Dedicated axial-load support for rotating assemblies.', ['51100 Series', '51200 Series']],
  ['spherical-roller-thrust-bearings', 'Spherical Roller Thrust Bearings', 'Heavy axial-load support with self-aligning capability.', ['29200 Series', '29300 Series', '29400 Series']],
  ['drawn-cup-needle-roller-bearings', 'Drawn Cup Needle Roller Bearings', 'Thin-section needle rollers for compact radial applications.', ['HK Series', 'HMK Series', 'SCE Series']]
] as const;

type CatalogueDocument = Pick<CatalogueRecord, 'pdfAvailable' | 'pdfUrl' | 'pdfFileName' | 'downloadType'>;

const bearingDocuments: Record<string, CatalogueDocument> = {
  'taper-roller-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/17jS8fVNbbfaFIx7wLd1mO0N9Yx3wk-Ce/view?usp=sharing',
    pdfFileName: 'TRB_V4.pdf',
    downloadType: 'external'
  },
  'spherical-roller-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/10QIf-QatdL28s90RiswOqehk4GpCGtna/view?usp=sharing',
    pdfFileName: 'SRB_V3.pdf',
    downloadType: 'external'
  },
  'deep-groove-ball-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1hoytD11IgAScSTfV8NqDpn2gr14SJDXG/view?usp=sharing',
    pdfFileName: '10. Deep Groove Ball Bearing_V7_1.pdf',
    downloadType: 'external'
  },
  'miniature-ball-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1hoytD11IgAScSTfV8NqDpn2gr14SJDXG/view?usp=sharing',
    pdfFileName: '10. Deep Groove Ball Bearing_V7_1.pdf',
    downloadType: 'external'
  },
  'cylindrical-roller-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/19ONQ5qq-HcOjY2T0rZxWWCmMoKknELE2/view?usp=sharing',
    pdfFileName: 'CRB_V7.pdf',
    downloadType: 'external'
  },
  'pillow-block-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1GP5PrTNCLKtPcC8dfLrTecLtBIsPESo7/view?usp=sharing',
    pdfFileName: 'Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf',
    downloadType: 'external'
  },
  'thrust-needle-roller-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1rcdtDTlqXtHR1HjtPBR0kKhea2pqgYRD/view?usp=sharing',
    pdfFileName: 'Thrust needle roller bearings_V1 (1).pdf',
    downloadType: 'external'
  },
  'stud-and-yoke-track-roller-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1rrwTfk_XtuRC55CLDcnkArsmZKPa3SVC/view?usp=sharing',
    pdfFileName: 'Stud-yoke-type-track-roller-bearings_V4 (1).pdf',
    downloadType: 'external'
  },
  'machined-type-needle-roller-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1Hx3hJDXsRAidqsy8WdclZ21NLR2UF_fe/view?usp=sharing',
    pdfFileName: 'MACHINED NEEDLE ROLLER BEARINGS_V2.pdf',
    downloadType: 'external'
  },
  'rod-end-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/19h-_N5QV7MEBg0lyTCi29Ii3MmDxzsVp/view?usp=sharing',
    pdfFileName: 'ROD-END-Bearings_V2.pdf',
    downloadType: 'external'
  },
  'radial-spherical-plain-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1MWAVlvysOf0Fblppr5-85W5Iqo9uH88u/view?usp=sharing',
    pdfFileName: 'RADIAL SPHERICAL PLAIN BEARING.pdf',
    downloadType: 'external'
  },
  'one-way-clutch': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/18Nx72MlYM_ElnRkhPK_qo8bEhOJbkZUl/view?usp=sharing',
    pdfFileName: 'DRAWN CUP ROLLER CLUTCHES_V2.pdf',
    downloadType: 'external'
  },
  'cylindrical-roller-thrust-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1wxUPyB9dqmJ8PQAEICGHj5sk7ZkCs8rm/view?usp=sharing',
    pdfFileName: 'Cylindrical Roller Thrust Bearing_V6.pdf',
    downloadType: 'external'
  },
  'drawn-cup-needle-roller-clutches': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/18Nx72MlYM_ElnRkhPK_qo8bEhOJbkZUl/view?usp=sharing',
    pdfFileName: 'DRAWN CUP ROLLER CLUTCHES_V2.pdf',
    downloadType: 'external'
  },
  'permaglide-dry-bush': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/18Nx72MlYM_ElnRkhPK_qo8bEhOJbkZUl/view?usp=sharing',
    pdfFileName: 'DRAWN CUP ROLLER CLUTCHES_V2.pdf',
    downloadType: 'external'
  },
  'needle-roller-and-cage-assemblies': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1NWrpNZ0kb8Py4LCy7p25nRZrVfEExmh9/view?usp=sharing',
    pdfFileName: 'FLAT NEEDLE ROLLER CAGES_V2.pdf',
    downloadType: 'external'
  },
  'track-roller-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1Irk-v9HJeS4QwI8oZGMd1L5zmZtsgJMs/view?usp=sharing',
    pdfFileName: 'TRACK ROLLER BEARINGS_V2(1).pdf',
    downloadType: 'external'
  },
  'flat-roller-cages': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1NWrpNZ0kb8Py4LCy7p25nRZrVfEExmh9/view?usp=sharing',
    pdfFileName: 'FLAT NEEDLE ROLLER CAGES_V2.pdf',
    downloadType: 'external'
  },
  'precision-angular-contact-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1S9LSF3mcw-hVhakGM-nm2PF6twv6evJ7/view?usp=sharing',
    pdfFileName: 'Angular Contact Ball Bearing_V7.pdf',
    downloadType: 'external'
  },
  'self-aligning-ball-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1fn4cNetmIGzMhX2O-VAdrp5Zau_dZa49/view?usp=sharing',
    pdfFileName: 'Self-aligning Ball Bearing_V3.pdf',
    downloadType: 'external'
  },
  'thrust-ball-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1WAQKT69sj6tDY12vXLj4rn1dfzDXorDw/view?usp=sharing',
    pdfFileName: '11 Thurst Ball Bearing.pdf',
    downloadType: 'external'
  },
  'spherical-roller-thrust-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/11315zprBTocPdC4hK8HzAAnM7P6oSMsi/view?usp=sharing',
    pdfFileName: 'Spherical Roller Thrust Bearing_V3.pdf',
    downloadType: 'external'
  },
  'drawn-cup-needle-roller-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/18Nx72MlYM_ElnRkhPK_qo8bEhOJbkZUl/view?usp=sharing',
    pdfFileName: 'DRAWN CUP ROLLER CLUTCHES_V2.pdf',
    downloadType: 'external'
  }
};

const productBySlug = new Map(products.map((product) => [product.slug, product]));

export const bearingCatalogues: CatalogueRecord[] = bearingDefinitions.map(([id, title, description, series], index) => {
  const product = productBySlug.get(id);
  return {
    id,
    group: 'Bearings' as const,
    categoryTag: 'Rolling & Plain Bearings',
    sequence: index + 1,
    title,
    image: bearingImages[id],
    description: product?.description ?? description,
    keywords: [title, description, ...series, 'Bearings'],
    series: [...series],
    productSlug: product?.slug,
    ...(bearingDocuments[id] ?? { pdfAvailable: false, pdfUrl: null, pdfFileName: null, downloadType: null })
  };
});

// Linear Shafts catalogue items matching reference UI
const linearShaftsDefinitions = [
  ['shaft-custom-made', 'Custom-made', 'Custom precision linear shafts machined to OEM drawing tolerances and hardening specs.', ['Custom Machined Ends', 'Special Diameters', 'Flanged Ends', 'Keyways & Tapers']],
  ['shaft-s-st', 'S-ST', 'Precision aluminum shaft support unit designed for secure end clamping and rigid alignment.', ['S-ST 12', 'S-ST 16', 'S-ST 20', 'S-ST 25', 'S-ST 30']],
  ['shaft-s-stu', 'S-STU', 'Heavy-duty flanged shaft support unit for rigid machine base mounting.', ['S-STU 12', 'S-STU 16', 'S-STU 20', 'S-STU 25', 'S-STU 30']],
  ['shaft-st', 'ST', 'Pre-assembled linear shaft with continuous aluminum support rail for deflection-free motion.', ['ST 16', 'ST 20', 'ST 25', 'ST 30', 'ST 40']],
  ['shaft-stu', 'STU', 'Open continuous linear shaft and support rail system designed for long-stroke industrial travel.', ['STU 16', 'STU 20', 'STU 25', 'STU 30', 'STU 40']],
  ['shaft-was-solid', 'WAS - Solid Shaft', 'Induction-hardened hard-chrome plated solid linear shafts precision ground to h6 tolerance.', ['WAS 12', 'WAS 16', 'WAS 20', 'WAS 25', 'WAS 30', 'WAS 40', 'WAS 50']],
  ['hard-chrome-shafts', 'Hard-Chrome Shafts', 'Precision linear motion shafts with high-grade hard chrome plating for extreme wear protection.', ['C45E', 'Cf53', '100Cr6', 'X46Cr13']],
  ['shafts-with-support', 'Shafts with Support', 'Supported shaft rails engineered to eliminate shaft bending in heavy automated machines.', ['SA Series', 'TBR Series', 'SBR Series']],
  ['shaft-supporting-units', 'Shaft Supporting Units', 'Precision machined end support units and clamping blocks for linear assemblies.', ['SK Series', 'SHF Series', 'WA Series']]
] as const;

export const linearShaftsCatalogues: CatalogueRecord[] = linearShaftsDefinitions.map(([id, title, description, series], index) => ({
  id,
  group: 'Linear Shafts' as const,
  categoryTag: 'Shaft Guidance Systems',
  sequence: index + 1,
  title,
  image: bearingImages[id],
  description,
  keywords: [title, description, ...series, 'Linear Shafts', 'Hard-Chrome'],
  series: [...series],
  productSlug: id,
  pdfAvailable: true,
  pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
  pdfFileName: 'won-catalogue.pdf',
  downloadType: 'external'
}));

// Linear Motion Guideways and Units
const linearMotionDefinitions = [
  ['linear-motion-bearings', 'Linear Motion Bearings', 'Guided motion along a straight axis with recirculating balls.', ['LM Series', 'LME Series', 'LMEK Series', 'LMF Series']],
  ['dual-shaft-guides', 'Dual Shaft Guides', 'Parallel twin-shaft guidance blocks and rails for high-stability linear motion.', ['Dual Guide Series', 'Compact Series']],
  ['linear-motion-shafts-with-support', 'Linear Motion Shafts with Support', 'Supported linear shafts for stable, guided industrial movement.', ['Supported Shaft Series', 'Shaft Support Series']]
] as const;

const linearMotionDocuments: Record<string, CatalogueDocument> = {
  'linear-motion-bearings': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1H4Li6i2sWsLAlNg87CMTzgFb-JxZfANp/view?usp=sharing',
    pdfFileName: 'Linear-Motion-Bearings_V2.pdf',
    downloadType: 'external'
  },
  'dual-shaft-guides': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1j07mM1F1uPtXYK0lu_VNpp6xhJ9KNeZD/view?usp=sharing',
    pdfFileName: 'DUAL SHAFT GUIDES_V3.pdf',
    downloadType: 'external'
  },
  'linear-motion-shafts-with-support': {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1j07mM1F1uPtXYK0lu_VNpp6xhJ9KNeZD/view?usp=sharing',
    pdfFileName: 'DUAL SHAFT GUIDES_V3.pdf',
    downloadType: 'external'
  }
};

export const linearMotionCatalogues: CatalogueRecord[] = linearMotionDefinitions.map(([id, title, description, series], index) => ({
  id,
  group: 'Linear Motion' as const,
  categoryTag: 'Linear Motion Systems',
  sequence: index + 1,
  title,
  image: bearingImages[id],
  description,
  keywords: [title, description, ...series, 'Linear Motion', 'Guideways'],
  series: [...series],
  productSlug: id,
  ...(linearMotionDocuments[id] ?? {
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    downloadType: 'external'
  })
}));

// Power Transmission (V-Belts & Timing Belts)
const vBeltsDefinitions = [
  ['classical-wrapped-v-belt', 'Classical Wrapped V-Belt', 'General industrial wrapped V-belt for dependable power transmission.', ['A', 'B', 'C']],
  ['wedge-cogged-v-belt', 'Wedge Cogged V-Belt', 'Cogged profile improves flexibility and heat performance in demanding drives.', ['SPZ', 'SPA', 'SPB']],
  ['poly-ribbed-v-belt', 'Poly Ribbed V-Belt', 'Multi-rib drive solution for compact power transmission with high efficiency.', ['PK', 'PH', 'PL']],
  ['laminated-v-belt', 'Laminated V-Belt', 'Layered construction for stable transmission under variable load conditions.', ['Banded', 'Laminated']],
  ['industrial-variable-speed-v-belt', 'Industrial Variable Speed V-Belt', 'Adjustable speed belt for variable-pitch drive solutions.', ['VS', 'CVT']],
  ['industrial-rubber-timing-belt', 'Industrial Rubber Timing Belt', 'Synchronous rubber timing belt for accurate industrial motion control.', ['TR', 'HTD', 'STD']],
  ['industrial-pu-timing-belt', 'Industrial PU Timing Belt', 'Precision polyurethane timing belt for indexed and continuous motion systems.', ['PU', 'AT', 'T-Series']],
  ['hexagonal-v-belt', 'Hexagonal V-Belt', 'Hexagonal cross-section designed for compact and flexible drive layouts.', ['Hex', 'H']],
  ['wedge-narrow-v-belt', 'Wedge Narrow V-Belt', 'High-power narrow wedge profile for efficient compact drives.', ['3V', '5V', '8V']],
  ['classical-raw-edge-cogged-v-belt', 'Classical Raw Edge Cogged V-Belt', 'Raw-edge cogged classical belt for enhanced flexibility and lower heat buildup.', ['A', 'B', 'C']],
  ['banded-v-belt', 'Banded V-Belt', 'Multi-rib joined belt for balanced load sharing and stable operation.', ['Banded', 'Joined']]
] as const;

export const vBeltsCatalogues: CatalogueRecord[] = vBeltsDefinitions.map(([id, title, description, series], index) => {
  const isTiming = id.includes('timing');
  return {
    id,
    group: 'Power Transmission' as const,
    categoryTag: isTiming ? 'Timing Belts' : 'V-Belts',
    sequence: index + 1,
    title,
    image: isTiming ? '/assets/products/timing-belt.png' : '/assets/products/v-belt.png',
    description,
    keywords: [title, description, ...series, 'Belts', 'Power Transmission'],
    series: [...series],
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1qubqf-7G0JqqBsZwnvjtmb1g8BlhQ8AG/view?usp=sharing',
    pdfFileName: 'KHS-PRODUCT-BROCHURE-8-10-2021-CTC belts 1.pdf',
    downloadType: 'external'
  };
});

// Partner Brands & Master Catalogues directly sourced from Google Drive
export const partnerBrandCatalogues: CatalogueRecord[] = [
  {
    id: 'khs-master-general-catalog',
    group: 'Bearings',
    categoryTag: 'Master General Catalogue',
    sequence: 0,
    title: 'KHS-LG Complete Industrial Motion & Bearings Master Catalogue',
    image: '/assets/products/spherical-roller-bearing.png',
    description: 'Comprehensive general product catalogue covering KHS-LG rolling bearings, linear motion, and power transmission ranges.',
    keywords: ['KHS-LG', 'Master Catalogue', 'Complete Catalogue', 'Full Range', 'Heavy Duty'],
    series: ['Full Range 4,500+ items'],
    productSlug: 'spherical-roller-bearings',
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1VOYZ33IXoX_mGBJ5oJzxxI9p3W8KR45x/view?usp=sharing',
    pdfFileName: 'KHS-PRODUCT-CATALOG-6-10-2021-ctc actual pdf.pdf',
    downloadType: 'external'
  },
  {
    id: 'iko-cam-followers-cat',
    group: 'Partner Brands',
    categoryTag: 'IKO Nippon Thompson',
    sequence: 1,
    title: 'IKO Cam Followers Technical Catalogue',
    image: '/assets/products/track-roller-bearing-stud-yoke.png',
    description: 'Complete engineering guide and load tables for IKO stud type and roller follower bearings.',
    keywords: ['IKO', 'Cam Followers', 'Track Rollers', 'CF', 'KR', 'Japan'],
    series: ['CF', 'CFE', 'CFT', 'CF-RU1', 'CR'],
    productSlug: 'iko-stud-cam-followers',
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1TEuboeWHxW8rbtu409LhB6ygOsGiN750/view?usp=sharing',
    pdfFileName: 'iko cam followers.pdf',
    downloadType: 'external'
  },
  {
    id: 'iko-rod-ends-cat',
    group: 'Partner Brands',
    categoryTag: 'IKO Nippon Thompson',
    sequence: 2,
    title: 'IKO Rod End Bearings Catalogue',
    image: '/rod-end.png',
    description: 'Technical dimensions, load ratings, and misalignment angles for IKO rod ends and spherical joints.',
    keywords: ['IKO', 'Rod Ends', 'Spherical Joint', 'POS', 'PHS', 'Japan'],
    series: ['POS', 'PHS', 'PB', 'PI', 'L-Balls'],
    productSlug: 'iko-rod-end-bearings',
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1TADODyzDV_lBPiSkbC4mI-i9BN6Ddz4n/view?usp=sharing',
    pdfFileName: 'IKO ROD END BEARINGS CATALOGUE.pdf',
    downloadType: 'external'
  },
  {
    id: 'iko-spherical-bearings-cat',
    group: 'Partner Brands',
    categoryTag: 'IKO Nippon Thompson',
    sequence: 3,
    title: 'IKO Spherical Bearings Technical Catalogue',
    image: '/assets/products/radial-spherical-plain-bearing.png',
    description: 'Engineering specifications for IKO spherical plain bearings and spherical bushings.',
    keywords: ['IKO', 'Spherical Bearings', 'Plain Bearings', 'SB', 'GE', 'Japan'],
    series: ['SB', 'GE', 'GE-ES', 'GE-E'],
    productSlug: 'iko-spherical-plain-bearings',
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1_N2CPXLCciRDv0vGZHOrizj_VdV7ziVt/view?usp=sharing',
    pdfFileName: 'IKO SPHRICAL BEARING.pdf',
    downloadType: 'external'
  },
  {
    id: 'iko-linear-bushing-cat',
    group: 'Partner Brands',
    categoryTag: 'IKO Nippon Thompson',
    sequence: 4,
    title: 'IKO Linear Bushing Technical Catalogue',
    image: '/assets/products/linear-motion-bearing.png',
    description: 'Precision linear motion ball bushings, shaft guides, and flanged units from IKO Nippon Thompson.',
    keywords: ['IKO', 'Linear Bushing', 'Linear Motion', 'LM', 'LME', 'Japan'],
    series: ['LBS', 'LBE', 'LME', 'LMF', 'LMK'],
    productSlug: 'iko-linear-motion-bearings',
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1VEeW-F3ycllJoSPYH47ctBIrM2FI9UNS/view?usp=sharing',
    pdfFileName: 'linear bushing.pdf',
    downloadType: 'external'
  },
  {
    id: 'iko-needle-roller-cat',
    group: 'Partner Brands',
    categoryTag: 'IKO Nippon Thompson',
    sequence: 5,
    title: 'IKO Needle Roller Bearings Technical Catalogue',
    image: '/assets/products/machined-needle-roller-bearing.png',
    description: 'Comprehensive catalogue of IKO needle roller bearings, cage assemblies, and drawn cup series.',
    keywords: ['IKO', 'Needle Roller Bearings', 'Cages', 'NA', 'RNA', 'HK', 'Japan'],
    series: ['NA 49', 'RNA 49', 'TA', 'TLA', 'HK', 'BK', 'K'],
    productSlug: 'iko-machined-needle-roller-bearings',
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1q4kaAxvs7vzJguLUi84X7XYyTS7q0ArS/view?usp=sharing',
    pdfFileName: 'NEEDLE ROLLER BEARINGD.pdf',
    downloadType: 'external'
  },
  {
    id: 'won-master-cat',
    group: 'Partner Brands',
    categoryTag: 'WON ST Korea',
    sequence: 6,
    title: 'WON ST Linear Motion Guide & Systems Master Catalogue',
    image: '/assets/products/linear-motion-shaft-with-support.png',
    description: 'WON ST Korea complete technical manual for linear guideways, crossed roller ways, and precision ball bushings.',
    keywords: ['WON', 'WON ST', 'Linear Motion', 'Guideways', 'Cross Roller', 'Korea'],
    series: ['H Series', 'S Series', 'CRG', 'CRW', 'MB', 'MC'],
    productSlug: 'won-st-linear-motion-guide',
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    downloadType: 'external'
  },
  {
    id: 'tpi-all-bearings-cat',
    group: 'Partner Brands',
    categoryTag: 'TPI Bearings Taiwan',
    sequence: 7,
    title: 'TPI All Bearing Products Catalogue',
    image: '/assets/products/deep-groove-roller-bearing.png',
    description: 'Complete range of TPI precision deep groove ball bearings and miniature electric motor quality bearings.',
    keywords: ['TPI', 'Tung Pei', 'Deep Groove', 'EMQ', 'Electric Motor', 'Taiwan'],
    series: ['6000', '6200', '6300', '6800', '6900', '2RS', 'ZZ'],
    productSlug: 'tpi-open-deep-groove-ball-bearings',
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1sp9JkHB-4o6JNU_HvR4b42qYt3REeUsN/view?usp=sharing',
    pdfFileName: 'All_Bearing_Product.pdf',
    downloadType: 'external'
  },
  {
    id: 'tpi-precision-rolling-cat',
    group: 'Partner Brands',
    categoryTag: 'TPI Bearings Taiwan',
    sequence: 8,
    title: 'TPI Precision Rolling Bearings Technical Catalogue',
    image: '/assets/products/precision-angular-contact-bearing.png',
    description: 'High-precision angular contact ball bearings, spindle bearings, and machine tool solutions by TPI.',
    keywords: ['TPI', 'Precision Rolling', 'Spindle Bearings', 'Angular Contact', 'Taiwan'],
    series: ['BS Series', 'TAC Series', 'Spindle Bearings', 'P4 / P2'],
    productSlug: 'tpi-emq-motor-bearings',
    pdfAvailable: true,
    pdfUrl: 'https://drive.google.com/file/d/1R5jv1mP7Fag6XST6d3Y-ExwuBcJAxgpH/view?usp=sharing',
    pdfFileName: 'Precision_Rolling_Bearings TPI.pdf',
    downloadType: 'external'
  }
];

export const catalogues: CatalogueRecord[] = [
  ...partnerBrandCatalogues.filter((c) => c.id === 'khs-master-general-catalog'),
  ...bearingCatalogues,
  ...linearShaftsCatalogues,
  ...linearMotionCatalogues,
  ...vBeltsCatalogues,
  ...partnerBrandCatalogues.filter((c) => c.id !== 'khs-master-general-catalog')
];

export const bearingCatalogueTotal = bearingCatalogues.length;
export const linearShaftsCatalogueTotal = linearShaftsCatalogues.length;
export const linearMotionCatalogueTotal = linearMotionCatalogues.length;
export const vBeltsCatalogueTotal = vBeltsCatalogues.length;
export const partnerBrandCatalogueTotal = partnerBrandCatalogues.length;

export function getCatalogueById(id: string | undefined) {
  return catalogues.find((catalogue) => catalogue.id === id);
}

export function searchCatalogues(query: string, records = catalogues) {
  const term = query.trim().toLowerCase();
  if (!term) return records;
  return records.filter((catalogue) =>
    [catalogue.title, catalogue.group, catalogue.categoryTag, catalogue.description, ...catalogue.keywords, ...catalogue.series]
      .join(' ')
      .toLowerCase()
      .includes(term)
  );
}

export function submitCatalogueLead(
  catalogue: CatalogueRecord,
  form: Omit<CatalogueLead, 'catalogueName' | 'catalogueId' | 'timestamp'>
) {
  const lead: CatalogueLead = {
    catalogueName: catalogue.title,
    catalogueId: catalogue.id,
    ...form,
    timestamp: new Date().toISOString()
  };
  const existing = JSON.parse(window.localStorage.getItem('khs-lg-catalogue-leads') ?? '[]') as CatalogueLead[];
  window.localStorage.setItem('khs-lg-catalogue-leads', JSON.stringify([...existing, lead]));
  return lead;
}

export interface ProductPdfInfo {
  pdfUrl: string;
  pdfFileName: string;
  title: string;
  downloadType: 'pdf' | 'external';
}

export const LOCAL_PDF_CATALOGUES: Record<string, ProductPdfInfo> = {
  // 1. KHS-LG Core Bearings
  'taper-roller-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/17jS8fVNbbfaFIx7wLd1mO0N9Yx3wk-Ce/view?usp=sharing',
    pdfFileName: 'TRB_V4.pdf',
    title: 'KHS-LG Taper Roller Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'spherical-roller-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/10QIf-QatdL28s90RiswOqehk4GpCGtna/view?usp=sharing',
    pdfFileName: 'SRB_V3.pdf',
    title: 'KHS-LG Spherical Roller Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'deep-groove-ball-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1hoytD11IgAScSTfV8NqDpn2gr14SJDXG/view?usp=sharing',
    pdfFileName: '10. Deep Groove Ball Bearing_V7_1.pdf',
    title: 'KHS-LG Deep Groove Ball Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'miniature-ball-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1hoytD11IgAScSTfV8NqDpn2gr14SJDXG/view?usp=sharing',
    pdfFileName: '10. Deep Groove Ball Bearing_V7_1.pdf',
    title: 'KHS-LG Miniature & Deep Groove Ball Bearings Catalogue',
    downloadType: 'external'
  },
  'cylindrical-roller-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/19ONQ5qq-HcOjY2T0rZxWWCmMoKknELE2/view?usp=sharing',
    pdfFileName: 'CRB_V7.pdf',
    title: 'KHS-LG Cylindrical Roller Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'pillow-block-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1GP5PrTNCLKtPcC8dfLrTecLtBIsPESo7/view?usp=sharing',
    pdfFileName: 'Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf',
    title: 'KHS-LG Pillow Block Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'thrust-needle-roller-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1rcdtDTlqXtHR1HjtPBR0kKhea2pqgYRD/view?usp=sharing',
    pdfFileName: 'Thrust needle roller bearings_V1 (1).pdf',
    title: 'KHS-LG Thrust Needle Roller Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'stud-and-yoke-track-roller-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1rrwTfk_XtuRC55CLDcnkArsmZKPa3SVC/view?usp=sharing',
    pdfFileName: 'Stud-yoke-type-track-roller-bearings_V4 (1).pdf',
    title: 'KHS-LG Stud and Yoke Track Roller Bearings Catalogue',
    downloadType: 'external'
  },
  'machined-type-needle-roller-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1Hx3hJDXsRAidqsy8WdclZ21NLR2UF_fe/view?usp=sharing',
    pdfFileName: 'MACHINED NEEDLE ROLLER BEARINGS_V2.pdf',
    title: 'KHS-LG Machined Type Needle Roller Bearings Catalogue',
    downloadType: 'external'
  },
  'rod-end-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/19h-_N5QV7MEBg0lyTCi29Ii3MmDxzsVp/view?usp=sharing',
    pdfFileName: 'ROD-END-Bearings_V2.pdf',
    title: 'KHS-LG Rod End Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'radial-spherical-plain-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1MWAVlvysOf0Fblppr5-85W5Iqo9uH88u/view?usp=sharing',
    pdfFileName: 'RADIAL SPHERICAL PLAIN BEARING.pdf',
    title: 'KHS-LG Radial Spherical Plain Bearings Catalogue',
    downloadType: 'external'
  },
  'one-way-clutch': {
    pdfUrl: 'https://drive.google.com/file/d/18Nx72MlYM_ElnRkhPK_qo8bEhOJbkZUl/view?usp=sharing',
    pdfFileName: 'DRAWN CUP ROLLER CLUTCHES_V2.pdf',
    title: 'KHS-LG One-Way Clutches & Roller Bearings Catalogue',
    downloadType: 'external'
  },
  'cylindrical-roller-thrust-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1wxUPyB9dqmJ8PQAEICGHj5sk7ZkCs8rm/view?usp=sharing',
    pdfFileName: 'Cylindrical Roller Thrust Bearing_V6.pdf',
    title: 'KHS-LG Cylindrical Roller Thrust Bearings Catalogue',
    downloadType: 'external'
  },
  'drawn-cup-needle-roller-clutches': {
    pdfUrl: 'https://drive.google.com/file/d/18Nx72MlYM_ElnRkhPK_qo8bEhOJbkZUl/view?usp=sharing',
    pdfFileName: 'DRAWN CUP ROLLER CLUTCHES_V2.pdf',
    title: 'KHS-LG Drawn Cup Roller Clutches Technical Catalogue',
    downloadType: 'external'
  },
  'permaglide-dry-bush': {
    pdfUrl: 'https://drive.google.com/file/d/18Nx72MlYM_ElnRkhPK_qo8bEhOJbkZUl/view?usp=sharing',
    pdfFileName: 'DRAWN CUP ROLLER CLUTCHES_V2.pdf',
    title: 'KHS-LG Dry Bush & Clutch Technical Specifications',
    downloadType: 'external'
  },
  'needle-roller-and-cage-assemblies': {
    pdfUrl: 'https://drive.google.com/file/d/1NWrpNZ0kb8Py4LCy7p25nRZrVfEExmh9/view?usp=sharing',
    pdfFileName: 'FLAT NEEDLE ROLLER CAGES_V2.pdf',
    title: 'KHS-LG Flat Needle Roller Cages & Assemblies Catalogue',
    downloadType: 'external'
  },
  'track-roller-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1Irk-v9HJeS4QwI8oZGMd1L5zmZtsgJMs/view?usp=sharing',
    pdfFileName: 'TRACK ROLLER BEARINGS_V2(1).pdf',
    title: 'KHS-LG Track Roller Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'flat-roller-cages': {
    pdfUrl: 'https://drive.google.com/file/d/1NWrpNZ0kb8Py4LCy7p25nRZrVfEExmh9/view?usp=sharing',
    pdfFileName: 'FLAT NEEDLE ROLLER CAGES_V2.pdf',
    title: 'KHS-LG Flat Roller Cages Catalogue',
    downloadType: 'external'
  },
  'precision-angular-contact-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1S9LSF3mcw-hVhakGM-nm2PF6twv6evJ7/view?usp=sharing',
    pdfFileName: 'Angular Contact Ball Bearing_V7.pdf',
    title: 'KHS-LG Precision Angular Contact Bearings Catalogue',
    downloadType: 'external'
  },
  'self-aligning-ball-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1fn4cNetmIGzMhX2O-VAdrp5Zau_dZa49/view?usp=sharing',
    pdfFileName: 'Self-aligning Ball Bearing_V3.pdf',
    title: 'KHS-LG Self-Aligning Ball Bearings Catalogue',
    downloadType: 'external'
  },
  'thrust-ball-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1WAQKT69sj6tDY12vXLj4rn1dfzDXorDw/view?usp=sharing',
    pdfFileName: '11 Thurst Ball Bearing.pdf',
    title: 'KHS-LG Thrust Ball Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'spherical-roller-thrust-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/11315zprBTocPdC4hK8HzAAnM7P6oSMsi/view?usp=sharing',
    pdfFileName: 'Spherical Roller Thrust Bearing_V3.pdf',
    title: 'KHS-LG Spherical Roller Thrust Bearings Catalogue',
    downloadType: 'external'
  },
  'drawn-cup-needle-roller-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/18Nx72MlYM_ElnRkhPK_qo8bEhOJbkZUl/view?usp=sharing',
    pdfFileName: 'DRAWN CUP ROLLER CLUTCHES_V2.pdf',
    title: 'KHS-LG Drawn Cup Needle Roller Bearings Catalogue',
    downloadType: 'external'
  },

  // 2. Linear Motion & Shafts
  'linear-motion-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1H4Li6i2sWsLAlNg87CMTzgFb-JxZfANp/view?usp=sharing',
    pdfFileName: 'Linear-Motion-Bearings_V2.pdf',
    title: 'KHS-LG Linear Motion Bearings Catalogue',
    downloadType: 'external'
  },
  'linear-motion-bearings-with-housing': {
    pdfUrl: 'https://drive.google.com/file/d/1H4Li6i2sWsLAlNg87CMTzgFb-JxZfANp/view?usp=sharing',
    pdfFileName: 'Linear-Motion-Bearings_V2.pdf',
    title: 'KHS-LG Linear Motion Bearings Catalogue',
    downloadType: 'external'
  },
  'dual-shaft-guides': {
    pdfUrl: 'https://drive.google.com/file/d/1j07mM1F1uPtXYK0lu_VNpp6xhJ9KNeZD/view?usp=sharing',
    pdfFileName: 'DUAL SHAFT GUIDES_V3.pdf',
    title: 'KHS-LG Dual Shaft Guides Catalogue',
    downloadType: 'external'
  },
  'dual-shaft-guides-blocks': {
    pdfUrl: 'https://drive.google.com/file/d/1j07mM1F1uPtXYK0lu_VNpp6xhJ9KNeZD/view?usp=sharing',
    pdfFileName: 'DUAL SHAFT GUIDES_V3.pdf',
    title: 'KHS-LG Dual Shaft Guides Catalogue',
    downloadType: 'external'
  },
  'linear-motion-shafts-with-support': {
    pdfUrl: 'https://drive.google.com/file/d/1j07mM1F1uPtXYK0lu_VNpp6xhJ9KNeZD/view?usp=sharing',
    pdfFileName: 'DUAL SHAFT GUIDES_V3.pdf',
    title: 'KHS-LG Supported Linear Shafts & Rails Catalogue',
    downloadType: 'external'
  },
  'cross-roller-guideway': {
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    title: 'WON ST Crossed Roller Guideway Catalogue',
    downloadType: 'external'
  },
  'hard-chrome-shafts': {
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    title: 'WON ST Precision Shafts & Guideway Catalogue',
    downloadType: 'external'
  },
  'shafts-with-support': {
    pdfUrl: 'https://drive.google.com/file/d/1j07mM1F1uPtXYK0lu_VNpp6xhJ9KNeZD/view?usp=sharing',
    pdfFileName: 'DUAL SHAFT GUIDES_V3.pdf',
    title: 'KHS-LG Supported Shaft Rails Catalogue',
    downloadType: 'external'
  },
  'shaft-supporting-units': {
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    title: 'WON ST Shaft Supporting Units Catalogue',
    downloadType: 'external'
  },
  'shaft-custom-made': {
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    title: 'WON ST Precision Linear Shafts Catalogue',
    downloadType: 'external'
  },
  'shaft-s-st': {
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    title: 'S-ST Shaft Support Units Catalogue',
    downloadType: 'external'
  },
  'shaft-s-stu': {
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    title: 'S-STU Flanged Shaft Support Units Catalogue',
    downloadType: 'external'
  },
  'shaft-st': {
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    title: 'ST Supported Shaft Rails Catalogue',
    downloadType: 'external'
  },
  'shaft-stu': {
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    title: 'STU Supported Shaft Rails Catalogue',
    downloadType: 'external'
  },
  'shaft-was-solid': {
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    title: 'WAS Solid Induction Hardened Shafts Catalogue',
    downloadType: 'external'
  },

  // 3. Power Transmission Belts
  'classical-wrapped-v-belt': {
    pdfUrl: 'https://drive.google.com/file/d/1qubqf-7G0JqqBsZwnvjtmb1g8BlhQ8AG/view?usp=sharing',
    pdfFileName: 'KHS-PRODUCT-BROCHURE-8-10-2021-CTC belts 1.pdf',
    title: 'KHS-LG Classical Wrapped V-Belts Technical Brochure',
    downloadType: 'external'
  },
  'wedge-cogged-v-belt': {
    pdfUrl: 'https://drive.google.com/file/d/1qubqf-7G0JqqBsZwnvjtmb1g8BlhQ8AG/view?usp=sharing',
    pdfFileName: 'KHS-PRODUCT-BROCHURE-8-10-2021-CTC belts 1.pdf',
    title: 'KHS-LG Wedge Cogged V-Belts Technical Brochure',
    downloadType: 'external'
  },
  'poly-ribbed-v-belt': {
    pdfUrl: 'https://drive.google.com/file/d/1qubqf-7G0JqqBsZwnvjtmb1g8BlhQ8AG/view?usp=sharing',
    pdfFileName: 'KHS-PRODUCT-BROCHURE-8-10-2021-CTC belts 1.pdf',
    title: 'KHS-LG Poly-Ribbed V-Belts Technical Brochure',
    downloadType: 'external'
  },
  'industrial-rubber-timing-belt': {
    pdfUrl: 'https://drive.google.com/file/d/1qubqf-7G0JqqBsZwnvjtmb1g8BlhQ8AG/view?usp=sharing',
    pdfFileName: 'KHS-PRODUCT-BROCHURE-8-10-2021-CTC belts 1.pdf',
    title: 'KHS-LG Industrial Rubber Timing Belts Brochure',
    downloadType: 'external'
  },
  'industrial-pu-timing-belt': {
    pdfUrl: 'https://drive.google.com/file/d/1qubqf-7G0JqqBsZwnvjtmb1g8BlhQ8AG/view?usp=sharing',
    pdfFileName: 'KHS-PRODUCT-BROCHURE-8-10-2021-CTC belts 1.pdf',
    title: 'KHS-LG Industrial Polyurethane Timing Belts Brochure',
    downloadType: 'external'
  },

  // 4. Partner Brand Direct Mappings
  'iko-cam-followers': {
    pdfUrl: 'https://drive.google.com/file/d/1TEuboeWHxW8rbtu409LhB6ygOsGiN750/view?usp=sharing',
    pdfFileName: 'iko cam followers.pdf',
    title: 'IKO Cam Followers Technical Catalogue',
    downloadType: 'external'
  },
  'iko-rod-ends': {
    pdfUrl: 'https://drive.google.com/file/d/1TADODyzDV_lBPiSkbC4mI-i9BN6Ddz4n/view?usp=sharing',
    pdfFileName: 'IKO ROD END BEARINGS CATALOGUE.pdf',
    title: 'IKO Rod End Bearings Catalogue',
    downloadType: 'external'
  },
  'iko-spherical-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1_N2CPXLCciRDv0vGZHOrizj_VdV7ziVt/view?usp=sharing',
    pdfFileName: 'IKO SPHRICAL BEARING.pdf',
    title: 'IKO Spherical Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'iko-linear-bushing': {
    pdfUrl: 'https://drive.google.com/file/d/1VEeW-F3ycllJoSPYH47ctBIrM2FI9UNS/view?usp=sharing',
    pdfFileName: 'linear bushing.pdf',
    title: 'IKO Linear Bushing Technical Catalogue',
    downloadType: 'external'
  },
  'iko-needle-roller-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1q4kaAxvs7vzJguLUi84X7XYyTS7q0ArS/view?usp=sharing',
    pdfFileName: 'NEEDLE ROLLER BEARINGD.pdf',
    title: 'IKO Needle Roller Bearings Technical Catalogue',
    downloadType: 'external'
  },
  'won-catalogue': {
    pdfUrl: 'https://drive.google.com/file/d/1CoboGCWg74D0CdFhK3od70o-OLVdetP5/view?usp=sharing',
    pdfFileName: 'won-catalogue.pdf',
    title: 'WON ST Linear Motion Guide & Systems Master Catalogue',
    downloadType: 'external'
  },
  'tpi-all-bearings': {
    pdfUrl: 'https://drive.google.com/file/d/1sp9JkHB-4o6JNU_HvR4b42qYt3REeUsN/view?usp=sharing',
    pdfFileName: 'All_Bearing_Product.pdf',
    title: 'TPI All Bearing Products Catalogue',
    downloadType: 'external'
  },
  'tpi-precision-rolling': {
    pdfUrl: 'https://drive.google.com/file/d/1R5jv1mP7Fag6XST6d3Y-ExwuBcJAxgpH/view?usp=sharing',
    pdfFileName: 'Precision_Rolling_Bearings TPI.pdf',
    title: 'TPI Precision Rolling Bearings Technical Catalogue',
    downloadType: 'external'
  },

  // 5. ISO 9001:2015 Certification & Master Catalogue
  'khs-master-general-catalog': {
    pdfUrl: 'https://drive.google.com/file/d/1VOYZ33IXoX_mGBJ5oJzxxI9p3W8KR45x/view?usp=sharing',
    pdfFileName: 'KHS-PRODUCT-CATALOG-6-10-2021-ctc actual pdf.pdf',
    title: 'KHS-LG Complete Industrial Motion & Bearings Master Catalogue',
    downloadType: 'external'
  },
  'khs-iso-9001-certification': {
    pdfUrl: '/assets/khs-iso-9001-certification.pdf',
    pdfFileName: 'khs-iso-9001-certification.pdf',
    title: 'KHS Innovation & Engineering ISO 9001:2015 Registration Certificate',
    downloadType: 'pdf'
  }
};

export function getProductPdf(idOrSlug: string | undefined): ProductPdfInfo | null {
  if (!idOrSlug) return null;
  if (LOCAL_PDF_CATALOGUES[idOrSlug]) {
    return LOCAL_PDF_CATALOGUES[idOrSlug];
  }
  const cat = getCatalogueById(idOrSlug);
  if (cat && cat.pdfUrl && cat.pdfAvailable) {
    return {
      pdfUrl: cat.pdfUrl,
      pdfFileName: cat.pdfFileName ?? `${cat.id}.pdf`,
      title: cat.title,
      downloadType: cat.downloadType ?? 'pdf'
    };
  }
  return null;
}
