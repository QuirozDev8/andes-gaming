import aggregationGrowthImage from "../../assets/img/blog/agregacion-crecimiento-operadores.webp";
import regionalExpansionImage from "../../assets/img/blog/caso-expansion-regional.webp";
import multiBrandImage from "../../assets/img/blog/caso-operacion-multimarca.webp";
import catalogUpdateImage from "../../assets/img/blog/catalogo-contenido-andes.webp";
import latamCatalogImage from "../../assets/img/blog/catalogo-juegos-latam.webp";
import integrationChecklistImage from "../../assets/img/blog/checklist-integracion-api.webp";
import providerDiscoveryImage from "../../assets/img/blog/descubrimiento-proveedores.webp";
import aggregatorEvaluationImage from "../../assets/img/blog/evaluar-agregador-juegos.webp";
import { ROUTES } from "../../routes/routePaths";

export type BlogCategory =
  | "articulos"
  | "guias"
  | "actualizaciones"
  | "casos-de-exito";

export type BlogArticleSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  callout?: string;
};

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  author: {
    name: string;
    role: string;
  };
  tags: readonly string[];
  featured?: boolean;
  disclaimer?: string;
  sections: readonly BlogArticleSection[];
  relatedProduct: {
    label: string;
    description: string;
    path: string;
  };
};

export const blogPageContent = {
  // Los textos de interfaz permanecen separados de los artículos para facilitar
  // una futura migración a i18n o a un CMS sin modificar los componentes.
  hero: {
    eyebrow: "Andes Insights",
    title: "Ideas que impulsan",
    accent: "el futuro del iGaming",
    description:
      "Artículos, guías y experiencias para construir operaciones más ágiles, escalables y preparadas para crecer.",
    topics: ["Estrategia", "Integración", "Operación"],
    topicsLabel: "Temas principales",
  },
  featured: {
    eyebrow: "Lectura recomendada",
    action: "Leer guía completa",
    openLabel: "Abrir artículo destacado",
  },
  card: {
    openLabel: "Abrir artículo",
    action: "Leer artículo",
    minutesLabel: "min",
  },
  catalog: {
    eyebrow: "Centro de conocimiento",
    title: "Explora nuestras publicaciones",
    description:
      "Encuentra análisis, recursos prácticos y aprendizajes para tomar decisiones con mayor contexto.",
    filterLabel: "Filtrar publicaciones por categoría",
    loadMore: "Ver más publicaciones",
    postsLabel: "Publicaciones del blog",
    resultsLabel: "publicaciones visibles en el catálogo",
    carouselControlsLabel: "Controles del carrusel de publicaciones",
    previousPostLabel: "Ver publicación anterior",
    nextPostLabel: "Ver publicación siguiente",
    carouselPositionLabel: "Publicación",
    carouselPositionOfLabel: "de",
  },
  modal: {
    closeLabel: "Cerrar artículo",
    authorLabel: "Escrito por",
    updatedLabel: "Actualizado",
    readingTimeLabel: "min de lectura",
    tagsLabel: "Temas del artículo",
    contactEyebrow: "Lleva estas ideas a tu operación",
    contactTitle: "Conversemos sobre tu próximo paso",
    contactDescription:
      "Nuestro equipo puede ayudarte a conectar contenido, simplificar integraciones y preparar tu operación para crecer.",
    contactAction: "Hablar con un especialista",
    relatedAction: "Explorar producto relacionado",
  },
  cta: {
    eyebrow: "De la idea a la integración",
    title: "Una sola conexión. Más posibilidades para tu operación.",
    description:
      "Descubre cómo Andes Gaming puede ayudarte a organizar, conectar y escalar tu oferta de contenido.",
    primaryAction: "Hablar con un especialista",
    secondaryAction: "Conocer Casino Aggregation",
    primaryPath: ROUTES.contact,
    secondaryPath: ROUTES.casinoAggregation,
  },
} as const;

export const blogCategories = [
  { id: "todos", label: "Todos" },
  { id: "articulos", label: "Artículos" },
  { id: "guias", label: "Guías" },
  { id: "actualizaciones", label: "Actualizaciones" },
  { id: "casos-de-exito", label: "Casos de éxito" },
] as const;

