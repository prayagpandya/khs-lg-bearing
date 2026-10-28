import { bearingImages, LOCAL_PDF_CATALOGUES, getProductPdf } from './catalogues';

export interface TreeProduct {
  id: string;
  name: string;
  code: string;
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
  short: string;
  description: string;
  motion: string;
  applications: string[];
  features: string[];
  series: string[];
  image: string;
  pdfUrl: string | null;
  pdfFileName: string | null;
  pdfTitle: string | null;
}

export interface TreeSubcategory {
  id: string;
  name: string;
  code?: string;
  description: string;
  products: TreeProduct[];
}

export interface TreeCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  subcategories: TreeSubcategory[];
}

export const PRODUCT_CATEGORIES_TREE: TreeCategory[] = [
  {
    id: 'rolling-bearings',
    name: 'Rolling Bearings',
    code: '01',
    description: 'High-precision ball and roller bearings engineered for heavy industrial and high-speed motion.',
    subcategories: [
      {
        id: 'ball-bearings',
        name: 'Ball Bearings',
        description: 'Deep groove, miniature, self-aligning and angular contact ball bearings for smooth, low-friction operation.',
        products: [
          {
            id: 'deep-groove-ball-bearings',
            name: 'Deep Groove Ball Bearings',
            code: 'DGBB',
            categoryId: 'rolling-bearings',
            categoryName: 'Rolling Bearings',
            subcategoryId: 'ball-bearings',
            subcategoryName: 'Ball Bearings',
            short: 'The most widely used bearing type in motion systems.',
            description: 'Deep groove ball bearings are the most widely used bearing type, running quietly at speed while handling radial and moderate axial loads. Supplied in open and sealed executions.',
            motion: 'High Speed Rotation',
            applications: ['Electric motors', 'Automobile alternators & gearboxes', 'Pumps & compressors'],
            features: ['Radial and moderate axial load capacity', 'Low friction torque and quiet running', 'Available with ZZ/2RS rubber seals'],
            series: ['6000 Series', '6200 Series', '6300 Series', '6800 Series', '6900 Series'],
            image: bearingImages['deep-groove-ball-bearings'],
            pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing',
            pdfFileName: 'Deep Groove Ball Bearing_V7_1.pdf',
            pdfTitle: 'Deep Groove Ball Bearings Brochure'
          },
          {
            id: 'miniature-ball-bearings',
            name: 'Miniature Ball Bearings',
            code: 'MBB',
            categoryId: 'rolling-bearings',
            categoryName: 'Rolling Bearings',
            subcategoryId: 'ball-bearings',
            subcategoryName: 'Ball Bearings',
            short: 'Small envelope, ultra-precision motion.',
            description: 'Miniature ball bearings deliver precise motion inside compact assemblies where space is limited, supporting instrumentation, miniature motors, optical drives and dental tools.',
            motion: 'Micro Precision',
            applications: ['Instrumentation & encoders', 'Miniature electric motors', 'Robotics & automation'],
            features: ['Compact envelope with bore down to 1mm', 'High rotational precision (ABEC 5/7)', 'Stainless steel and chrome steel options'],
            series: ['MR Series', '680 Series', '690 Series', 'R Series', 'Flanged Series'],
            image: bearingImages['miniature-ball-bearings'],
            pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing',
            pdfFileName: 'Deep Groove & Miniature Ball Bearings.pdf',
            pdfTitle: 'Miniature Ball Bearings Catalogue'
          },
          {
            id: 'precision-angular-contact-bearings',
            name: 'Precision Angular Contact Bearings',
            code: 'PACB',
            categoryId: 'rolling-bearings',
            categoryName: 'Rolling Bearings',
            subcategoryId: 'ball-bearings',
            subcategoryName: 'Ball Bearings',
            short: 'High-speed precision support for combined loads.',
            description: 'Angular contact ball bearings carry combined radial and heavy unidirectional axial loads with contact angles optimized for high-speed machine tool spindles and screw drives.',
            motion: 'High-Speed Combined',
            applications: ['CNC machine tool spindles', 'Centrifugal pumps', 'High-speed gear drives'],
            features: ['15°, 25°, and 40° contact angles', 'Universal matching in DB, DF, DT arrangements', 'Phenolic resin or machined brass cages'],
            series: ['7000 Series', '7200 Series', '7300 Series'],
            image: bearingImages['precision-angular-contact-bearings'],
            pdfUrl: 'https://drive.google.com/file/d/11kvK6ozenEHBHCf4xlO-Wvyt8QXKqU0B/view',
            pdfFileName: 'Precision Angular Contact Bearings.pdf',
            pdfTitle: 'Angular Contact Bearings Catalogue'
          },
          {
            id: 'self-aligning-ball-bearings',
            name: 'Self-Aligning Ball Bearings',
            code: 'SABB',
            categoryId: 'rolling-bearings',
            categoryName: 'Rolling Bearings',
            subcategoryId: 'ball-bearings',
            subcategoryName: 'Ball Bearings',
            short: 'Compensate for shaft deflection and mounting error.',
            description: 'Two rows of balls running in a common spherical outer raceway allow self-alignment, accommodating shaft deflection and misalignment without increasing stress.',
            motion: 'Self-Aligning',
            applications: ['Agricultural machinery', 'Long drive shafts', 'Textile spinning frames'],
            features: ['Automatic alignment compensation up to 3°', 'Lowest friction of all rolling bearings', 'Available with cylindrical or tapered bores'],
            series: ['1200 Series', '1300 Series', '2200 Series', '2300 Series'],
            image: bearingImages['self-aligning-ball-bearings'],
            pdfUrl: 'https://drive.google.com/file/d/1rVcLmek8uJsImMbeOSW9S3EBmSHtgVGb/view?usp=sharing',
            pdfFileName: 'Self-Aligning Ball Bearings.pdf',
            pdfTitle: 'Self-Aligning Ball Bearings Catalogue'
          },
          {
            id: 'thrust-ball-bearings',
            name: 'Thrust Ball Bearings',
            code: 'TBB',
            categoryId: 'rolling-bearings',
            categoryName: 'Rolling Bearings',
            subcategoryId: 'ball-bearings',
            subcategoryName: 'Ball Bearings',
            short: 'Dedicated unidirectional axial load support.',
            description: 'Designed exclusively to accommodate axial loads at moderate speeds. Available in single-direction and double-direction configurations with flat or spherical seating washers.',
            motion: 'Axial Thrust',
            applications: ['Crane hooks & jacks', 'Vertical centrifuge drives', 'Automotive steering pivots'],
            features: ['Separable shaft and housing washers', 'Heavy axial load rating', 'Single and double direction executions'],
            series: ['51100 Series', '51200 Series', '51300 Series'],
            image: bearingImages['thrust-ball-bearings'],
            pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing',
            pdfFileName: 'Thrust Ball Bearings.pdf',
            pdfTitle: 'Thrust Ball Bearings Catalogue'
          }
        ]
      },
      {
        id: 'roller-bearings',
        name: 'Roller Bearings',
        description: 'Taper, spherical and cylindrical roller bearings engineered for heavy radial, shock and axial forces.',
        products: [
          {
            id: 'taper-roller-bearings',
            name: 'Taper Roller Bearings',
            code: 'TRB',
            categoryId: 'rolling-bearings',
            categoryName: 'Rolling Bearings',
            subcategoryId: 'roller-bearings',
            subcategoryName: 'Roller Bearings',
            short: 'Combined radial and axial loads in one robust geometry.',
            description: 'Taper roller bearings use tapered rollers running on conical raceways to carry combined radial and thrust loads. A core solution for automotive wheel hubs, differentials, and industrial gearboxes.',
            motion: 'Combined Heavy Load',
            applications: ['Automobile wheel hubs & axles', 'Heavy industrial gearboxes', 'Mining machinery'],
            features: ['Separable cone and cup design', 'Carries heavy simultaneous radial & thrust loads', 'Available in metric and inch sizes'],
            series: ['30200 Series', '30300 Series', '32200 Series', '32300 Series', '33200 Series'],
            image: bearingImages['taper-roller-bearings'],
            pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing',
            pdfFileName: 'TRB_V4.pdf',
            pdfTitle: 'Taper Roller Bearings Catalogue'
          },
          {
            id: 'spherical-roller-bearings',
            name: 'Spherical Roller Bearings',
            code: 'SRB',
            categoryId: 'rolling-bearings',
            categoryName: 'Rolling Bearings',
            subcategoryId: 'roller-bearings',
            subcategoryName: 'Roller Bearings',
            short: 'Self-aligning heavy-duty motion under harsh conditions.',
            description: 'Spherical roller bearings accommodate heavy radial and axial loads with inherent self-alignment, forgiving severe shaft deflection and housing misalignment in steel mills, cement plants, and vibratory screens.',
            motion: 'Self-Aligning Heavy Load',
            applications: ['Cement kilns & ball mills', 'Steel rolling mills & continuous casters', 'Vibrating screens & crushers'],
            features: ['Inherent self-alignment up to 2°', 'High dynamic load rating for shock environments', 'Available with brass (MB) or pressed steel (CC) cages'],
            series: ['22200 Series', '22300 Series', '23000 Series', '23100 Series', '23200 Series'],
            image: bearingImages['spherical-roller-bearings'],
            pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf',
            pdfFileName: 'iko-spherical-bushings-catalogue.pdf',
            pdfTitle: 'IKO Spherical Bushings & Bearings Catalogue'
          },
          {
            id: 'cylindrical-roller-bearings',
            name: 'Cylindrical Roller Bearings',
            code: 'CRB',
            categoryId: 'rolling-bearings',
            categoryName: 'Rolling Bearings',
            subcategoryId: 'roller-bearings',
            subcategoryName: 'Roller Bearings',
            short: 'High radial capacity through line contact.',
            description: 'Featuring modified line contact between cylindrical rollers and raceways, these bearings provide maximum radial capacity and high-speed capability in electric motors and gear transmissions.',
            motion: 'Heavy Radial',
            applications: ['Heavy electric traction motors', 'Industrial power transmissions', 'Machine tool drives'],
            features: ['Line contact for extreme radial capacity', 'Accommodates axial shaft expansion in NU/N types', 'High rigidity under dynamic load'],
            series: ['NU Series', 'NJ Series', 'NUP Series', 'N Series', 'NN Series'],
            image: bearingImages['cylindrical-roller-bearings'],
            pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing',
            pdfFileName: 'Cylindrical Roller Bearings.pdf',
            pdfTitle: 'Cylindrical Roller Bearings Catalogue'
          },
          {
            id: 'cylindrical-roller-thrust-bearings',
            name: 'Cylindrical Roller Thrust Bearings',
            code: 'CRTB',
            categoryId: 'rolling-bearings',
            categoryName: 'Rolling Bearings',
            subcategoryId: 'roller-bearings',
            subcategoryName: 'Roller Bearings',
            short: 'High axial load carrying capacity with high rigidity.',
            description: 'Comprising cylindrical roller cage assemblies and shaft/housing washers, designed for assemblies with heavy one-directional axial forces and minimal axial envelope space.',
            motion: 'Heavy Axial Thrust',
            applications: ['Extruder gearboxes', 'Drilling rigs', 'Oil & gas swivel heads'],
            features: ['Exceptional axial rigidity', 'Compact axial footprint', 'Precision machined cages'],
            series: ['811 Series', '812 Series', '893 Series'],
            image: bearingImages['cylindrical-roller-thrust-bearings'],
            pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing',
            pdfFileName: 'Cylindrical Roller Thrust Bearings.pdf',
            pdfTitle: 'Cylindrical Roller Thrust Catalogue'
          },
          {
            id: 'spherical-roller-thrust-bearings',
            name: 'Spherical Roller Thrust Bearings',
            code: 'SRTB',
            categoryId: 'rolling-bearings',
            categoryName: 'Rolling Bearings',
            subcategoryId: 'roller-bearings',
            subcategoryName: 'Roller Bearings',
            short: 'Heavy axial load with self-aligning capability.',
            description: 'Barrel-shaped rollers inclined relative to the bearing axis allow these bearings to support very high axial loads alongside moderate simultaneous radial loads, accommodating shaft deflection.',
            motion: 'Heavy Axial & Radial',
            applications: ['Hydroelectric generators', 'Marine thrusters', 'Pulverizer mills'],
            features: ['Self-aligning spherical raceway', 'Simultaneous heavy axial and radial load capacity', 'Oil-lubricated high-reliability designs'],
            series: ['29200 Series', '29300 Series', '29400 Series'],
            image: bearingImages['spherical-roller-thrust-bearings'],
            pdfUrl: 'https://drive.google.com/file/d/1h7I5-VE-kHyyH1PGV9WDgdXTY5b75Apz/view?usp=sharing',
            pdfFileName: 'Spherical Roller Thrust Bearings.pdf',
            pdfTitle: 'Spherical Roller Thrust Catalogue'
          }
        ]
      }
    ]
  },
  {
    id: 'linear-shafts',
    name: 'Linear Shafts',
    code: '02',
    description: 'Precision hard-chrome linear shafts, pre-assembled supported rails, and aluminum shaft support blocks.',
    subcategories: [
      {
        id: 'hard-chrome-shafts-sub',
        name: 'Hard-Chrome Shafts',
        description: 'Induction-hardened, precision-ground and hard-chrome plated linear shafts for maximum wear and corrosion resistance.',
        products: [
          {
            id: 'hard-chrome-shafts',
            name: 'Hard-Chrome Shafts',
            code: 'HCS',
            categoryId: 'linear-shafts',
            categoryName: 'Linear Shafts',
            subcategoryId: 'hard-chrome-shafts-sub',
            subcategoryName: 'Hard-Chrome Shafts',
            short: 'Induction-hardened linear shafts with hard chrome plating.',
            description: 'Precision linear shafts manufactured from Cf53 / C45E steel, induction-hardened to HRC 60-64 and coated with 10-20µm hard chrome for high wear resistance and corrosion defense.',
            motion: 'Precision Linear Guidance',
            applications: ['Linear bushing slides', '3D printing & CNC machinery', 'Hydraulic cylinder guide shafts'],
            features: ['Tolerance class ISO h6 / h7', 'Surface finish Ra ≤ 0.2µm', 'Induction hardening depth 1.0 - 2.5mm'],
            series: ['C45E', 'Cf53', '100Cr6', 'X46Cr13'],
            image: bearingImages['hard-chrome-shafts'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'WON ST Precision Shaft & Motion Catalogue'
          },
          {
            id: 'shaft-was-solid',
            name: 'WAS - Solid Shaft',
            code: 'WAS',
            categoryId: 'linear-shafts',
            categoryName: 'Linear Shafts',
            subcategoryId: 'hard-chrome-shafts-sub',
            subcategoryName: 'Hard-Chrome Shafts',
            short: 'Precision ground solid induction-hardened linear shafts.',
            description: 'Solid cylindrical shafts optimized for standard recirculating linear ball bushings. Precision ground to ensure ultra-low runout and consistent stroke longevity.',
            motion: 'Solid Shaft Travel',
            applications: ['Automation pick & place', 'Pneumatic rod guides', 'Packaging guide rails'],
            features: ['Solid core for high bending stiffness', 'Precision ground to h6', 'Available cut to length with chamfered ends'],
            series: ['WAS 12', 'WAS 16', 'WAS 20', 'WAS 25', 'WAS 30', 'WAS 40', 'WAS 50'],
            image: bearingImages['shaft-was-solid'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'WON ST Solid Linear Shafts Catalogue'
          },
          {
            id: 'shaft-custom-made',
            name: 'Custom-made Shafts',
            code: 'CMS',
            categoryId: 'linear-shafts',
            categoryName: 'Linear Shafts',
            subcategoryId: 'hard-chrome-shafts-sub',
            subcategoryName: 'Hard-Chrome Shafts',
            short: 'Custom-machined ends, tapped holes, and stepped diameters.',
            description: 'Tailored linear shafts machined to OEM engineering drawings. Options include threaded spigots, circlip grooves, stepped diameters, tapped radial/axial holes, and keyways.',
            motion: 'Custom OEM Shafting',
            applications: ['Special purpose machinery (SPM)', 'Robotic arms', 'Testing rigs'],
            features: ['Custom end machining to drawing', 'Internal & external threading', 'Special length & tolerance options'],
            series: ['Custom Machined Ends', 'Special Diameters', 'Flanged Ends', 'Keyways & Tapers'],
            image: bearingImages['shaft-custom-made'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'Custom Linear Shafts Brochure'
          }
        ]
      },
      {
        id: 'shafts-with-support-sub',
        name: 'Shafts with Support',
        description: 'Continuously supported linear shaft rail assemblies designed to eliminate shaft deflection over long strokes.',
        products: [
          {
            id: 'shafts-with-support',
            name: 'Shafts with Support',
            code: 'SWS',
            categoryId: 'linear-shafts',
            categoryName: 'Linear Shafts',
            subcategoryId: 'shafts-with-support-sub',
            subcategoryName: 'Shafts with Support',
            short: 'Continuous aluminum rail support eliminates deflection.',
            description: 'Pre-drilled and bolted linear shaft assemblies mounted to extruded aluminum support rails. Engineered to eliminate bending and deflection in long-stroke automated machinery.',
            motion: 'Deflection-Free Linear Motion',
            applications: ['CNC wood routers & plasma cutters', 'Long stroke gantries', 'Material transfer conveyors'],
            features: ['Rigid extruded aluminum base rail', 'Pre-drilled base mounting holes', 'Compatible with open linear ball bearing blocks'],
            series: ['SBR Series', 'TBR Series', 'SA Series'],
            image: bearingImages['shafts-with-support'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'WON ST Supported Shaft & Rails Catalogue'
          },
          {
            id: 'shaft-st',
            name: 'ST Shaft with Support',
            code: 'ST',
            categoryId: 'linear-shafts',
            categoryName: 'Linear Shafts',
            subcategoryId: 'shafts-with-support-sub',
            subcategoryName: 'Shafts with Support',
            short: 'Pre-assembled linear shaft with continuous support rail.',
            description: 'High-rigidity integrated shaft rail unit designed for direct mounting to machine structures. Allows high travel speeds with stable, vibration-damped guidance.',
            motion: 'High-Rigidity Guided Slide',
            applications: ['Automated assembly lines', 'Linear actuator drives', 'Industrial cutting tables'],
            features: ['Low profile design', 'Direct machine frame bolting', 'Precision matched shaft and rail'],
            series: ['ST 16', 'ST 20', 'ST 25', 'ST 30', 'ST 40'],
            image: bearingImages['shaft-st'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'ST Supported Shaft Catalogue'
          },
          {
            id: 'shaft-stu',
            name: 'STU Shaft with Support',
            code: 'STU',
            categoryId: 'linear-shafts',
            categoryName: 'Linear Shafts',
            subcategoryId: 'shafts-with-support-sub',
            subcategoryName: 'Shafts with Support',
            short: 'Open continuous linear shaft and rail system.',
            description: 'Open continuous support rail design engineered for extended travel lengths where multiple rail segments are joined seamlessly with zero binding.',
            motion: 'Long-Stroke Travel',
            applications: ['Large format automated machinery', 'Warehouse transfer shuttles', 'Laser cutting gantries'],
            features: ['Continuous support along entire length', 'Precision joint capability for unlimited travel', 'High load capacity'],
            series: ['STU 16', 'STU 20', 'STU 25', 'STU 30', 'STU 40'],
            image: bearingImages['shaft-stu'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'STU Shaft Rails Catalogue'
          },
          {
            id: 'linear-motion-shafts-with-support',
            name: 'Linear Motion Shafts with Support',
            code: 'LMSS',
            categoryId: 'linear-shafts',
            categoryName: 'Linear Shafts',
            subcategoryId: 'shafts-with-support-sub',
            subcategoryName: 'Shafts with Support',
            short: 'Supported linear shafts for stable guided industrial motion.',
            description: 'Fully matched linear shafts mounted on low-profile structural aluminum supports for precision automation slides and positioning tables.',
            motion: 'Stable Linear Motion',
            applications: ['Packaging slide tables', 'Inspection scanning rigs', 'Dispensing machines'],
            features: ['Complete pre-aligned assembly', 'Low profile envelope', 'High resistance to torsional flex'],
            series: ['Supported Shaft Series', 'Shaft Support Series'],
            image: bearingImages['linear-motion-shafts-with-support'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'WON ST Supported Linear Shafts Catalogue'
          }
        ]
      },
      {
        id: 'shaft-supporting-units-sub',
        name: 'Shaft Supporting Units',
        description: 'Precision machined aluminum shaft end supports and clamping blocks for secure shaft mounting.',
        products: [
          {
            id: 'shaft-supporting-units',
            name: 'Shaft Supporting Units',
            code: 'SSU',
            categoryId: 'linear-shafts',
            categoryName: 'Linear Shafts',
            subcategoryId: 'shaft-supporting-units-sub',
            subcategoryName: 'Shaft Supporting Units',
            short: 'Precision machined end support units and clamping blocks.',
            description: 'High-strength aluminum alloy end blocks with clamp screws, engineered for rapid, rigid and repeatable shaft mounting in mechanical assemblies.',
            motion: 'Rigid End Clamping',
            applications: ['End mounting for linear shafts', 'Cantilevered guide arrangements', 'Test fixture assemblies'],
            features: ['Anodized aluminum body', 'Integrated pinch clamping screw', 'Standardized base mounting holes'],
            series: ['SK Series', 'SHF Series', 'WA Series'],
            image: bearingImages['shaft-supporting-units'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'WON ST Shaft Supporting Units Catalogue'
          },
          {
            id: 'shaft-s-st',
            name: 'S-ST Shaft Support Units',
            code: 'S-ST',
            categoryId: 'linear-shafts',
            categoryName: 'Linear Shafts',
            subcategoryId: 'shaft-supporting-units-sub',
            subcategoryName: 'Shaft Supporting Units',
            short: 'Precision aluminum shaft support unit for secure end clamping.',
            description: 'Compact vertical mounting support units designed for rigid clamping of induction hardened shafts, providing accurate center height and alignment.',
            motion: 'Precision Base Support',
            applications: ['Machine side plates', 'Pick & place frames', 'Automation conveyors'],
            features: ['Precise centerline height tolerance', 'Uniform bolt hole pattern', 'Quick shaft replacement'],
            series: ['S-ST 12', 'S-ST 16', 'S-ST 20', 'S-ST 25', 'S-ST 30'],
            image: bearingImages['shaft-s-st'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'S-ST Shaft Support Catalogue'
          },
          {
            id: 'shaft-s-stu',
            name: 'S-STU Shaft Support Units',
            code: 'S-STU',
            categoryId: 'linear-shafts',
            categoryName: 'Linear Shafts',
            subcategoryId: 'shaft-supporting-units-sub',
            subcategoryName: 'Shaft Supporting Units',
            short: 'Heavy-duty flanged shaft support unit for rigid machine mounting.',
            description: 'Flanged and face-mounted support units engineered to absorb axial thrust and moment loads in heavy automation equipment.',
            motion: 'Flanged Shaft Support',
            applications: ['Vertical shaft installations', 'Flanged bulkhead mounting', 'Heavy duty industrial frames'],
            features: ['Reinforced flange mounting pattern', 'Resistant to moment deflection', 'High clamping torque tolerance'],
            series: ['S-STU 12', 'S-STU 16', 'S-STU 20', 'S-STU 25', 'S-STU 30'],
            image: bearingImages['shaft-s-stu'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'S-STU Support Units Catalogue'
          }
        ]
      }
    ]
  },
  {
    id: 'linear-motion',
    name: 'Linear Motion Systems',
    code: '03',
    description: 'Precision linear guideways, recirculating ball bushings, and dual shaft track guide systems.',
    subcategories: [
      {
        id: 'linear-guides-bushings',
        name: 'Linear Guides & Bushings',
        description: 'Recirculating ball bushings, flanged blocks, and parallel dual shaft track guides for automation.',
        products: [
          {
            id: 'linear-motion-bearings',
            name: 'Linear Motion Bearings',
            code: 'LMB',
            categoryId: 'linear-motion',
            categoryName: 'Linear Motion Systems',
            subcategoryId: 'linear-guides-bushings',
            subcategoryName: 'Linear Guides & Bushings',
            short: 'Guided motion along a straight axis with recirculating balls.',
            description: 'Linear ball bushings featuring multiple closed ball circuits that circulate endlessly inside an outer cylinder, providing limitless low-friction linear travel on hardened shafts.',
            motion: 'Unlimited Linear Stroke',
            applications: ['CNC machines & 3D printers', 'Automation pick & place units', 'Packaging & sorting equipment'],
            features: ['Low friction coefficient (µ = 0.001 - 0.003)', 'Available in standard, flanged (LMF/LMK), and open types', 'Double lip wiper seals for dust protection'],
            series: ['LM Series', 'LME Series', 'LMEK Series', 'LMF Series', 'LM-AJ Series', 'LM-OP Series'],
            image: bearingImages['linear-motion-bearings'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'WON ST Linear Motion Guide & Crossed Roller Catalogue'
          },
          {
            id: 'dual-shaft-guides',
            name: 'Dual Shaft Guides',
            code: 'DSG',
            categoryId: 'linear-motion',
            categoryName: 'Linear Motion Systems',
            subcategoryId: 'linear-guides-bushings',
            subcategoryName: 'Linear Guides & Bushings',
            short: 'Parallel twin-shaft guidance blocks and rails for high stability.',
            description: 'Integrated twin hardened shafts embedded into an anodized aluminum track with roller slider blocks, delivering high speed, whisper-quiet travel, and high moment rigidity.',
            motion: 'High-Speed Dual Track',
            applications: ['Laser engraving machines', 'High-speed camera sliders', 'Medical dispensing robots'],
            features: ['Speeds up to 10 m/s with low noise', 'Adjustable preload roller bearings inside block', 'High resistance to contamination'],
            series: ['Dual Guide Series', 'Compact Series', 'External/Internal Roller Types'],
            image: bearingImages['dual-shaft-guides'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'WON ST Dual Shaft Guides Catalogue'
          },
          {
            id: 'cross-roller-guideway',
            name: 'Cross Roller Guideway',
            code: 'CRG',
            categoryId: 'linear-motion',
            categoryName: 'Linear Motion Systems',
            subcategoryId: 'linear-guides-bushings',
            subcategoryName: 'Linear Guides & Bushings',
            short: 'Ultra-rigid, non-recirculating cross roller linear ways.',
            description: 'V-groove ground rails with orthogonal crossed cylindrical rollers providing extreme rigidity and ultra-precise straightness with minimal elastic deformation under heavy moment loads.',
            motion: 'Sub-Micron Precision Travel',
            applications: ['Semiconductor inspection stages', 'Optical measuring equipment', 'Precision EDM machine tables'],
            features: ['Extremely high rigidity and load capacity', 'Zero stick-slip and sub-micron positioning accuracy', 'Cage creep prevention options'],
            series: ['CB Series', 'CS Series', 'VR Series', 'Cross Roller Table Series'],
            image: bearingImages['linear-motion-bearings'],
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'WON ST Crossed Roller Bearings Catalogue'
          }
        ]
      }
    ]
  },
  {
    id: 'needle-roller-bearings',
    name: 'Needle Roller Bearings',
    code: '04',
    description: 'Ultra-compact high-capacity needle rollers, machined rings, thrust cages and flat roller assemblies.',
    subcategories: [
      {
        id: 'needle-assemblies',
        name: 'Needle Assemblies & Cages',
        description: 'Compact radial and thrust needle assemblies designed for minimal cross-section machine envelopes.',
        products: [
          {
            id: 'needle-roller-and-cage-assemblies',
            name: 'Needle Roller and Cage Assemblies',
            code: 'NRCA',
            categoryId: 'needle-roller-bearings',
            categoryName: 'Needle Roller Bearings',
            subcategoryId: 'needle-assemblies',
            subcategoryName: 'Needle Assemblies & Cages',
            short: 'Low-section rolling elements for compact shaft arrangements.',
            description: 'Comprising precision needle rollers retained in lightweight synthetic resin or steel cages. Utilizes the shaft and housing bore as raceways for minimum radial space and maximum load capacity.',
            motion: 'Minimal Cross-Section Radial',
            applications: ['Automobile connecting rods & gearboxes', 'Motorcycle crankpins', 'Compressors & textile spindles'],
            features: ['Smallest radial section of all rolling bearings', 'High rotational speed capability', 'High load capacity in limited space'],
            series: ['K Series', 'KZK Series', 'KT...N Series'],
            image: bearingImages['needle-roller-and-cage-assemblies'],
            pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf',
            pdfFileName: 'iko-needle-roller-cages-catalogue.pdf',
            pdfTitle: 'IKO Needle Roller & Cage Assemblies Catalogue'
          },
          {
            id: 'machined-type-needle-roller-bearings',
            name: 'Machined Type Needle Roller Bearings',
            code: 'MTRB',
            categoryId: 'needle-roller-bearings',
            categoryName: 'Needle Roller Bearings',
            subcategoryId: 'needle-assemblies',
            subcategoryName: 'Needle Assemblies & Cages',
            short: 'High radial capacity in compact precision housings.',
            description: 'Manufactured with high-rigidity machined outer rings and needle roller complements. Available with or without inner rings to optimize design flexibility.',
            motion: 'Heavy Compact Radial',
            applications: ['Machine tool gearboxes', 'Construction machinery drives', 'Industrial printing cylinders'],
            features: ['High dynamic load ratings', 'Available with integral oil holes and grooves', 'Available with contact rubber seals (2RS)'],
            series: ['NA Series', 'RNA Series', 'NKI Series', 'NK Series'],
            image: bearingImages['machined-type-needle-roller-bearings'],
            pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf',
            pdfFileName: 'iko-needle-roller-cages-catalogue.pdf',
            pdfTitle: 'IKO Needle Roller Bearings Catalogue'
          },
          {
            id: 'thrust-needle-roller-bearings',
            name: 'Thrust Needle Roller Bearings',
            code: 'TNRB',
            categoryId: 'needle-roller-bearings',
            categoryName: 'Needle Roller Bearings',
            subcategoryId: 'needle-assemblies',
            subcategoryName: 'Needle Assemblies & Cages',
            short: 'Compact axial-load support for constrained assemblies.',
            description: 'Needle roller thrust assemblies designed to fit in spaces no thicker than a conventional washer while supporting high axial thrust forces with high rigidity.',
            motion: 'High-Capacity Axial Thrust',
            applications: ['Automotive automatic transmissions', 'Hydraulic pumps & motors', 'Variable displacement actuators'],
            features: ['Very compact axial section (from 2mm thickness)', 'High axial rigidity', 'Can be combined with thin AS raceway washers'],
            series: ['AXK Series', 'AS Series', 'LS Series', 'GS/WS Series'],
            image: bearingImages['thrust-needle-roller-bearings'],
            pdfUrl: 'https://drive.google.com/file/d/1ph9S7mUIvVcCztHV5dfix5Ax4aRZGK4B/view?usp=sharing',
            pdfFileName: 'Thrust needle roller bearings_V1 (1).pdf',
            pdfTitle: 'Thrust Needle Roller Bearings Catalogue'
          },
          {
            id: 'drawn-cup-needle-roller-bearings',
            name: 'Drawn Cup Needle Roller Bearings',
            code: 'DCNB',
            categoryId: 'needle-roller-bearings',
            categoryName: 'Needle Roller Bearings',
            subcategoryId: 'needle-assemblies',
            subcategoryName: 'Needle Assemblies & Cages',
            short: 'Thin-walled pressed outer ring for economical compact mounting.',
            description: 'Manufactured with deep-drawn thin-walled sheet steel outer rings, pressed into housing bores without needing axial location shoulders.',
            motion: 'Compact Cost-Effective Radial',
            applications: ['Automotive power steering', 'Household appliances', 'Small engine starters'],
            features: ['Economical high-volume production design', 'Press-fit installation without snap rings', 'Available with open or closed end'],
            series: ['HK Series', 'BK Series', 'HMK Series', 'SCE Series'],
            image: bearingImages['drawn-cup-needle-roller-bearings'],
            pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf',
            pdfFileName: 'iko-needle-roller-cages-catalogue.pdf',
            pdfTitle: 'IKO Needle Roller Bearings Catalogue'
          },
          {
            id: 'flat-roller-cages',
            name: 'Flat Roller Cages',
            code: 'FRC',
            categoryId: 'needle-roller-bearings',
            categoryName: 'Needle Roller Bearings',
            subcategoryId: 'needle-assemblies',
            subcategoryName: 'Needle Assemblies & Cages',
            short: 'Precision flat roller guides for linear ways.',
            description: 'Flat cage linear rolling elements used between precision machine slideways, delivering high accuracy and high load carrying capacity.',
            motion: 'Linear Slideway Guidance',
            applications: ['Machine tool ways', 'Measuring equipment slides', 'Press tool dies'],
            features: ['High rigidity in flat profile', 'Smooth travel without backlash', 'Available in multi-row configurations'],
            series: ['Flat Cage Series', 'FF Series', 'BF Series'],
            image: bearingImages['flat-roller-cages'],
            pdfUrl: 'https://drive.google.com/file/d/1-4uxDpKL3yifw_X7LH0kd7a4EUVjZhh-/view?usp=sharing',
            pdfFileName: 'Flat Roller Cages.pdf',
            pdfTitle: 'Flat Roller Cages Brochure'
          }
        ]
      }
    ]
  },
  {
    id: 'rod-ends-track-rollers',
    name: 'Rod Ends & Track Rollers',
    code: '05',
    description: 'Articulating rod ends, spherical plain bushings, stud and yoke cam followers for track running motion.',
    subcategories: [
      {
        id: 'rod-ends-plain',
        name: 'Rod Ends & Spherical Plain',
        description: 'Spherical joints and articulating rod ends for mechanical linkages, steering and oscillating pivots.',
        products: [
          {
            id: 'rod-end-bearings',
            name: 'Rod End Bearings',
            code: 'REB',
            categoryId: 'rod-ends-track-rollers',
            categoryName: 'Rod Ends & Track Rollers',
            subcategoryId: 'rod-ends-plain',
            subcategoryName: 'Rod Ends & Spherical Plain',
            short: 'Articulating linkage solutions for controlled mechanical motion.',
            description: 'Comprising a spherical plain bearing eye integrated into a male or female threaded housing shank. Ideal for steering linkages, control rods, and articulating mechanisms.',
            motion: 'Spherical Oscillation',
            applications: ['Automotive steering & suspension linkages', 'Pneumatic cylinder clevis ends', 'Agricultural machinery links'],
            features: ['Available in male and female threads (metric and inch)', 'Steel-on-steel or maintenance-free PTFE lined', 'Withstands alternating shock loads'],
            series: ['SI Series', 'SA Series', 'PHS Series', 'POS Series', 'LHSA / LHS Series'],
            image: bearingImages['rod-end-bearings'],
            pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf',
            pdfFileName: 'iko-rod-ends-l-balls-catalogue.pdf',
            pdfTitle: 'IKO Rod Ends & L-Balls Catalogue'
          },
          {
            id: 'radial-spherical-plain-bearings',
            name: 'Radial Spherical Plain Bearings',
            code: 'RSPB',
            categoryId: 'rod-ends-track-rollers',
            categoryName: 'Rod Ends & Track Rollers',
            subcategoryId: 'rod-ends-plain',
            subcategoryName: 'Rod Ends & Spherical Plain',
            short: 'Plain spherical motion for heavy alignment and oscillating loads.',
            description: 'Spherical plain bearings with spherical contact surfaces on inner and outer rings, engineered to carry heavy radial and multi-directional tilting forces in industrial hinges and cylinders.',
            motion: 'Multi-Axis Tilting & Oscillation',
            applications: ['Hydraulic cylinder rod eyes', 'Excavator bucket pivots', 'Bridge and building expansion bearings'],
            features: ['Very high static and dynamic load capacity', 'Steel/Steel and Maintenance-free PTFE types', 'Angular tilt compensation up to 15°'],
            series: ['GE...E Series', 'GE...ES Series', 'GE...EC Series', 'GEZ Series', 'SB / SB...A Series'],
            image: bearingImages['radial-spherical-plain-bearings'],
            pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf',
            pdfFileName: 'iko-spherical-bushings-catalogue.pdf',
            pdfTitle: 'IKO Spherical Bushings Catalogue'
          }
        ]
      },
      {
        id: 'track-rollers',
        name: 'Cam Followers & Track Rollers',
        description: 'Stud and yoke track rollers running on flat tracks, cam lobes, and conveyor guide rails.',
        products: [
          {
            id: 'stud-and-yoke-track-roller-bearings',
            name: 'Stud & Yoke Track Roller Bearings',
            code: 'SYTR',
            categoryId: 'rod-ends-track-rollers',
            categoryName: 'Rod Ends & Track Rollers',
            subcategoryId: 'track-rollers',
            subcategoryName: 'Cam Followers & Track Rollers',
            short: 'Track-running solutions for cam, guide and conveyor motion.',
            description: 'Featuring heavy-walled outer rings designed to roll directly on steel tracks, cam mechanisms and conveyor guides without excessive outer ring deformation.',
            motion: 'Track Guidance & Cam Motion',
            applications: ['Cam mechanisms & indexing units', 'Pallet conveyor lines', 'Packaging machine transfer arms'],
            features: ['Thick-walled outer ring withstands track shock loads', 'Crowned outer ring prevents edge loading', 'Available with integral mounting stud or yoke bore'],
            series: ['CF Series', 'CFKR Series', 'KR Series', 'NUKR Series', 'RNAST Series'],
            image: bearingImages['stud-and-yoke-track-roller-bearings'],
            pdfUrl: '/assets/iko-cam-and-roller-followers-catalogue.pdf',
            pdfFileName: 'iko-cam-and-roller-followers-catalogue.pdf',
            pdfTitle: 'IKO Cam & Roller Followers Catalogue'
          },
          {
            id: 'stud-type-track-roller-bearings',
            name: 'Stud Type Track Roller Bearings',
            code: 'STTR',
            categoryId: 'rod-ends-track-rollers',
            categoryName: 'Rod Ends & Track Rollers',
            subcategoryId: 'track-rollers',
            subcategoryName: 'Cam Followers & Track Rollers',
            short: 'Double hex hole stud cam followers for rapid mounting.',
            description: 'Cam followers with integrated threaded mounting stud and hexagonal socket on both stud head and threaded end for easy torque tightening in tight machine spaces.',
            motion: 'Cam Track Running',
            applications: ['Automation indexing drives', 'Pallet transfer cars', 'Sheet metal forming guides'],
            features: ['Hexagon socket on both ends (Double Hex)', 'Full complement needle roller options', 'Crowned or cylindrical outer diameter'],
            series: ['CFKR 22', 'CFKR 26', 'CF...B Series', 'CFS Series'],
            image: bearingImages['stud-and-yoke-track-roller-bearings'],
            pdfUrl: '/assets/iko-double-hex-cam-followers-catalogue.pdf',
            pdfFileName: 'iko-double-hex-cam-followers-catalogue.pdf',
            pdfTitle: 'IKO Double Hex Cam Followers Catalogue'
          },
          {
            id: 'track-roller-bearings',
            name: 'Track Roller Bearings',
            code: 'TRK',
            categoryId: 'rod-ends-track-rollers',
            categoryName: 'Rod Ends & Track Rollers',
            subcategoryId: 'track-rollers',
            subcategoryName: 'Cam Followers & Track Rollers',
            short: 'Yoke type roller followers for pin mounting.',
            description: 'Non-stud roller followers designed to mount over support pins or shafts. Features heavy duty roller complement and lateral guide rings.',
            motion: 'Yoke Track Rolling',
            applications: ['Steel mill transfer cars', 'Overhead crane guide rollers', 'Conveyor chain guides'],
            features: ['Yoke type pin mounting', 'Withstands heavy radial and moment forces', 'Full complement cylindrical roller design (NUTR)'],
            series: ['NATR Series', 'NATV Series', 'NUTR Series', 'PWTR Series'],
            image: bearingImages['track-roller-bearings'],
            pdfUrl: '/assets/iko-cam-and-roller-followers-catalogue.pdf',
            pdfFileName: 'iko-cam-and-roller-followers-catalogue.pdf',
            pdfTitle: 'IKO Roller Followers Catalogue'
          }
        ]
      }
    ]
  },
  {
    id: 'bearing-units-housings',
    name: 'Bearing Units & Housings',
    code: '06',
    description: 'Pillow blocks, flanged units and precision ball screw end support assemblies.',
    subcategories: [
      {
        id: 'mounted-housings',
        name: 'Mounted Units & Housings',
        description: 'Cast iron and ductile iron housed bearings for dependable machinery shaft support.',
        products: [
          {
            id: 'pillow-block-bearings',
            name: 'Pillow Block Bearings',
            code: 'PBB',
            categoryId: 'bearing-units-housings',
            categoryName: 'Bearing Units & Housings',
            subcategoryId: 'mounted-housings',
            subcategoryName: 'Mounted Units & Housings',
            short: 'Mounted bearing units for dependable shaft support.',
            description: 'Precision insert ball bearings pre-mounted in rigid cast iron or ductile iron pillow block housings. Features self-aligning spherical seating and double-lip flingers.',
            motion: 'Mounted Shaft Support',
            applications: ['Agricultural conveyors & harvesting equipment', 'Mining conveyor pulleys', 'Food processing lines'],
            features: ['Self-aligning spherical insert', 'Set-screw or eccentric locking collar', 'Pre-lubricated with grease fitting'],
            series: ['UCP Series', 'UCF Series', 'UCFL Series', 'UCT Series'],
            image: bearingImages['pillow-block-bearings'],
            pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf',
            pdfFileName: 'Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf',
            pdfTitle: 'Pillow Block Bearings Catalogue'
          },
          {
            id: 'heavy-duty-pillow-block-bearings',
            name: 'Heavy Duty Pillow Block Bearings',
            code: 'HDPB',
            categoryId: 'bearing-units-housings',
            categoryName: 'Bearing Units & Housings',
            subcategoryId: 'mounted-housings',
            subcategoryName: 'Mounted Units & Housings',
            short: 'Plummer blocks for heavy spherical roller bearings.',
            description: 'Split plummer block housings (SNL/SNH series) engineered to house spherical roller bearings on adapter sleeves for heavy mining, cement, and quarry shafts.',
            motion: 'Heavy-Duty Shaft Support',
            applications: ['Quarry stone crushers', 'Ball mill countershafts', 'Heavy industrial blowers'],
            features: ['High-grade grey or spheroidal graphite cast iron', 'Multiple labyrinth and taconite seal options', 'Split housing for easy bearing replacement'],
            series: ['SNL Series', 'SNH Series', 'SAF Series'],
            image: bearingImages['pillow-block-bearings'],
            pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf',
            pdfFileName: 'Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf',
            pdfTitle: 'Pillow Block Units Catalogue'
          }
        ]
      }
    ]
  },
  {
    id: 'clutches-bushes',
    name: 'Clutches & Bushes',
    code: '07',
    description: 'One-way overrunning clutches, drawn cup roller clutches, and maintenance-free Permaglide dry bushes.',
    subcategories: [
      {
        id: 'clutches-bushes-sub',
        name: 'Clutches & Dry Bushes',
        description: 'Compact indexing clutches and dry self-lubricating sleeve bushings.',
        products: [
          {
            id: 'drawn-cup-needle-roller-clutches',
            name: 'Drawn Cup Needle Roller Clutches',
            code: 'DCNC',
            categoryId: 'clutches-bushes',
            categoryName: 'Clutches & Bushes',
            subcategoryId: 'clutches-bushes-sub',
            subcategoryName: 'Clutches & Dry Bushes',
            short: 'Compact one-way clutch assemblies for precision mechanisms.',
            description: 'One-way clutches comprising a thin drawn cup outer ring with ramps and individually spring-loaded rollers, transmitting high torque in one direction while freewheeling in reverse.',
            motion: 'One-Way Overrunning & Indexing',
            applications: ['Office copiers & paper feed rollers', 'Exercise equipment drives', 'Automotive auxiliary indexing'],
            features: ['Very compact radial cross-section', 'Instantaneous backstop lockup with zero backlash', 'Available with integrated supporting needle bearings (HFL)'],
            series: ['HF Series', 'HFL Series'],
            image: bearingImages['drawn-cup-needle-roller-clutches'],
            pdfUrl: 'https://drive.google.com/file/d/1kuPQzZtzUMa_NZRcFOLrTcLH1WO-Nmc8/view?usp=sharing',
            pdfFileName: 'Drawn Cup Roller Clutches.pdf',
            pdfTitle: 'Drawn Cup Clutches Catalogue'
          },
          {
            id: 'one-way-clutch',
            name: 'One Way Clutch',
            code: 'OWC',
            categoryId: 'clutches-bushes',
            categoryName: 'Clutches & Bushes',
            subcategoryId: 'clutches-bushes-sub',
            subcategoryName: 'Clutches & Dry Bushes',
            short: 'Sprag and ramp freewheels for backstopping and indexing.',
            description: 'Industrial overrunning sprag clutches and freewheels engineered for backstopping elevators, indexing feed motions, and overrunning motor drives.',
            motion: 'Unidirectional Torque Transmission',
            applications: ['Bucket elevator backstops', 'Printing press indexing drives', 'Dual-motor drive overrunning'],
            features: ['High torque capacity in standard ball bearing dimensions', 'Keyway mounting on shaft or housing (CSK...2RS, CSK...PP)', 'Reliable sprag lockup mechanism'],
            series: ['CSK Series', 'CSK..PP Series', 'AS Series', 'NSS Series'],
            image: bearingImages['one-way-clutch'],
            pdfUrl: 'https://drive.google.com/file/d/1kuPQzZtzUMa_NZRcFOLrTcLH1WO-Nmc8/view?usp=sharing',
            pdfFileName: 'One-Way Clutch Bearings.pdf',
            pdfTitle: 'One-Way Clutch Bearings Catalogue'
          },
          {
            id: 'permaglide-dry-bush',
            name: 'Permaglide Dry Bush',
            code: 'PDB',
            categoryId: 'clutches-bushes',
            categoryName: 'Clutches & Bushes',
            subcategoryId: 'clutches-bushes-sub',
            subcategoryName: 'Clutches & Dry Bushes',
            short: 'Maintenance-free dry-running composite sliding bearings.',
            description: 'Multi-layer composite plain bushes featuring a steel backing, porous bronze intermediate layer, and PTFE/lead sliding surface. Operates completely without lubricant.',
            motion: 'Lubricant-Free Sliding',
            applications: ['Hydraulic valve linkages', 'Textile machinery pivots', 'Automotive pedal boxes & hinges'],
            features: ['100% maintenance-free dry operation', 'Extremely low stick-slip and friction', 'Wide temperature range from -200°C to +280°C'],
            series: ['P Series (PTFE)', 'E Series (POM)', 'Flanged Bushes', 'Thrust Washers'],
            image: bearingImages['permaglide-dry-bush'],
            pdfUrl: 'https://drive.google.com/file/d/1kuPQzZtzUMa_NZRcFOLrTcLH1WO-Nmc8/view?usp=sharing',
            pdfFileName: 'Permaglide Dry Bush.pdf',
            pdfTitle: 'Permaglide Dry Bush Catalogue'
          }
        ]
      }
    ]
  },
  {
    id: 'power-transmission',
    name: 'Power Transmission Belts',
    code: '08',
    description: 'High-efficiency industrial V-belts, cogged wedge belts, and precision synchronous timing belts.',
    subcategories: [
      {
        id: 'v-belts-sub',
        name: 'Industrial V-Belts',
        description: 'Wrapped, raw-edge cogged, and multi-rib V-belts for reliable industrial power drives.',
        products: [
          {
            id: 'classical-wrapped-v-belt',
            name: 'Classical Wrapped V-Belt',
            code: 'CWVB',
            categoryId: 'power-transmission',
            categoryName: 'Power Transmission Belts',
            subcategoryId: 'v-belts-sub',
            subcategoryName: 'Industrial V-Belts',
            short: 'General industrial wrapped V-belt for dependable power transmission.',
            description: 'Constructed with high-tensile polyester cords and heat/oil resistant fabric wrapping, providing high durability across general manufacturing and agricultural pulley drives.',
            motion: 'Friction Belt Drive',
            applications: ['Industrial pump & compressor drives', 'Ventilation blowers', 'Crushers & agricultural machinery'],
            features: ['High tensile cords resist stretching', 'Anti-static, oil and heat resistant jacket', 'Matched set precision'],
            series: ['A Section', 'B Section', 'C Section', 'D Section'],
            image: '/assets/products/v-belt.png',
            pdfUrl: '/assets/khs-iso-9001-certification.pdf',
            pdfFileName: 'KHS-LG Classical Wrapped V-Belts Specifications.pdf',
            pdfTitle: 'Classical Wrapped V-Belts Brochure'
          },
          {
            id: 'wedge-cogged-v-belt',
            name: 'Wedge Cogged V-Belt',
            code: 'WCVB',
            categoryId: 'power-transmission',
            categoryName: 'Power Transmission Belts',
            subcategoryId: 'v-belts-sub',
            subcategoryName: 'Industrial V-Belts',
            short: 'Raw-edge cogged profile enhances flexibility and heat dissipation.',
            description: 'Precision molded cogs increase belt flexibility over small diameter sheaves while releasing operational heat, delivering up to 3x power capacity over classical belts.',
            motion: 'High-Torque Compact Drive',
            applications: ['Automotive engine front accessories', 'Heavy machine tool drives', 'High-speed blowers'],
            features: ['Molded cogs allow small pulley diameters', 'Raw edge sidewalls provide superior grip', 'Lower operating temperature'],
            series: ['SPZ Section', 'SPA Section', 'SPB Section', 'SPC Section'],
            image: '/assets/products/v-belt.png',
            pdfUrl: '/assets/khs-iso-9001-certification.pdf',
            pdfFileName: 'KHS-LG Wedge Cogged V-Belts Specifications.pdf',
            pdfTitle: 'Wedge Cogged V-Belts Brochure'
          },
          {
            id: 'poly-ribbed-v-belt',
            name: 'Poly-Ribbed V-Belt',
            code: 'PRVB',
            categoryId: 'power-transmission',
            categoryName: 'Power Transmission Belts',
            subcategoryId: 'v-belts-sub',
            subcategoryName: 'Industrial V-Belts',
            short: 'Multi-ribbed flat belt combining flexibility with high power transmission.',
            description: 'Combines the high power capacity of V-belts with the flexibility of flat belts. Ideal for compact serpentine drives operating at high speed ratios.',
            motion: 'High-Speed Serpentine Drive',
            applications: ['Automotive serpentine drives', 'Washing machines & appliances', 'High-speed industrial machinery'],
            features: ['Exceptional flexibility over backside idlers', 'High power transmission per unit width', 'Quiet and smooth operation'],
            series: ['PH', 'PJ', 'PK', 'PL', 'PM'],
            image: '/assets/products/v-belt.png',
            pdfUrl: '/assets/khs-iso-9001-certification.pdf',
            pdfFileName: 'KHS-LG Poly-Ribbed V-Belts Specifications.pdf',
            pdfTitle: 'Poly-Ribbed V-Belts Brochure'
          }
        ]
      },
      {
        id: 'timing-belts-sub',
        name: 'Synchronous Timing Belts',
        description: 'Positive-drive synchronous rubber and polyurethane timing belts for zero-slip motion control.',
        products: [
          {
            id: 'industrial-rubber-timing-belt',
            name: 'Industrial Rubber Timing Belt',
            code: 'IRTB',
            categoryId: 'power-transmission',
            categoryName: 'Power Transmission Belts',
            subcategoryId: 'timing-belts-sub',
            subcategoryName: 'Synchronous Timing Belts',
            short: 'Synchronous rubber timing belt for accurate motion control.',
            description: 'Fiberglass-reinforced chloroprene rubber timing belt with curvilinear or trapezoidal tooth profiles, ensuring exact synchronism without slip or creep.',
            motion: 'Positive Synchronous Drive',
            applications: ['Automotive camshaft timing', 'Textile spinning synchronization', 'Packaging machines'],
            features: ['Zero slip positive engagement', 'No lubrication required', 'Curvilinear tooth profiles (HTD / STD)'],
            series: ['HTD (3M, 5M, 8M, 14M)', 'STD', 'Trapezoidal (XL, L, H, XH)'],
            image: '/assets/products/timing-belt.png',
            pdfUrl: '/assets/khs-iso-9001-certification.pdf',
            pdfFileName: 'KHS-LG Rubber Timing Belts Specifications.pdf',
            pdfTitle: 'Rubber Timing Belts Brochure'
          },
          {
            id: 'industrial-pu-timing-belt',
            name: 'Industrial PU Timing Belt',
            code: 'IPUB',
            categoryId: 'power-transmission',
            categoryName: 'Power Transmission Belts',
            subcategoryId: 'timing-belts-sub',
            subcategoryName: 'Synchronous Timing Belts',
            short: 'Precision polyurethane timing belt for indexed and clean motion.',
            description: 'Abrasion-resistant polyurethane with high-tensile steel cord reinforcement. Highly resistant to chemicals, oils, and abrasion; ideal for clean-room and conveyor indexing.',
            motion: 'Clean Linear Indexing',
            applications: ['Clean-room automation', 'Conveyor flight positioning', 'Linear actuator drives'],
            features: ['Steel cord tension members for high tensile modulus', 'Clean, dust-free polyurethane compound', 'Available open-ended or truly endless'],
            series: ['T5', 'T10', 'AT5', 'AT10', 'AT20'],
            image: '/assets/products/timing-belt.png',
            pdfUrl: '/assets/khs-iso-9001-certification.pdf',
            pdfFileName: 'KHS-LG Polyurethane Timing Belts Specifications.pdf',
            pdfTitle: 'PU Timing Belts Brochure'
          }
        ]
      }
    ]
  }
];

// Flat list of all products in tree
export const ALL_TREE_PRODUCTS: TreeProduct[] = PRODUCT_CATEGORIES_TREE.flatMap((cat) =>
  cat.subcategories.flatMap((sub) => sub.products)
);

export function getTreeProductById(id: string | undefined): TreeProduct | undefined {
  if (!id) return undefined;
  return ALL_TREE_PRODUCTS.find((p) => p.id === id);
}
