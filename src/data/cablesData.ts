export interface LandingStation {
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export interface SubmarineCable {
  id: string;
  name: string;
  region: 'transatlantic' | 'transpacific' | 'indian_ocean' | 'mediterranean_redsea' | 'pan_american' | 'circumnav' | 'historical';
  regionLabel: string;
  lengthKm: number;
  capacityTbps: number;
  fiberPairs: number;
  rfsYear: number;
  status: 'active' | 'retired' | 'historical' | 'under_construction';
  ownerCategory: 'hyperscalers' | 'consortium' | 'telco' | 'historical';
  ownerList: string[];
  technology: string;
  repeatersEstimate: number;
  maxDepthMeters: number;
  voltageFeedDC: string;
  color: string;
  summary: string;
  didacticHighlights: string[];
  landingStations: LandingStation[];
  // Coordinates in [latitude, longitude]
  route: Array<[number, number]>;
  isHistorical?: boolean;
}

export const SUBMARINE_CABLES: SubmarineCable[] = [
  {
    id: 'marea',
    name: 'MAREA',
    region: 'transatlantic',
    regionLabel: 'Transatlántico',
    lengthKm: 6605,
    capacityTbps: 224,
    fiberPairs: 8,
    rfsYear: 2017,
    status: 'active',
    ownerCategory: 'hyperscalers',
    ownerList: ['Microsoft', 'Meta (Facebook)', 'Telxius (Telefónica)'],
    technology: 'Fibra coherente submarina de modulación avanzada 16-QAM',
    repeatersEstimate: 102,
    maxDepthMeters: 5180,
    voltageFeedDC: '12.000 V DC',
    color: '#38bdf8', // sky-400
    summary: 'Uno de los cables transatlánticos de mayor capacidad del mundo, conectando el sur de Europa directamente con la costa este de EE.UU. a través del corredor Bilbao - Virginia Beach.',
    didacticHighlights: [
      'Pesa aproximadamente 4,6 millones de kilogramos y recorre más de 6.600 kilómetros a más de 5.000 metros de profundidad.',
      'Su trazado al sur de los corredores tradicionales (Nueva York - Reino Unido) fue diseñado intencionadamente para dotar de resiliencia frente a huracanes como Sandy.',
      'Su capacidad de 224 Tbps equivale a transmitir más de 71 millones de vídeos en streaming 4K de forma simultánea.'
    ],
    landingStations: [
      { name: 'Sopelana (Bilbao)', city: 'Bilbao', country: 'España', lat: 43.38, lng: -2.98 },
      { name: 'Virginia Beach Landing', city: 'Virginia Beach', country: 'Estados Unidos', lat: 36.85, lng: -75.97 }
    ],
    route: [
      [43.38, -2.98],
      [44.20, -5.50],
      [45.10, -10.00],
      [44.80, -18.00],
      [43.50, -28.00],
      [41.80, -38.00],
      [39.50, -48.00],
      [37.90, -58.00],
      [36.90, -68.00],
      [36.85, -75.97]
    ]
  },
  {
    id: 'dunant',
    name: 'Dunant',
    region: 'transatlantic',
    regionLabel: 'Transatlántico',
    lengthKm: 6400,
    capacityTbps: 250,
    fiberPairs: 12,
    rfsYear: 2021,
    status: 'active',
    ownerCategory: 'hyperscalers',
    ownerList: ['Google'],
    technology: 'SDM (Space-Division Multiplexing) con amplificación óptica compartida',
    repeatersEstimate: 95,
    maxDepthMeters: 5000,
    voltageFeedDC: '15.000 V DC',
    color: '#4ade80', // green-400
    summary: 'Propiedad exclusiva de Google, rinde homenaje a Henry Dunant (fundador de la Cruz Roja). Fue el primer cable transoceánico en implementar tecnología SDM de 12 pares de fibra.',
    didacticHighlights: [
      'Primer cable comercial en utilizar tecnología SDM, logrando aumentar los pares de fibra de 6-8 habituales a 12 pares con bombeo láser compartido.',
      'Une Francia directamente con los principales centros de datos de Google en EE.UU., permitiendo entrenar y sincronizar modelos de IA con latencia mínima.',
      'Capacidad récord de 250 Tbps que permite digitalizar la Biblioteca del Congreso de EE.UU. tres veces por segundo.'
    ],
    landingStations: [
      { name: 'Saint-Hilaire-de-Riez', city: 'Saint-Hilaire', country: 'Francia', lat: 46.72, lng: -1.94 },
      { name: 'Virginia Beach Landing', city: 'Virginia Beach', country: 'Estados Unidos', lat: 36.85, lng: -75.97 }
    ],
    route: [
      [46.72, -1.94],
      [46.90, -6.50],
      [46.50, -14.00],
      [45.00, -24.00],
      [43.00, -35.00],
      [40.80, -46.00],
      [38.70, -56.00],
      [37.20, -66.00],
      [36.85, -75.97]
    ]
  },
  {
    id: 'grace_hopper',
    name: 'Grace Hopper',
    region: 'transatlantic',
    regionLabel: 'Transatlántico',
    lengthKm: 6250,
    capacityTbps: 350,
    fiberPairs: 16,
    rfsYear: 2022,
    status: 'active',
    ownerCategory: 'hyperscalers',
    ownerList: ['Google'],
    technology: 'Conmutación óptica submarina de 16 pares de fibra (Optical Switching)',
    repeatersEstimate: 110,
    maxDepthMeters: 5200,
    voltageFeedDC: '15.000 V DC',
    color: '#a78bfa', // purple-400
    summary: 'Nombrado en honor a la pionera informática Grace Hopper. Incorpora conmutación óptica en el lecho marino para desviar tráfico entre Reino Unido y España sin pasar por tierra.',
    didacticHighlights: [
      'Une Nueva York simultáneamente con Bude (Reino Unido) y Bilbao (España) gracias a una unidad de ramificación óptica inteligente bajo el mar.',
      'Dispone de 16 pares de fibras ópticas, un salto gigantesco frente a los cables convencionales de 8 pares.',
      'Permite redirigir dinámicamente terabits de tráfico entre Europa y América en milisegundos si ocurre un corte en tierra.'
    ],
    landingStations: [
      { name: 'Bellport (Nueva York)', city: 'Nueva York', country: 'Estados Unidos', lat: 40.75, lng: -72.93 },
      { name: 'Bude Landing', city: 'Bude', country: 'Reino Unido', lat: 50.83, lng: -4.54 },
      { name: 'Sopelana (Bilbao)', city: 'Bilbao', country: 'España', lat: 43.38, lng: -2.98 }
    ],
    route: [
      [40.75, -72.93],
      [41.50, -64.00],
      [43.00, -52.00],
      [45.00, -40.00],
      [47.50, -28.00],
      [49.00, -18.00],
      [50.00, -10.00],
      [50.83, -4.54],
      [48.00, -7.50],
      [45.50, -5.00],
      [43.38, -2.98]
    ]
  },
  {
    id: 'ellalink',
    name: 'EllaLink',
    region: 'pan_american',
    regionLabel: 'Atlántico Sur / Europa',
    lengthKm: 9300,
    capacityTbps: 100,
    fiberPairs: 4,
    rfsYear: 2021,
    status: 'active',
    ownerCategory: 'consortium',
    ownerList: ['EllaLink Group', 'BELLA Consortium (RedCLARA & GÉANT)'],
    technology: 'Fibra submarina transatlántica directa con tecnología SMART (monitorización sísmica)',
    repeatersEstimate: 140,
    maxDepthMeters: 5500,
    voltageFeedDC: '14.000 V DC',
    color: '#fb923c', // orange-400
    summary: 'La primera conexión submarina directa entre Europa y Sudamérica en más de 20 años, eliminando el rodeo forzoso por Norteamérica y reduciendo la latencia en un 50%.',
    didacticHighlights: [
      'Conecta directamente Sines (Portugal) y Madrid con Fortaleza y São Paulo (Brasil), reduciendo el ping transatlántico de 110ms a menos de 60ms.',
      'Vital para el radiotelescopio ALMA y el Observatorio Europeo Austral (ESO) en Chile para enviar petabytes de datos astronómicos a centros científicos europeos.',
      'Incorpora sensores acústicos y sísmicos experimentales para vigilar terremotos y tsunamis en la falla de Azores-Gibraltar.'
    ],
    landingStations: [
      { name: 'Sines Landing', city: 'Sines', country: 'Portugal', lat: 37.95, lng: -8.86 },
      { name: 'Funchal (Madeira)', city: 'Madeira', country: 'Portugal', lat: 32.65, lng: -16.90 },
      { name: 'Praia (Cabo Verde)', city: 'Praia', country: 'Cabo Verde', lat: 14.92, lng: -23.51 },
      { name: 'Fortaleza Landing', city: 'Fortaleza', country: 'Brasil', lat: -3.73, lng: -38.52 }
    ],
    route: [
      [37.95, -8.86],
      [35.00, -12.00],
      [32.65, -16.90],
      [25.00, -20.50],
      [14.92, -23.51],
      [5.00, -28.00],
      [-1.00, -34.00],
      [-3.73, -38.52]
    ]
  },
  {
    id: 'two_africa',
    name: '2Africa',
    region: 'circumnav',
    regionLabel: 'Circunnavegación África',
    lengthKm: 45000,
    capacityTbps: 180,
    fiberPairs: 16,
    rfsYear: 2024,
    status: 'active',
    ownerCategory: 'consortium',
    ownerList: ['Meta', 'Vodafone', 'Orange', 'China Mobile', 'stc', 'Telecom Egypt', 'WIOCC'],
    technology: 'SDM de 16 pares, enterramiento profundo con arado submarino a 3m bajo lecho',
    repeatersEstimate: 600,
    maxDepthMeters: 4800,
    voltageFeedDC: '18.000 V DC',
    color: '#facc15', // yellow-400
    summary: 'El sistema de cable submarino más largo jamás desplegado en la historia humana: 45.000 km que rodean todo el continente africano conectando 33 países y 3 continentes.',
    didacticHighlights: [
      'Con 45.000 kilómetros supera holgadamente la circunferencia entera del planeta Tierra (40.075 km).',
      'Lleva conectividad de alta velocidad a más de 3.000 millones de personas (el 36% de la población mundial) a través de África, Oriente Medio y el sur de Europa.',
      'Su trazado está protegido contra anclas enterrándolo a 3 metros bajo el lecho marino en zonas costeras y del Canal de Suez.'
    ],
    landingStations: [
      { name: 'Marsella', city: 'Marsella', country: 'Francia', lat: 43.29, lng: 5.37 },
      { name: 'Carcavelos (Lisboa)', city: 'Lisboa', country: 'Portugal', lat: 38.68, lng: -9.33 },
      { name: 'Dakar', city: 'Dakar', country: 'Senegal', lat: 14.71, lng: -17.46 },
      { name: 'Lagos', city: 'Lagos', country: 'Nigeria', lat: 6.52, lng: 3.37 },
      { name: 'Ciudad del Cabo', city: 'Ciudad del Cabo', country: 'Sudáfrica', lat: -33.92, lng: 18.42 },
      { name: 'Mombasa', city: 'Mombasa', country: 'Kenia', lat: -4.04, lng: 39.66 },
      { name: 'Yeda', city: 'Yeda', country: 'Arabia Saudí', lat: 21.48, lng: 39.19 },
      { name: 'Alejandría', city: 'Alejandría', country: 'Egipto', lat: 31.20, lng: 29.91 }
    ],
    route: [
      [43.29, 5.37],
      [36.00, -4.50],
      [38.68, -9.33],
      [28.00, -15.50],
      [14.71, -17.46],
      [4.00, -8.00],
      [6.52, 3.37],
      [-5.00, 10.00],
      [-22.00, 14.00],
      [-33.92, 18.42],
      [-30.00, 32.00],
      [-15.00, 42.00],
      [-4.04, 39.66],
      [11.50, 43.50],
      [21.48, 39.19],
      [28.00, 33.50],
      [31.20, 29.91],
      [35.00, 20.00],
      [43.29, 5.37]
    ]
  },
  {
    id: 'faster',
    name: 'FASTER',
    region: 'transpacific',
    regionLabel: 'Transpacífico',
    lengthKm: 11629,
    capacityTbps: 60,
    fiberPairs: 6,
    rfsYear: 2016,
    status: 'active',
    ownerCategory: 'consortium',
    ownerList: ['Google', 'China Mobile International', 'China Telecom', 'Global Transit', 'KDDI', 'Singtel'],
    technology: 'Fibra óptica coherente 100G transpacífica con repetidores de ruido ultrabajo',
    repeatersEstimate: 170,
    maxDepthMeters: 6200,
    voltageFeedDC: '12.000 V DC',
    color: '#34d399', // emerald-400
    summary: 'Construido para conectar los centros de datos de la costa oeste de EE.UU. con las metrópolis financieras y tecnológicas de Tokio y Taiwán a través del inmenso océano Pacífico.',
    didacticHighlights: [
      'Atraviesa zonas de fallas tectónicas extremas en el Cinturón de Fuego del Pacífico con cables doblemente acorazados cerca de las fosas oceánicas de Japón.',
      'Soportó sin daños el terremoto de Fukushima de 2016 gracias a un diseño elástico con curvas de holgura en el lecho marino.',
      'Google financió una extensión dedicada a Taiwán para conectar su mayor centro de datos de Asia-Pacífico en Changhua.'
    ],
    landingStations: [
      { name: 'Bandon', city: 'Bandon (Oregón)', country: 'Estados Unidos', lat: 43.12, lng: -124.41 },
      { name: 'Chikura', city: 'Chiba', country: 'Japón', lat: 34.96, lng: 139.95 },
      { name: 'Shima', city: 'Mie', country: 'Japón', lat: 34.33, lng: 136.83 },
      { name: 'Tanshui', city: 'Nuevo Taipéi', country: 'Taiwán', lat: 25.17, lng: 121.44 }
    ],
    route: [
      [43.12, -124.41],
      [45.00, -140.00],
      [47.50, -160.00],
      [48.00, -180.00],
      [46.00, 165.00],
      [41.00, 150.00],
      [34.96, 139.95],
      [34.33, 136.83],
      [28.00, 126.00],
      [25.17, 121.44]
    ]
  },
  {
    id: 'southern_cross_next',
    name: 'Southern Cross NEXT',
    region: 'transpacific',
    regionLabel: 'Transpacífico Sur',
    lengthKm: 15840,
    capacityTbps: 72,
    fiberPairs: 4,
    rfsYear: 2022,
    status: 'active',
    ownerCategory: 'consortium',
    ownerList: ['Spark New Zealand', 'Singtel Optus', 'Telstra'],
    technology: 'WDM Coherent submarino de alta densidad de canales',
    repeatersEstimate: 210,
    maxDepthMeters: 7500,
    voltageFeedDC: '14.500 V DC',
    color: '#f43f5e', // rose-500
    summary: 'La mayor autopista de datos entre Australasia y Norteamérica, cruzando las islas del Pacífico (Fiyi, Kiribati, Tokelau) hasta llegar a California.',
    didacticHighlights: [
      'Proporciona la ruta más corta y de menor latencia entre Sídney, Auckland y Los Ángeles.',
      'Conecta por primera vez a islas remotas del Pacífico Sur que antes dependían de satélites caros y de alta latencia meteorológica.',
      'Desciende hasta los 7.500 metros en la fosa de las Kermadec, resistiendo presiones equivalentes a 750 atmósferas.'
    ],
    landingStations: [
      { name: 'Clovelly (Sídney)', city: 'Sídney', country: 'Australia', lat: -33.91, lng: 151.26 },
      { name: 'Takapuna (Auckland)', city: 'Auckland', country: 'Nueva Zelanda', lat: -36.78, lng: 174.77 },
      { name: 'Suva', city: 'Suva', country: 'Fiyi', lat: -18.14, lng: 178.44 },
      { name: 'Hermosa Beach', city: 'Los Ángeles', country: 'Estados Unidos', lat: 33.86, lng: -118.40 }
    ],
    route: [
      [-33.91, 151.26],
      [-36.78, 174.77],
      [-28.00, 177.00],
      [-18.14, 178.44],
      [-5.00, -172.00],
      [10.00, -155.00],
      [24.00, -135.00],
      [33.86, -118.40]
    ]
  },
  {
    id: 'curie',
    name: 'Curie',
    region: 'pan_american',
    regionLabel: 'Pacífico Panamericano',
    lengthKm: 10500,
    capacityTbps: 72,
    fiberPairs: 4,
    rfsYear: 2019,
    status: 'active',
    ownerCategory: 'hyperscalers',
    ownerList: ['Google'],
    technology: 'Fibra submarina monomodo optimizada para nube privada intercontinental',
    repeatersEstimate: 135,
    maxDepthMeters: 5800,
    voltageFeedDC: '12.500 V DC',
    color: '#818cf8', // indigo-400
    summary: 'Bautizado en honor a Marie Curie. Es el primer cable privado de Google en el hemisferio sur, conectando California con Chile y ramificándose en Panamá.',
    didacticHighlights: [
      'Une Los Ángeles con Valparaíso (Chile), donde Google alberga su principal región de Google Cloud para toda Sudamérica.',
      'Posee una derivación marina submarina que aterriza en Panamá para enlazar Centroamérica.',
      'Sortea la fosa de Atacama (una de las más profundas del planeta) colocándose con precisión milimétrica en el talud continental.'
    ],
    landingStations: [
      { name: 'Los Ángeles', city: 'Los Ángeles', country: 'Estados Unidos', lat: 33.94, lng: -118.41 },
      { name: 'Panamá City', city: 'Ciudad de Panamá', country: 'Panamá', lat: 8.98, lng: -79.52 },
      { name: 'Las Cruces (Valparaíso)', city: 'Valparaíso', country: 'Chile', lat: -33.50, lng: -71.62 }
    ],
    route: [
      [33.94, -118.41],
      [24.00, -113.00],
      [15.00, -102.00],
      [8.98, -79.52],
      [0.00, -82.00],
      [-15.00, -78.00],
      [-33.50, -71.62]
    ]
  },
  {
    id: 'firmina',
    name: 'Firmina',
    region: 'pan_american',
    regionLabel: 'Atlántico Panamericano',
    lengthKm: 14000,
    capacityTbps: 150,
    fiberPairs: 12,
    rfsYear: 2024,
    status: 'active',
    ownerCategory: 'hyperscalers',
    ownerList: ['Google'],
    technology: 'Alimentación eléctrica 100% unilateral (Single-End Power Feeding Capability)',
    repeatersEstimate: 190,
    maxDepthMeters: 5300,
    voltageFeedDC: '18.000 V DC',
    color: '#e879f9', // fuchsia-400
    summary: 'El cable más largo del planeta capaz de operar al 100% alimentado eléctricamente desde un único extremo en caso de fallo en la otra costa.',
    didacticHighlights: [
      'Nombrado en memoria de Maria Firmina dos Reis, pionera novelista abolicionista brasileña.',
      'Su logro técnico más revolucionario: puede alimentar todos sus amplificadores submarinos con 18.000 voltios desde una sola punta si una estación sufre un corte eléctrico.',
      'Conecta la costa este de EE.UU. con Brasil, Uruguay y Argentina con 12 pares de fibra óptica.'
    ],
    landingStations: [
      { name: 'Myrtle Beach', city: 'Myrtle Beach', country: 'Estados Unidos', lat: 33.68, lng: -78.88 },
      { name: 'Praia Grande (São Paulo)', city: 'São Paulo', country: 'Brasil', lat: -24.00, lng: -46.40 },
      { name: 'Punta del Este', city: 'Punta del Este', country: 'Uruguay', lat: -34.96, lng: -54.94 },
      { name: 'Las Toninas', city: 'Las Toninas', country: 'Argentina', lat: -36.48, lng: -56.69 }
    ],
    route: [
      [33.68, -78.88],
      [26.00, -72.00],
      [15.00, -60.00],
      [2.00, -45.00],
      [-12.00, -35.00],
      [-24.00, -46.40],
      [-34.96, -54.94],
      [-36.48, -56.69]
    ]
  },
  {
    id: 'sea_me_we_6',
    name: 'SEA-ME-WE 6',
    region: 'mediterranean_redsea',
    regionLabel: 'Eurasia & Mar Rojo',
    lengthKm: 21700,
    capacityTbps: 130,
    fiberPairs: 10,
    rfsYear: 2025,
    status: 'active',
    ownerCategory: 'consortium',
    ownerList: ['Orange', 'Singtel', 'Telecom Egypt', 'Telin', 'Bharti Airtel', 'Microsoft'],
    technology: 'SDM Submarino de ultra-baja pérdida por el cuello de botella del Mar Rojo',
    repeatersEstimate: 290,
    maxDepthMeters: 4200,
    voltageFeedDC: '15.000 V DC',
    color: '#06b6d4', // cyan-500
    summary: 'La sexta generación de la arteria digital más estratégica del planeta, conectando el sudeste asiático con Europa occidental a través de Singapur, India, el Mar Rojo y Egipto.',
    didacticHighlights: [
      'El estrecho de Bab-el-Mandeb y el Mar Rojo concentran entre el 15% y el 20% del tráfico global de internet.',
      'Requiere cruzar Egipto por vía terrestre para saltar del Mar Rojo al Mar Mediterráneo, un paso estratégico con tarifas de tránsito geopolítico.',
      'Sufre periódicamente incidentes por anclas de barcos a la deriva y tensiones marítimas regionales.'
    ],
    landingStations: [
      { name: 'Tuas', city: 'Singapur', country: 'Singapur', lat: 1.30, lng: 103.65 },
      { name: 'Chennai', city: 'Chennai', country: 'India', lat: 13.08, lng: 80.27 },
      { name: 'Mumbai', city: 'Bombay', country: 'India', lat: 19.07, lng: 72.87 },
      { name: 'Djibouti', city: 'Yibuti', country: 'Yibuti', lat: 11.58, lng: 43.14 },
      { name: 'Zafarana', city: 'Zafarana', country: 'Egipto', lat: 29.11, lng: 32.65 },
      { name: 'Marsella', city: 'Marsella', country: 'Francia', lat: 43.29, lng: 5.37 }
    ],
    route: [
      [1.30, 103.65],
      [5.50, 95.00],
      [10.00, 85.00],
      [13.08, 80.27],
      [9.00, 76.00],
      [19.07, 72.87],
      [16.00, 60.00],
      [11.58, 43.14],
      [20.00, 38.00],
      [27.50, 34.00],
      [29.11, 32.65],
      [31.30, 31.00],
      [35.00, 22.00],
      [40.00, 10.00],
      [43.29, 5.37]
    ]
  },
  {
    id: 'topaz',
    name: 'Topaz',
    region: 'transpacific',
    regionLabel: 'Transpacífico Norte',
    lengthKm: 9800,
    capacityTbps: 240,
    fiberPairs: 16,
    rfsYear: 2023,
    status: 'active',
    ownerCategory: 'hyperscalers',
    ownerList: ['Google'],
    technology: 'SDM de 16 pares de fibra para el corredor Canadá - Japón',
    repeatersEstimate: 140,
    maxDepthMeters: 6500,
    voltageFeedDC: '15.000 V DC',
    color: '#22d3ee', // cyan-400
    summary: 'El primer cable submarino que conecta directamente la provincia canadiense de Columbia Británica con Japón a través de las islas Aleutianas.',
    didacticHighlights: [
      'Construido en consulta y cooperación con los pueblos indígenas de las Primeras Naciones de la isla de Vancouver.',
      'Sigue la ruta del círculo máximo (Great Circle Route) a través del Pacífico septentrional, reduciendo kilómetros y milisegundos de latencia.',
      'Proporciona a Canadá soberanía directa de datos con Asia sin depender de infraestructuras situadas en EE.UU.'
    ],
    landingStations: [
      { name: 'Vancouver Island', city: 'Port Alberni', country: 'Canadá', lat: 49.23, lng: -124.80 },
      { name: 'Ibaraki Landing', city: 'Takahagi', country: 'Japón', lat: 36.71, lng: 140.71 },
      { name: 'Mie Landing', city: 'Shima', country: 'Japón', lat: 34.33, lng: 136.83 }
    ],
    route: [
      [49.23, -124.80],
      [51.00, -135.00],
      [52.50, -150.00],
      [53.00, -170.00],
      [51.50, 175.00],
      [47.00, 160.00],
      [41.00, 148.00],
      [36.71, 140.71],
      [34.33, 136.83]
    ]
  },
  // Historical Cables for Historical Mode
  {
    id: 'hist_1858_telegraph',
    name: 'Primer Cable Telegráfico Transatlántico (1858)',
    region: 'historical',
    regionLabel: 'Histórico (1858)',
    lengthKm: 3200,
    capacityTbps: 0.0000000001, // ~0.1 palabras/minuto
    fiberPairs: 0,
    rfsYear: 1858,
    status: 'historical',
    ownerCategory: 'historical',
    ownerList: ['Atlantic Telegraph Company (Cyrus Field)'],
    technology: '7 hilos de cobre trenzados, 3 capas de gutapercha, cáñamo y alambres de hierro',
    repeatersEstimate: 0,
    maxDepthMeters: 3900,
    voltageFeedDC: '2.000 V (¡provocó su destrucción!)',
    color: '#d97706', // amber-600
    summary: 'La primera conexión eléctrica entre dos continentes. Permitió a la Reina Victoria y al presidente Buchanan enviarse el primer telegrama transoceánico de la historia.',
    didacticHighlights: [
      'El telegrama de felicitación de la Reina Victoria a Buchanan tenía solo 98 palabras pero tardó 16 horas y 40 minutos en transmitirse letra por letra.',
      'Solo funcionó durante tres semanas. El electricista jefe Wildman Whitehouse aplicó tensiones excesivas de más de 2.000 voltios intentando acelerar la señal, destruyendo el aislamiento de gutapercha.',
      'Cyrus Field perdió su fortuna temporalmente, pero sentó la base técnica que revolucionaría el siglo XIX.'
    ],
    landingStations: [
      { name: 'Valentia Island', city: 'Condado de Kerry', country: 'Irlanda', lat: 51.92, lng: -10.36 },
      { name: "Heart's Content", city: "Trinity Bay", country: 'Terranova (Canadá)', lat: 47.87, lng: -53.37 }
    ],
    route: [
      [51.92, -10.36],
      [52.50, -16.00],
      [52.80, -25.00],
      [52.20, -35.00],
      [50.50, -45.00],
      [47.87, -53.37]
    ],
    isHistorical: true
  },
  {
    id: 'hist_1866_great_eastern',
    name: 'Cable Transatlántico del SS Great Eastern (1866)',
    region: 'historical',
    regionLabel: 'Histórico (1866)',
    lengthKm: 3400,
    capacityTbps: 0.0000000008, // ~8 palabras por minuto
    fiberPairs: 0,
    rfsYear: 1866,
    status: 'historical',
    ownerCategory: 'historical',
    ownerList: ['Anglo-American Telegraph Company'],
    technology: 'Núcleo Chatterton, 4 capas de gutapercha, 10 alambres de hierro galvanizado enrollados en cáñamo',
    repeatersEstimate: 0,
    maxDepthMeters: 4100,
    voltageFeedDC: 'Baja tensión con galvanómetro de espejo de Lord Kelvin',
    color: '#eab308', // yellow-500
    summary: 'El triunfo que inauguró la era de la telecomunicación global permanente. El colosal buque SS Great Eastern tendió el cable y rescató el cable perdido de 1865 del fondo abisal.',
    didacticHighlights: [
      'El SS Great Eastern era cinco veces mayor que cualquier barco existente, el único capaz de albergar las 4.000 toneladas de cable en sus tres gigantescas bodegas circulares.',
      'William Thomson (Lord Kelvin) inventó el galvanómetro de espejo para detectar corrientes eléctricas tan diminutas que no dañaban el cable.',
      'En una hazaña legendaria, la tripulación utilizó garfios para dragar el fondo oceánico a casi 4.000 metros de profundidad y rescató el extremo del cable roto el año anterior, completando dos líneas activas.'
    ],
    landingStations: [
      { name: 'Valentia Island', city: 'Kerry', country: 'Irlanda', lat: 51.92, lng: -10.36 },
      { name: "Heart's Content", city: "Terranova", country: 'Canadá', lat: 47.87, lng: -53.37 }
    ],
    route: [
      [51.92, -10.36],
      [52.20, -18.00],
      [52.10, -28.00],
      [51.50, -38.00],
      [49.80, -48.00],
      [47.87, -53.37]
    ],
    isHistorical: true
  },
  {
    id: 'hist_1956_tat1',
    name: 'TAT-1 (Transatlantic No. 1, 1956)',
    region: 'historical',
    regionLabel: 'Histórico (1956)',
    lengthKm: 3600,
    capacityTbps: 0.0000001, // 36 canales de voz telefónica analógica
    fiberPairs: 0,
    rfsYear: 1956,
    status: 'historical',
    ownerCategory: 'historical',
    ownerList: ['AT&T', 'British Post Office', 'Canadian Overseas Telecom'],
    technology: 'Cable coaxial con 51 repetidores de válvulas de vacío flexibles sumergidas',
    repeatersEstimate: 51,
    maxDepthMeters: 4200,
    voltageFeedDC: '4.000 V DC',
    color: '#f97316', // orange-500
    summary: 'El primer cable telefónico submarino transatlántico. Sustituyó a la radio de onda corta y permitió conectar 36 llamadas de voz telefónica simultáneas con calidad cristalina.',
    didacticHighlights: [
      'Para que las válvulas de vacío pudieran enrollarse en los carretes de los barcos, Bell Labs diseñó repetidores cilíndricos y flexibles de solo 7 cm de diámetro.',
      'Las válvulas de vacío submarinas estaban construidas con tal pureza y tolerancia que funcionaron sin una sola avería durante más de 22 años seguidos en el fondo helado del océano.',
      'Alobergó la línea directa secreta de teletipo ("Teléfono Rojo") entre la Casa Blanca en Washington y el Kremlin en Moscú tras la crisis de los misiles de Cuba en 1962.'
    ],
    landingStations: [
      { name: 'Gallanach Bay (Oban)', city: 'Escocia', country: 'Reino Unido', lat: 56.40, lng: -5.51 },
      { name: 'Clarenville', city: 'Terranova', country: 'Canadá', lat: 48.16, lng: -53.96 }
    ],
    route: [
      [56.40, -5.51],
      [56.00, -12.00],
      [54.50, -22.00],
      [52.50, -34.00],
      [50.00, -44.00],
      [48.16, -53.96]
    ],
    isHistorical: true
  },
  {
    id: 'hist_1988_tat8',
    name: 'TAT-8 (Primer Cable Transatlántico de Fibra Óptica, 1988)',
    region: 'historical',
    regionLabel: 'Histórico (1988)',
    lengthKm: 6140,
    capacityTbps: 0.00056, // 560 Mbps (2 x 280 Mbps)
    fiberPairs: 3,
    rfsYear: 1988,
    status: 'historical',
    ownerCategory: 'historical',
    ownerList: ['AT&T', 'France Télécom', 'British Telecom'],
    technology: 'Primer enlace comercial de fibra óptica monomodo con lásers semiconductores y repetidores regenerativos optoelectrónicos',
    repeatersEstimate: 125,
    maxDepthMeters: 4500,
    voltageFeedDC: '7.500 V DC',
    color: '#06b6d4', // cyan-500
    summary: 'La chispa óptica que encendió la revolución digital. Con 280 Mbps por par de fibra, multiplicó por diez la capacidad transoceánica y facilitó el nacimiento de internet comercial.',
    didacticHighlights: [
      'Utilizaba diodos láser InGaAsP que emitían pulsos de luz infrarroja a 1.300 nanómetros a través de filamentos de sílice de 8 micrómetros de núcleo.',
      'Podía transportar 40.000 circuitos telefónicos simultáneos, reduciendo drásticamente las tarifas de llamadas internacionales.',
      'Sufrió los primeros ataques documentados de tiburones atraídos por los campos electromagnéticos de la alimentación eléctrica en aguas de las Islas Canarias, obligando a diseñar la armadura de acero moderna.'
    ],
    landingStations: [
      { name: 'Tuckerton', city: 'Nueva Jersey', country: 'Estados Unidos', lat: 39.60, lng: -74.34 },
      { name: 'Widemouth Bay', city: 'Bude', country: 'Reino Unido', lat: 50.79, lng: -4.55 },
      { name: 'Penmarch', city: 'Bretaña', country: 'Francia', lat: 47.81, lng: -4.33 }
    ],
    route: [
      [39.60, -74.34],
      [41.00, -65.00],
      [43.00, -50.00],
      [45.00, -35.00],
      [47.50, -20.00],
      [49.50, -8.00],
      [50.79, -4.55],
      [48.80, -6.00],
      [47.81, -4.33]
    ],
    isHistorical: true
  }
];
