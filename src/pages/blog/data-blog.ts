import type { TFunction } from "i18next";
import aggregationGrowthImage from "../../assets/img/blog/agregacion-crecimiento-operadores.webp";
import latamCatalogImage from "../../assets/img/blog/catalogo-juegos-latam.webp";
import integrationChecklistImage from "../../assets/img/blog/checklist-integracion-api.webp";
import aggregatorEvaluationImage from "../../assets/img/blog/evaluar-agregador-juegos.webp";


export const blogCategoryIds = [
  "todos",
  "articulos",
  "guias",
  "tendencias",
  "casos-de-exito",
] as const;

export type BlogCategoryFilter = (typeof blogCategoryIds)[number];
export type BlogCategory = Exclude<BlogCategoryFilter, "todos">;

export type BlogArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: readonly string[] };

export type BlogArticleSection = {
  title: string;
  blocks: readonly BlogArticleBlock[];
};

export type BlogPostTranslation = {
  title: string;
  articleTitle: string;
  excerpt: string;
  imageAlt: string;
  author: { name: string; role: string };
  categoryLabel: string;
  readingLabel: string;
  cardAction: string;
  introduction: readonly BlogArticleBlock[];
  sections: readonly BlogArticleSection[];
  contactCta: { title: string; action: string };
};

export type BlogPost = BlogPostTranslation & {
  slug: BlogPostSlug;
  category: BlogCategory;
  image: string;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
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
    readingTime_one: string;
    readingTime_other: string;
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
  },
  {
    slug: "agregacion-crecimiento-operadores",
    category: "articulos",
    image: aggregationGrowthImage,
    publishedAt: "2026-07-29",
    readingTime: 6,
  },
  {
    slug: "catalogo-juegos-latam",
    category: "articulos",
    image: latamCatalogImage,
    publishedAt: "2026-07-22",
    readingTime: 7,
  },
  {
    slug: "evaluar-agregador-juegos",
    category: "guias",
    image: aggregatorEvaluationImage,
    publishedAt: "2026-07-15",
    readingTime: 9,
  },
] as const satisfies readonly BlogPostDefinition[];

export type BlogPostSlug = (typeof blogPostDefinitions)[number]["slug"];

export type BlogPostDefinition = {
  slug: string;
  category: BlogCategory;
  image: string;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
};

export function getBlogPosts(t: TFunction<"blog">): readonly BlogPost[] {
  return blogPostDefinitions.map((definition) => ({
    ...definition,
    ...(t(`posts.${definition.slug}`, { returnObjects: true }) as BlogPostTranslation),
  }));
}
