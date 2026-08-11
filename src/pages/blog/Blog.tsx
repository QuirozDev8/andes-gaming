import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Network,
  Plus,
} from "lucide-react";
import BtnElegant from "../../components/btn-elegant/BtnElegant";
import RevealOnScroll from "../../components/reveal-on-scroll/RevealOnScroll";
import SectionTitle from "../../components/section-title/SectionTitle";
import StrokeText from "../../components/stroke-text";
import { formatBlogDate } from "./blog-utils";
import ArticleModal from "./components/ArticleModal";
import BlogHeroEffects from "./components/BlogHeroEffects";
import PostCard from "./components/PostCard";
import {
  blogCategories,
  blogPageContent,
  blogPosts,
  type BlogCategory,
  type BlogCategoryFilter,
  type BlogPost,
} from "./data-blog";
import styles from "./Blog.module.css";

const INITIAL_VISIBLE_POSTS = 6;

// Los índices se construyen una sola vez: mantienen el orden editorial estable
// y evitan recorrer toda la colección durante cada renderizado.
const sortedBlogPosts = [...blogPosts].sort((firstPost, secondPost) =>
  secondPost.publishedAt.localeCompare(firstPost.publishedAt),
);
const featuredPost = sortedBlogPosts.find((post) => post.featured);
const postsBySlug = new Map(
  sortedBlogPosts.map((post) => [post.slug, post] as const),
);
const categoryLabels = new Map(
  blogCategories.map((category) => [category.id, category.label] as const),
);
const catalogPostCount = sortedBlogPosts.filter((post) => !post.featured).length;

// Los contadores describen las tarjetas controladas por cada filtro. Por eso
// "Todos" excluye la lectura destacada, que se presenta en una sección separada.
const categoryCounts = new Map(
  blogCategories.map((category) => [
    category.id,
    category.id === "todos"
      ? catalogPostCount
      : sortedBlogPosts.filter((post) => post.category === category.id).length,
  ] as const),
);

function getCategoryLabel(category: BlogCategory) {
  return categoryLabels.get(category) ?? category;
}

function formatCarouselPosition(position: number) {
  return String(position).padStart(2, "0");
}

