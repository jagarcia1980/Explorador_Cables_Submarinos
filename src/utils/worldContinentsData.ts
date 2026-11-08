// Simplified recognizable world landmass SVG paths calibrated for 1000x520 Miller projection
export interface LandmassPolygon {
  id: string;
  name: string;
  d: string;
}

export const WORLD_LANDMASS_PATHS: LandmassPolygon[] = [
  // North America
  {
    id: 'north_america',
    name: 'América del Norte',
    d: `M 152 70 L 195 72 L 235 65 L 290 85 L 280 135 L 260 160 L 250 190 L 225 210 L 205 240 L 195 280 L 180 295 L 175 285 L 165 245 L 130 200 L 115 150 L 105 120 L 115 85 Z`
  },
  // Alaska
  {
    id: 'alaska',
    name: 'Alaska',
    d: `M 65 95 L 110 85 L 115 125 L 90 140 L 70 125 Z`
  },
  // Greenland
  {
    id: 'greenland',
    name: 'Groenlandia',
    d: `M 360 40 L 400 45 L 390 100 L 350 115 L 340 75 Z`
  },
  // South America
  {
    id: 'south_america',
    name: 'América del Sur',
    d: `M 220 270 L 260 280 L 320 300 L 335 340 L 320 380 L 300 420 L 275 460 L 265 470 L 255 450 L 250 380 L 225 320 L 210 285 Z`
  },
  // Europe
  {
    id: 'europe',
    name: 'Europa',
    d: `M 465 140 L 510 130 L 560 120 L 580 150 L 560 180 L 540 200 L 505 205 L 485 215 L 460 220 L 455 200 L 475 175 L 465 150 Z`
  },
  // Scandinavia
  {
    id: 'scandinavia',
    name: 'Escandinavia',
    d: `M 505 85 L 545 75 L 555 120 L 525 135 L 505 110 Z`
  },
  // Great Britain & Ireland
  {
    id: 'british_isles',
    name: 'Islas Británicas',
    d: `M 450 145 L 465 140 L 470 170 L 455 180 Z M 440 155 L 448 150 L 446 172 L 438 165 Z`
  },
  // Africa
  {
    id: 'africa',
    name: 'África',
    d: `M 450 220 L 510 220 L 560 245 L 590 285 L 565 340 L 540 400 L 520 435 L 490 425 L 475 350 L 440 300 L 430 260 L 440 230 Z`
  },
  // Asia
  {
    id: 'asia',
    name: 'Asia',
    d: `M 570 120 L 640 100 L 720 90 L 820 95 L 880 130 L 860 190 L 820 220 L 800 270 L 760 300 L 720 310 L 670 290 L 630 250 L 590 245 L 575 190 Z`
  },
  // Indian subcontinent
  {
    id: 'india',
    name: 'India',
    d: `M 670 240 L 725 240 L 720 300 L 695 320 L 670 280 Z`
  },
  // Japan
  {
    id: 'japan',
    name: 'Japón',
    d: `M 870 175 L 885 185 L 875 220 L 860 215 Z`
  },
  // Southeast Asia / Indonesia / Philippines
  {
    id: 'se_asia_archipelago',
    name: 'Sudeste Asiático e Insulindia',
    d: `M 770 300 L 795 325 L 785 355 L 755 345 Z M 820 280 L 835 295 L 825 330 Z M 800 350 L 845 355 L 835 375 L 790 370 Z`
  },
  // Australia
  {
    id: 'australia',
    name: 'Australia',
    d: `M 810 375 L 870 370 L 910 400 L 895 450 L 830 455 L 800 425 Z`
  },
  // New Zealand
  {
    id: 'new_zealand',
    name: 'Nueva Zelanda',
    d: `M 945 440 L 955 455 L 940 480 L 935 460 Z`
  },
  // Madagascar
  {
    id: 'madagascar',
    name: 'Madagascar',
    d: `M 585 365 L 598 375 L 585 415 L 575 395 Z`
  },
  // Iceland
  {
    id: 'iceland',
    name: 'Islandia',
    d: `M 425 105 L 442 108 L 438 122 L 420 118 Z`
  }
];

// Major ocean deep bathymetric trenches & mid-ocean ridges for nautical authenticity
export interface OceanFeature {
  name: string;
  type: 'trench' | 'ridge' | 'basin';
  depthText: string;
  x: number;
  y: number;
}

export const OCEAN_BATHYMETRY_FEATURES: OceanFeature[] = [
  { name: 'Dorsal Mesoatlántica', type: 'ridge', depthText: 'Falla tectónica submarina ~3.000m', x: 385, y: 240 },
  { name: 'Fosa de Puerto Rico', type: 'trench', depthText: 'Profundidad máxima 8.376m', x: 275, y: 250 },
  { name: 'Fosa de las Marianas', type: 'trench', depthText: 'Abismo de Challenger 10.994m', x: 840, y: 255 },
  { name: 'Fosa de Japón', type: 'trench', depthText: 'Cinturón de Fuego 8.410m', x: 885, y: 200 },
  { name: 'Fosa de Java / Sonda', type: 'trench', depthText: 'Océano Índico 7.290m', x: 760, y: 360 },
  { name: 'Fosa de Atacama', type: 'trench', depthText: 'Pacífico Sur 8.065m', x: 240, y: 390 }
];
