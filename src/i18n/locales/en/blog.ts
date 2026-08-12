import type { BlogLocaleResource } from "../../../pages/blog/data-blog";

const blogEn = {
  hero: {
    eyebrow: "Andes Insights",
    title: "Ideas powering",
    accent: "the future of iGaming",
    description:
      "Articles, guides, and experiences for building more agile, scalable operations that are ready to grow.",
    topics: {
      strategy: "Strategy",
      integration: "Integration",
      operations: "Operations",
    },
    topicsLabel: "Main topics",
  },
  featured: {
    eyebrow: "Recommended reading",
    action: "Read the full guide",
    openLabel: "Open featured article: {{title}}",
  },
  card: {
    openLabel: "Open article: {{title}}",
    action: "Read article",
    readingTime_one: "{{count}} min",
    readingTime_other: "{{count}} min",
  },
  catalog: {
    eyebrow: "Knowledge center",
    title: "Explore our publications",
    description:
      "Find analysis, practical resources, and insights that help you make better-informed decisions.",
    filterLabel: "Filter publications by category",
    loadMore: "View more publications",
    postsLabel: "Blog publications",
    results_one: "{{count}} publication visible in the catalog",
    results_other: "{{count}} publications visible in the catalog",
    carouselControlsLabel: "Publication carousel controls",
    previousPostLabel: "View previous publication",
    nextPostLabel: "View next publication",
    carouselPosition: "Publication {{current}} of {{total}}",
  },
  modal: {
    closeLabel: "Close article",
    authorLabel: "Written by",
    updatedLabel: "Updated",
    readingTime_one: "{{count}} min read",
    readingTime_other: "{{count}} min read",
    tagsLabel: "Article topics",
    contactEyebrow: "Bring these ideas into your operation",
    contactTitle: "Let's discuss your next step",
    contactDescription:
      "Our team can help you connect content, simplify integrations, and prepare your operation to grow.",
    contactAction: "Talk to a specialist",
    relatedAction: "Explore related product",
    relatedLabel: "Explore related product: {{label}}. {{description}}",
  },
  cta: {
    eyebrow: "From idea to integration",
    title: "One connection. More possibilities for your operation.",
    description:
      "Discover how Andes Gaming can help you organize, connect, and scale your content offering.",
    primaryAction: "Talk to a specialist",
    secondaryAction: "Discover Casino Aggregation",
  },
  categories: {
    todos: "All",
    articulos: "Articles",
    guias: "Guides",
    actualizaciones: "Updates",
    "casos-de-exito": "Success stories",
  },
  posts: {
    "checklist-integracion-api": {
      title: "Checklist for integrating multiple providers through a single API",
      excerpt:
        "A practical roadmap for aligning product, technology, and operations before connecting a new content ecosystem.",
      imageAlt:
        "Technology core connected to multiple modules through violet and cyan data flows",
      author: {
        name: "Andes Gaming Team",
        role: "Integrations and product",
      },
      tags: ["API", "Integration", "Operations", "Providers"],
      sections: [
        {
          title: "Before connecting: define the expected outcome",
          paragraphs: [
            "A solid integration begins before reviewing endpoints. The first step is to agree on which markets, currencies, devices, and content types the operation must support. That definition helps prioritize providers and prevents the catalog from becoming a collection of isolated decisions.",
            "It is also important to identify the product, technology, compliance, and support owners from the start. When each team understands its deliverables and acceptance criteria, the connection moves forward with fewer blockers and a shared view of the launch.",
          ],
          bullets: [
            "Markets, currencies, and languages for the first stage.",
            "Priority providers and content categories.",
            "Authentication, session, betting, and settlement flows.",
            "Owners for testing, approval, and production launch.",
          ],
        },
        {
          title: "Validate the technical flow from end to end",
          paragraphs: [
            "Documentation is only the starting point. The test environment should reproduce the full journey: session creation, content launch, balance movements, incomplete rounds, retries, and closure. The goal is not only to verify the ideal scenario, but to understand how the operation responds to latency, duplicates, or interruptions.",
          ],
          bullets: [
            "Idempotency and traceability for every transaction.",
            "Consistent error and timeout handling.",
            "Sufficient event logs for support and reconciliation.",
            "Responsive and performance testing on real devices.",
          ],
          callout:
            "A unified API creates value when it reduces operational variation, not only when it consolidates endpoints.",
        },
        {
          title: "Prepare the operation, not just the launch",
          paragraphs: [
            "Daily work begins after technical certification. Define how content will be activated or paused, who will receive alerts, how incidents will be escalated, and what information the team will need for reconciliation. A catalog built to grow needs clear governance rules from day one.",
            "Close the process with a gradual rollout. Start with a controlled set of content, observe stability and operational behavior, and expand the scope based on evidence. This sequence protects the end-user experience and gives the team room to adjust without friction.",
          ],
        },
      ],
      relatedProduct: {
        label: "Casino Aggregation",
        description: "Connect multiple providers through a single integration.",
      },
    },
    "agregacion-crecimiento-operadores": {
      title: "Why game aggregation accelerates operator growth",
      excerpt:
        "Growth should not mean multiplying integrations, processes, and failure points. An aggregation layer helps bring order to that complexity.",
      imageAlt:
        "Distributed technology modules converging into a scalable platform illuminated in violet",
      author: {
        name: "Andes Gaming Team",
        role: "Product strategy",
      },
      tags: ["Aggregation", "Scalability", "Operators"],
      sections: [
        {
          title: "The hidden cost of growing one connection at a time",
          paragraphs: [
            "Each direct provider can add valuable content, but it also brings its own documentation, certifications, monitoring, and support processes. As these differences accumulate, the team spends an increasing share of its time maintaining connections instead of improving the product.",
            "Fragmentation also affects decision speed. Activating a market, reviewing availability, or resolving an incident requires consulting different sources. The problem stops being purely technical and becomes an operational constraint.",
          ],
        },
        {
          title: "A common layer turns variety into capability",
          paragraphs: [
            "Aggregation creates a shared interface between the operator and a broad set of providers. This makes it possible to repeat integration patterns, normalize information, and manage the catalog from a more predictable point.",
            "The real benefit is not accumulating the largest possible number of games. It is reducing the effort required to test, select, and activate the right content for each audience.",
          ],
          bullets: [
            "Fewer technical variations to maintain.",
            "Greater speed when testing new content.",
            "More consistent support and reconciliation processes.",
            "A foundation prepared for regional expansion.",
          ],
        },
        {
          title: "Scale with purpose",
          paragraphs: [
            "Aggregation does not replace catalog strategy. It strengthens it. With an organized operational foundation, product teams can evaluate relevance, performance, and experience without turning every decision into a separate technical project.",
            "For a growing operator, that ability to learn and adjust quickly is often more valuable than any isolated launch.",
          ],
        },
      ],
      relatedProduct: {
        label: "Casino Aggregation",
        description: "Discover a simpler way to expand your game offering.",
      },
    },
    "catalogo-juegos-latam": {
      title: "How to build a relevant game catalog for LATAM markets",
      excerpt:
        "Global availability does not guarantee local relevance. An effective catalog combines context, variety, and the ability to learn.",
      imageAlt:
        "Regional content collections connected to a central technology core",
      author: {
        name: "Andes Gaming Team",
        role: "Content and markets",
      },
      tags: ["LATAM", "Catalog", "Content", "Markets"],
      sections: [
        {
          title: "Local relevance before volume",
          paragraphs: [
            "Latin America brings together markets with different habits, regulations, payment methods, and levels of maturity. Treating the region as a single audience often produces extensive catalogs that are difficult to navigate and lack editorial intent.",
            "The starting point is understanding which experiences feel familiar in each market: formats, pace, themes, devices, and moments of consumption. That understanding should guide the initial selection rather than being limited to interface translation.",
          ],
        },
        {
          title: "Design a mix that can evolve",
          paragraphs: [
            "A healthy catalog combines recognizable titles, new propositions, and enough diversity to prevent the entire experience from depending on a handful of content. It also needs rules for introducing new releases without displacing what already works.",
          ],
          bullets: [
            "Define content groups according to intent and audience.",
            "Avoid duplicating experiences that compete for the same space.",
            "Review compatibility, mobile performance, and regional availability.",
            "Reserve controlled spaces for discovery and testing.",
          ],
        },
        {
          title: "Learn from behavior without losing context",
          paragraphs: [
            "Data helps reveal what users open, repeat, and abandon, but it must be interpreted alongside content placement, campaigns, and the user's stage. An isolated metric does not explain why a game performs well.",
            "The advantage of a flexible operation is the ability to adjust the mix by market without rebuilding the integration. This turns the catalog into a living system rather than a static list.",
          ],
        },
      ],
      relatedProduct: {
        label: "Game Providers",
        description: "Explore the provider ecosystem connected to Andes Gaming.",
      },
    },
    "evaluar-agregador-juegos": {
      title: "How to evaluate a game aggregator before choosing one",
      excerpt:
        "A guide to comparing coverage, technology, and support without letting catalog size become the only criterion.",
      imageAlt:
        "Transparent technology platform analyzed through verification rings",
      author: {
        name: "Andes Gaming Team",
        role: "B2B solutions",
      },
      tags: ["Evaluation", "Aggregators", "Technology", "Support"],
      sections: [
        {
          title: "Start with your operating model",
          paragraphs: [
            "There is no single right aggregator for every operator. The evaluation should begin with your markets, technical capacity, content strategy, and support expectations. This foundation turns a sales demonstration into a useful comparison.",
            "Before requesting proposals, document the requirements that would be difficult or costly to change later: currencies, jurisdictions, wallet model, reporting, certifications, and the provider onboarding process.",
          ],
        },
        {
          title: "Evaluate the platform behind the catalog",
          paragraphs: [
            "The total number of games is visible, but it does not explain how the solution is operated. Ask how data is normalized, how incidents are communicated, and which tools are available to observe transactions, availability, and content changes.",
          ],
          bullets: [
            "Quality and consistency of technical documentation.",
            "Traceability of sessions and transactions.",
            "Process for onboarding and certifying new providers.",
            "Support channels, priorities, and escalation.",
            "Controls for activating content by brand or market.",
          ],
        },
        {
          title: "Test the relationship, not just the API",
          paragraphs: [
            "A technical test also reveals how the provider works. The speed, clarity, and consistency with which questions are resolved during this stage provide an early indication of what daily operations may feel like.",
            "Conclude the evaluation with a concise, comparable matrix. Prioritize the criteria that affect continuity and growth, document commitments, and avoid deciding solely on a striking feature or the stated size of the portfolio.",
          ],
          callout:
            "The best coverage is the coverage your team can integrate, operate, and grow with confidence.",
        },
      ],
      relatedProduct: {
        label: "Game Providers",
        description: "Discover the providers available in our ecosystem.",
      },
    },
    "catalogo-contenido-andes": {
      title: "Product update: a clearer way to organize the catalog",
      excerpt:
        "We are presenting an experience direction designed to turn a broad portfolio into a more practical operational tool.",
      imageAlt:
        "Content modules arranged in layers connected to a central control",
      author: {
        name: "Andes Gaming Team",
        role: "Product",
      },
      tags: ["Product", "Catalog", "Operations"],
      disclaimer:
        "Demonstration content: this publication presents a product direction and must be validated before commercial publication.",
      sections: [
        {
          title: "From inventory to a working tool",
          paragraphs: [
            "As the provider offering grows, a flat list is no longer enough. The proposed direction organizes content around operational decisions: availability, market, category, and activation status.",
            "The goal is for every team to find the context it needs without relying on manual searches or parallel documents.",
          ],
        },
        {
          title: "Principles of the new organization",
          paragraphs: [
            "The experience prioritizes scannable information, understandable filters, and consistent statuses. Each level should answer a specific question before presenting more detail.",
          ],
          bullets: [
            "Group content using recognizable criteria.",
            "Keep the relationship between provider, market, and availability visible.",
            "Reduce the steps required to review and compare options.",
            "Design a structure that can grow without losing clarity.",
          ],
        },
        {
          title: "What we aim to validate",
          paragraphs: [
            "The next stage is to observe how teams use this organization in real tasks. Rather than measuring isolated clicks, the priority is to verify whether it reduces the time needed to understand the catalog and make a decision.",
          ],
        },
      ],
      relatedProduct: {
        label: "Game Providers",
        description: "Review the current provider discovery experience.",
      },
    },
    "descubrimiento-proveedores": {
      title: "Experience update: discover providers with better context",
      excerpt:
        "A proposal to make provider discovery easier and communicate the value of each integration more clearly.",
      imageAlt:
        "Provider network with a group of nodes highlighted by a cyan signal",
      author: {
        name: "Andes Gaming Team",
        role: "Product design",
      },
      tags: ["Experience", "Providers", "Discovery"],
      disclaimer:
        "Demonstration content: this publication describes an experience proposal subject to product review.",
      sections: [
        {
          title: "Exploring is not the same as browsing logos",
          paragraphs: [
            "When each provider appears only as a brand, users must already know it to understand its relevance. The proposal adds context about content type, compatibility, and focus while keeping the initial view clean.",
            "The intention is not to fill every card with information, but to show the right amount at the right time and let users explore further when they are interested.",
          ],
        },
        {
          title: "A hierarchy designed for decision-making",
          paragraphs: [
            "The experience organizes exploration into three moments: discover, compare, and contact. Filters help narrow the universe, profiles communicate differences, and the CTA connects the selection to an operational conversation.",
          ],
          bullets: [
            "Visible and understandable categories.",
            "Concise information that explains the provider's focus.",
            "Clear interaction states for keyboards and touchscreens.",
            "A natural path into the commercial conversation.",
          ],
        },
        {
          title: "Designing for catalogs that change",
          paragraphs: [
            "Providers and their conditions evolve. The interface must therefore support additions, changes, and new criteria without relying on manual layouts. A data-driven structure maintains consistency as the ecosystem grows.",
          ],
        },
      ],
      relatedProduct: {
        label: "Game Providers",
        description: "Explore our current provider catalog.",
      },
    },
    "caso-expansion-regional": {
      title: "Illustrative case: regional expansion through a single integration layer",
      excerpt:
        "How an operator's expansion into new markets could be structured without replicating its architecture for every launch.",
      imageAlt:
        "Central platform distributing connections to multiple regional destinations",
      author: {
        name: "Andes Gaming Team",
        role: "Solutions architecture",
      },
      tags: ["Illustrative case", "Expansion", "LATAM", "Integration"],
      disclaimer:
        "Illustrative case: the operator, context, and results described are hypothetical and are included solely to demonstrate the editorial experience.",
      sections: [
        {
          title: "The scenario",
          paragraphs: [
            "A regional operator manages an established brand and wants to enter two additional markets. Its current integration was designed around direct agreements, with different flows and processes for each provider.",
            "Replicating that model would extend preparation time and require maintaining variations of the same logic. The challenge is to retain local control without duplicating the technical foundation.",
          ],
        },
        {
          title: "The proposed approach",
          paragraphs: [
            "The hypothetical solution introduces a common layer for sessions, transactions, and catalog management. Each market's differences are handled as configuration: currency, availability, provider selection, and operating rules.",
          ],
          bullets: [
            "Define a shared technical contract.",
            "Separate regional configuration from transactional logic.",
            "Launch a controlled catalog in each market first.",
            "Centralize traceability and incident escalation.",
          ],
        },
        {
          title: "The lesson",
          paragraphs: [
            "In this scenario, the main gain is not an isolated figure but repeatability. Each new market reuses a familiar foundation and focuses effort on product, compliance, and content decisions.",
            "The case shows why an aggregation architecture should be evaluated as a long-term operational capability, not only as a route to accessing games.",
          ],
        },
      ],
      relatedProduct: {
        label: "Casino Aggregation",
        description: "Discover the architecture designed to connect and scale.",
      },
    },
    "caso-operacion-multimarca": {
      title: "Illustrative case: centralizing the catalog of a multi-brand operator",
      excerpt:
        "A scenario showing how distinct identities can be maintained while content and operations share a trusted source.",
      imageAlt:
        "Central catalog synchronized with several independent digital experiences",
      author: {
        name: "Andes Gaming Team",
        role: "Content operations",
      },
      tags: ["Illustrative case", "Multi-brand", "Catalog", "Operations"],
      disclaimer:
        "Illustrative case: this story does not represent a client or communicate actual Andes Gaming results.",
      sections: [
        {
          title: "The scenario",
          paragraphs: [
            "A hypothetical group operates several brands aimed at different audiences. Each maintains its own navigation and commercial strategy, but teams update content through separate files and processes.",
            "The lack of a common source creates availability discrepancies, duplicated effort, and little clarity about which version of the catalog is current.",
          ],
        },
        {
          title: "A common source with brand-level decisions",
          paragraphs: [
            "The proposed approach centralizes core provider and content information without requiring every brand to present the same selection. Each team retains its publishing, ordering, and segmentation rules over a shared inventory.",
          ],
          bullets: [
            "Master catalog with consistent statuses.",
            "Independent selections by brand and market.",
            "Clear history of changes and ownership.",
            "A common workflow for additions, pauses, and reviews.",
          ],
        },
        {
          title: "The lesson",
          paragraphs: [
            "Centralizing does not mean standardizing the experience. It means reducing repetitive work and giving each brand a trusted foundation from which to differentiate itself.",
            "In a multi-brand environment, operational quality depends as much on catalog governance as on the technology that distributes it.",
          ],
        },
      ],
      relatedProduct: {
        label: "Game Providers",
        description: "Discover how we organize access to providers.",
      },
    },
  },
} satisfies BlogLocaleResource;

export default blogEn;