export function Blog() {
  const [activeCategory, setActiveCategory] =
    useState<BlogCategoryFilter>("todos");
  const [visiblePosts, setVisiblePosts] = useState(INITIAL_VISIBLE_POSTS);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const catalogGridId = useId();
  const catalogGridRef = useRef<HTMLDivElement>(null);
  const carouselFrameRef = useRef<number | null>(null);
  const articleSlug = searchParams.get("articulo");
  const selectedPost = articleSlug ? postsBySlug.get(articleSlug) : undefined;

  useEffect(() => {
    if (!articleSlug || selectedPost) return;

    // Una URL compartida inválida vuelve al catálogo sin sumar otra entrada al historial.
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("articulo");
    setSearchParams(nextSearchParams, { replace: true });
  }, [articleSlug, searchParams, selectedPost, setSearchParams]);

  useEffect(() => {
    catalogGridRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [activeCategory]);

  useEffect(
    () => () => {
      if (carouselFrameRef.current !== null) {
        window.cancelAnimationFrame(carouselFrameRef.current);
      }
    },
    [],
  );

  const handleCategoryChange = (category: BlogCategoryFilter) => {
    setActiveCategory(category);
    setVisiblePosts(INITIAL_VISIBLE_POSTS);
    setActiveSlideIndex(0);
  };

  const handleOpenPost = (post: BlogPost) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("articulo", post.slug);
    setSearchParams(nextSearchParams);
  };

  const handleClosePost = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("articulo");
    setSearchParams(nextSearchParams, { replace: true });
  };

  const catalogPosts =
    activeCategory === "todos"
      ? sortedBlogPosts.filter((post) => !post.featured)
      : sortedBlogPosts.filter((post) => post.category === activeCategory);
  const visibleCatalogPosts =
    activeCategory === "todos"
      ? catalogPosts.slice(0, visiblePosts)
      : catalogPosts;
  const canLoadMore =
    activeCategory === "todos" && visiblePosts < catalogPosts.length;
  const carouselPosition = Math.min(
    activeSlideIndex + 1,
    visibleCatalogPosts.length,
  );
  const hasCarouselNavigation = visibleCatalogPosts.length > 1;

  const updateActiveSlide = useCallback(() => {
    const carousel = catalogGridRef.current;

    if (!carousel || carousel.children.length === 0) return;

    const carouselRect = carousel.getBoundingClientRect();
    const carouselCenter = carouselRect.left + carouselRect.width / 2;
    const slides = Array.from(carousel.children);
    const closestSlide = slides.reduce(
      (closest, slide, index) => {
        const slideRect = slide.getBoundingClientRect();
        const slideCenter = slideRect.left + slideRect.width / 2;
        const distance = Math.abs(slideCenter - carouselCenter);

        return distance < closest.distance ? { distance, index } : closest;
      },
      { distance: Number.POSITIVE_INFINITY, index: 0 },
    );

    setActiveSlideIndex((currentIndex) =>
      currentIndex === closestSlide.index ? currentIndex : closestSlide.index,
    );
  }, []);

  const handleCarouselScroll = useCallback(() => {
    if (carouselFrameRef.current !== null) return;

    carouselFrameRef.current = window.requestAnimationFrame(() => {
      carouselFrameRef.current = null;
      updateActiveSlide();
    });
  }, [updateActiveSlide]);

  const goToSlide = useCallback(
    (requestedIndex: number) => {
      const carousel = catalogGridRef.current;
      const lastSlideIndex = visibleCatalogPosts.length - 1;
      const nextIndex = Math.min(Math.max(requestedIndex, 0), lastSlideIndex);
      const targetSlide = carousel?.children[nextIndex] as HTMLElement | undefined;

      if (!carousel || !targetSlide || lastSlideIndex < 0) return;

      const carouselRect = carousel.getBoundingClientRect();
      const targetRect = targetSlide.getBoundingClientRect();
      const scrollPadding = Number.parseFloat(
        window.getComputedStyle(carousel).scrollPaddingLeft,
      );
      const targetLeft =
        carousel.scrollLeft +
        targetRect.left -
        carouselRect.left -
        (Number.isNaN(scrollPadding) ? 0 : scrollPadding);
      const shouldReduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      carousel.scrollTo({
        left: targetLeft,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });

      if (shouldReduceMotion) {
        setActiveSlideIndex(nextIndex);
      }
    },
    [visibleCatalogPosts.length],
  );

  return (
    <>
      <div className={styles.page}>
        <section aria-labelledby="blog-title" className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <BlogHeroEffects />

          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>
                <Network aria-hidden="true" strokeWidth={1.8} />
                {blogPageContent.hero.eyebrow}
              </span>

              <h1
                aria-label={`${blogPageContent.hero.title} ${blogPageContent.hero.accent}`}
                className={styles.heroTitle}
                id="blog-title"
              >
                <StrokeText
                  className={`${styles.heroTitleLine} ${styles.heroTitlePrimary}`}
                  drawDuration={1.35}
                  fillDelay={0.12}
                  fillMode="fade"
                  fontSize={96}
                  fontWeight={900}
                  letterSpacing={-2}
                  stagger={0.035}
                  strokeColor="var(--andes-violet)"
                  text={blogPageContent.hero.title.toUpperCase()}
                  trigger="mount"
                />
                <StrokeText
                  className={`${styles.heroTitleLine} ${styles.heroTitleAccent}`}
                  drawDuration={1.5}
                  fillDelay={0.16}
                  fillGradient={{
                    from: "var(--andes-violet)",
                    to: "var(--andes-cyan)",
                  }}
                  fillMode="fade"
                  fontSize={96}
                  fontWeight={900}
                  letterSpacing={-2}
                  reverse
                  stagger={0.035}
                  strokeColor="var(--andes-violet)"
                  text={blogPageContent.hero.accent.toUpperCase()}
                  trigger="mount"
                />
              </h1>

              <p className={styles.heroDescription}>
                {blogPageContent.hero.description}
              </p>

              <div
                className={styles.heroTopics}
                aria-label={blogPageContent.hero.topicsLabel}
              >
                {blogPageContent.hero.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {featuredPost && activeCategory === "todos" && (
          <RevealOnScroll
            aria-labelledby="featured-post-title"
            as="section"
            className={styles.featuredSection}
          >
            <div className={styles.sectionContainer}>
              <button
                aria-label={`${blogPageContent.featured.openLabel}: ${featuredPost.title}`}
                className={styles.featuredCard}
                onClick={() => handleOpenPost(featuredPost)}
                type="button"
              >
                <span className={styles.featuredMedia}>
                  <img
                    alt={featuredPost.imageAlt}
                    className={styles.featuredImage}
                    decoding="async"
                    fetchPriority="high"
                    height={788}
                    src={featuredPost.image}
                    width={1400}
                  />
                  <span className={styles.featuredBadge}>
                    <BookOpen aria-hidden="true" strokeWidth={1.8} />
                    {blogPageContent.featured.eyebrow}
                  </span>
                </span>

                <span className={styles.featuredContent}>
                  <strong className={styles.featuredTitle} id="featured-post-title">
                    {featuredPost.title}
                  </strong>
                  <span className={styles.featuredExcerpt}>
                    {featuredPost.excerpt}
                  </span>
                  <span className={styles.featuredMeta}>
                    <span>
                      <CalendarDays aria-hidden="true" strokeWidth={1.8} />
                      <time dateTime={featuredPost.publishedAt}>
                        {formatBlogDate(featuredPost.publishedAt)}
                      </time>
                    </span>
                    <span>
                      <Clock3 aria-hidden="true" strokeWidth={1.8} />
                      {featuredPost.readingTime} {blogPageContent.card.minutesLabel}
                    </span>
                  </span>
                  <span className={styles.featuredAction} aria-hidden="true">
                    {blogPageContent.featured.action}
                    <ArrowUpRight strokeWidth={1.8} />
                  </span>
                </span>
              </button>
            </div>
          </RevealOnScroll>
        )}

        <section aria-labelledby="blog-catalog-title" className={styles.catalog}>
          <div className={styles.sectionContainer}>
            <RevealOnScroll className={styles.catalogHeader}>
              <span className={styles.sectionEyebrow}>
                {blogPageContent.catalog.eyebrow}
              </span>
              <SectionTitle
                as="h2"
                className={styles.catalogTitle}
                id="blog-catalog-title"
                lines={[blogPageContent.catalog.title]}
                nowrap={false}
              />
              <p>{blogPageContent.catalog.description}</p>
            </RevealOnScroll>

            <div
              aria-label={blogPageContent.catalog.filterLabel}
              className={styles.filters}
              role="group"
            >
              {blogCategories.map((category) => {
                return (
                  <button
                    aria-controls={catalogGridId}
                    aria-pressed={activeCategory === category.id}
                    className={`${styles.filterButton} ${
                      activeCategory === category.id ? styles.filterButtonActive : ""
                    }`}
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    type="button"
                  >
                    {category.label}
                    <span>{categoryCounts.get(category.id) ?? 0}</span>
                  </button>
                );
              })}
            </div>

            <p className={styles.resultsStatus} role="status">
              {visibleCatalogPosts.length} {blogPageContent.catalog.resultsLabel}
            </p>

            <div
              aria-label={blogPageContent.catalog.postsLabel}
              className={styles.grid}
              id={catalogGridId}
              onScroll={handleCarouselScroll}
              ref={catalogGridRef}
              role="region"
            >
              {visibleCatalogPosts.map((post) => (
                <PostCard
                  categoryLabel={getCategoryLabel(post.category)}
                  key={post.slug}
                  onOpen={handleOpenPost}
                  post={post}
                />
              ))}
            </div>

            {hasCarouselNavigation && (
              <div
                aria-label={blogPageContent.catalog.carouselControlsLabel}
                className={styles.carouselControls}
                role="group"
              >
                <span
                  aria-atomic="true"
                  aria-live="polite"
                  className={styles.carouselCounter}
                >
                  <span aria-hidden="true">
                    <strong>{formatCarouselPosition(carouselPosition)}</strong>
                    <span>/</span>
                    {formatCarouselPosition(visibleCatalogPosts.length)}
                  </span>
                  <span className={styles.resultsStatus}>
                    {blogPageContent.catalog.carouselPositionLabel}{" "}
                    {carouselPosition}{" "}
                    {blogPageContent.catalog.carouselPositionOfLabel}{" "}
                    {visibleCatalogPosts.length}
                  </span>
                </span>

                <span className={styles.carouselButtons}>
                  <button
                    aria-controls={catalogGridId}
                    aria-label={blogPageContent.catalog.previousPostLabel}
                    className={styles.carouselButton}
                    disabled={activeSlideIndex === 0}
                    onClick={() => goToSlide(activeSlideIndex - 1)}
                    type="button"
                  >
                    <ChevronLeft aria-hidden="true" strokeWidth={1.8} />
                  </button>
                  <button
                    aria-controls={catalogGridId}
                    aria-label={blogPageContent.catalog.nextPostLabel}
                    className={styles.carouselButton}
                    disabled={
                      activeSlideIndex >= visibleCatalogPosts.length - 1
                    }
                    onClick={() => goToSlide(activeSlideIndex + 1)}
                    type="button"
                  >
                    <ChevronRight aria-hidden="true" strokeWidth={1.8} />
                  </button>
                </span>
              </div>
            )}

            {canLoadMore && (
              <div className={styles.loadMoreArea}>
                <button
                  aria-controls={catalogGridId}
                  className={styles.loadMoreButton}
                  onClick={() => setVisiblePosts(catalogPosts.length)}
                  type="button"
                >
                  <Plus aria-hidden="true" strokeWidth={1.8} />
                  {blogPageContent.catalog.loadMore}
                </button>
              </div>
            )}
          </div>
        </section>

        <RevealOnScroll
          aria-labelledby="blog-cta-title"
          as="section"
          className={styles.ctaSection}
        >
          <div className={styles.sectionContainer}>
            <div className={styles.ctaPanel}>
              <div className={styles.ctaCopy}>
                <span className={styles.sectionEyebrow}>
                  {blogPageContent.cta.eyebrow}
                </span>
                <h2 id="blog-cta-title">{blogPageContent.cta.title}</h2>
                <p>{blogPageContent.cta.description}</p>
              </div>
              <div className={styles.ctaActions}>
                <BtnElegant
                  ariaLabel={blogPageContent.cta.primaryAction}
                  text={blogPageContent.cta.primaryAction}
                  to={blogPageContent.cta.primaryPath}
                />
                <Link
                  className={styles.secondaryCta}
                  to={blogPageContent.cta.secondaryPath}
                >
                  {blogPageContent.cta.secondaryAction}
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {selectedPost && (
        <ArticleModal
          categoryLabel={getCategoryLabel(selectedPost.category)}
          onRequestClose={handleClosePost}
          post={selectedPost}
        />
      )}
    </>
  );
}

export default Blog;
