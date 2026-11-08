export interface TriviaItem {
  id: string;
  category: 'anecdote' | 'myth_busting' | 'engineering' | 'espionage' | 'physics';
  categoryLabel: string;
  title: string;
  shortSnippet: string;
  fullStory: string;
  takeaway: string;
  iconName: 'Zap' | 'ShieldAlert' | 'Anchor' | 'Radio' | 'Eye' | 'Cpu' | 'Waves';
  image?: string;
}

export const TRIVIA_ITEMS: TriviaItem[] = [
  {
    id: 't-sharks',
    category: 'myth_busting',
    categoryLabel: 'Mito vs Realidad',
    title: '¿Realmente muerden los tiburones los cables submarinos?',
    shortSnippet: 'Los tiburones sí mordieron cables en los 80, pero representan menos del 1% de los incidentes reales hoy.',
    fullStory: `En 1985 se popularizó el mito de que los tiburones estaban "devorando la internet submarina" después de que los técnicos extrajeran del mar dientes fosfatados incrustados en un cable experimental frente a las Islas Canarias.

Los tiburones tienen en el hocico unos órganos sensoriales electrorreceptores llamados 'ampollas de Lorenzini'. Estos órganos son capaces de detectar campos electromagnéticos minúsculos (nanovoltios) emitidos por los músculos de presas heridas. Los primeros cables de fibra óptica tenían voltajes de alimentación de miles de voltios que generaban un leve gradiente eléctrico cuando el blindaje no estaba apantallado. Los tiburones mordían el cable buscando una comida que no existía.

Sin embargo, desde finales de los 80, todos los cables submarinos cuentan con capas de protección de acero y apantallamiento que anulan completamente la fuga electromagnética. Hoy en día, más del 70% de las averías son causadas por anclas de barcos comerciales y redes de pesca de arrastre, mientras que los ataques de fauna marina representan menos del 0,5% de las roturas documentadas por el Comité Internacional de Protección de Cables (ICPC).`,
    takeaway: 'El mayor depredador de los cables submarinos no es el tiburón, sino el ancla de un carguero a la deriva.',
    iconName: 'ShieldAlert',
    image: '/src/assets/images/submarine_cable_cross_section_1793877435888.jpg'
  },
  {
    id: 't-satellites-vs-cables',
    category: 'physics',
    categoryLabel: 'Física y Capacidad',
    title: '¿Por qué el 99% de Internet no viaja por satélites (Starlink)?',
    shortSnippet: 'Un solo cable transoceánico de 12 pares de fibra tiene más capacidad que miles de satélites combinados.',
    fullStory: `Existe la creencia popular de que Internet viaja por el cielo a través de satélites espaciales. La realidad es exactamente la contraria: más del 99% del tráfico intercontinental del planeta Tierra discurre por el fondo del océano.

¿Por qué?
1. Capacidad astronómica: Un solo cable moderno como Dunant o MAREA transporta entre 220 y 250 Terabits por segundo (Tbps). Eso equivale a enviar miles de satélites enteros de ancho de banda por un cable que tiene el grosor de una manguera de jardín.
2. Espectro radioeléctrico finito: Las ondas de radio en el espacio deben compartir frecuencias atmosféricas que sufren interferencias por lluvia, nubes y limitaciones termodinámicas. La fibra óptica, en cambio, confina la luz dentro de hilos de vidrio puro sin interferencias externas.
3. Coste por bit: El coste de construir y tender un cable de 6.000 km que dura 25 años en el fondo marino es de unos 200-300 millones de dólares; lanzar suficientes satélites para igualar ese tráfico continuo costaría decenas de miles de millones y los satélites se desintegran en la atmósfera a los 5 años.`,
    takeaway: 'La fibra óptica confinada en vidrio bajo el agua ofrece un ancho de banda que ninguna tecnología inalámbrica espacial puede igualar.',
    iconName: 'Radio'
  },
  {
    id: 't-ivy-bells-espionage',
    category: 'espionage',
    categoryLabel: 'Guerra Fría y Espionaje',
    title: 'Operación Ivy Bells: El submarino espía que pinchó el fondo del mar',
    shortSnippet: 'La Marina de EE.UU. instaló una cápsula de 6 toneladas con cintas magnéticas sobre un cable militar soviético en 1971.',
    fullStory: `En plena Guerra Fría, la Unión Soviética conectaba su base naval de submarinos nucleares en Petropávlovsk-Kamchatski con el cuartel general de la Flota del Pacífico en Vladivostok mediante un cable submarino que cruzaba el Mar de Ojotsk.

Convencidos de que el mar interior soviético era inexpugnable, los comandantes de la URSS transmitían mensajes militares y órdenes de misiles balísticos sin cifrar.

En octubre de 1971, el submarino estadounidense USS Halibut (modificado con propulsores de posicionamiento y esquís para apoyarse en el lecho marino) penetró secretamente en aguas enemigas. Buzos de saturación descendieron a 120 metros y envolvieron el cable con un dispositivo cilíndrico de inducción electromagnética de 6 metros de largo y 6 toneladas, sin cortar el cable para no alertar de pérdidas de señal.

El artefacto grababa en cintas de audio magnéticas todos los mensajes militares. Cada pocos meses, otro submarino sigiloso regresaba a cambiar las cintas. La operación duró casi 10 años hasta que un exempleado de la NSA, Ronald Pelton, vendió el secreto a la KGB por 35.000 dólares. Hoy, la cápsula capturada se exhibe en el museo de la KGB en Moscú.`,
    takeaway: 'Los cables pueden interceptarse sin cortar su vidrio mediante transformadores de inducción sobre el blindaje.',
    iconName: 'Eye'
  },
  {
    id: 't-high-voltage-ocean',
    category: 'engineering',
    categoryLabel: 'Ingeniería Extrema',
    title: '15.000 Voltios bajo el mar y el retorno por agua salada',
    shortSnippet: 'Los amplificadores ópticos se encienden con corriente continua usando el propio océano como cable de tierra.',
    fullStory: `Los pulsos de luz en una fibra óptica se atenúan progresivamente a medida que viajan por el vidrio. Cada 60 a 90 kilómetros es obligatorio intercalar un amplificador óptico (EDFA) que estimule los fotones mediante iones de erbio y láseres de bombeo.

¿De dónde sale la electricidad para encender un centenar de amplificadores a 5.000 metros bajo el mar?

En las estaciones de aterrizaje costeras existen las 'PFE' (Power Feeding Equipment): gigantescos convertidores de energía que inyectan una corriente continua constante de 1 a 1,6 amperios con una tensión de entre 10.000 y 18.000 voltios.

La electricidad viaja por un único tubo de cobre interno que rodea las fibras. Para cerrar el circuito eléctrico y no duplicar el peso con un segundo cable de retorno, los ingenieros utilizan un lecho de electrodos de titanio sumergidos en la orilla: los electrones regresan cruzando miles de kilómetros a través del agua salada marina, que actúa como un conductor natural descomunal.`,
    takeaway: 'El océano entero actúa como el conductor negativo de retorno para alimentar los láseres del lecho marino.',
    iconName: 'Zap',
    image: '/src/assets/images/underwater_optical_repeater_1793877437594.jpg'
  },
  {
    id: 't-cable-ships-plows',
    category: 'engineering',
    categoryLabel: 'Ingeniería Naval',
    title: 'Barcos cableros y el arado submarino a 3.000 metros de profundidad',
    shortSnippet: 'Cómo se entierran miles de kilómetros de cable en el fondo marino para protegerlos de anclas y redes.',
    fullStory: `En mitad del océano abisal, a 4.000 o 5.000 metros de profundidad, el lecho marino es un desierto tranquilo donde el cable simplemente descansa sobre la arena. Sin embargo, en las plataformas continentales cercanas a la costa (a menos de 1.500 metros), el mar está lleno de pesqueros con redes de arrastre y barcos mercantes que echan anclas de decenas de toneladas.

Para protegerlos, los buques cableros no solo dejan caer el cable, sino que remolcan un 'arado submarino' (sea plow) de más de 30 toneladas de peso.

El arado se apoya en el fondo, inyecta chorros de agua a alta presión para licuar el fango y corta una trinchera de 1 a 3 metros de profundidad donde deposita el cable antes de que los sedimentos vuelvan a cubrirlo de forma natural.

Si un cable se rompe, robots submarinos no tripulados (ROVs) con cámaras HD y brazos hidráulicos descienden al fondo, cortan la sección dañada con sierras de diamante, fijan garfios y la izan a la cubierta del barco para que los técnicos empalmen microscópicamente cada hebra de fibra en una sala limpia en mitad de las olas.`,
    takeaway: 'Cerca de las costas, los cables están enterrados hasta 3 metros bajo el fango mediante arados hidráulicos gigantes.',
    iconName: 'Anchor',
    image: '/src/assets/images/cable_repair_ship_rov_1793877436589.jpg'
  },
  {
    id: 't-speed-of-light-silica',
    category: 'physics',
    categoryLabel: 'Física de la Luz',
    title: 'La velocidad de la luz en la fibra: ¿Por qué no va a 300.000 km/s?',
    shortSnippet: 'La luz en el vidrio de sílice viaja un 31% más lenta que en el vacío debido al índice de refracción.',
    fullStory: `Todos aprendemos en la escuela que la velocidad de la luz es de aproximadamente 300.000 km/s ($299.792\\text{ km/s}$). Pero esa es su velocidad en el vacío del espacio.

En el interior de un cable de fibra óptica submarino, la luz viaja a través de un núcleo de dióxido de silicio purísimo ($SiO_2$). El índice de refracción del vidrio de sílice para longitudes de onda infrarrojas de telecomunicaciones ($1.550\\text{ nm}$) es de aproximadamente $n \\approx 1,468$.

Aplicando la ley física:
$$v = \\frac{c}{n} = \\frac{299.792\\text{ km/s}}{1,468} \\approx 204.200\\text{ km/s}$$

Esto significa que cada 1.000 kilómetros de cable submarino añaden un retraso físico insalvable de aproximadamente 4,9 milisegundos en un sentido (9,8 ms de ida y vuelta o Round Trip Time).

Por eso, los operadores financieros de alta frecuencia pagan millones de dólares por cables que sigan la ruta geodésica más recta posible: ahorrar solo 3 milisegundos entre Londres y Nueva York permite ejecutar operaciones bursátiles milésimas antes que la competencia.`,
    takeaway: 'La luz submarina viaja a unos 204.000 km/s: unos 5 milisegundos de latencia por cada 1.000 km de fibra.',
    iconName: 'Waves'
  },
  {
    id: 't-gutta-percha',
    category: 'anecdote',
    categoryLabel: 'Historia de los Materiales',
    title: 'La gutapercha: La savia de árbol que conectó el Imperio Británico',
    shortSnippet: 'Antes del plástico sintético, el único aislante impermeable del mundo provenía de un árbol de la jungla de Malasia.',
    fullStory: `En la década de 1840, la humanidad no conocía los polímeros plásticos ni el polietileno. El caucho natural común se disolvía y pudría rápidamente en agua salada y se volvía quebradizo con el frío del fondo marino.

Todo cambió cuando el cirujano escocés William Montgomerie descubrió en Singapur que los nativos fabricaban mangos de látigos y cuchillos con una sustancia extraída del árbol Palaquium gutta: la gutapercha.

A temperatura ambiente era dura y flexible como el cuero, pero sumergida en agua caliente se moldeaba con facilidad y, lo más crucial, era un aislante eléctrico perfecto que se volvía aún más resistente bajo la gélida presión abisal.

Michael Faraday y Werner von Siemens diseñaron máquinas para extruir gutapercha alrededor de alambres de cobre. Durante cuatro décadas, millones de árboles fueron talados en el sudeste asiático para recubrir los 300.000 kilómetros de cables telegráficos del Imperio Británico, hasta la invención del polietileno en los años 1930.`,
    takeaway: 'El primer telégrafo global fue posible gracias a la savia biológica de un árbol tropical antes de que existieran los plásticos.',
    iconName: 'Cpu'
  }
];
