export interface BearingRecord {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  series: string;
  innerDiameter: number; // d (mm)
  outerDiameter: number; // D (mm)
  width: number;         // B / T / H (mm)
  dynamicLoadRating: number; // Cr (kN)
  staticLoadRating: number;  // C0r (kN)
  slug: string;
  pdfUrl?: string;
  pdfFileName?: string;
}

export interface DimensionRange {
  min: string;
  max: string;
}

export interface BearingFilters {
  query: string;
  innerDiameter: DimensionRange;
  outerDiameter: DimensionRange;
  width: DimensionRange;
  category?: string;
}

export const BEARING_CATEGORIES = [
  'All Categories',
  'Deep Groove Ball Bearings',
  'Cylindrical Roller Bearings',
  'Taper Roller Bearings',
  'Spherical Roller Bearings',
  'Angular Contact Bearings',
  'Self-Aligning Ball Bearings',
  'Thrust Ball Bearings',
  'Needle Roller Bearings',
  'Rod Ends & Spherical Plain',
  'Pillow Block Units',
  'Linear Motion Bushings'
] as const;

export const bearingRecords: BearingRecord[] = [
  // -------------------------------------------------------------
  // DEEP GROOVE BALL BEARINGS (6000, 6200, 6300 Series)
  // -------------------------------------------------------------
  { id: '6000-2RS', partNumber: '6000-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6000 Series', innerDiameter: 10, outerDiameter: 26, width: 8, dynamicLoadRating: 4.58, staticLoadRating: 1.97, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6001-2RS', partNumber: '6001-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6000 Series', innerDiameter: 12, outerDiameter: 28, width: 8, dynamicLoadRating: 5.1, staticLoadRating: 2.37, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6002-2RS', partNumber: '6002-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6000 Series', innerDiameter: 15, outerDiameter: 32, width: 9, dynamicLoadRating: 5.6, staticLoadRating: 2.84, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6003-2RS', partNumber: '6003-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6000 Series', innerDiameter: 17, outerDiameter: 35, width: 10, dynamicLoadRating: 6.0, staticLoadRating: 3.25, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6004-2RS', partNumber: '6004-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6000 Series', innerDiameter: 20, outerDiameter: 42, width: 12, dynamicLoadRating: 9.38, staticLoadRating: 5.0, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6005-2RS', partNumber: '6005-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6000 Series', innerDiameter: 25, outerDiameter: 47, width: 12, dynamicLoadRating: 10.1, staticLoadRating: 5.85, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6006-2RS', partNumber: '6006-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6000 Series', innerDiameter: 30, outerDiameter: 55, width: 13, dynamicLoadRating: 13.2, staticLoadRating: 8.3, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6008-2RS', partNumber: '6008-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6000 Series', innerDiameter: 40, outerDiameter: 68, width: 15, dynamicLoadRating: 16.8, staticLoadRating: 11.5, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },

  { id: '6200-2RS', partNumber: '6200-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6200 Series', innerDiameter: 10, outerDiameter: 30, width: 9, dynamicLoadRating: 5.1, staticLoadRating: 2.39, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6201-2RS', partNumber: '6201-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6200 Series', innerDiameter: 12, outerDiameter: 32, width: 10, dynamicLoadRating: 6.8, staticLoadRating: 3.05, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6202-2RS', partNumber: '6202-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6200 Series', innerDiameter: 15, outerDiameter: 35, width: 11, dynamicLoadRating: 7.8, staticLoadRating: 3.75, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6203-2RS', partNumber: '6203-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6200 Series', innerDiameter: 17, outerDiameter: 40, width: 12, dynamicLoadRating: 9.58, staticLoadRating: 4.78, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6204-2RS', partNumber: '6204-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6200 Series', innerDiameter: 20, outerDiameter: 47, width: 14, dynamicLoadRating: 12.8, staticLoadRating: 6.65, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6205-2RS', partNumber: '6205-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6200 Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 14.0, staticLoadRating: 7.88, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6206-2RS', partNumber: '6206-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6200 Series', innerDiameter: 30, outerDiameter: 62, width: 16, dynamicLoadRating: 19.5, staticLoadRating: 11.3, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6207-2RS', partNumber: '6207-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6200 Series', innerDiameter: 35, outerDiameter: 72, width: 17, dynamicLoadRating: 25.7, staticLoadRating: 15.3, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6208-2RS', partNumber: '6208-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6200 Series', innerDiameter: 40, outerDiameter: 80, width: 18, dynamicLoadRating: 29.1, staticLoadRating: 17.8, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6210-2RS', partNumber: '6210-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6200 Series', innerDiameter: 50, outerDiameter: 90, width: 20, dynamicLoadRating: 35.1, staticLoadRating: 23.2, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },

  { id: '6302-2RS', partNumber: '6302-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6300 Series', innerDiameter: 15, outerDiameter: 42, width: 13, dynamicLoadRating: 11.4, staticLoadRating: 5.4, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6303-2RS', partNumber: '6303-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6300 Series', innerDiameter: 17, outerDiameter: 47, width: 14, dynamicLoadRating: 13.5, staticLoadRating: 6.55, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6304-2RS', partNumber: '6304-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6300 Series', innerDiameter: 20, outerDiameter: 52, width: 15, dynamicLoadRating: 15.9, staticLoadRating: 7.8, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6305-2RS', partNumber: '6305-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6300 Series', innerDiameter: 25, outerDiameter: 62, width: 17, dynamicLoadRating: 22.5, staticLoadRating: 11.6, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6306-2RS', partNumber: '6306-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6300 Series', innerDiameter: 30, outerDiameter: 72, width: 19, dynamicLoadRating: 28.1, staticLoadRating: 16.0, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '6308-2RS', partNumber: '6308-2RS', name: 'Deep Groove Ball Bearing', category: 'Deep Groove Ball Bearings', series: '6300 Series', innerDiameter: 40, outerDiameter: 90, width: 23, dynamicLoadRating: 40.7, staticLoadRating: 24.0, slug: 'deep-groove-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },

  // -------------------------------------------------------------
  // CYLINDRICAL ROLLER BEARINGS (NU, NJ, NUP Series)
  // -------------------------------------------------------------
  { id: 'NJ204ECP3', partNumber: 'NJ204ECP3', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NJ Series', innerDiameter: 20, outerDiameter: 47, width: 14, dynamicLoadRating: 32.0, staticLoadRating: 23.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NJ304E', partNumber: 'NJ304E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NJ Series', innerDiameter: 20, outerDiameter: 52, width: 15, dynamicLoadRating: 34.0, staticLoadRating: 27.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NU205E', partNumber: 'NU205E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NU Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 33.0, staticLoadRating: 28.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NJ205E', partNumber: 'NJ205E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NJ Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 36.0, staticLoadRating: 27.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NUP205E', partNumber: 'NUP205E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NUP Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 33.0, staticLoadRating: 28.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NJ2205E', partNumber: 'NJ2205E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NJ Series', innerDiameter: 25, outerDiameter: 52, width: 18, dynamicLoadRating: 32.0, staticLoadRating: 30.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NJ305E', partNumber: 'NJ305E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NJ Series', innerDiameter: 25, outerDiameter: 62, width: 17, dynamicLoadRating: 46.0, staticLoadRating: 38.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NU305E', partNumber: 'NU305E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NU Series', innerDiameter: 25, outerDiameter: 62, width: 17, dynamicLoadRating: 44.0, staticLoadRating: 36.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NJ206E', partNumber: 'NJ206E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NJ Series', innerDiameter: 30, outerDiameter: 62, width: 16, dynamicLoadRating: 43.5, staticLoadRating: 37.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NU206E', partNumber: 'NU206E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NU Series', innerDiameter: 30, outerDiameter: 62, width: 16, dynamicLoadRating: 43.5, staticLoadRating: 37.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NJ306E', partNumber: 'NJ306E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NJ Series', innerDiameter: 30, outerDiameter: 72, width: 19, dynamicLoadRating: 59.0, staticLoadRating: 50.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NJ208E', partNumber: 'NJ208E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NJ Series', innerDiameter: 40, outerDiameter: 80, width: 18, dynamicLoadRating: 63.0, staticLoadRating: 56.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NU308E', partNumber: 'NU308E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NU Series', innerDiameter: 40, outerDiameter: 90, width: 23, dynamicLoadRating: 88.0, staticLoadRating: 78.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },
  { id: 'NJ210E', partNumber: 'NJ210E', name: 'Cylindrical Roller Bearing', category: 'Cylindrical Roller Bearings', series: 'NJ Series', innerDiameter: 50, outerDiameter: 90, width: 20, dynamicLoadRating: 72.0, staticLoadRating: 68.0, slug: 'cylindrical-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/15s1fBLGxJ1lk43Yv--9ldww6RJLUOiCc/view?usp=sharing' },

  // -------------------------------------------------------------
  // TAPER ROLLER BEARINGS (30200, 32000, 32200 Series)
  // -------------------------------------------------------------
  { id: '30204', partNumber: '30204', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '30200 Series', innerDiameter: 20, outerDiameter: 47, width: 15.25, dynamicLoadRating: 27.5, staticLoadRating: 27.0, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },
  { id: '30205', partNumber: '30205', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '30200 Series', innerDiameter: 25, outerDiameter: 52, width: 16.25, dynamicLoadRating: 31.9, staticLoadRating: 33.5, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },
  { id: '32005X', partNumber: '32005X', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '32000 Series', innerDiameter: 25, outerDiameter: 47, width: 15.0, dynamicLoadRating: 26.4, staticLoadRating: 29.0, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },
  { id: '32205', partNumber: '32205', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '32200 Series', innerDiameter: 25, outerDiameter: 52, width: 19.25, dynamicLoadRating: 38.0, staticLoadRating: 41.5, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },
  { id: '30206', partNumber: '30206', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '30200 Series', innerDiameter: 30, outerDiameter: 62, width: 17.25, dynamicLoadRating: 43.5, staticLoadRating: 45.0, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },
  { id: '32006X', partNumber: '32006X', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '32000 Series', innerDiameter: 30, outerDiameter: 55, width: 17.0, dynamicLoadRating: 35.8, staticLoadRating: 42.5, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },
  { id: '32206', partNumber: '32206', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '32200 Series', innerDiameter: 30, outerDiameter: 62, width: 21.25, dynamicLoadRating: 52.8, staticLoadRating: 57.0, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },
  { id: '30207', partNumber: '30207', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '30200 Series', innerDiameter: 35, outerDiameter: 72, width: 18.25, dynamicLoadRating: 55.0, staticLoadRating: 58.5, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },
  { id: '30208', partNumber: '30208', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '30200 Series', innerDiameter: 40, outerDiameter: 80, width: 19.75, dynamicLoadRating: 63.8, staticLoadRating: 71.0, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },
  { id: '32208', partNumber: '32208', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '32200 Series', innerDiameter: 40, outerDiameter: 80, width: 24.75, dynamicLoadRating: 80.9, staticLoadRating: 93.0, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },
  { id: '30210', partNumber: '30210', name: 'Taper Roller Bearing', category: 'Taper Roller Bearings', series: '30200 Series', innerDiameter: 50, outerDiameter: 90, width: 21.75, dynamicLoadRating: 78.1, staticLoadRating: 91.5, slug: 'taper-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1zO1KmbTLrYLaWoWLoegWXpUp3oTLBtH_/view?usp=sharing' },

  // -------------------------------------------------------------
  // SPHERICAL ROLLER BEARINGS (22200, 22300 Series)
  // -------------------------------------------------------------
  { id: '22205E', partNumber: '22205E', name: 'Spherical Roller Bearing', category: 'Spherical Roller Bearings', series: '22200 Series', innerDiameter: 25, outerDiameter: 52, width: 18, dynamicLoadRating: 48.5, staticLoadRating: 44.0, slug: 'spherical-roller-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: '22206E', partNumber: '22206E', name: 'Spherical Roller Bearing', category: 'Spherical Roller Bearings', series: '22200 Series', innerDiameter: 30, outerDiameter: 62, width: 20, dynamicLoadRating: 65.5, staticLoadRating: 60.0, slug: 'spherical-roller-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: '22207E', partNumber: '22207E', name: 'Spherical Roller Bearing', category: 'Spherical Roller Bearings', series: '22200 Series', innerDiameter: 35, outerDiameter: 72, width: 23, dynamicLoadRating: 86.5, staticLoadRating: 83.0, slug: 'spherical-roller-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: '22208E', partNumber: '22208E', name: 'Spherical Roller Bearing', category: 'Spherical Roller Bearings', series: '22200 Series', innerDiameter: 40, outerDiameter: 80, width: 23, dynamicLoadRating: 96.5, staticLoadRating: 90.0, slug: 'spherical-roller-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: '22209E', partNumber: '22209E', name: 'Spherical Roller Bearing', category: 'Spherical Roller Bearings', series: '22200 Series', innerDiameter: 45, outerDiameter: 85, width: 23, dynamicLoadRating: 102.0, staticLoadRating: 98.0, slug: 'spherical-roller-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: '22210E', partNumber: '22210E', name: 'Spherical Roller Bearing', category: 'Spherical Roller Bearings', series: '22200 Series', innerDiameter: 50, outerDiameter: 90, width: 23, dynamicLoadRating: 108.0, staticLoadRating: 108.0, slug: 'spherical-roller-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: '22308E', partNumber: '22308E', name: 'Spherical Roller Bearing', category: 'Spherical Roller Bearings', series: '22300 Series', innerDiameter: 40, outerDiameter: 90, width: 33, dynamicLoadRating: 148.0, staticLoadRating: 140.0, slug: 'spherical-roller-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: '22310E', partNumber: '22310E', name: 'Spherical Roller Bearing', category: 'Spherical Roller Bearings', series: '22300 Series', innerDiameter: 50, outerDiameter: 110, width: 40, dynamicLoadRating: 216.0, staticLoadRating: 212.0, slug: 'spherical-roller-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },

  // -------------------------------------------------------------
  // ROD END BEARINGS (SI / SA Female and Male Thread)
  // -------------------------------------------------------------
  { id: 'SI-5-TK', partNumber: 'SI 5 T/K', name: 'Rod End Bearing (Female Thread)', category: 'Rod Ends & Spherical Plain', series: 'SI Series', innerDiameter: 5, outerDiameter: 18, width: 8, dynamicLoadRating: 3.25, staticLoadRating: 5.7, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SI-6-TK', partNumber: 'SI 6 T/K', name: 'Rod End Bearing (Female Thread)', category: 'Rod Ends & Spherical Plain', series: 'SI Series', innerDiameter: 6, outerDiameter: 20, width: 9, dynamicLoadRating: 4.3, staticLoadRating: 7.2, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SI-8-TK', partNumber: 'SI 8 T/K', name: 'Rod End Bearing (Female Thread)', category: 'Rod Ends & Spherical Plain', series: 'SI Series', innerDiameter: 8, outerDiameter: 24, width: 12, dynamicLoadRating: 7.2, staticLoadRating: 11.6, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SI-10-TK', partNumber: 'SI 10 T/K', name: 'Rod End Bearing (Female Thread)', category: 'Rod Ends & Spherical Plain', series: 'SI Series', innerDiameter: 10, outerDiameter: 28, width: 14, dynamicLoadRating: 10.0, staticLoadRating: 14.5, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SI-12-TK', partNumber: 'SI 12 T/K', name: 'Rod End Bearing (Female Thread)', category: 'Rod Ends & Spherical Plain', series: 'SI Series', innerDiameter: 12, outerDiameter: 32, width: 16, dynamicLoadRating: 13.5, staticLoadRating: 17.0, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SI-16-TK', partNumber: 'SI 16 T/K', name: 'Rod End Bearing (Female Thread)', category: 'Rod Ends & Spherical Plain', series: 'SI Series', innerDiameter: 16, outerDiameter: 42, width: 21, dynamicLoadRating: 21.5, staticLoadRating: 28.5, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SI-20-TK', partNumber: 'SI 20 T/K', name: 'Rod End Bearing (Female Thread)', category: 'Rod Ends & Spherical Plain', series: 'SI Series', innerDiameter: 20, outerDiameter: 50, width: 25, dynamicLoadRating: 31.5, staticLoadRating: 42.5, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },

  { id: 'SA-6-TK', partNumber: 'SA 6 T/K', name: 'Rod End Bearing (Male Thread)', category: 'Rod Ends & Spherical Plain', series: 'SA Series', innerDiameter: 6, outerDiameter: 20, width: 9, dynamicLoadRating: 4.3, staticLoadRating: 6.0, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SA-8-TK', partNumber: 'SA 8 T/K', name: 'Rod End Bearing (Male Thread)', category: 'Rod Ends & Spherical Plain', series: 'SA Series', innerDiameter: 8, outerDiameter: 24, width: 12, dynamicLoadRating: 7.2, staticLoadRating: 9.8, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SA-10-TK', partNumber: 'SA 10 T/K', name: 'Rod End Bearing (Male Thread)', category: 'Rod Ends & Spherical Plain', series: 'SA Series', innerDiameter: 10, outerDiameter: 28, width: 14, dynamicLoadRating: 10.0, staticLoadRating: 13.0, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SA-12-TK', partNumber: 'SA 12 T/K', name: 'Rod End Bearing (Male Thread)', category: 'Rod Ends & Spherical Plain', series: 'SA Series', innerDiameter: 12, outerDiameter: 32, width: 16, dynamicLoadRating: 13.5, staticLoadRating: 17.0, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SA-16-TK', partNumber: 'SA 16 T/K', name: 'Rod End Bearing (Male Thread)', category: 'Rod Ends & Spherical Plain', series: 'SA Series', innerDiameter: 16, outerDiameter: 42, width: 21, dynamicLoadRating: 21.5, staticLoadRating: 28.5, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },
  { id: 'SA-20-TK', partNumber: 'SA 20 T/K', name: 'Rod End Bearing (Male Thread)', category: 'Rod Ends & Spherical Plain', series: 'SA Series', innerDiameter: 20, outerDiameter: 50, width: 25, dynamicLoadRating: 31.5, staticLoadRating: 42.5, slug: 'rod-end-bearings', pdfUrl: '/assets/iko-rod-ends-l-balls-catalogue.pdf' },

  // -------------------------------------------------------------
  // RADIAL SPHERICAL PLAIN BEARINGS (GE Series)
  // -------------------------------------------------------------
  { id: 'GE-10-ES', partNumber: 'GE 10 ES', name: 'Radial Spherical Plain Bearing', category: 'Rod Ends & Spherical Plain', series: 'GE Series', innerDiameter: 10, outerDiameter: 19, width: 9, dynamicLoadRating: 10.6, staticLoadRating: 53.0, slug: 'radial-spherical-plain-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: 'GE-12-ES', partNumber: 'GE 12 ES', name: 'Radial Spherical Plain Bearing', category: 'Rod Ends & Spherical Plain', series: 'GE Series', innerDiameter: 12, outerDiameter: 22, width: 10, dynamicLoadRating: 14.0, staticLoadRating: 70.0, slug: 'radial-spherical-plain-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: 'GE-15-ES', partNumber: 'GE 15 ES', name: 'Radial Spherical Plain Bearing', category: 'Rod Ends & Spherical Plain', series: 'GE Series', innerDiameter: 15, outerDiameter: 26, width: 12, dynamicLoadRating: 22.4, staticLoadRating: 112.0, slug: 'radial-spherical-plain-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: 'GE-17-ES', partNumber: 'GE 17 ES', name: 'Radial Spherical Plain Bearing', category: 'Rod Ends & Spherical Plain', series: 'GE Series', innerDiameter: 17, outerDiameter: 30, width: 14, dynamicLoadRating: 30.0, staticLoadRating: 146.0, slug: 'radial-spherical-plain-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: 'GE-20-ES', partNumber: 'GE 20 ES', name: 'Radial Spherical Plain Bearing', category: 'Rod Ends & Spherical Plain', series: 'GE Series', innerDiameter: 20, outerDiameter: 35, width: 16, dynamicLoadRating: 48.0, staticLoadRating: 240.0, slug: 'radial-spherical-plain-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: 'GE-25-ES', partNumber: 'GE 25 ES', name: 'Radial Spherical Plain Bearing', category: 'Rod Ends & Spherical Plain', series: 'GE Series', innerDiameter: 25, outerDiameter: 42, width: 20, dynamicLoadRating: 62.0, staticLoadRating: 310.0, slug: 'radial-spherical-plain-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: 'GE-30-ES', partNumber: 'GE 30 ES', name: 'Radial Spherical Plain Bearing', category: 'Rod Ends & Spherical Plain', series: 'GE Series', innerDiameter: 30, outerDiameter: 47, width: 22, dynamicLoadRating: 80.0, staticLoadRating: 400.0, slug: 'radial-spherical-plain-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: 'GE-35-ES', partNumber: 'GE 35 ES', name: 'Radial Spherical Plain Bearing', category: 'Rod Ends & Spherical Plain', series: 'GE Series', innerDiameter: 35, outerDiameter: 55, width: 25, dynamicLoadRating: 100.0, staticLoadRating: 500.0, slug: 'radial-spherical-plain-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: 'GE-40-ES', partNumber: 'GE 40 ES', name: 'Radial Spherical Plain Bearing', category: 'Rod Ends & Spherical Plain', series: 'GE Series', innerDiameter: 40, outerDiameter: 62, width: 28, dynamicLoadRating: 125.0, staticLoadRating: 620.0, slug: 'radial-spherical-plain-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },
  { id: 'GE-50-ES', partNumber: 'GE 50 ES', name: 'Radial Spherical Plain Bearing', category: 'Rod Ends & Spherical Plain', series: 'GE Series', innerDiameter: 50, outerDiameter: 75, width: 35, dynamicLoadRating: 200.0, staticLoadRating: 1000.0, slug: 'radial-spherical-plain-bearings', pdfUrl: '/assets/iko-spherical-bushings-catalogue.pdf' },

  // -------------------------------------------------------------
  // PILLOW BLOCK UNITS (UCP, UCF, UCFL Series)
  // -------------------------------------------------------------
  { id: 'UCP204', partNumber: 'UCP 204', name: 'Pillow Block Unit (Pedestal Housing)', category: 'Pillow Block Units', series: 'UCP Series', innerDiameter: 20, outerDiameter: 127, width: 31, dynamicLoadRating: 12.8, staticLoadRating: 6.65, slug: 'pillow-block-bearings', pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf' },
  { id: 'UCP205', partNumber: 'UCP 205', name: 'Pillow Block Unit (Pedestal Housing)', category: 'Pillow Block Units', series: 'UCP Series', innerDiameter: 25, outerDiameter: 140, width: 34, dynamicLoadRating: 14.0, staticLoadRating: 7.88, slug: 'pillow-block-bearings', pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf' },
  { id: 'UCP206', partNumber: 'UCP 206', name: 'Pillow Block Unit (Pedestal Housing)', category: 'Pillow Block Units', series: 'UCP Series', innerDiameter: 30, outerDiameter: 165, width: 38, dynamicLoadRating: 19.5, staticLoadRating: 11.3, slug: 'pillow-block-bearings', pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf' },
  { id: 'UCP207', partNumber: 'UCP 207', name: 'Pillow Block Unit (Pedestal Housing)', category: 'Pillow Block Units', series: 'UCP Series', innerDiameter: 35, outerDiameter: 167, width: 43, dynamicLoadRating: 25.7, staticLoadRating: 15.3, slug: 'pillow-block-bearings', pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf' },
  { id: 'UCP208', partNumber: 'UCP 208', name: 'Pillow Block Unit (Pedestal Housing)', category: 'Pillow Block Units', series: 'UCP Series', innerDiameter: 40, outerDiameter: 184, width: 49, dynamicLoadRating: 29.1, staticLoadRating: 17.8, slug: 'pillow-block-bearings', pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf' },
  { id: 'UCF204', partNumber: 'UCF 204', name: 'Square Flanged Bearing Unit', category: 'Pillow Block Units', series: 'UCF Series', innerDiameter: 20, outerDiameter: 86, width: 33, dynamicLoadRating: 12.8, staticLoadRating: 6.65, slug: 'pillow-block-bearings', pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf' },
  { id: 'UCF205', partNumber: 'UCF 205', name: 'Square Flanged Bearing Unit', category: 'Pillow Block Units', series: 'UCF Series', innerDiameter: 25, outerDiameter: 95, width: 36, dynamicLoadRating: 14.0, staticLoadRating: 7.88, slug: 'pillow-block-bearings', pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf' },
  { id: 'UCFL205', partNumber: 'UCFL 205', name: 'Oval 2-Bolt Flanged Unit', category: 'Pillow Block Units', series: 'UCFL Series', innerDiameter: 25, outerDiameter: 130, width: 36, dynamicLoadRating: 14.0, staticLoadRating: 7.88, slug: 'pillow-block-bearings', pdfUrl: 'https://www.khslg.com/wp-content/uploads/2022/04/Pillow-block-bearing_V1_CORRECTIONS_MARKED-2_compressed.pdf' },

  // -------------------------------------------------------------
  // LINEAR MOTION BUSHINGS (LM Series)
  // -------------------------------------------------------------
  { id: 'LM-8-UU', partNumber: 'LM 8 UU', name: 'Linear Motion Ball Bushing', category: 'Linear Motion Bushings', series: 'LM Series', innerDiameter: 8, outerDiameter: 15, width: 24, dynamicLoadRating: 0.27, staticLoadRating: 0.40, slug: 'linear-motion-bearings', pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf' },
  { id: 'LM-10-UU', partNumber: 'LM 10 UU', name: 'Linear Motion Ball Bushing', category: 'Linear Motion Bushings', series: 'LM Series', innerDiameter: 10, outerDiameter: 19, width: 29, dynamicLoadRating: 0.38, staticLoadRating: 0.56, slug: 'linear-motion-bearings', pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf' },
  { id: 'LM-12-UU', partNumber: 'LM 12 UU', name: 'Linear Motion Ball Bushing', category: 'Linear Motion Bushings', series: 'LM Series', innerDiameter: 12, outerDiameter: 21, width: 30, dynamicLoadRating: 0.52, staticLoadRating: 0.80, slug: 'linear-motion-bearings', pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf' },
  { id: 'LM-16-UU', partNumber: 'LM 16 UU', name: 'Linear Motion Ball Bushing', category: 'Linear Motion Bushings', series: 'LM Series', innerDiameter: 16, outerDiameter: 28, width: 37, dynamicLoadRating: 0.79, staticLoadRating: 1.20, slug: 'linear-motion-bearings', pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf' },
  { id: 'LM-20-UU', partNumber: 'LM 20 UU', name: 'Linear Motion Ball Bushing', category: 'Linear Motion Bushings', series: 'LM Series', innerDiameter: 20, outerDiameter: 32, width: 42, dynamicLoadRating: 0.88, staticLoadRating: 1.40, slug: 'linear-motion-bearings', pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf' },
  { id: 'LM-25-UU', partNumber: 'LM 25 UU', name: 'Linear Motion Ball Bushing', category: 'Linear Motion Bushings', series: 'LM Series', innerDiameter: 25, outerDiameter: 40, width: 59, dynamicLoadRating: 1.00, staticLoadRating: 1.60, slug: 'linear-motion-bearings', pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf' },
  { id: 'LM-30-UU', partNumber: 'LM 30 UU', name: 'Linear Motion Ball Bushing', category: 'Linear Motion Bushings', series: 'LM Series', innerDiameter: 30, outerDiameter: 45, width: 64, dynamicLoadRating: 1.60, staticLoadRating: 2.80, slug: 'linear-motion-bearings', pdfUrl: '/assets/won-st-linear-motion-guide-catalogue.pdf' },

  // -------------------------------------------------------------
  // NEEDLE ROLLER BEARINGS (HK, NA, RNA, AXK Series)
  // -------------------------------------------------------------
  { id: 'HK-1010', partNumber: 'HK 1010', name: 'Drawn Cup Needle Roller Bearing', category: 'Needle Roller Bearings', series: 'HK Series', innerDiameter: 10, outerDiameter: 14, width: 10, dynamicLoadRating: 4.3, staticLoadRating: 4.9, slug: 'drawn-cup-needle-roller-bearings', pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf' },
  { id: 'HK-1212', partNumber: 'HK 1212', name: 'Drawn Cup Needle Roller Bearing', category: 'Needle Roller Bearings', series: 'HK Series', innerDiameter: 12, outerDiameter: 18, width: 12, dynamicLoadRating: 6.8, staticLoadRating: 8.6, slug: 'drawn-cup-needle-roller-bearings', pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf' },
  { id: 'HK-1512', partNumber: 'HK 1512', name: 'Drawn Cup Needle Roller Bearing', category: 'Needle Roller Bearings', series: 'HK Series', innerDiameter: 15, outerDiameter: 21, width: 12, dynamicLoadRating: 7.9, staticLoadRating: 10.8, slug: 'drawn-cup-needle-roller-bearings', pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf' },
  { id: 'HK-2016', partNumber: 'HK 2016', name: 'Drawn Cup Needle Roller Bearing', category: 'Needle Roller Bearings', series: 'HK Series', innerDiameter: 20, outerDiameter: 26, width: 16, dynamicLoadRating: 12.8, staticLoadRating: 20.0, slug: 'drawn-cup-needle-roller-bearings', pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf' },
  { id: 'HK-2520', partNumber: 'HK 2520', name: 'Drawn Cup Needle Roller Bearing', category: 'Needle Roller Bearings', series: 'HK Series', innerDiameter: 25, outerDiameter: 32, width: 20, dynamicLoadRating: 17.6, staticLoadRating: 30.5, slug: 'drawn-cup-needle-roller-bearings', pdfUrl: '/assets/iko-needle-roller-cages-catalogue.pdf' },
  { id: 'AXK-1528', partNumber: 'AXK 1528', name: 'Thrust Needle Roller & Cage Assembly', category: 'Needle Roller Bearings', series: 'AXK Series', innerDiameter: 15, outerDiameter: 28, width: 2, dynamicLoadRating: 11.2, staticLoadRating: 33.5, slug: 'thrust-needle-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1ph9S7mUIvVcCztHV5dfix5Ax4aRZGK4B/view?usp=sharing' },
  { id: 'AXK-2035', partNumber: 'AXK 2035', name: 'Thrust Needle Roller & Cage Assembly', category: 'Needle Roller Bearings', series: 'AXK Series', innerDiameter: 20, outerDiameter: 35, width: 2, dynamicLoadRating: 12.8, staticLoadRating: 45.0, slug: 'thrust-needle-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1ph9S7mUIvVcCztHV5dfix5Ax4aRZGK4B/view?usp=sharing' },
  { id: 'AXK-2542', partNumber: 'AXK 2542', name: 'Thrust Needle Roller & Cage Assembly', category: 'Needle Roller Bearings', series: 'AXK Series', innerDiameter: 25, outerDiameter: 42, width: 2, dynamicLoadRating: 14.3, staticLoadRating: 57.0, slug: 'thrust-needle-roller-bearings', pdfUrl: 'https://drive.google.com/file/d/1ph9S7mUIvVcCztHV5dfix5Ax4aRZGK4B/view?usp=sharing' },

  // -------------------------------------------------------------
  // THRUST BALL BEARINGS (51100 Series)
  // -------------------------------------------------------------
  { id: '51104', partNumber: '51104', name: 'Thrust Ball Bearing', category: 'Thrust Ball Bearings', series: '51100 Series', innerDiameter: 20, outerDiameter: 35, width: 10, dynamicLoadRating: 14.3, staticLoadRating: 24.5, slug: 'thrust-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '51105', partNumber: '51105', name: 'Thrust Ball Bearing', category: 'Thrust Ball Bearings', series: '51100 Series', innerDiameter: 25, outerDiameter: 42, width: 11, dynamicLoadRating: 18.2, staticLoadRating: 35.5, slug: 'thrust-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '51106', partNumber: '51106', name: 'Thrust Ball Bearing', category: 'Thrust Ball Bearings', series: '51100 Series', innerDiameter: 30, outerDiameter: 47, width: 11, dynamicLoadRating: 19.5, staticLoadRating: 42.0, slug: 'thrust-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },
  { id: '51108', partNumber: '51108', name: 'Thrust Ball Bearing', category: 'Thrust Ball Bearings', series: '51100 Series', innerDiameter: 40, outerDiameter: 60, width: 13, dynamicLoadRating: 26.5, staticLoadRating: 63.0, slug: 'thrust-ball-bearings', pdfUrl: 'https://drive.google.com/file/d/19wkE7Inu8U93486AShFwXdRTiTvUc-XJ/view?usp=sharing' },

  // -------------------------------------------------------------
  // ANGULAR CONTACT BALL BEARINGS (7200, 7300 Series)
  // -------------------------------------------------------------
  { id: '7204B', partNumber: '7204 B', name: 'Angular Contact Ball Bearing', category: 'Angular Contact Bearings', series: '7200 Series', innerDiameter: 20, outerDiameter: 47, width: 14, dynamicLoadRating: 13.8, staticLoadRating: 8.3, slug: 'precision-angular-contact-bearings', pdfUrl: 'https://drive.google.com/file/d/11kvK6ozenEHBHCf4xlO-Wvyt8QXKqU0B/view' },
  { id: '7205B', partNumber: '7205 B', name: 'Angular Contact Ball Bearing', category: 'Angular Contact Bearings', series: '7200 Series', innerDiameter: 25, outerDiameter: 52, width: 15, dynamicLoadRating: 16.5, staticLoadRating: 10.8, slug: 'precision-angular-contact-bearings', pdfUrl: 'https://drive.google.com/file/d/11kvK6ozenEHBHCf4xlO-Wvyt8QXKqU0B/view' },
  { id: '7206B', partNumber: '7206 B', name: 'Angular Contact Ball Bearing', category: 'Angular Contact Bearings', series: '7200 Series', innerDiameter: 30, outerDiameter: 62, width: 16, dynamicLoadRating: 22.0, staticLoadRating: 15.0, slug: 'precision-angular-contact-bearings', pdfUrl: 'https://drive.google.com/file/d/11kvK6ozenEHBHCf4xlO-Wvyt8QXKqU0B/view' },
  { id: '7305B', partNumber: '7305 B', name: 'Angular Contact Ball Bearing', category: 'Angular Contact Bearings', series: '7300 Series', innerDiameter: 25, outerDiameter: 62, width: 17, dynamicLoadRating: 26.0, staticLoadRating: 16.6, slug: 'precision-angular-contact-bearings', pdfUrl: 'https://drive.google.com/file/d/11kvK6ozenEHBHCf4xlO-Wvyt8QXKqU0B/view' },
  { id: '7306B', partNumber: '7306 B', name: 'Angular Contact Ball Bearing', category: 'Angular Contact Bearings', series: '7300 Series', innerDiameter: 30, outerDiameter: 72, width: 19, dynamicLoadRating: 35.0, staticLoadRating: 22.8, slug: 'precision-angular-contact-bearings', pdfUrl: 'https://drive.google.com/file/d/11kvK6ozenEHBHCf4xlO-Wvyt8QXKqU0B/view' }
];

function normalise(value: string) {
  return value.trim().toLowerCase();
}

function numericValue(value: string) {
  if (!value || !value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function matchesDimension(value: number, range: DimensionRange) {
  const min = numericValue(range.min);
  const max = numericValue(range.max);
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}

function textRank(record: BearingRecord, query: string) {
  const term = normalise(query);
  if (!term) return 0;
  const partNumber = normalise(record.partNumber);
  const series = normalise(record.series);
  const name = normalise(record.name);
  const category = normalise(record.category);
  if (partNumber === term) return 0;
  if (partNumber.startsWith(term)) return 1;
  if (series.includes(term)) return 2;
  if (name.includes(term) || category.includes(term)) return 3;
  return 4;
}

export function searchProducts(query: string, records = bearingRecords) {
  const term = normalise(query);
  if (!term) return records;
  return records
    .filter((record) =>
      [record.partNumber, record.name, record.category, record.series]
        .some((value) => normalise(value).includes(term))
    )
    .sort((a, b) => textRank(a, term) - textRank(b, term));
}

export function filterByDimensions(
  records: BearingRecord[],
  dimensions: Pick<BearingFilters, 'innerDiameter' | 'outerDiameter' | 'width'>
) {
  return records.filter(
    (record) =>
      matchesDimension(record.innerDiameter, dimensions.innerDiameter) &&
      matchesDimension(record.outerDiameter, dimensions.outerDiameter) &&
      matchesDimension(record.width, dimensions.width)
  );
}

export function filterProducts(filters: BearingFilters, records = bearingRecords) {
  let results = searchProducts(filters.query, records);

  if (filters.category && filters.category !== 'All Categories') {
    results = results.filter((r) => r.category === filters.category);
  }

  return filterByDimensions(results, filters);
}

export function getProductSuggestions(query: string, records = bearingRecords) {
  return searchProducts(query, records).slice(0, 8);
}
