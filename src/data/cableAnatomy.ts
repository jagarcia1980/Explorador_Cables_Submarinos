export interface CableLayer {
  id: string;
  number: number;
  name: string;
  material: string;
  purpose: string;
  thicknessOrSpec: string;
  deepSeaVsShallow: string;
  curiosity: string;
  colorHex: string;
}

export const CABLE_LAYERS: CableLayer[] = [
  {
    id: 'layer-polyethylene',
    number: 1,
    name: 'Cubierta Exterior de Polietileno de Alta Densidad (HDPE)',
    material: 'Polietileno negro químicamente inerte',
    purpose: 'Aislamiento eléctrico absoluto frente al agua marina salada y protección contra abrasión en el fondo arenoso.',
    thicknessOrSpec: 'Espesor ~2.5 mm a 4.0 mm',
    deepSeaVsShallow: 'Presente en todas las versiones. En aguas profundas es la capa exterior visible.',
    curiosity: 'El agua salada marina es un conductor eléctrico excelente. Si esta capa tuviera una fuga microscópica de medio milímetro, los 15.000 voltios de alimentación se fugarían al mar en cortocircuito inmediato.',
    colorHex: '#1e293b'
  },
  {
    id: 'layer-mylar',
    number: 2,
    name: 'Cinta Dieléctrica de Mylar / Poliéster',
    material: 'Película de tereftalato de polietileno (PET)',
    purpose: 'Barrera dieléctrica térmica y mecánica que separa el blindaje metálico del polietileno exterior.',
    thicknessOrSpec: 'Lámina microdelgada helicoidal',
    deepSeaVsShallow: 'Envuelve helicoidalmente la armadura de acero para evitar rozamientos internos.',
    curiosity: 'Mismo material que se utiliza en las mantas espaciales de los astronautas de la NASA.',
    colorHex: '#94a3b8'
  },
  {
    id: 'layer-steel-armor',
    number: 3,
    name: 'Armadura de Alambres de Acero Galvanizado de Alta Tensión',
    material: 'Hilos helicoidales de acero al carbono galvanizado',
    purpose: 'Soportar el peso colosal del cable durante el tendido (hasta 150 kilonewtons de tracción) y proteger contra anclas y mordeduras de fauna.',
    thicknessOrSpec: 'Resistencia a tracción > 1800 MPa',
    deepSeaVsShallow: 'En aguas profundas (>1.500m) es una sola capa ligera de ~17mm de diámetro total (el cable es delgado como una manguera de jardín). En aguas costeras (<1.000m) se duplica con doble coraza pesada hasta alcanzar 50mm de grosor y 5 kg por metro.',
    curiosity: 'Cuando un barco cablero descuelga el cable a 5.000 metros de profundidad, la cuerda suspendida pesa varias toneladas en la vertical. Sin estos alambres de acero, la fibra óptica se desgarraría bajo su propio peso.',
    colorHex: '#cbd5e1'
  },
  {
    id: 'layer-aluminum',
    number: 4,
    name: 'Barrera Hermética de Aluminio',
    material: 'Lámina de aluminio soldada longitudinalmente',
    purpose: 'Barrera absoluta contra la penetración de átomos de hidrógeno molecular y humedad hacia el núcleo óptico.',
    thicknessOrSpec: 'Hermeticidad 100% estanca',
    deepSeaVsShallow: 'Esencial tanto en aguas profundas como someras.',
    curiosity: 'El hidrógeno libre en el océano puede infiltrarse en la red cristalina del vidrio de sílice a lo largo de décadas, provocando una pérdida de transparencia óptica conocida como "oscurecimiento por hidrógeno". Esta barrera lo impide.',
    colorHex: '#e2e8f0'
  },
  {
    id: 'layer-copper-conductor',
    number: 5,
    name: 'Tubo Conductor de Cobre Puro',
    material: 'Cobre electrolítico de alta pureza sin oxígeno (OFHC)',
    purpose: 'Transportar la corriente eléctrica continua (10.000 a 18.000 V DC, ~1.2 Amperios) desde la estación costera para alimentar los amplificadores ópticos EDFA en el lecho marino.',
    thicknessOrSpec: 'Resistencia eléctrica extremadamente baja (~0.7 Ω/km)',
    deepSeaVsShallow: 'Idéntico en todas las profundidades para alimentar los amplificadores cada 60-90 km.',
    curiosity: 'Solo hay un conductor de cobre en todo el cable. El retorno eléctrico para cerrar el circuito se hace por el propio agua salada del océano gracias a ánodos de titanio.',
    colorHex: '#d97706'
  },
  {
    id: 'layer-polycarbonate',
    number: 6,
    name: 'Tubo Central de Policarbonato / Acero Inoxidable',
    material: 'Cilindro rígido de policarbonato extrusionado o acero quirúrgico',
    purpose: 'Contenedor estructural no deformable que aísla las frágiles fibras de vidrio de la colosal presión hidrostática (hasta 800 atmósferas en fosas marinas).',
    thicknessOrSpec: 'Soporta presiones > 80 MPa (800 kg/cm²)',
    deepSeaVsShallow: 'Garantiza que las fibras nunca sufran microcurvaturas por presión ambiental.',
    curiosity: 'A 6.000 metros bajo el mar, la presión del agua aplastaría un submarino de guerra como una lata de refresco, pero este pequeño cilindro mantiene las fibras a salvo.',
    colorHex: '#64748b'
  },
  {
    id: 'layer-thixotropic-gel',
    number: 7,
    name: 'Compuesto Hidrófugo Tixotrópico (Gel de Petróleo)',
    material: 'Gel de hidrocarburo sintético semisólido',
    purpose: 'Amortiguar las vibraciones mecánicas y bloquear instantáneamente el avance del agua salada a lo largo del cable si este sufriera un corte accidental.',
    thicknessOrSpec: 'Viscosidad no newtoniana',
    deepSeaVsShallow: 'Rellena todos los huecos libres entre las fibras ópticas.',
    curiosity: 'Es "tixotrópico": se vuelve líquido cuando se agita durante la fabricación, pero se solidifica como gelatina espesa en reposo, taponando el agua como un tapón hidráulico.',
    colorHex: '#38bdf8'
  },
  {
    id: 'layer-optical-fibers',
    number: 8,
    name: 'Fibras Ópticas Monomodo de Vidrio de Sílice Pura',
    material: 'Dióxido de silicio purísimo (SiO2) dopado con germanio en el núcleo',
    purpose: 'Guiar fotones de luz infrarroja mediante reflexión interna total transportando cientos de Terabits por segundo.',
    thicknessOrSpec: 'Núcleo de 9 µm, revestimiento de 125 µm, funda de acrilato de 250 µm (grosor de un cabello humano)',
    deepSeaVsShallow: 'De 4 a 16 pares de fibra en cables modernos con modulación coherente SDM.',
    curiosity: 'El vidrio es tan inimaginablemente puro que si el agua del océano tuviera la misma pureza óptica, podrías mirar a través de un kilómetro de agua y ver el fondo tan nítido como a través del aire.',
    colorHex: '#06b6d4'
  }
];