export type BlogCategoryFilter = (typeof blogCategories)[number]["id"];

export const blogPosts: readonly BlogPost[] = [
  // Las fechas ISO mantienen un orden editorial estable y predecible.
  {
    slug: "checklist-integracion-api",
    category: "guias",
    title: "Checklist para integrar múltiples proveedores mediante una sola API",
    excerpt:
      "Una ruta práctica para alinear producto, tecnología y operación antes de conectar un nuevo ecosistema de contenido.",
    image: integrationChecklistImage,
    imageAlt:
      "Núcleo tecnológico conectado con múltiples módulos mediante flujos de datos violetas y cian",
    publishedAt: "2026-08-04",
    readingTime: 8,
    author: {
      name: "Equipo Andes Gaming",
      role: "Integraciones y producto",
    },
    tags: ["API", "Integración", "Operación", "Proveedores"],
    featured: true,
    sections: [
      {
        title: "Antes de conectar: define el resultado esperado",
        paragraphs: [
          "Una integración sólida comienza antes de revisar endpoints. El primer paso es acordar qué mercados, monedas, dispositivos y tipos de contenido debe soportar la operación. Esa definición permite priorizar proveedores y evita convertir el catálogo en una suma de decisiones aisladas.",
          "También conviene identificar desde el inicio a los responsables de producto, tecnología, cumplimiento y soporte. Cuando cada equipo conoce sus entregables y criterios de aceptación, la conexión avanza con menos bloqueos y con una visión compartida del lanzamiento.",
        ],
        bullets: [
          "Mercados, monedas e idiomas de la primera etapa.",
          "Proveedores y categorías de contenido prioritarios.",
          "Flujos de autenticación, sesiones, apuestas y liquidación.",
          "Responsables de pruebas, aprobación y salida a producción.",
        ],
      },
      {
        title: "Valida el flujo técnico de extremo a extremo",
        paragraphs: [
          "La documentación es solo el punto de partida. El entorno de pruebas debe reproducir el recorrido completo: creación de sesión, apertura de contenido, movimientos de saldo, rondas incompletas, reintentos y cierre. La meta no es comprobar únicamente el escenario ideal, sino entender cómo responde la operación ante latencia, duplicados o interrupciones.",
        ],
        bullets: [
          "Idempotencia y trazabilidad de cada transacción.",
          "Manejo consistente de errores y tiempos de espera.",
          "Registro de eventos suficiente para soporte y conciliación.",
          "Pruebas responsive y de rendimiento en dispositivos reales.",
        ],
        callout:
          "Una API unificada aporta valor cuando reduce variaciones operativas, no solo cuando concentra endpoints.",
      },
      {
        title: "Prepara la operación, no solo el lanzamiento",
        paragraphs: [
          "Después de la certificación técnica comienza el trabajo cotidiano. Define cómo se activará o pausará contenido, quién recibirá alertas, cómo se escalarán incidentes y qué información necesitará el equipo para conciliar. Un catálogo que puede crecer necesita reglas claras de gobierno desde el primer día.",
          "Cierra el proceso con una salida gradual. Empieza con un conjunto controlado de contenido, observa estabilidad y comportamiento operativo, y amplía el alcance con evidencia. Esta secuencia protege la experiencia del usuario final y da al equipo margen para ajustar sin fricción.",
        ],
      },
    ],
    relatedProduct: {
      label: "Casino Aggregation",
      description: "Conecta múltiples proveedores desde una sola integración.",
      path: ROUTES.casinoAggregation,
    },
  },
  {
    slug: "agregacion-crecimiento-operadores",
    category: "articulos",
    title: "Por qué la agregación de juegos acelera el crecimiento de un operador",
    excerpt:
      "Crecer no debería significar multiplicar integraciones, procesos y puntos de falla. Una capa de agregación ayuda a ordenar esa complejidad.",
    image: aggregationGrowthImage,
    imageAlt:
      "Módulos tecnológicos dispersos que convergen en una plataforma escalable iluminada en violeta",
    publishedAt: "2026-07-29",
    readingTime: 6,
    author: {
      name: "Equipo Andes Gaming",
      role: "Estrategia de producto",
    },
    tags: ["Agregación", "Escalabilidad", "Operadores"],
    sections: [
      {
        title: "El costo oculto de crecer conexión por conexión",
        paragraphs: [
          "Cada proveedor directo puede sumar contenido valioso, pero también incorpora documentación, certificaciones, monitoreo y procesos de soporte propios. Cuando estas diferencias se acumulan, el equipo dedica una parte creciente de su tiempo a mantener conexiones en lugar de mejorar el producto.",
          "La fragmentación también afecta la velocidad de decisión. Activar un mercado, revisar disponibilidad o resolver una incidencia exige consultar fuentes distintas. El problema deja de ser exclusivamente técnico y se convierte en una limitación operativa.",
        ],
      },
      {
        title: "Una capa común convierte variedad en capacidad",
        paragraphs: [
          "La agregación crea una interfaz compartida entre el operador y un conjunto amplio de proveedores. Esto permite repetir patrones de integración, normalizar información y administrar el catálogo desde un punto más predecible.",
          "El beneficio real no está en acumular la mayor cantidad posible de juegos. Está en reducir el esfuerzo necesario para probar, seleccionar y activar el contenido correcto para cada audiencia.",
        ],
        bullets: [
          "Menos variaciones técnicas que mantener.",
          "Mayor velocidad para probar nuevo contenido.",
          "Procesos de soporte y conciliación más consistentes.",
          "Una base preparada para expansión regional.",
        ],
      },
      {
        title: "Escalar con criterio",
        paragraphs: [
          "La agregación no reemplaza la estrategia de catálogo. La fortalece. Con una base operativa ordenada, producto puede evaluar relevancia, desempeño y experiencia sin que cada decisión implique iniciar un proyecto técnico independiente.",
          "Para un operador en crecimiento, esa capacidad de aprender y ajustar con rapidez suele ser más valiosa que cualquier lanzamiento aislado.",
        ],
      },
    ],
    relatedProduct: {
      label: "Casino Aggregation",
      description: "Descubre una forma más simple de ampliar tu oferta de juegos.",
      path: ROUTES.casinoAggregation,
    },
  },
  {
    slug: "catalogo-juegos-latam",
    category: "articulos",
    title: "Cómo construir un catálogo de juegos relevante para mercados LATAM",
    excerpt:
      "La disponibilidad global no garantiza relevancia local. Un catálogo efectivo combina contexto, variedad y capacidad de aprendizaje.",
    image: latamCatalogImage,
    imageAlt:
      "Conjuntos de contenido regional conectados a un núcleo tecnológico central",
    publishedAt: "2026-07-22",
    readingTime: 7,
    author: {
      name: "Equipo Andes Gaming",
      role: "Contenido y mercados",
    },
    tags: ["LATAM", "Catálogo", "Contenido", "Mercados"],
    sections: [
      {
        title: "Relevancia local antes que volumen",
        paragraphs: [
          "Latinoamérica reúne mercados con hábitos, regulaciones, métodos de pago y niveles de madurez diferentes. Tratar la región como una sola audiencia suele producir catálogos extensos, pero difíciles de navegar y con poca intención editorial.",
          "El punto de partida es entender qué experiencias resultan familiares para cada mercado: formatos, ritmos, temáticas, dispositivos y momentos de consumo. Esa lectura debe orientar la selección inicial y no limitarse a una traducción de interfaz.",
        ],
      },
      {
        title: "Diseña una mezcla que pueda evolucionar",
        paragraphs: [
          "Un catálogo sano combina títulos reconocibles, propuestas nuevas y suficiente diversidad para evitar que toda la experiencia dependa de unos pocos contenidos. También necesita reglas para incorporar novedades sin desplazar lo que ya funciona.",
        ],
        bullets: [
          "Definir grupos de contenido según intención y audiencia.",
          "Evitar duplicar experiencias que compiten por el mismo espacio.",
          "Revisar compatibilidad, desempeño móvil y disponibilidad regional.",
          "Reservar espacios controlados para descubrimiento y prueba.",
        ],
      },
      {
        title: "Aprende del comportamiento sin perder contexto",
        paragraphs: [
          "Los datos ayudan a observar qué se abre, qué se repite y qué se abandona, pero deben interpretarse junto con la ubicación del contenido, las campañas y la etapa del usuario. Una cifra aislada no explica por qué un juego funciona.",
          "La ventaja de una operación flexible es poder ajustar la mezcla por mercado sin reconstruir la integración. Así, el catálogo se convierte en un sistema vivo y no en una lista estática.",
        ],
      },
    ],
    relatedProduct: {
      label: "Game Providers",
      description: "Explora el ecosistema de proveedores conectado con Andes Gaming.",
      path: ROUTES.gameProviders,
    },
  },
  {
    slug: "evaluar-agregador-juegos",
    category: "guias",
    title: "Cómo evaluar un agregador de juegos antes de contratarlo",
    excerpt:
      "Una guía para comparar cobertura, tecnología y acompañamiento sin dejar que el tamaño del catálogo sea el único criterio.",
    image: aggregatorEvaluationImage,
    imageAlt:
      "Plataforma tecnológica transparente analizada mediante anillos de verificación",
    publishedAt: "2026-07-15",
    readingTime: 9,
    author: {
      name: "Equipo Andes Gaming",
      role: "Soluciones B2B",
    },
    tags: ["Evaluación", "Agregadores", "Tecnología", "Soporte"],
    sections: [
      {
        title: "Empieza por tu modelo operativo",
        paragraphs: [
          "No existe un agregador correcto para todos los operadores. La evaluación debe partir de tus mercados, capacidad técnica, estrategia de contenido y expectativas de soporte. Esa base permite convertir una demostración comercial en una comparación útil.",
          "Antes de solicitar propuestas, documenta los requisitos que serían difíciles o costosos de cambiar después: monedas, jurisdicciones, modelo de billetera, reportes, certificaciones y proceso de incorporación de proveedores.",
        ],
      },
      {
        title: "Evalúa la plataforma detrás del catálogo",
        paragraphs: [
          "El número total de juegos es visible, pero no explica cómo se opera la solución. Pregunta cómo se normalizan los datos, cómo se comunican las incidencias y qué herramientas existen para observar transacciones, disponibilidad y cambios de contenido.",
        ],
        bullets: [
          "Calidad y consistencia de la documentación técnica.",
          "Trazabilidad de sesiones y transacciones.",
          "Proceso para incorporar y certificar nuevos proveedores.",
          "Canales de soporte, prioridades y escalamiento.",
          "Controles para activar contenido por marca o mercado.",
        ],
      },
      {
        title: "Prueba la relación, no solo la API",
        paragraphs: [
          "Una prueba técnica también permite observar la forma de trabajo del proveedor. La velocidad, claridad y consistencia con que se resuelven preguntas durante esa etapa anticipan cómo podría sentirse la operación diaria.",
          "Cierra la evaluación con una matriz breve y comparable. Prioriza los criterios que afectan continuidad y crecimiento, documenta los compromisos y evita decidir únicamente por una funcionalidad llamativa o por el tamaño declarado del portafolio.",
        ],
        callout:
          "La mejor cobertura es la que tu equipo puede integrar, operar y hacer crecer con confianza.",
      },
    ],
    relatedProduct: {
      label: "Game Providers",
      description: "Conoce los proveedores disponibles en nuestro ecosistema.",
      path: ROUTES.gameProviders,
    },
  },
  {
    slug: "catalogo-contenido-andes",
    category: "actualizaciones",
    title: "Actualización de producto: una forma más clara de organizar el catálogo",
    excerpt:
      "Presentamos la dirección de experiencia con la que buscamos convertir un portafolio amplio en una herramienta más operable.",
    image: catalogUpdateImage,
    imageAlt:
      "Módulos de contenido ordenados en capas conectadas a un control central",
    publishedAt: "2026-07-08",
    updatedAt: "2026-07-11",
    readingTime: 5,
    author: {
      name: "Equipo Andes Gaming",
      role: "Producto",
    },
    tags: ["Producto", "Catálogo", "Operación"],
    disclaimer:
      "Contenido demostrativo: esta publicación presenta una dirección de producto y debe validarse antes de su publicación comercial.",
    sections: [
      {
        title: "Del inventario a una herramienta de trabajo",
        paragraphs: [
          "A medida que crece la oferta de proveedores, una lista plana deja de ser suficiente. La dirección propuesta organiza el contenido alrededor de decisiones operativas: disponibilidad, mercado, categoría y estado de activación.",
          "El objetivo es que cada equipo encuentre el contexto necesario sin depender de búsquedas manuales o documentos paralelos.",
        ],
      },
      {
        title: "Principios de la nueva organización",
        paragraphs: [
          "La experiencia prioriza información escaneable, filtros comprensibles y estados consistentes. Cada nivel debe responder una pregunta concreta antes de mostrar más detalle.",
        ],
        bullets: [
          "Agrupar contenido mediante criterios reconocibles.",
          "Mantener visible la relación entre proveedor, mercado y disponibilidad.",
          "Reducir pasos para revisar y comparar opciones.",
          "Diseñar la estructura para que pueda crecer sin perder claridad.",
        ],
      },
      {
        title: "Qué buscamos validar",
        paragraphs: [
          "La siguiente etapa consiste en observar cómo los equipos usan esta organización en tareas reales. Más que medir clics aislados, interesa comprobar si disminuye el tiempo necesario para entender el catálogo y tomar una decisión.",
        ],
      },
    ],
    relatedProduct: {
      label: "Game Providers",
      description: "Revisa la experiencia actual de exploración de proveedores.",
      path: ROUTES.gameProviders,
    },
  },
  {
    slug: "descubrimiento-proveedores",
    category: "actualizaciones",
    title: "Actualización de experiencia: descubrir proveedores con mejor contexto",
    excerpt:
      "Una propuesta para facilitar la exploración de proveedores y comunicar mejor el valor de cada integración.",
    image: providerDiscoveryImage,
    imageAlt:
      "Red de proveedores con un grupo de nodos destacados mediante una señal cian",
    publishedAt: "2026-06-30",
    readingTime: 5,
    author: {
      name: "Equipo Andes Gaming",
      role: "Diseño de producto",
    },
    tags: ["Experiencia", "Proveedores", "Descubrimiento"],
    disclaimer:
      "Contenido demostrativo: esta publicación describe una propuesta de experiencia sujeta a revisión de producto.",
    sections: [
      {
        title: "Explorar no es lo mismo que recorrer logos",
        paragraphs: [
          "Cuando cada proveedor aparece únicamente como una marca, el usuario debe conocerlo de antemano para entender su relevancia. La propuesta incorpora contexto sobre tipo de contenido, compatibilidad y enfoque, manteniendo una primera vista limpia.",
          "La intención no es llenar cada card de información, sino mostrar la cantidad correcta en cada momento y permitir profundizar cuando exista interés.",
        ],
      },
      {
        title: "Una jerarquía pensada para decidir",
        paragraphs: [
          "La experiencia organiza la exploración en tres momentos: descubrir, comparar y contactar. Los filtros ayudan a reducir el universo; las fichas comunican diferencias; y el CTA conecta la selección con una conversación operativa.",
        ],
        bullets: [
          "Categorías visibles y comprensibles.",
          "Información breve que explique el enfoque del proveedor.",
          "Estados de interacción claros en teclado y pantallas táctiles.",
          "Continuidad natural hacia la conversación comercial.",
        ],
      },
      {
        title: "Diseñar para catálogos que cambian",
        paragraphs: [
          "Los proveedores y sus condiciones evolucionan. Por eso, la interfaz debe aceptar altas, cambios y nuevos criterios sin depender de composiciones manuales. Una estructura basada en datos permite mantener consistencia mientras el ecosistema crece.",
        ],
      },
    ],
    relatedProduct: {
      label: "Game Providers",
      description: "Explora nuestro catálogo actual de proveedores.",
      path: ROUTES.gameProviders,
    },
  },
  {
    slug: "caso-expansion-regional",
    category: "casos-de-exito",
    title: "Caso ilustrativo: expansión regional con una sola capa de integración",
    excerpt:
      "Cómo podría estructurarse la expansión de un operador hacia nuevos mercados sin replicar su arquitectura para cada lanzamiento.",
    image: regionalExpansionImage,
    imageAlt:
      "Plataforma central que distribuye conexiones hacia múltiples destinos regionales",
    publishedAt: "2026-06-18",
    readingTime: 7,
    author: {
      name: "Equipo Andes Gaming",
      role: "Arquitectura de soluciones",
    },
    tags: ["Caso ilustrativo", "Expansión", "LATAM", "Integración"],
    disclaimer:
      "Caso ilustrativo: el operador, el contexto y los resultados descritos son hipotéticos y se incluyen únicamente para demostrar la experiencia editorial.",
    sections: [
      {
        title: "El escenario",
        paragraphs: [
          "Un operador regional administra una marca estable y quiere entrar en dos mercados adicionales. Su integración actual fue diseñada alrededor de acuerdos directos, con flujos y procesos distintos para cada proveedor.",
          "Replicar ese modelo ampliaría el tiempo de preparación y obligaría a mantener variaciones de la misma lógica. El reto consiste en conservar control local sin duplicar la base técnica.",
        ],
      },
      {
        title: "El enfoque propuesto",
        paragraphs: [
          "La solución hipotética introduce una capa común para sesiones, transacciones y catálogo. Las diferencias de cada mercado se gestionan como configuración: moneda, disponibilidad, selección de proveedores y reglas operativas.",
        ],
        bullets: [
          "Definir un contrato técnico compartido.",
          "Separar configuración regional de lógica transaccional.",
          "Lanzar primero un catálogo controlado por mercado.",
          "Centralizar trazabilidad y escalamiento de incidentes.",
        ],
      },
      {
        title: "El aprendizaje",
        paragraphs: [
          "En este escenario, la principal ganancia no es una cifra aislada, sino la repetibilidad. Cada nuevo mercado reutiliza una base conocida y concentra el esfuerzo en decisiones de producto, cumplimiento y contenido.",
          "El caso muestra por qué una arquitectura de agregación debe evaluarse como capacidad operativa a largo plazo y no solo como una vía de acceso a juegos.",
        ],
      },
    ],
    relatedProduct: {
      label: "Casino Aggregation",
      description: "Conoce la arquitectura pensada para conectar y escalar.",
      path: ROUTES.casinoAggregation,
    },
  },
  {
    slug: "caso-operacion-multimarca",
    category: "casos-de-exito",
    title: "Caso ilustrativo: centralizar el catálogo de un operador multimarcas",
    excerpt:
      "Un escenario sobre cómo mantener identidades distintas mientras contenido y operación comparten una fuente confiable.",
    image: multiBrandImage,
    imageAlt:
      "Catálogo central sincronizado con varias superficies digitales independientes",
    publishedAt: "2026-06-05",
    readingTime: 6,
    author: {
      name: "Equipo Andes Gaming",
      role: "Operaciones de contenido",
    },
    tags: ["Caso ilustrativo", "Multimarca", "Catálogo", "Operación"],
    disclaimer:
      "Caso ilustrativo: esta historia no representa a un cliente ni comunica resultados reales de Andes Gaming.",
    sections: [
      {
        title: "El escenario",
        paragraphs: [
          "Un grupo hipotético opera varias marcas dirigidas a audiencias diferentes. Cada una mantiene su propia navegación y estrategia comercial, pero los equipos actualizan el contenido mediante archivos y procesos separados.",
          "La falta de una fuente común genera diferencias de disponibilidad, esfuerzo duplicado y poca claridad sobre qué versión del catálogo está vigente.",
        ],
      },
      {
        title: "Una fuente común con decisiones por marca",
        paragraphs: [
          "El enfoque propuesto centraliza la información base de proveedores y contenidos, sin obligar a que todas las marcas presenten la misma selección. Cada equipo conserva reglas de publicación, orden y segmentación sobre un inventario compartido.",
        ],
        bullets: [
          "Catálogo maestro con estados consistentes.",
          "Selecciones independientes por marca y mercado.",
          "Historial claro de cambios y responsables.",
          "Un flujo común para altas, pausas y revisiones.",
        ],
      },
      {
        title: "El aprendizaje",
        paragraphs: [
          "Centralizar no significa uniformar la experiencia. Significa reducir trabajo repetido y ofrecer a cada marca una base confiable desde la cual diferenciarse.",
          "En un entorno multimarcas, la calidad de la operación depende tanto del gobierno del catálogo como de la tecnología que lo distribuye.",
        ],
      },
    ],
    relatedProduct: {
      label: "Game Providers",
      description: "Conoce cómo organizamos el acceso a proveedores.",
      path: ROUTES.gameProviders,
    },
  },
];
