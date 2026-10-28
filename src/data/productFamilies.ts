import { CatalogueRecord, getCatalogueById } from './catalogues';

export interface ProductFamilyDefinition {
  id: string;
  title: string;
  products: Array<{ id: string; title: string; sourceId: string }>;
}

const family = (id: string, title: string, products: Array<[string, string, string?]>): ProductFamilyDefinition => ({
  id,
  title,
  products: products.map(([productId, productTitle, sourceId = productId]) => ({ id: productId, title: productTitle, sourceId }))
});

export const productFamilyDefinitions: ProductFamilyDefinition[] = [
  family('rolling-bearings', 'Rolling Bearings', [
    ['deep-groove-ball-bearings', 'Deep Groove Ball Bearings'],
    ['taper-roller-bearings', 'Taper Roller Bearings'],
    ['spherical-roller-bearings', 'Spherical Roller Bearings'],
    ['self-aligning-ball-bearings', 'Self-Aligning Ball Bearings'],
    ['thrust-ball-bearings', 'Thrust Ball Bearings'],
    ['cylindrical-roller-thrust-bearings', 'Cylindrical Roller Thrust Bearings'],
    ['spherical-roller-thrust-bearings', 'Spherical Roller Thrust Bearings'],
    ['precision-angular-contact-bearings', 'Precision Angular Contact Bearings'],
    ['miniature-ball-bearings', 'Miniature Ball Bearings'],
    ['cylindrical-roller-bearings', 'Cylindrical Roller Bearings']
  ]),
  family('needle-roller-bearings', 'Needle Roller Bearings', [
    ['machined-type-needle-roller-bearings', 'Machined Type Needle Roller Bearings'],
    ['drawn-cup-needle-roller-bearings', 'Drawn Cup Needle Roller Bearings'],
    ['thrust-needle-roller-bearings', 'Thrust Needle Roller Bearings'],
    ['flat-roller-cages', 'Flat Roller Cages']
  ]),
  family('bearing-units-housings', 'Bearing Units & Housings', [
    ['pillow-block-bearings', 'Pillow Block Bearings'],
    ['heavy-duty-pillow-block-bearings', 'Heavy Duty Pillow Block Bearings', 'pillow-block-bearings'],
    ['support-unit-for-ball-screw', 'Support Unit for Ball Screw', 'pillow-block-bearings']
  ]),
  family('linear-motion', 'Linear Motion', [
    ['linear-motion-bearings', 'Linear Motion Bearings'],
    ['linear-motion-bearings-with-housing', 'Linear Motion Bearings with Housing', 'linear-motion-shafts-with-support'],
    ['dual-shaft-guides-blocks', 'Dual Shaft Guides & Blocks', 'dual-shaft-guides'],
    ['cross-roller-guideway', 'Cross Roller Guideway', 'linear-motion-bearings']
  ]),
  family('linear-shafts', 'Linear Shafts', [
    ['hard-chrome-shafts', 'Hard-Chrome Shafts', 'hard-chrome-shafts'],
    ['shafts-with-support', 'Shafts with support', 'shafts-with-support'],
    ['shaft-supporting-units', 'Shaft Supporting Units', 'shaft-supporting-units']
  ]),
  family('rod-ends-track-rollers', 'Rod Ends, Spherical & Track Roller Bearings', [
    ['rod-end-bearings', 'Rod End Bearings'],
    ['radial-spherical-plain-bearings', 'Radial Spherical Plain Bearings'],
    ['stud-type-track-roller-bearings', 'Stud Type Track Roller Bearings', 'stud-and-yoke-track-roller-bearings'],
    ['yoke-type-track-roller-bearings', 'Yoke Type Track Roller Bearings', 'stud-and-yoke-track-roller-bearings'],
    ['track-roller-bearings', 'Track Roller Bearings']
  ]),
  family('clutches-bushes', 'Clutches & Bushes', [
    ['drawn-cup-needle-roller-clutches', 'Drawn Cup Needle Roller Clutches'],
    ['one-way-clutch', 'One Way Clutch'],
    ['permaglide-dry-bush', 'Permaglide Dry Bush']
  ]),
  family('power-transmission', 'Power Transmission', [
    ['classical-wrapped-v-belt', 'V-Belts'],
    ['industrial-rubber-timing-belt', 'Timing Belts'],
    ['poly-ribbed-v-belt', 'Poly-Ribbed Belts'],
    ['wedge-cogged-v-belt', 'Wedge Cogged Belts']
  ])
];

export const productFamilies = productFamilyDefinitions.map((definition) => ({
  ...definition,
  products: definition.products.map((product) => {
    const source = getCatalogueById(product.sourceId);
    return {
      ...(source ?? { id: product.sourceId, sequence: 0, description: '', series: [] }),
      id: product.id,
      title: product.title,
      sourceId: product.sourceId,
      routeId: product.sourceId
    };
  })
}));

export const powerTransmissionLinks = [
  { id: 'v-belts', title: 'V-Belts', href: '/products?category=power-transmission&sub=v-belts-sub' },
  { id: 'timing-belts', title: 'Timing Belts', href: '/products?category=power-transmission&sub=timing-belts-sub' }
];

export type ProductFamily = (typeof productFamilies)[number];
export type ProductFamilyProduct = ProductFamily['products'][number] & Partial<CatalogueRecord>;
