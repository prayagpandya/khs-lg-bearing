import { TreeCategory, TreeProduct } from './productTree';

export const IKO_CATEGORIES_TREE: TreeCategory[] = [
  {
    id: 'iko-needle-roller-bearings',
    name: 'Needle Roller Bearings',
    code: '01',
    description: 'Compact rolling bearing solutions for applications with limited radial envelope and high dynamic loads.',
    subcategories: [
      {
        id: 'iko-machined-needle-bearings',
        name: 'Machined Needle Bearings & Cages',
        description: 'High precision machined outer rings with precision rollers and needle cage assemblies.',
        products: [
          {
            id: 'iko-machined-needle-roller-bearings',
            name: 'Machined Type Needle Roller Bearings',
            code: 'NA / RNA',
            categoryId: 'iko-needle-roller-bearings',
            categoryName: 'Needle Roller Bearings',
            subcategoryId: 'iko-machined-needle-bearings',
            subcategoryName: 'Machined Needle Bearings & Cages',
            short: 'High radial capacity in compact precision machined rings.',
            description: 'IKO machined type needle roller bearings have low sectional height and high load ratings. Available with or without inner ring (RNA / NA series) to suit hardened shaft arrangements.',
            motion: 'Rotary Radial',
            applications: ['Machine Tools', 'Industrial Gearboxes', 'Automotive Transmissions', 'Textile Machinery'],
            features: ['High load capacity in small radial space', 'Separable inner ring executions', 'Precision ground race geometry'],
            series: ['NA 49', 'RNA 49', 'NA 69', 'RNA 69', 'NKI', 'TA', 'TLA'],
            image: '/assets/products/machined-needle-roller-bearing.png',
            pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf',
            pdfFileName: 'iko-needle-roller-cages-catalogue.pdf',
            pdfTitle: 'IKO Needle Roller & Cages Technical Catalogue'
          },
          {
            id: 'iko-needle-roller-cage-assemblies',
            name: 'Needle Roller & Cage Assemblies',
            code: 'K / KZK',
            categoryId: 'iko-needle-roller-bearings',
            categoryName: 'Needle Roller Bearings',
            subcategoryId: 'iko-machined-needle-bearings',
            subcategoryName: 'Machined Needle Bearings & Cages',
            short: 'Low-section rolling elements running directly on hardened raceways.',
            description: 'IKO needle roller and cage assemblies are lightweight, highly accurate assemblies designed where the shaft and housing bore act directly as the rolling surfaces.',
            motion: 'High-Speed Rotary',
            applications: ['Connecting Rods', 'High-Speed Spindles', 'Planetary Pinions', 'Compressors'],
            features: ['Minimal cross-section', 'Exact roller guidance in pressed steel or polyamide cages', 'Super-finished rollers'],
            series: ['K Series', 'KZK Series', 'KT Series', 'KBK Series'],
            image: '/assets/products/needle-roller-and-cage-assembly.png',
            pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf',
            pdfFileName: 'iko-needle-roller-cages-catalogue.pdf',
            pdfTitle: 'IKO Needle Roller & Cages Technical Catalogue'
          }
        ]
      },
      {
        id: 'iko-drawn-cup-thrust',
        name: 'Drawn Cup & Thrust Bearings',
        description: 'Thin-section drawn outer cup needles and compact axial needle thrust bearings.',
        products: [
          {
            id: 'iko-drawn-cup-needle-bearings',
            name: 'Drawn Cup Needle Roller Bearings',
            code: 'HK / BK',
            categoryId: 'iko-needle-roller-bearings',
            categoryName: 'Needle Roller Bearings',
            subcategoryId: 'iko-drawn-cup-thrust',
            subcategoryName: 'Drawn Cup & Thrust Bearings',
            short: 'Thin-walled precision pressed steel outer rings for compact press-fit designs.',
            description: 'Drawn cup needle roller bearings have an extremely thin outer ring pressed from high-carbon steel, providing high load carrying ability with space-saving integration.',
            motion: 'Compact Rotary',
            applications: ['Power Tools', 'Automotive Auxiliaries', 'Agricultural Machinery', 'Printing Presses'],
            features: ['Press-fit mounting without axial retaining rings', 'Open and closed end executions', 'Economical high-capacity solution'],
            series: ['HK Series', 'BK Series', 'HMK Series', 'TA Series'],
            image: '/assets/products/drawn-cup-needle-roller-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'iko-thrust-needle-roller-bearings',
            name: 'Thrust Needle Roller Bearings',
            code: 'AXK / AS',
            categoryId: 'iko-needle-roller-bearings',
            categoryName: 'Needle Roller Bearings',
            subcategoryId: 'iko-drawn-cup-thrust',
            subcategoryName: 'Drawn Cup & Thrust Bearings',
            short: 'Ultra-thin axial load bearings with high rigidity.',
            description: 'IKO thrust needle roller bearings support heavy one-direction axial loads in the minimum axial thickness, paired with thin hardened thrust washers.',
            motion: 'Axial Thrust',
            applications: ['Injection Molding Machines', 'Hydraulic Pumps', 'Transmission Planetary Sets', 'Crane Hooks'],
            features: ['Lowest axial section height', 'Uniform load distribution across needle elements', 'High dynamic thrust capacity'],
            series: ['AXK Series', 'AS Series', 'GS Series', 'WS Series'],
            image: '/assets/products/thrust-needle-roller-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  },
  {
    id: 'iko-cam-roller-followers',
    name: 'Cam & Roller Followers',
    code: '02',
    description: 'Track-running components with thick-walled outer rings designed for cam mechanisms, conveyors and guide systems.',
    subcategories: [
      {
        id: 'iko-stud-type-followers',
        name: 'Cam Followers (Stud Type)',
        description: 'Mounted track rollers with integrated threaded stud for direct cantilever mounting.',
        products: [
          {
            id: 'iko-stud-cam-followers',
            name: 'Stud Type Cam Followers',
            code: 'CF / KR',
            categoryId: 'iko-cam-roller-followers',
            categoryName: 'Cam & Roller Followers',
            subcategoryId: 'iko-stud-type-followers',
            subcategoryName: 'Cam Followers (Stud Type)',
            short: 'Integrated threaded stud track rollers for cantilever cam and linear travel.',
            description: 'IKO cam followers feature high rigidity and accuracy with a thick outer ring running directly on mating tracks or cam surfaces. Available with cage or full-complement rollers.',
            motion: 'Track Running',
            applications: ['Packaging Machinery', 'Indexing Drives', 'Automated Conveyors', 'Material Handling'],
            features: ['Integrated stud with hexagonal socket or screwdriver slot', 'Thick outer ring resists deformation', 'Rubber seal or metal shield options'],
            series: ['CF Series', 'CF-B Series', 'KR Series', 'KRV Series'],
            image: '/assets/products/track-roller-bearing-stud-yoke.png',
            pdfUrl: '/assets/iko-cam-and-roller-followers-catalogue.pdf',
            pdfFileName: 'iko-cam-and-roller-followers-catalogue.pdf',
            pdfTitle: 'IKO Cam & Roller Followers Technical Catalogue'
          },
          {
            id: 'iko-double-hex-cam-followers',
            name: 'Double Hex Cam Followers',
            code: 'CF-W / CFT',
            categoryId: 'iko-cam-roller-followers',
            categoryName: 'Cam & Roller Followers',
            subcategoryId: 'iko-stud-type-followers',
            subcategoryName: 'Cam Followers (Stud Type)',
            short: 'Hexagonal socket on both stud ends for versatile mounting and adjustment.',
            description: 'Double hex cam followers provide hexagonal socket access from either the stud head or the threaded end, allowing easier installation and maintenance in compact machinery.',
            motion: 'Dual-Access Track',
            applications: ['Compact Automation', 'Robotics End Effectors', 'Sheet Metal Feeders', 'Special Purpose Machines'],
            features: ['Hex socket on both ends', 'Easy tightening in tight spaces', 'Eccentric stud options available for alignment'],
            series: ['CF-W Series', 'CF-WB Series', 'CFT Series'],
            image: '/assets/products/track-roller-bearing-stud-yoke.png',
            pdfUrl: '/assets/iko-double-hex-cam-followers-catalogue.pdf',
            pdfFileName: 'iko-double-hex-cam-followers-catalogue.pdf',
            pdfTitle: 'IKO Double Hex Cam Followers Catalogue'
          }
        ]
      },
      {
        id: 'iko-yoke-type-followers',
        name: 'Roller Followers (Yoke Type)',
        description: 'Track roller assemblies mounted on clevis or support pins.',
        products: [
          {
            id: 'iko-yoke-roller-followers',
            name: 'Yoke Type Roller Followers',
            code: 'NAST / NART',
            categoryId: 'iko-cam-roller-followers',
            categoryName: 'Cam & Roller Followers',
            subcategoryId: 'iko-yoke-type-followers',
            subcategoryName: 'Roller Followers (Yoke Type)',
            short: 'Pin-supported track rollers for clevis and dual-support arrangements.',
            description: 'IKO roller followers are designed to be mounted on a pin, supporting heavier loads between clevis brackets or dual supports without stud deflection concerns.',
            motion: 'Yoke Track',
            applications: ['Heavy Conveyors', 'Transfer Lines', 'Mining Equipment', 'Foundry Automation'],
            features: ['Thick outer ring for heavy contact pressure', 'Crowned or cylindrical outer ring profiles', 'Full complement roller options'],
            series: ['NAST Series', 'NART Series', 'NURT Series', 'RNAST Series'],
            image: '/assets/products/track-roller-bearing.png',
            pdfUrl: '/assets/iko-cam-and-roller-followers-catalogue.pdf',
            pdfFileName: 'iko-cam-and-roller-followers-catalogue.pdf',
            pdfTitle: 'IKO Cam & Roller Followers Technical Catalogue'
          }
        ]
      }
    ]
  },
  {
    id: 'iko-spherical-plain-bearings',
    name: 'Spherical Plain Bearings',
    code: '03',
    description: 'Self-aligning sliding contact bearings accommodating multi-directional tilting, oscillation and heavy shock loads.',
    subcategories: [
      {
        id: 'iko-spherical-bushings-sub',
        name: 'Spherical Bushings & Articulation',
        description: 'Steel-on-steel and maintenance-free spherical plain bushings.',
        products: [
          {
            id: 'iko-radial-spherical-plain-bearings',
            name: 'Radial Spherical Plain Bearings',
            code: 'GE / SB',
            categoryId: 'iko-spherical-plain-bearings',
            categoryName: 'Spherical Plain Bearings',
            subcategoryId: 'iko-spherical-bushings-sub',
            subcategoryName: 'Spherical Bushings & Articulation',
            short: 'Articulating bearing surfaces for angular alignment and oscillating motion.',
            description: 'IKO spherical plain bearings have an inner ring with a sphered convex outside surface and outer ring with a concave inside surface, handling multi-axis alignment and shock loads.',
            motion: 'Oscillating Angular',
            applications: ['Hydraulic Cylinders', 'Heavy Vehicle Steering', 'Mining Machinery', 'Construction Linkages'],
            features: ['High shock and oscillating load tolerance', 'Phosphate treatment with MoS2 solid lubricant', 'Maintenance-free PTFE executions available'],
            series: ['GE Series', 'GEZ Series', 'SB Series', 'GE-E Series'],
            image: '/assets/products/radial-spherical-plain-bearing.png',
            pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf',
            pdfFileName: 'iko-spherical-bushings-catalogue.pdf',
            pdfTitle: 'IKO Spherical Bushings Technical Catalogue'
          },
          {
            id: 'iko-spherical-bushings-heavy',
            name: 'Maintenance-Free Spherical Bushings',
            code: 'GE-ES / GE-DO',
            categoryId: 'iko-spherical-plain-bearings',
            categoryName: 'Spherical Plain Bearings',
            subcategoryId: 'iko-spherical-bushings-sub',
            subcategoryName: 'Spherical Bushings & Articulation',
            short: 'PTFE composite lined bushings requiring no relubrication.',
            description: 'IKO maintenance-free spherical plain bushings incorporate a self-lubricating PTFE composite sliding layer, delivering smooth pivoting in inaccessible machine locations.',
            motion: 'Self-Lubricating Pivoting',
            applications: ['Food Processing Machinery', 'Solar Trackers', 'Aerospace Actuators', 'Offshore Winches'],
            features: ['Zero relubrication required', 'Low coefficient of friction', 'High resistance to atmospheric corrosion'],
            series: ['GE-ES Series', 'GE-DO Series', 'GE-G Series'],
            image: '/assets/products/radial-spherical-plain-bearing.png',
            pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf',
            pdfFileName: 'iko-spherical-bushings-catalogue.pdf',
            pdfTitle: 'IKO Spherical Bushings Technical Catalogue'
          }
        ]
      }
    ]
  },
  {
    id: 'iko-linear-motion-bearings',
    name: 'Linear Motion Bearings',
    code: '04',
    description: 'Precision linear ball bushings, supported shaft assemblies and flat roller guidance systems.',
    subcategories: [
      {
        id: 'iko-linear-bushings-sub',
        name: 'Linear Ball Bushings & Rails',
        description: 'Recirculating linear bushings and supported shaft assemblies.',
        products: [
          {
            id: 'iko-linear-bushings-precision',
            name: 'Linear Motion Bearings & Bushings',
            code: 'LM / LME',
            categoryId: 'iko-linear-motion-bearings',
            categoryName: 'Linear Motion Bearings',
            subcategoryId: 'iko-linear-bushings-sub',
            subcategoryName: 'Linear Ball Bushings & Rails',
            short: 'Smooth recirculating ball guidance on precision induction hardened shafts.',
            description: 'IKO linear motion bearings provide infinite linear travel with low friction and smooth movement, supported by high precision steel balls recirculating inside a rigid retainer.',
            motion: 'Linear Recirculating',
            applications: ['3D Printers', 'Pick & Place Robots', 'Medical Diagnostics', 'Optical Inspection Systems'],
            features: ['Low friction coefficient (0.002 to 0.003)', 'Closed, adjustable and open executions', 'Built-in synthetic rubber lip seals'],
            series: ['LM Series', 'LME Series', 'LMB Series', 'LMF Flanged'],
            image: '/assets/products/linear-motion-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'iko-supported-linear-shafts',
            name: 'Linear Motion Shafts with Support',
            code: 'SBR / TBR',
            categoryId: 'iko-linear-motion-bearings',
            categoryName: 'Linear Motion Bearings',
            subcategoryId: 'iko-linear-bushings-sub',
            subcategoryName: 'Linear Ball Bushings & Rails',
            short: 'Continuous aluminum rail support preventing shaft deflection under long spans.',
            description: 'Hardened linear shafts fully supported along their entire length by aluminum bases, preventing deflection under heavy loads and long travel spans.',
            motion: 'Rigid Linear Travel',
            applications: ['CNC Routers', 'Heavy Automation', 'Woodworking Machinery', 'Plasma Cutters'],
            features: ['Zero shaft sagging on long travels', 'Bolt-down aluminum rail base', 'Matched with open linear blocks'],
            series: ['SBR Series', 'TBR Series', 'SA Supported Unit'],
            image: '/assets/products/linear-motion-shaft-with-support.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'iko-flat-roller-cages',
            name: 'Flat Roller Cages',
            code: 'FF / BF',
            categoryId: 'iko-linear-motion-bearings',
            categoryName: 'Linear Motion Bearings',
            subcategoryId: 'iko-linear-bushings-sub',
            subcategoryName: 'Linear Ball Bushings & Rails',
            short: 'Ultra-rigid needle roller guidance for reciprocating machine ways.',
            description: 'IKO flat roller cages contain precision needle rollers in high-rigidity cages, offering the highest load capacity and rigidity for linear reciprocating table guidance.',
            motion: 'Reciprocating High-Rigidity',
            applications: ['Surface Grinders', 'EDM Machines', 'Optical Slide Tables', 'Press Dies'],
            features: ['Exceptional dynamic rigidity', 'Accurate linear alignment', 'Minimal stick-slip behavior'],
            series: ['FF Series', 'BF Series', 'FT Series'],
            image: '/assets/products/flat-roller-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  },
  {
    id: 'iko-rod-end-bearings',
    name: 'Rod End Bearings',
    code: '05',
    description: 'Compact articulating linkage joints and L-ball couplings engineered for mechanical linkages and steering systems.',
    subcategories: [
      {
        id: 'iko-rod-ends-sub',
        name: 'Articulating Linkage Rod Ends',
        description: 'Male and female threaded rod ends with integral spherical plain bearings.',
        products: [
          {
            id: 'iko-rod-ends-standard',
            name: 'Rod End Bearings & L-Balls',
            code: 'PHS / POS',
            categoryId: 'iko-rod-end-bearings',
            categoryName: 'Rod End Bearings',
            subcategoryId: 'iko-rod-ends-sub',
            subcategoryName: 'Articulating Linkage Rod Ends',
            short: 'Forged zinc or chrome-plated rod ends with female or male threads.',
            description: 'IKO rod end bearings feature a spherical plain bearing housed within a precision shank. Supplied with right or left-hand threads, in both metric and inch standards.',
            motion: 'Articulating Linkage',
            applications: ['Control Rods', 'Pneumatic Actuator Mounts', 'Automotive Suspensions', 'Packaging Linkages'],
            features: ['Male and female threaded shanks (PHS / POS)', 'Bronze or composite race liners', 'Grease nipple for easy relubrication'],
            series: ['PHS Series', 'POS Series', 'SI Series', 'SA Series'],
            image: '/rod-end.png',
            pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf',
            pdfFileName: 'iko-rod-ends-l-balls-catalogue.pdf',
            pdfTitle: 'IKO Rod Ends & L-Balls Technical Catalogue'
          },
          {
            id: 'iko-heavy-duty-rod-ends',
            name: 'Heavy Duty Rod Ends',
            code: 'GIR / GAR',
            categoryId: 'iko-rod-end-bearings',
            categoryName: 'Rod End Bearings',
            subcategoryId: 'iko-rod-ends-sub',
            subcategoryName: 'Articulating Linkage Rod Ends',
            short: 'High-tensile forged steel rod ends for heavy cyclic and shock loads.',
            description: 'Designed for demanding heavy machinery linkages, these rod ends combine high fatigue strength forgings with precision spherical bearing inserts.',
            motion: 'Heavy Dynamic Articulation',
            applications: ['Off-Highway Vehicles', 'Hydraulic Linkages', 'Marine Steering', 'Agricultural Implements'],
            features: ['High-tensile steel housing', 'Superior fatigue life', 'Corrosion-resistant coating'],
            series: ['GIR Series', 'GAR Series', 'M-Series Heavy Duty'],
            image: '/rod-end.png',
            pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf',
            pdfFileName: 'iko-rod-ends-l-balls-catalogue.pdf',
            pdfTitle: 'IKO Rod Ends & L-Balls Technical Catalogue'
          }
        ]
      }
    ]
  },
  {
    id: 'iko-cylindrical-roller-bearings',
    name: 'Cylindrical Roller Bearings',
    code: '06',
    description: 'High capacity line-contact cylindrical rollers engineered for heavy radial loads and high rotational speeds.',
    subcategories: [
      {
        id: 'iko-cylindrical-sub',
        name: 'Radial & Thrust Cylindrical Bearings',
        description: 'Single-row cylindrical roller bearings and high-capacity roller thrust bearings.',
        products: [
          {
            id: 'iko-cylindrical-roller-precision',
            name: 'Precision Cylindrical Roller Bearings',
            code: 'NU / NJ / N',
            categoryId: 'iko-cylindrical-roller-bearings',
            categoryName: 'Cylindrical Roller Bearings',
            subcategoryId: 'iko-cylindrical-sub',
            subcategoryName: 'Radial & Thrust Cylindrical Bearings',
            short: 'Maximum radial load capacity through precision logarithmic roller contact.',
            description: 'Cylindrical roller bearings have rollers in linear contact with the raceways, giving them exceptional radial load carrying capacity and stiffness at high speeds.',
            motion: 'High-Load Rotary',
            applications: ['Industrial Gearboxes', 'Electric Motors', 'Pumps & Compressors', 'Heavy Vibratory Screens'],
            features: ['High radial capacity', 'Modified line contact minimizes edge stress', 'Machined brass or pressed steel cages'],
            series: ['NU Series', 'NJ Series', 'N Series', 'NUP Series'],
            image: '/assets/products/cylindrical-roller-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'iko-cylindrical-roller-thrust',
            name: 'Cylindrical Roller Thrust Bearings',
            code: '811 / 812',
            categoryId: 'iko-cylindrical-roller-bearings',
            categoryName: 'Cylindrical Roller Bearings',
            subcategoryId: 'iko-cylindrical-sub',
            subcategoryName: 'Radial & Thrust Cylindrical Bearings',
            short: 'Heavy axial load support with high rigidity and shock resistance.',
            description: 'Designed for strictly axial load situations where ball thrust bearings lack sufficient capacity, these units feature cylindrical rollers in a high-strength cage between flat ground washers.',
            motion: 'Heavy Axial Thrust',
            applications: ['Extruders', 'Crane Swivels', 'Oil Well Drilling Heads', 'Vertical Shaft Supports'],
            features: ['Immense axial load capability', 'High axial rigidity', 'Compact height relative to load capacity'],
            series: ['811 Series', '812 Series', '893 Series'],
            image: '/assets/products/cylindrical-roller-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  }
];

export const WON_CATEGORIES_TREE: TreeCategory[] = [
  {
    id: 'won-linear-motion-guides',
    name: 'Linear Motion Guides & Ways',
    code: '01',
    description: 'Precision linear guideways and cross roller systems engineered by WON ST Korea for smooth, repeatable machine travel.',
    subcategories: [
      {
        id: 'won-lm-guides-sub',
        name: 'Profile Rail Guideways',
        description: 'High rigidity 4-row circular arc groove linear guideways.',
        products: [
          {
            id: 'won-st-linear-motion-guide',
            name: 'WON ST Linear Motion Guide',
            code: 'H / S Series',
            categoryId: 'won-linear-motion-guides',
            categoryName: 'Linear Motion Guides & Ways',
            subcategoryId: 'won-lm-guides-sub',
            subcategoryName: 'Profile Rail Guideways',
            short: 'Precision profile rail guideways engineered for smooth travel and high stiffness.',
            description: 'WON ST linear motion guides feature four-row circular arc groove geometry with equal load ratings in all four directions. Engineered for automated machinery requiring precise linear positioning.',
            motion: '4-Way Equal Load Linear',
            applications: ['CNC Machining Centers', 'Semiconductor Automation', 'Laser Cutting Machines', 'Industrial Robotics'],
            features: ['Equal load rating in all 4 directions', 'High self-aligning capability', 'Long service life with high rigidity'],
            series: ['H Series', 'S Series', 'MB Series Miniature', 'MC Series Miniature'],
            image: '/assets/products/linear-motion-bearing.png',
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'WON ST Linear Motion Guide Catalogue'
          },
          {
            id: 'won-cross-roller-guideways',
            name: 'Cross Roller Guideways',
            code: 'CRG / CRW',
            categoryId: 'won-linear-motion-guides',
            categoryName: 'Linear Motion Guides & Ways',
            subcategoryId: 'won-lm-guides-sub',
            subcategoryName: 'Profile Rail Guideways',
            short: 'Orthogonal crossed roller guidance offering maximum stiffness and micro-positioning accuracy.',
            description: 'WON cross roller guideways employ cylindrical rollers arranged perpendicularly in alternating 90-degree V-groove raceways, providing virtually zero deflection.',
            motion: 'Micro-Precision Linear',
            applications: ['Semiconductor Wire Bonders', 'Measuring Instruments', 'Optical Stages', 'Precision Grinders'],
            features: ['Highest linear stiffness per cross-section', 'Zero stick-slip for sub-micron movements', 'Preloaded play-free operation'],
            series: ['CRG Series', 'CRW Series', 'VR Roller Guides'],
            image: '/assets/products/dual-shaft-guide.png',
            pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf',
            pdfFileName: 'won-st-linear-motion-guide-catalogue.pdf',
            pdfTitle: 'WON ST Linear Motion Guide Catalogue'
          },
          {
            id: 'won-tr-guideways',
            name: 'TR Precision Guideways',
            code: 'TR / TRH',
            categoryId: 'won-linear-motion-guides',
            categoryName: 'Linear Motion Guides & Ways',
            subcategoryId: 'won-lm-guides-sub',
            subcategoryName: 'Profile Rail Guideways',
            short: 'Compact guidance rails for light-to-medium precision automation axes.',
            description: 'TR guideways deliver dependable guided motion in compact machinery envelopes, providing smooth operation for electronics assembly and laboratory automation.',
            motion: 'Compact Guided Motion',
            applications: ['Electronic Pick & Place', 'Laboratory Automation', 'Medical Inspection', 'Sorting Machines'],
            features: ['Compact cross-section', 'Smooth low-noise operation', 'Standardized interchangeability'],
            series: ['TR Series', 'TRH Series', 'TRU Series'],
            image: '/assets/products/linear-motion-shaft-with-support.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  },
  {
    id: 'won-linear-ball-bushings',
    name: 'Linear Ball Bushings & Units',
    code: '02',
    description: 'Self-aligning super ball bushes, standard linear bushings and housed bearing blocks.',
    subcategories: [
      {
        id: 'won-ball-bushings-sub',
        name: 'Recirculating Bushing Units',
        description: 'Super ball bushes with self-aligning bearing plates and standard housings.',
        products: [
          {
            id: 'won-super-ball-bush',
            name: 'Super Ball Bush',
            code: 'SBB / SBBE',
            categoryId: 'won-linear-ball-bushings',
            categoryName: 'Linear Ball Bushings & Units',
            subcategoryId: 'won-ball-bushings-sub',
            subcategoryName: 'Recirculating Bushing Units',
            short: 'Self-aligning bearing plates giving 3x the load capacity of standard bushings.',
            description: 'WON Super Ball Bush uses flexible outer bearing plates that self-align to compensate for minor shaft deflection or housing misalignment, multiplying travel life up to 27 times.',
            motion: 'Self-Aligning Linear',
            applications: ['Packaging Machinery', 'Textile Equipment', 'Assembly Automation', 'Inspection Stations'],
            features: ['Self-aligning plates absorb up to 0.5° angular error', '3x load capacity of conventional bushes', 'Reduced friction coefficient'],
            series: ['SBB Standard', 'SBBE European', 'SBB-OP Open Type'],
            image: '/assets/products/linear-motion-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'won-linear-ball-bushings-std',
            name: 'Linear Ball Bushings',
            code: 'LM / LME / LMF',
            categoryId: 'won-linear-ball-bushings',
            categoryName: 'Linear Ball Bushings & Units',
            subcategoryId: 'won-ball-bushings-sub',
            subcategoryName: 'Recirculating Bushing Units',
            short: 'Precision ground outer cylinders with smooth recirculating ball circuits.',
            description: 'Standard cylindrical and flanged linear ball bushings engineered for precise guided motion along hardened round shafts.',
            motion: 'Cylindrical Linear',
            applications: ['Automated Gantry Systems', 'Printing Equipment', 'Medical Dispensers', 'Testing Rigs'],
            features: ['High precision outer sleeve', 'Flanged options: round (LMF), square (LMK), cut (LMH)', 'Double seal options for dust protection'],
            series: ['LM Series', 'LME Series', 'LMF Flanged', 'LMK Square Flanged'],
            image: '/assets/products/linear-motion-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'won-housed-ball-bushings',
            name: 'Housing Type Ball Bushings',
            code: 'SC / SCE / TBR-UU',
            categoryId: 'won-linear-ball-bushings',
            categoryName: 'Linear Ball Bushings & Units',
            subcategoryId: 'won-ball-bushings-sub',
            subcategoryName: 'Recirculating Bushing Units',
            short: 'Ready-to-mount aluminum pillow blocks housing linear ball bushings.',
            description: 'Pre-assembled anodized aluminum blocks housing linear bushings, allowing immediate bolting to machine tables without precision bore machining.',
            motion: 'Housed Linear Travel',
            applications: ['Slide Tables', 'Positioning Stages', 'Conveyor Diverters', 'Labeling Machines'],
            features: ['Direct top or bottom mounting bolt holes', 'Lightweight rigid aluminum housing', 'Open and closed block designs'],
            series: ['SC Series', 'SCE Series', 'SBR-UU', 'TBR-UU'],
            image: '/assets/products/dual-shaft-guide.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  },
  {
    id: 'won-shafts-slide-units',
    name: 'Linear Shafts & Slide Units',
    code: '03',
    description: 'Precision hard-chrome shafts, slide units, compact ball splines and dual shaft assemblies.',
    subcategories: [
      {
        id: 'won-shafts-splines-sub',
        name: 'Precision Shafts & Slide Units',
        description: 'Hard chrome plated linear shafts, slide units and ball splines.',
        products: [
          {
            id: 'won-linear-motion-shafts',
            name: 'Precision Linear Motion Shafts',
            code: 'SF / SU / WCS',
            categoryId: 'won-shafts-slide-units',
            categoryName: 'Linear Shafts & Slide Units',
            subcategoryId: 'won-shafts-splines-sub',
            subcategoryName: 'Precision Shafts & Slide Units',
            short: 'Induction hardened and hard-chrome plated shafts for maximum wear life.',
            description: 'WON ST linear motion shafts are manufactured from high-grade alloy steel, induction hardened to 60-64 HRC, centerless ground and hard chrome plated for minimal friction and maximum longevity.',
            motion: 'Precision Shaft Guide',
            applications: ['Guide Pillars', 'Pneumatic Actuator Guides', 'Machine Tool Spindles', 'Automation Slides'],
            features: ['Hardness 60-64 HRC', 'Surface finish Ra 0.2µm or better', 'Tolerance g6 / h6 precision'],
            series: ['SF Solid Shaft', 'SU Stainless Shaft', 'WCS Hard Chrome', 'Custom Machined'],
            image: '/assets/products/linear-motion-shaft.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'won-slide-units-dual',
            name: 'Slide Units & Dual Shaft Guides',
            code: 'SUE / DSG',
            categoryId: 'won-shafts-slide-units',
            categoryName: 'Linear Shafts & Slide Units',
            subcategoryId: 'won-shafts-splines-sub',
            subcategoryName: 'Precision Shafts & Slide Units',
            short: 'Integrated dual shaft guides for low-profile, smooth linear carriage motion.',
            description: 'Pre-assembled dual shaft guide systems with aluminum rails and steel shafts embedded, paired with adjustable roller or ball slide carriages.',
            motion: 'Dual-Shaft Guided Travel',
            applications: ['Packaging Machines', 'Vending Mechanisms', 'Camera Sliders', 'Pick & Place Axes'],
            features: ['Low profile cross-section', 'Smooth quiet motion', 'Adjustable preload to eliminate play'],
            series: ['SUE Series', 'SU Series', 'DSG Dual Shaft Guides'],
            image: '/assets/products/dual-shaft-guide.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'won-compact-ball-splines',
            name: 'Compact Ball Splines',
            code: 'SSP / SSPE',
            categoryId: 'won-shafts-slide-units',
            categoryName: 'Linear Shafts & Slide Units',
            subcategoryId: 'won-shafts-splines-sub',
            subcategoryName: 'Precision Shafts & Slide Units',
            short: 'Simultaneous linear motion and torque transmission on a single spline shaft.',
            description: 'WON ball splines transmit torque while allowing friction-free linear sliding motion along gothic arch grooved spline shafts, ideal for SCARA robots and multi-axis machines.',
            motion: 'Combined Linear & Torque',
            applications: ['SCARA Robot Arms', 'Automatic Tool Changers', 'Z-Axis Vertical Drives', 'Winding Machines'],
            features: ['Zero angular backlash', 'Smooth linear travel while transmitting high torque', 'Compact cylindrical nut profile'],
            series: ['SSP Series', 'SSPE Series', 'SSPF Flanged'],
            image: '/assets/products/linear-motion-shaft.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  }
];

export const STIEBER_CATEGORIES_TREE: TreeCategory[] = [
  {
    id: 'stieber-overrunning-clutches',
    name: 'Overrunning Clutches',
    code: '01',
    description: 'Precision German engineered freewheels for one-way drive engagement, overrunning disengagement and backstopping.',
    subcategories: [
      {
        id: 'stieber-overrunning-sub',
        name: 'Standard & Keyway Freewheels',
        description: 'ASNU and AS series sprag and roller freewheel clutches.',
        products: [
          {
            id: 'stieber-asnu-series',
            name: 'ASNU Series Freewheels',
            code: 'ASNU 8 to 200',
            categoryId: 'stieber-overrunning-clutches',
            categoryName: 'Overrunning Clutches',
            subcategoryId: 'stieber-overrunning-sub',
            subcategoryName: 'Standard & Keyway Freewheels',
            short: 'Roller type freewheel with keyway on inner race and snap-ring outer race.',
            description: 'STIEBER ASNU is a roller type freewheel non-bearing supported. Bearing support must be provided for radial and axial loads. The outer race has a positive n6 tolerance to give a press fit in a housing to H7.',
            motion: 'One-Way Torque Transmission',
            applications: ['Conveyors', 'Gearboxes', 'Dual Motor Drives', 'Packaging Equipment'],
            features: ['Keyway on inner race', 'Snap-ring groove on outer race for easy location', 'High overrunning speed capability'],
            series: ['ASNU 8', 'ASNU 12', 'ASNU 20', 'ASNU 40', 'ASNU 60 to 200'],
            image: '/assets/products/one-way-clutch-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'stieber-as-series',
            name: 'AS Series Freewheels',
            code: 'AS 6 to 120',
            categoryId: 'stieber-overrunning-clutches',
            categoryName: 'Overrunning Clutches',
            subcategoryId: 'stieber-overrunning-sub',
            subcategoryName: 'Standard & Keyway Freewheels',
            short: 'Cylindrical press-fit roller type freewheel for compact machine integration.',
            description: 'STIEBER AS is a roller type freewheel without internal bearings. The outer race and inner race are press-fitted into customer housing and shaft respectively.',
            motion: 'Compact One-Way Drive',
            applications: ['Agricultural Machinery', 'Fitness Equipment', 'Textile Machines', 'Indexing Drives'],
            features: ['Press-fit mounting on inner and outer races', 'Compact outer diameter', 'Zero backlash engagement'],
            series: ['AS 6', 'AS 8', 'AS 12', 'AS 20', 'AS 40 to 120'],
            image: '/assets/products/drawn-cup-needle-roller-clutch.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  },
  {
    id: 'stieber-integrated-clutches',
    name: 'Integrated & Compact Clutches',
    code: '02',
    description: 'Ball bearing supported freewheels with dimensions matching the standard 6200 deep groove ball bearing series.',
    subcategories: [
      {
        id: 'stieber-csk-sub',
        name: 'CSK Ball Bearing Freewheels',
        description: 'CSK, CSK P and CSK PP series integrated sprag clutches.',
        products: [
          {
            id: 'stieber-csk-standard',
            name: 'CSK Series One-Way Clutch Bearings',
            code: 'CSK 8 to 40',
            categoryId: 'stieber-integrated-clutches',
            categoryName: 'Integrated & Compact Clutches',
            subcategoryId: 'stieber-csk-sub',
            subcategoryName: 'CSK Ball Bearing Freewheels',
            short: 'Sprag freewheel integrated into standard 6200 series ball bearing dimensions.',
            description: 'STIEBER CSK is a sprag type freewheel integrated into a 6200 series ball bearing format. Bearing supported, delivered grease lubricated and protected against dust exceeding 0.3mm.',
            motion: 'Combined Bearing & One-Way Drive',
            applications: ['Washing Machines', 'Lawn Mowers', 'Printers & Copiers', 'Conveyor Rollers'],
            features: ['Matches 6200 bearing outer and inner dimensions', 'Built-in ball bearing supports radial loads', 'High torque transmission through sprag profiles'],
            series: ['CSK 8', 'CSK 12', 'CSK 15', 'CSK 20', 'CSK 25', 'CSK 30', 'CSK 35', 'CSK 40'],
            image: '/assets/products/one-way-clutch-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'stieber-csk-p',
            name: 'CSK P Series Freewheels',
            code: 'CSK 15-P to 40-P',
            categoryId: 'stieber-integrated-clutches',
            categoryName: 'Integrated & Compact Clutches',
            subcategoryId: 'stieber-csk-sub',
            subcategoryName: 'CSK Ball Bearing Freewheels',
            short: 'CSK freewheel featuring keyway on the inner race.',
            description: 'CSK..P has the same construction and outside dimensions as type CSK, but has a keyway on the inner race to secure positive shaft drive without relying solely on press-fit tolerance.',
            motion: 'Keyed Shaft One-Way Drive',
            applications: ['Gearbox Inputs', 'Pumps', 'Fan Drives', 'Industrial Blowers'],
            features: ['DIN 6885.1 keyway on inner race', 'Press-fit outer ring into housing to N6', 'Pre-greased maintenance-free execution'],
            series: ['CSK 15 P', 'CSK 20 P', 'CSK 25 P', 'CSK 30 P', 'CSK 35 P', 'CSK 40 P'],
            image: '/assets/products/drawn-cup-needle-roller-clutch.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'stieber-csk-pp',
            name: 'CSK PP Series Freewheels',
            code: 'CSK 15-PP to 40-PP',
            categoryId: 'stieber-integrated-clutches',
            categoryName: 'Integrated & Compact Clutches',
            subcategoryId: 'stieber-csk-sub',
            subcategoryName: 'CSK Ball Bearing Freewheels',
            short: 'Keyways on both inner and outer races for positive mechanical torque transmission.',
            description: 'CSK..PP features keyways on both the inner and outer race, eliminating any requirement for press-fit interference in the housing or on the shaft.',
            motion: 'Dual-Keyed One-Way Drive',
            applications: ['Agricultural Drives', 'Food Mixers', 'Conveyor Backstops', 'Textile Drives'],
            features: ['Keyway on both inner and outer ring', 'Housing tolerance K6 permissible', 'Reliable positive torque transmission'],
            series: ['CSK 15 PP', 'CSK 20 PP', 'CSK 25 PP', 'CSK 30 PP', 'CSK 35 PP', 'CSK 40 PP'],
            image: '/assets/products/one-way-clutch-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  },
  {
    id: 'stieber-industrial-backstops',
    name: 'Industrial Freewheels & Backstops',
    code: '03',
    description: 'High-torque sprag cage elements and heavy duty backstops preventing reverse rotation in critical industrial equipment.',
    subcategories: [
      {
        id: 'stieber-backstops-sub',
        name: 'Heavy Duty Backstops & Sprag Elements',
        description: 'DC series sprag cages and GFR/RSBW heavy backstop assemblies.',
        products: [
          {
            id: 'stieber-dc-series',
            name: 'DC Series Sprag Cages',
            code: 'DC 22 to 240',
            categoryId: 'stieber-industrial-backstops',
            categoryName: 'Industrial Freewheels & Backstops',
            subcategoryId: 'stieber-backstops-sub',
            subcategoryName: 'Heavy Duty Backstops & Sprag Elements',
            short: 'Sprag cage element without inner or outer rings for custom machine integration.',
            description: 'STIEBER DC is a sprag type freewheel cage without inner or outer races. It must be installed in a design providing races, bearing support for axial and radial loads, and lubrication.',
            motion: 'Integrated Sprag Transmission',
            applications: ['Helicopter Drives', 'Automotive Automatic Transmissions', 'High-Speed Starters', 'Special Reducers'],
            features: ['Ultra-compact design utilizing customer parts as races', 'Highest torque capacity per unit space', 'Precision sprag contour geometry'],
            series: ['DC 22', 'DC 38', 'DC 49', 'DC 72', 'DC 100 to 240'],
            image: '/assets/products/permaglide-dry-bush.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'stieber-gfr-rsbw-backstops',
            name: 'GFR & RSBW Heavy Duty Backstops',
            code: 'GFR / RSBW',
            categoryId: 'stieber-industrial-backstops',
            categoryName: 'Industrial Freewheels & Backstops',
            subcategoryId: 'stieber-backstops-sub',
            subcategoryName: 'Heavy Duty Backstops & Sprag Elements',
            short: 'High-torque backstop clutches preventing reverse rotation on inclined conveyors and bucket elevators.',
            description: 'STIEBER GFR and RSBW are roller type freewheels, bearing supported using two 160.. series bearings. Enclosed units engineered to prevent reverse runaway of heavy inclined conveyors and bucket elevators.',
            motion: 'Heavy Safety Backstopping',
            applications: ['Inclined Belt Conveyors', 'Bucket Elevators', 'Mining Conveyors', 'Pumping Stations'],
            features: ['Instantaneous automatic reverse locking', 'Massive torque capabilities up to 50,000 Nm', 'Oil lubricated sealed housings'],
            series: ['GFR 12 to 150', 'GFR..F1F2', 'RSBW 20 to 90'],
            image: '/assets/products/one-way-clutch-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  }
];


export const TPI_CATEGORIES_TREE: TreeCategory[] = [
  {
    id: 'tpi-deep-groove-ball-bearings',
    name: 'Deep Groove Ball Bearings',
    code: '01',
    description: 'High-speed, low-vibration precision deep groove ball bearings engineered in Taiwan.',
    subcategories: [
      {
        id: 'tpi-single-row-deep-groove',
        name: 'Single Row Deep Groove Series',
        description: 'Standard and EMQ electric motor quality deep groove ball bearings.',
        products: [
          {
            id: 'tpi-open-deep-groove-ball-bearings',
            name: 'Open Deep Groove Ball Bearings',
            code: '6000 / 6200 / 6300',
            categoryId: 'tpi-deep-groove-ball-bearings',
            categoryName: 'Deep Groove Ball Bearings',
            subcategoryId: 'tpi-single-row-deep-groove',
            subcategoryName: 'Single Row Deep Groove Series',
            short: 'Precision high-speed ball bearings for low-torque, clean lubrication systems.',
            description: 'TPI open deep groove ball bearings feature super-finished raceways, premium steel purity, and optimized internal clearance for demanding electric motor and machine spindle duties.',
            motion: 'High-Speed Rotary',
            applications: ['Electric Motors', 'Machine Spindles', 'Automotive Alternators', 'Pumps'],
            features: ['Super-finished raceways for whisper-quiet running', 'Vacuum-degassed high-carbon chromium steel', 'Tight dimensional and radial runout tolerances'],
            series: ['6000 Series', '6200 Series', '6300 Series', '6800 Series', '6900 Series'],
            image: '/assets/products/deep-groove-ball-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'tpi-sealed-shielded-bearings',
            name: 'Sealed & Shielded Ball Bearings',
            code: '2RS / ZZ',
            categoryId: 'tpi-deep-groove-ball-bearings',
            categoryName: 'Deep Groove Ball Bearings',
            subcategoryId: 'tpi-single-row-deep-groove',
            subcategoryName: 'Single Row Deep Groove Series',
            short: 'Pre-lubricated maintenance-free bearings with synthetic contact or non-contact seals.',
            description: 'TPI 2RS (contact rubber seal) and ZZ (steel shield) bearings are pre-filled with high-grade synthetic grease, preventing contamination and delivering maintenance-free performance.',
            motion: 'Rotary Enclosed',
            applications: ['Two-Wheelers & Motorcycles', 'Home Appliances', 'Agricultural Drives', 'Conveyor Rollers'],
            features: ['Factory-lubricated with high-stability grease', 'Synthetic rubber seals resist moisture and dust', 'Extended fatigue life under adverse conditions'],
            series: ['6000-2RS', '6200-2RS', '6300-2RS', '6000-ZZ', '6200-ZZ', '6300-ZZ'],
            image: '/assets/products/deep-groove-ball-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  },
  {
    id: 'tpi-miniature-specialty-bearings',
    name: 'Miniature & Electric Motor Bearings',
    code: '02',
    description: 'Miniature precision bearings and EMQ low-vibration assemblies for electric motors and precision tools.',
    subcategories: [
      {
        id: 'tpi-miniature-series',
        name: 'Miniature Precision Bearings',
        description: 'Compact small-bore ball bearings for precision instruments and robotics.',
        products: [
          {
            id: 'tpi-miniature-ball-bearings',
            name: 'Miniature Instrument Bearings',
            code: '608 / 624 / 625 / 626',
            categoryId: 'tpi-miniature-specialty-bearings',
            categoryName: 'Miniature & Electric Motor Bearings',
            subcategoryId: 'tpi-miniature-series',
            subcategoryName: 'Miniature Precision Bearings',
            short: 'Precision miniature bearings for small motors, power tools, and robotic actuators.',
            description: 'TPI miniature bearings deliver smooth, low-torque rotation in space-constrained assemblies. Designed with ABEC-3 / ABEC-5 precision grades for high reliability.',
            motion: 'Micro Rotary',
            applications: ['Power Tools', 'Medical Handpieces', 'Drone Gimbal Drives', 'Micro Motors'],
            features: ['Bore sizes from 3mm to 9mm', 'Extreme rotational smoothness', 'Low starting and running torque'],
            series: ['608 Series', '624 Series', '625 Series', '626 Series', '688 Series'],
            image: '/assets/products/deep-groove-ball-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'tpi-emq-motor-bearings',
            name: 'EMQ Electric Motor Bearings',
            code: 'EMQ / V2 / V3',
            categoryId: 'tpi-miniature-specialty-bearings',
            categoryName: 'Miniature & Electric Motor Bearings',
            subcategoryId: 'tpi-miniature-series',
            subcategoryName: 'Miniature Precision Bearings',
            short: 'Individually 100% vibration and noise tested electric motor quality bearings.',
            description: 'TPI EMQ grade bearings are manufactured to rigorous noise and vibration thresholds (Anderon / V2 / V3 standards), ensuring silent and smooth motor performance.',
            motion: 'Low-Vibration Rotary',
            applications: ['HVAC Blower Motors', 'Industrial Fan Drives', 'Submersible Pumps', 'Servo Motors'],
            features: ['100% automated vibration and noise spectrum tested', 'Premium polyurea grease for long thermal life', 'Optimized curvature and sphericity'],
            series: ['6200-EMQ', '6201-EMQ', '6202-EMQ', '6204-EMQ', '6205-EMQ', '6305-EMQ'],
            image: '/assets/products/deep-groove-ball-bearing.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  }
];

export const HIWIN_CATEGORIES_TREE: TreeCategory[] = [
  {
    id: 'hiwin-linear-guideways',
    name: 'Linear Guideways & Blocks',
    code: '01',
    description: 'Precision linear motion guideways featuring four-row circular-arc groove geometry for heavy industrial loads.',
    subcategories: [
      {
        id: 'hiwin-hg-series-sub',
        name: 'HG Heavy Load Guideway Series',
        description: 'High rigidity and high load capacity linear guideways for CNC machinery and automation.',
        products: [
          {
            id: 'hiwin-hgh-square-blocks',
            name: 'HGH High-Load Square Blocks & Rails',
            code: 'HGH / HGR',
            categoryId: 'hiwin-linear-guideways',
            categoryName: 'Linear Guideways & Blocks',
            subcategoryId: 'hiwin-hg-series-sub',
            subcategoryName: 'HG Heavy Load Guideway Series',
            short: 'High-rigidity square-type linear guide blocks for high-load top mounting.',
            description: 'HIWIN HGH series linear guideways have four-row recirculating balls in circular arc contact, providing equal load capacity in radial, reverse-radial and lateral directions.',
            motion: 'Precision Linear',
            applications: ['CNC Machining Centers', 'Lathes & Grinders', 'Heavy Duty Automation', 'Laser Cutting'],
            features: ['Equal four-directional load ratings', 'Self-aligning capability absorbs mounting errors', 'Interchangeable block and rail system'],
            series: ['HGH 15', 'HGH 20', 'HGH 25', 'HGH 30', 'HGH 35', 'HGH 45'],
            image: '/assets/products/dual-shaft-guide.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'hiwin-hgw-flange-blocks',
            name: 'HGW Flange Type Linear Blocks',
            code: 'HGW / HGR',
            categoryId: 'hiwin-linear-guideways',
            categoryName: 'Linear Guideways & Blocks',
            subcategoryId: 'hiwin-hg-series-sub',
            subcategoryName: 'HG Heavy Load Guideway Series',
            short: 'Wide flanged linear carriage blocks for top or bottom bolt mounting.',
            description: 'HIWIN HGW series blocks feature a wide mounting flange with drilled through-holes and tapped threads, allowing secure installation from either top or bottom machine surfaces.',
            motion: 'Precision Linear',
            applications: ['Gantry Systems', 'Printing Machinery', 'Packaging Equipment', 'Injection Molding Robots'],
            features: ['Flange mounting flexibility', 'High rigidity under moment loads', 'Complete dust-proof end seal and scraper protection'],
            series: ['HGW 15', 'HGW 20', 'HGW 25', 'HGW 30', 'HGW 35', 'HGW 45'],
            image: '/assets/products/dual-shaft-guide.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      },
      {
        id: 'hiwin-eg-mg-series-sub',
        name: 'EG Low Profile & MG Miniature Guides',
        description: 'Compact height and miniature linear guideways for electronics, semiconductor and medical automation.',
        products: [
          {
            id: 'hiwin-eg-compact-guides',
            name: 'EG Low Profile Linear Guideways',
            code: 'EGH / EGW',
            categoryId: 'hiwin-linear-guideways',
            categoryName: 'Linear Guideways & Blocks',
            subcategoryId: 'hiwin-eg-mg-series-sub',
            subcategoryName: 'EG Low Profile & MG Miniature Guides',
            short: 'Compact assembly height for space-constrained automated machinery.',
            description: 'HIWIN EG series features a low assembly height and short block length, making it ideal for high-speed automated equipment where space is at a premium.',
            motion: 'Compact High-Speed Linear',
            applications: ['Semiconductor Equipment', 'SMT Placement', 'PCB Drilling', 'Medical Devices'],
            features: ['Lower center of gravity for dynamic stability', 'Low assembly height', 'High moment load capacity'],
            series: ['EGH 15', 'EGH 20', 'EGH 25', 'EGW 15', 'EGW 20', 'EGW 25'],
            image: '/assets/products/dual-shaft-guide.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          },
          {
            id: 'hiwin-mgn-miniature-guides',
            name: 'MGN / MGW Miniature Linear Guides',
            code: 'MGN / MGW',
            categoryId: 'hiwin-linear-guideways',
            categoryName: 'Linear Guideways & Blocks',
            subcategoryId: 'hiwin-eg-mg-series-sub',
            subcategoryName: 'EG Low Profile & MG Miniature Guides',
            short: 'Ultra-compact linear motion rails with Gothic-arch ball contact.',
            description: 'HIWIN MG miniature series uses stainless steel or alloy steel with Gothic-arch contact design, providing high rigidity and accuracy in miniature medical, 3D printing and lab automation.',
            motion: 'Miniature Linear',
            applications: ['3D Printers', 'Lab Automation', 'Optical Inspection', 'Semiconductor Handling'],
            features: ['Compact and lightweight design', 'Stainless steel anti-corrosion executions', 'Ball retainer design prevents ball drop'],
            series: ['MGN 7', 'MGN 9', 'MGN 12', 'MGN 15', 'MGW 9', 'MGW 12', 'MGW 15'],
            image: '/assets/products/dual-shaft-guide.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  },
  {
    id: 'hiwin-ballscrews',
    name: 'Precision Ballscrews',
    code: '02',
    description: 'Precision ground and high-efficiency rolled ballscrew assemblies for accurate positioning and power transfer.',
    subcategories: [
      {
        id: 'hiwin-ballscrew-sub',
        name: 'Ground & Rolled Ballscrew Assemblies',
        description: 'Precision linear drive ballscrews for CNC machine tools and automation.',
        products: [
          {
            id: 'hiwin-precision-ballscrews',
            name: 'Ground & Rolled Precision Ballscrews',
            code: 'FSI / FSC / R Series',
            categoryId: 'hiwin-ballscrews',
            categoryName: 'Precision Ballscrews',
            subcategoryId: 'hiwin-ballscrew-sub',
            subcategoryName: 'Ground & Rolled Ballscrew Assemblies',
            short: 'High-lead, low-friction ballscrew assemblies delivering positioning accuracy.',
            description: 'HIWIN precision ballscrews convert rotary to linear motion with over 90% mechanical efficiency. Available with ground threads for C1-C5 precision or precision-rolled for economic automation.',
            motion: 'Helical Linear Conversion',
            applications: ['CNC Mill Feed Drives', 'Injection Molding Clamping', 'Linear Actuators', 'Pick & Place Robots'],
            features: ['High mechanical efficiency over 90%', 'Zero backlash with controlled preloading', 'High axial rigidity and smooth travel'],
            series: ['FSI Series', 'FSC Series', 'R16-05', 'R20-05', 'R25-05', 'R32-10'],
            image: '/assets/products/linear-motion-shaft.png',
            pdfUrl: null,
            pdfFileName: null,
            pdfTitle: null
          }
        ]
      }
    ]
  }
];

export const BRAND_PRODUCT_TREES: Record<string, TreeCategory[]> = {
  iko: IKO_CATEGORIES_TREE,
  won: WON_CATEGORIES_TREE,
  stieber: STIEBER_CATEGORIES_TREE,
  tpi: TPI_CATEGORIES_TREE,
  hiwin: HIWIN_CATEGORIES_TREE
};

export function getBrandProductTree(brandSlug: string): TreeCategory[] {
  return BRAND_PRODUCT_TREES[brandSlug] ?? [];
}

export function getAllBrandProducts(brandSlug: string): TreeProduct[] {
  const tree = getBrandProductTree(brandSlug);
  return tree.flatMap((cat) => cat.subcategories.flatMap((sub) => sub.products));
}
