export interface HistoryMilestone {
  id: string;
  year: number;
  title: string;
  subtitle: string;
  era: 'victorian_telegraph' | 'coaxial_voice' | 'optical_revolution' | 'dotcom_darkfiber' | 'cloud_hyperscalers';
  eraLabel: string;
  cableId?: string;
  image?: string;
  locationFocus: {
    lat: number;
    lng: number;
    zoom: number;
    regionName: string;
  };
  headlineMetric: {
    value: string;
    label: string;
  };
  narrative: string;
  breakthroughDetails: string[];
  anecdoteTitle: string;
  anecdoteBody: string;
  curiousFact: string;
}

export const HISTORY_MILESTONES: HistoryMilestone[] = [
  {
    id: 'h-1858-first-cable',
    year: 1858,
    title: 'El Primer Cable Transatlántico: El Saludo de 16 Horas',
    subtitle: 'Cyrus Field une dos mundos con 3.200 km de alambre y gutapercha',
    era: 'victorian_telegraph',
    eraLabel: 'Era Victoriana (1850-1900)',
    cableId: 'hist_1858_telegraph',
    image: '/src/assets/images/ss_great_eastern_cable_1793877434645.jpg',
    locationFocus: {
      lat: 51.5,
      lng: -30.0,
      zoom: 1.8,
      regionName: 'Atlántico Norte (Irlanda - Terranova)'
    },
    headlineMetric: {
      value: '16h 40m',
      label: 'Tiempo en transmitir 98 palabras'
    },
    narrative: `En agosto de 1858, tras cuatro intentos fallidos y millones de dólares invertidos, los buques HMS Agamemnon y USS Niagara se encontraron en mitad del océano tempestuoso para empalmar dos mitades de cable y navegar en direcciones opuestas. Por primera vez en la historia humana, Europa y América podían dialogar a la velocidad del electromagnetismo.`,
    breakthroughDetails: [
      'Material aislante milagroso: Gutapercha natural, savia resinosa de árboles Palaquium de Malasia que no se disuelve en agua salada y soporta la presión del fondo abisal.',
      'El primer mensaje oficial: La Reina Victoria felicitó al presidente de EE.UU. James Buchanan el 16 de agosto de 1858.',
      'Recepción festiva: En Nueva York hubo desfiles con antorchas y fuegos artificiales tan descomunales que el tejado del Ayuntamiento se incendió accidentalmente de júbilo.'
    ],
    anecdoteTitle: 'El trágico error de Wildman Whitehouse',
    anecdoteBody: 'La señal telegráfica llegaba extraordinariamente débil y retardada por la capacitancia del agua marina. El médico y electricista jefe, el Dr. Wildman Whitehouse, creyó equivocadamente que aumentando el voltaje se aceleraría la transmisión. Conectó enormes bobinas de inducción de más de 2.000 voltios. A los 21 días, el altísimo voltaje perforó el fino aislamiento de gutapercha y el cable murió en silencio para siempre en el fondo del Atlántico.',
    curiousFact: 'Antes del cable, un mensaje entre Londres y Nueva York tardaba un mínimo de 10 a 14 días en viajar en barco de vapor si el tiempo era favorable.'
  },
  {
    id: 'h-1866-great-eastern',
    year: 1866,
    title: 'El SS Great Eastern y el Rescate de las Profundidades',
    subtitle: 'El gigantesco vapor de Brunel logra el primer cable transatlántico permanente',
    era: 'victorian_telegraph',
    eraLabel: 'Era Victoriana (1850-1900)',
    cableId: 'hist_1866_great_eastern',
    image: '/src/assets/images/ss_great_eastern_cable_1793877434645.jpg',
    locationFocus: {
      lat: 50.0,
      lng: -32.0,
      zoom: 1.8,
      regionName: 'Atlántico Central'
    },
    headlineMetric: {
      value: '8 palabras/min',
      label: 'Velocidad comercial estable'
    },
    narrative: `El visionario ingeniero Isambard Kingdom Brunel construyó el SS Great Eastern: un leviatán de hierro de 211 metros de eslora, propulsado simultáneamente por ruedas de paletas, hélices y velas. Nadie sabía qué uso darle hasta que se descubrió que era el único barco del planeta capaz de cargar 4.000 toneladas de cable en sus entrañas. En 1866 no solo tendió una línea perfecta entre Irlanda y Canadá, sino que realizó una de las mayores hazañas marinas de todos los tiempos.`,
    breakthroughDetails: [
      'Uso del galvanómetro de espejo inventado por William Thomson (Lord Kelvin), capaz de registrar impulsos eléctricos microscópicos reflejando un rayo de luz sobre una escala graduada sin quemar el cable.',
      'Blindaje exterior reforzado con 10 alambres de hierro galvanizado sumergidos en alquitrán mineral para repeler gusanos xilófagos perforadores.',
      'Estableció la primera red financiera global en tiempo real: los precios del algodón, oro y acciones se sincronizaron entre Wall Street y la City de Londres.'
    ],
    anecdoteTitle: 'La legendaria pesca con garfio a 3.900 metros',
    anecdoteBody: 'El año anterior (1865), el cable se había roto y hundido a 3.900 metros de profundidad. Tras completar el cable nuevo de 1866, el capitán James Anderson regresó a las coordenadas del naufragio con mar encrespado. Durante 30 días arrastraron un garfio de acero por el abismo marino. En el intento número 30 engancharon el cable, lo subieron a cubierta con suavidad extrema, lo empalmaron a bordo y enviaron un mensaje a Valentia que respondió de inmediato. ¡Europa y América tuvieron dos cables en lugar de uno!',
    curiousFact: 'Las acciones de la Anglo-American Telegraph Company se dispararon y Cyrus Field pasó de la ruina a ser condecorado con la Medalla de Oro del Congreso de los Estados Unidos.'
  },
  {
    id: 'h-1956-tat1',
    year: 1956,
    title: 'TAT-1: La Voz Cruzando el Océano y el Teléfono Rojo',
    subtitle: 'El primer cable telefónico submarino y los repetidores de válvulas de vacío',
    era: 'coaxial_voice',
    eraLabel: 'Era Analógica Coaxial (1950-1985)',
    cableId: 'hist_1956_tat1',
    image: '/src/assets/images/underwater_optical_repeater_1793877437594.jpg',
    locationFocus: {
      lat: 52.0,
      lng: -30.0,
      zoom: 1.8,
      regionName: 'Escocia a Terranova'
    },
    headlineMetric: {
      value: '36 llamadas',
      label: 'Circuitos telefónicos simultáneos'
    },
    narrative: `Hasta 1956, toda conversación de voz entre Europa y América dependía de la radio de onda corta: inestable, con ruidos de tormenta solar y fácilmente interceptable. TAT-1 (Transatlantic No. 1) fue una proeza de Bell Labs y el British Post Office, desplegando dos cables coaxiales gemelos (uno para cada dirección de voz) con amplificadores sumergidos en el abismo.`,
    breakthroughDetails: [
      'Repetidores de válvulas termoiónicas flexibles: Tubos cilíndricos de 7 cm diseñados para pasar por las poleas de los barcos cableros sin dañarse.',
      'Fiabilidad militar: Cada válvula fue construida en salas limpias con cátodos de níquel puro inspeccionados individualmente al microscopio. Operaron durante 22 años sin una sola avería.',
      'El primer día se cursaron 588 llamadas comerciales a un coste de unos 3 dólares por minuto (equivalente a casi 35 dólares actuales).'
    ],
    anecdoteTitle: 'El "Teléfono Rojo" de la Guerra Fría',
    anecdoteBody: 'Tras la escalofriante Crisis de los Misiles en Cuba (1962), donde los mensajes entre John F. Kennedy y Nikita Jrushchov tardaban horas en descifrarse por canales diplomáticos tradicionales, se creó la línea directa de emergencia Washington-Moscú. Aunque en las películas era un teléfono de auricular rojo, en realidad era un teletipo cifrado que viajaba a través de un canal prioritario reservado en el cable TAT-1.',
    curiousFact: 'TAT-1 requirió instalar dos cables separados porque en aquella época la tecnología de filtros no permitía transmitir audio bidireccional por un solo conductor coaxial a esas distancias.'
  },
  {
    id: 'h-1988-tat8',
    year: 1988,
    title: 'TAT-8: La Fibra Óptica y el Alumbramiento de Internet',
    subtitle: 'La luz sustituye al cobre y los tiburones provocan el rediseño del blindaje',
    era: 'optical_revolution',
    eraLabel: 'Revolución Óptica (1985-2005)',
    cableId: 'hist_1988_tat8',
    image: '/src/assets/images/submarine_cable_cross_section_1793877435888.jpg',
    locationFocus: {
      lat: 45.0,
      lng: -35.0,
      zoom: 1.8,
      regionName: 'Nueva Jersey - Bude / Brest'
    },
    headlineMetric: {
      value: '280 Mbps',
      label: 'Por par de fibra (40.000 llamadas)'
    },
    narrative: `A finales de los 80, el cobre ya no podía sostener la explosión de datos informáticos. TAT-8 marcó el punto de inflexión definitivo: abandonó la electricidad para transmitir fotones de luz infrarroja a través de hebras de vidrio de sílice tan transparentes que un bloque de 1 km de grosor parecería una ventana limpia. Conectó Nueva Jersey con el Reino Unido y Francia a través de una bifurcación submarina.`,
    breakthroughDetails: [
      'Fibra monomodo a 1.300 nanómetros: Capaz de transmitir 280 Megabits por segundo, multiplicando por 10 la capacidad de todos los cables transatlánticos coaxiales previos combinados.',
      'Repetidores optoelectrónicos: Detectaban la señal óptica debilitada, la convertían a pulso eléctrico, regeneraban la onda limpia y volvían a emitir un rayo láser.',
      'Soporte clave para el despliegue del CERN, ARPANET y la futura World Wide Web diseñada por Tim Berners-Lee en 1989.'
    ],
    anecdoteTitle: 'La mordedura de tiburón que cambió la ingeniería',
    anecdoteBody: 'Durante las pruebas pioneras del cable en aguas cálidas de las Islas Canarias en 1985, los técnicos detectaron pérdidas de señal misteriosas. Al izar el cable a la superficie encontraron dientes fosfatados incrustados en el plástico exterior. Los tiburones poseen órganos electrorreceptores llamados ampollas de Lorenzini. Detectaban el campo electromagnético de 7.500 V del cable confundiéndolo con los espasmos musculares de un pez agonizante. A partir de entonces, se diseñó la doble coraza helicoidal de acero que hoy llevan todos los cables en aguas medias.',
    curiousFact: 'Las fibras ópticas del TAT-8 tenían un núcleo de solo 8,3 micrómetros de espesor, diez veces más delgado que un cabello humano.'
  },
  {
    id: 'h-2006-taiwan-earthquake',
    year: 2006,
    title: 'El Terremoto de Taiwán: El Día que se Apagó Asia',
    subtitle: 'El seísmo de Hengchun parte 8 cables simultáneos y expone la fragilidad global',
    era: 'dotcom_darkfiber',
    eraLabel: 'Crisis y Resiliencia (2000-2015)',
    image: '/src/assets/images/cable_repair_ship_rov_1793877436589.jpg',
    locationFocus: {
      lat: 21.8,
      lng: 120.5,
      zoom: 3.5,
      regionName: 'Estrecho de Luzón (Taiwán - Filipinas)'
    },
    headlineMetric: {
      value: '8 cables',
      label: 'Cortados simultáneamente por avalancha submarina'
    },
    narrative: `El 26 de diciembre de 2006, un terremoto de magnitud 7,1 en la costa suroeste de Taiwán provocó un alud de sedimentos y corrientes de turbidez colosales en el cañón submarino de Kaoping. En cuestión de minutos, ocho sistemas principales de cable submarino que canalizaban el tráfico entre Hong Kong, Taiwán, Japón, China y Singapur fueron cercenados como si fueran hilos de coser.`,
    breakthroughDetails: [
      'Efecto dominó financiero: Los mercados bursátiles y transferencias bancarias de toda Asia se congelaron. En Taiwán la capacidad internacional cayó un 98%; en Hong Kong un 80%.',
      'Despliegue de barcos cableros: Se necesitaron 11 buques especializados trabajando durante 49 días continuados con sonar de barrido y robots ROV en medio de temporales.',
      'Lección para la arquitectura de internet: Se abandonaron las rutas concentradas en un solo estrecho geográfico en favor de la "geodiversidad" multiruta.'
    ],
    anecdoteTitle: 'La física de las corrientes de turbidez',
    anecdoteBody: 'Los cables no se rompieron por el temblor sísmico en sí, sino por una avalancha submarina de fango y rocas que viajó a más de 40 km/h por el cañón abisal. El peso de millones de toneladas de lodo en movimiento cortó cables blindados de acero con la misma facilidad que una cizalla industrial.',
    curiousFact: 'Desde este desastre, los gigantes tecnológicos exigen una política de redundancia "N+2": si dos cables enteros caen a la vez, el servicio debe seguir funcionando al 100% por rutas alternativas.'
  },
  {
    id: 'h-2017-marea-cloud',
    year: 2017,
    title: 'MAREA: La Invasión de las Big Tech en el Abismo',
    subtitle: 'Microsoft, Meta y Telxius unen Bilbao con Virginia Beach y cambian las reglas',
    era: 'cloud_hyperscalers',
    eraLabel: 'Era Hyperscalers (2015-Actualidad)',
    cableId: 'marea',
    image: '/src/assets/images/submarine_cable_cross_section_1793877435888.jpg',
    locationFocus: {
      lat: 41.0,
      lng: -40.0,
      zoom: 2.0,
      regionName: 'Corredor Bilbao - Virginia Beach'
    },
    headlineMetric: {
      value: '224 Tbps',
      label: 'Capacidad de diseño récord'
    },
    narrative: `Durante más de un siglo, los cables submarinos fueron construidos exclusivamente por consorcios de operadoras de telecomunicaciones tradicionales (AT&T, Telefónica, France Télécom). En 2017, Microsoft y Facebook (Meta) decidieron financiar directamente su propio cable transatlántico junto a Telxius. Necesitaban mover petabytes entre sus gigantescos centros de datos de IA y computación en la nube sin depender de intermediarios.`,
    breakthroughDetails: [
      'Ruta meridional resiliente: Situado 1.000 km al sur de los saturados corredores de Nueva York, evita zonas de huracanes invernales y fondos rocosos peligrosos.',
      'Diseño "Open Cable": Permite actualizar los transmisores láser y tarjetas transpondedoras en las estaciones de tierra sin necesidad de tocar el cable en el fondo del mar.',
      'En 2019, experimentos con modulación 16-QAM lograron exprimir 224 Terabits por segundo, rompiendo todas las marcas mundiales.'
    ],
    anecdoteTitle: 'El despertar de las Big Tech propietarias del mar',
    anecdoteBody: 'En la década de 1990, las empresas de telecomunicaciones poseían el 95% de la capacidad submarina mundial. Hoy, Google, Meta, Microsoft y Amazon poseen o alquilan más del 70% de todo el ancho de banda transoceánico del planeta, convirtiéndose de facto en los nuevos amos de las arterias del mundo.',
    curiousFact: 'La estación de aterrizaje de Sopelana (Bilbao) se convirtió en uno de los puntos neurálgicos de internet más codiciados de Europa por su conexión directa con la nube de Madrid y Frankfurt.'
  },
  {
    id: 'h-2022-tonga-volcano',
    year: 2022,
    title: 'El Volcán de Tonga: Un Reino Aislado del Mundo',
    subtitle: 'La explosión volcánica submarina que cortó el único cordón umbilical del archipiélago',
    era: 'cloud_hyperscalers',
    eraLabel: 'Era Hyperscalers (2015-Actualidad)',
    image: '/src/assets/images/cable_repair_ship_rov_1793877436589.jpg',
    locationFocus: {
      lat: -20.5,
      lng: -175.4,
      zoom: 3.8,
      regionName: 'Pacífico Sur (Reino de Tonga)'
    },
    headlineMetric: {
      value: '38 días',
      label: 'Aislamiento total de internet'
    },
    narrative: `El 15 de enero de 2022, el volcán submarino Hunga Tonga-Hunga Ha'apai hizo erupción con una fuerza cientos de veces superior a la bomba atómica de Hiroshima, expulsando ceniza a 58 km hacia la estratosfera. La onda de choque y los flujos piroclásticos submarinos seccionaron a 37 km de distancia el único cable de 827 km que unía a las 100.000 personas de Tonga con Fiyi y el resto del mundo.`,
    breakthroughDetails: [
      'Blackout total: Los servicios de tarjetas de crédito, llamadas internacionales a familiares de la diáspora, coordinación de rescate y pagos de remesas se esfumaron instantáneamente.',
      'Misión de rescate marino: El buque cablero CS Reliance tardó más de 10 días en navegar desde Papúa Nueva Guinea a través de aguas cubiertas de ceniza volcánica ácida y piedra pómez flotante.',
      'El cable había sido empujado más de 5 km de su posición original y enterrado bajo metros de rocas volcánicas a 1.700 metros de profundidad.'
    ],
    anecdoteTitle: 'La solidaridad con barcos cableros',
    anecdoteBody: 'El equipo de reparación tuvo que sustituir más de 92 km de cable severamente deformado por el calor y la violencia del choque. Tras 38 días de trabajo heroico empalmando fibras de vidrio en alta mar, el país volvió a encender sus pantallas.',
    curiousFact: 'Tonga dependía de un único cable submarino por motivos económicos, demostrando el riesgo existencial que sufren las naciones insulares pequeñas.'
  },
  {
    id: 'h-2024-firmina-2africa',
    year: 2024,
    title: 'Firmina y 2Africa: La Megainfraestructura del Futuro',
    subtitle: 'Alimentación eléctrica unilateral y 45.000 kilómetros envolviendo el continente africano',
    era: 'cloud_hyperscalers',
    eraLabel: 'Era Hyperscalers (2015-Actualidad)',
    cableId: 'two_africa',
    image: '/src/assets/images/underwater_optical_repeater_1793877437594.jpg',
    locationFocus: {
      lat: 0.0,
      lng: 15.0,
      zoom: 1.5,
      regionName: 'Circunnavegación Africana y Panamericana'
    },
    headlineMetric: {
      value: '45.000 km',
      label: 'Longitud del cable 2Africa'
    },
    narrative: `Los cables contemporáneos no solo multiplican su capacidad mediante multiplexación por división espacial (SDM), sino que desafían los límites de la física de potencia eléctrica y la escala continental. El cable 2Africa conecta 33 naciones rodeando el continente africano, mientras que Firmina une Norteamérica con Argentina y Brasil con un diseño eléctrico revolucionario.`,
    breakthroughDetails: [
      'Alimentación unilateral con 18.000 V: Firmina es el primer cable ultralargo capaz de encender todos sus amplificadores submarinos desde una sola costa si la contraria pierde la corriente eléctrica.',
      '2Africa circunnavega todo el continente africano con 16 pares de fibra y enterramiento a 3 metros bajo el lecho marino en zonas de pesca intensa.',
      'Soporte directo para la revolución de la Inteligencia Artificial generativa: el movimiento continuo de modelos de billones de parámetros entre clústeres distribuidos por todo el globo.'
    ],
    anecdoteTitle: 'El retorno por el agua salada',
    anecdoteBody: '¿Por qué los cables submarinos solo llevan un conductor central de cobre en lugar de dos cables (fase y neutro)? Porque utilizan el propio océano como cable de retorno de tierra. Un ánodo en una costa inyecta hasta 18.000 V de corriente continua que viaja por el tubo de cobre hacia los repetidores, y el cátodo en la costa opuesta recoge los electrones disipados a través del agua salada marina, ahorrando millones de toneladas de peso de cobre.',
    curiousFact: 'A pesar del auge de las constelaciones de satélites en órbita baja como Starlink, el 99% de todo el tráfico intercontinental sigue dependiendo de estos filamentos que descansan silenciosos en la fosa oceánica.'
  }
];
