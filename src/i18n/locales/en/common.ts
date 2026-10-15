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
    home: "HOME",
    products: "PRODUCTS",
    about: "ABOUT US",
    blog: "BLOG",
    contact: "CONTACT",
    sales: "TALK TO SALES",
    languageSelector: "Select language",
    productsList: {
      casinoAggregation: {
        label: "Casino Aggregation",
        description: "Access multiple providers and thousands of games through a single integration.",
      },
      gameStudio: {
        label: "Game Studio",
        description: "Discover original content developed by Andes Gaming.",
      },
      gameProviders: {
        label: "Game Providers",
        description: "Explore our ecosystem of game providers and content.",
      },
    },
  },
  footer: {
    navigationLabel: "Footer navigation",
    homeLabel: "Andes Gaming home",
    description:
      "B2B iGaming technology connecting operators with content, providers, and new opportunities to grow.",
    columns: {
      platform: {
        title: "PLATFORM",
        backoffice: "Back Office",
        integrations: "Integrations",
        reporting: "Analytics",
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
        about: "About Us",
        contact: "Contact",
        legal: "Legal Policies",
      },
    },
    contact: {
      sectionLabel: "Contact",
      title: "CONTACT",
      location: "Latin America",
      talk: "LET’S TALK",
    },
    social: {
      email: "Email",
    },
    copyright: "© 2026 Andes Gaming. All rights reserved.",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
  },
} as const;

export default commonEn;
