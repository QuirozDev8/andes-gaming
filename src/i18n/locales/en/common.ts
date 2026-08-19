const commonEn = {
  formSubmission: {
    sending: "Sending…",
    successTitle: "Thank you for contacting us, {{name}}!",
    success: "Thank you. We received your details and will contact you soon.",
    errorTitle: "We could not complete the submission",
    error: "We could not send your details. Please try again.",
    dismiss: "Got it",
  },
  chatWidget: {
    title: "Andi-AI",
    initialGreeting: "Hi! I'm Andi-AI, the Andes Gaming virtual assistant.",
    initialInvitation: "How can I help you?",
    getStarted: "New conversation",
    inputPlaceholder: "Type your question...",
    closeButton: "Close Andi-AI chat",
    openToggle: "Open Andi-AI chat",
    closeToggle: "Close Andi-AI chat",
    newConversation: "Start a new conversation",
    resetTitle: "Start a new conversation?",
    resetDescription:
      "The current history will no longer be shown and Andi-AI will start without the previous context.",
    resetConfirm: "Start new conversation",
    resetCancel: "Continue here",
    unavailableMessage:
      "I can't answer your question right now. Please try again later.",
  },
  header: {
    navigationLabel: "Main navigation",
    homeLabel: "Andes Gaming home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Home",
    products: "Products",
    about: "About us",
    blog: "Blog",
    contact: "Contact",
    sales: "Talk to sales",
    languageSelector: "Select language",
    productsList: {
      casinoAggregation: {
        label: "Casino Aggregation",
        description: "B2B iGaming content aggregation.",
      },
      gameStudio: {
        label: "Game Studio",
        description: "Development of innovative proprietary content.",
      },
      gameProviders: {
        label: "Game Providers",
        description: "Connected network of game providers.",
      },
    },
  },
  footer: {
    navigationLabel: "Footer navigation",
    homeLabel: "Andes Gaming home",
    description:
      "B2B technology platform for integration, operations, and growth in the iGaming ecosystem.",
    columns: {
      platform: {
        title: "PLATFORM",
        backoffice: "BackOffice",
        integrations: "Integrations",
        reporting: "Reporting",
        support: "Support",
      },
      products: {
        title: "PRODUCTS",
        casinoAggregation: "Casino Aggregation",
        gameStudio: "Game Studio",
        gameProviders: "Game Providers",
      },
      company: {
        title: "COMPANY",
        about: "About us",
        contact: "Contact",
        legal: "Legal policies",
      },
    },
    contact: {
      sectionLabel: "Contact",
      title: "CONTACT",
      location: "Latin America",
      talk: "Let's talk",
    },
    social: {
      email: "Email",
    },
    copyright: "© {{year}} Andes Gaming. All rights reserved.",
    terms: "Terms and conditions",
    privacy: "Privacy policy",
  },
} as const;

export default commonEn;
