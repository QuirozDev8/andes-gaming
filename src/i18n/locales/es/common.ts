const commonEs = {
  formSubmission: {
    sending: "Enviando…",
    successTitle: "¡Gracias por contactarnos, {{name}}!",
    success: "Gracias. Recibimos tus datos y nos pondremos en contacto contigo.",
    errorTitle: "No pudimos completar el envío",
    error: "No pudimos enviar tus datos. Inténtalo nuevamente.",
    dismiss: "Entendido",
  },
  chatWidget: {
    title: "Andi-AI",
    initialGreeting: "¡Hola! Soy Andi-AI, el asistente virtual de Andes Gaming.",
    initialInvitation: "¿En qué puedo ayudarte?",
    getStarted: "Nueva conversación",
    inputPlaceholder: "Escribe tu pregunta...",
    closeButton: "Cerrar chat de Andi-AI",
    openToggle: "Abrir chat de Andi-AI",
    closeToggle: "Cerrar chat de Andi-AI",
    newConversation: "Iniciar una nueva conversación",
    resetTitle: "¿Iniciar una nueva conversación?",
    resetDescription:
      "El historial actual dejará de mostrarse y Andi-AI comenzará sin el contexto anterior.",
    resetConfirm: "Iniciar nueva conversación",
    resetCancel: "Continuar aquí",
    unavailableMessage:
      "En este momento no puedo atender tu consulta. Por favor, inténtalo de nuevo más tarde.",
  },
  header: {
    navigationLabel: "Navegación principal",
    homeLabel: "Inicio de Andes Gaming",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    home: "INICIO",
    products: "PRODUCTOS",
    about: "NOSOTROS",
    blog: "BLOG",
    contact: "CONTACTO",
    sales: "HABLAR CON VENTAS",
    languageSelector: "Seleccionar idioma",
    productsList: {
      casinoAggregation: {
        label: "Casino Aggregation",
        description: "Accede a múltiples proveedores y miles de juegos desde una sola integración.",
      },
      gameStudio: {
        label: "Game Studio",
        description: "Descubre el contenido original desarrollado por Andes Gaming.",
      },
      gameProviders: {
        label: "Game Providers",
        description: "Explora nuestro ecosistema de proveedores y contenido.",
      },
    },
  },
  footer: {
    navigationLabel: "Navegación del pie de página",
    homeLabel: "Inicio de Andes Gaming",
    description:
      "Tecnología B2B para iGaming que conecta operadores con contenido, proveedores y nuevas oportunidades de crecimiento.",
    columns: {
      platform: {
        title: "PLATAFORMA",
        backoffice: "Back Office",
        integrations: "Integraciones",
        reporting: "Analítica",
        support: "Soporte",
      },
      products: {
        title: "PRODUCTOS",
        casinoAggregation: "Casino Aggregation",
        gameStudio: "Game Studio",
        gameProviders: "Game Providers",
      },
      company: {
        title: "EMPRESA",
        about: "Nosotros",
        contact: "Contacto",
        legal: "Políticas legales",
      },
    },
    contact: {
      sectionLabel: "Contacto",
      title: "CONTACTO",
      location: "Latinoamérica",
      talk: "HABLEMOS",
    },
    social: {
      email: "Email",
    },
    copyright: "© 2026 Andes Gaming. Todos los derechos reservados.",
    terms: "Términos y condiciones",
    privacy: "Política de privacidad",
  },
} as const;

export default commonEs;
