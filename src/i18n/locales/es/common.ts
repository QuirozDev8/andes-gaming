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
    home: "Inicio",
    products: "Productos",
    about: "Nosotros",
    blog: "Blog",
    contact: "Contacto",
    sales: "Hablar con ventas",
    languageSelector: "Seleccionar idioma",
    productsList: {
      casinoAggregation: {
        label: "Casino Aggregation",
        description: "Agregación de contenido iGaming B2B.",
      },
      gameStudio: {
        label: "Game Studio",
        description: "Desarrollo de contenido propio e innovador.",
      },
      gameProviders: {
        label: "Game Providers",
        description: "Red de proveedores conectados.",
      },
    },
  },
  footer: {
    navigationLabel: "Navegación del pie de página",
    homeLabel: "Inicio de Andes Gaming",
    description:
      "Plataforma tecnológica B2B para integración, operación y crecimiento en el ecosistema iGaming.",
    columns: {
      platform: {
        title: "PLATAFORMA",
        backoffice: "BackOffice",
        integrations: "Integraciones",
        reporting: "Reportería",
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
      talk: "Hablemos",
    },
    social: {
      email: "Correo electrónico",
    },
    copyright: "© {{year}} Andes Gaming. Todos los derechos reservados.",
    terms: "Términos y condiciones",
    privacy: "Política de privacidad",
  },
} as const;

export default commonEs;
