import type { TFunction } from "i18next";
import aggregationGrowthImage from "../../assets/img/blog/agregacion-crecimiento-operadores.webp";
import regionalExpansionImage from "../../assets/img/blog/caso-expansion-regional.webp";
import multiBrandImage from "../../assets/img/blog/caso-operacion-multimarca.webp";
import catalogUpdateImage from "../../assets/img/blog/catalogo-contenido-andes.webp";
import latamCatalogImage from "../../assets/img/blog/catalogo-juegos-latam.webp";
import integrationChecklistImage from "../../assets/img/blog/checklist-integracion-api.webp";
import providerDiscoveryImage from "../../assets/img/blog/descubrimiento-proveedores.webp";
import aggregatorEvaluationImage from "../../assets/img/blog/evaluar-agregador-juegos.webp";
import { ROUTES } from "../../routes/routePaths";

export const blogCategoryIds = [
  "todos",
  "articulos",
  "guias",
  "actualizaciones",
  "casos-de-exito",
] as const;

export type BlogCategoryFilter = (typeof blogCategoryIds)[number];
export type BlogCategory = Exclude<BlogCategoryFilter, "todos">;

export type BlogArticleSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  callout?: string;
};

export type BlogPostTranslation = {
  title: string;
  excerpt: string;
  imageAlt: string;
  author: {
    name: string;
    role: string;
  };
  tags: readonly string[];
  disclaimer?: string;
  sections: readonly BlogArticleSection[];
  relatedProduct: {
    label: string;
    description: string;
  };
};

export type BlogPost = BlogPostTranslation & {
  slug: BlogPostSlug;
  category: BlogCategory;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured?: boolean;
  relatedProduct: BlogPostTranslation["relatedProduct"] & {
    path: string;
  };
};

export type BlogLocaleResource = {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    topics: Record<"strategy" | "integration" | "operations", string>;
    topicsLabel: string;
  };
  featured: {
    eyebrow: string;
    action: string;
    openLabel: string;
  };
  card: {
    openLabel: string;
    action: string;
    readingTime_one: string;
    readingTime_other: string;
  };
  catalog: {
    eyebrow: string;
    title: string;
    description: string;
    filterLabel: string;
    loadMore: string;
    postsLabel: string;
    results_one: string;
    results_other: string;
    carouselControlsLabel: string;
    previousPostLabel: string;
    nextPostLabel: string;
    carouselPosition: string;
  };
  modal: {
    closeLabel: string;
    authorLabel: string;
    updatedLabel: string;
    readingTime_one: string;
    readingTime_other: string;
    tagsLabel: string;
    contactEyebrow: string;
    contactTitle: string;
    contactDescription: string;
    contactAction: string;
    relatedAction: string;
    relatedLabel: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
  categories: Record<BlogCategoryFilter, string>;
  posts: Record<BlogPostSlug, BlogPostTranslation>;
};

const blogPostDefinitions = [
  {
    slug: "checklist-integracion-api",
    category: "guias",
    image: integrationChecklistImage,
    publishedAt: "2026-08-04",
    readingTime: 8,
    featured: true,
    relatedProductPath: ROUTES.casinoAggregation,
  },
  {
    slug: "agregacion-crecimiento-operadores",
    category: "articulos",
    image: aggregationGrowthImage,
    publishedAt: "2026-07-29",
    readingTime: 6,
    relatedProductPath: ROUTES.casinoAggregation,
  },
  {
    slug: "catalogo-juegos-latam",
    category: "articulos",
    image: latamCatalogImage,
    publishedAt: "2026-07-22",
    readingTime: 7,
    relatedProductPath: ROUTES.gameProviders,
  },
  {
    slug: "evaluar-agregador-juegos",
    category: "guias",
    image: aggregatorEvaluationImage,
    publishedAt: "2026-07-15",
    readingTime: 9,
    relatedProductPath: ROUTES.gameProviders,
  },
  {
    slug: "catalogo-contenido-andes",
    category: "actualizaciones",
    image: catalogUpdateImage,
    publishedAt: "2026-07-08",
    updatedAt: "2026-07-11",
    readingTime: 5,
    relatedProductPath: ROUTES.gameProviders,
  },
  {
    slug: "descubrimiento-proveedores",
    category: "actualizaciones",
    image: providerDiscoveryImage,
    publishedAt: "2026-06-30",
    readingTime: 5,
    relatedProductPath: ROUTES.gameProviders,
  },
  {
    slug: "caso-expansion-regional",
    category: "casos-de-exito",
    image: regionalExpansionImage,
    publishedAt: "2026-06-18",
    readingTime: 7,
    relatedProductPath: ROUTES.casinoAggregation,
  },
  {
    slug: "caso-operacion-multimarca",
    category: "casos-de-exito",
    image: multiBrandImage,
    publishedAt: "2026-06-05",
    readingTime: 6,
    relatedProductPath: ROUTES.gameProviders,
  },
] as const satisfies readonly BlogPostDefinition[];

export type BlogPostSlug = (typeof blogPostDefinitions)[number]["slug"];

export type BlogPostDefinition = {
  slug: string;
  category: BlogCategory;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured?: boolean;
  relatedProductPath: string;
};

export function getBlogPosts(t: TFunction<"blog">): readonly BlogPost[] {
  return blogPostDefinitions.map((definition) => {
    const translation = t(`posts.${definition.slug}`, {
      returnObjects: true,
    }) as BlogPostTranslation;

    const updatedAt =
      "updatedAt" in definition ? definition.updatedAt : undefined;
    const featured =
      "featured" in definition ? definition.featured : undefined;

    return {
      slug: definition.slug,
      category: definition.category,
      image: definition.image,
      publishedAt: definition.publishedAt,
      ...(updatedAt ? { updatedAt } : {}),
      readingTime: definition.readingTime,
      ...(featured ? { featured } : {}),
      ...translation,
      relatedProduct: {
        ...translation.relatedProduct,
        path: definition.relatedProductPath,
      },
    };
  });
}
