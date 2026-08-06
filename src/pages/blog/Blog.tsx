import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Network,
  Plus,
} from "lucide-react";
import BtnElegant from "../../components/btn-elegant/BtnElegant";
import RevealOnScroll from "../../components/reveal-on-scroll/RevealOnScroll";
import SectionTitle from "../../components/section-title/SectionTitle";
import { formatBlogDate } from "./blog-utils";
import ArticleModal from "./components/ArticleModal";
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
const sortedBlogPosts = [...blogPosts].sort((firstPost, secondPost) =>
  secondPost.publishedAt.localeCompare(firstPost.publishedAt),
);
const featuredPost = sortedBlogPosts.find((post) => post.featured);

function getCategoryLabel(category: BlogCategory) {
  return (
    blogCategories.find((categoryItem) => categoryItem.id === category)?.label ??
    category
  );
}

export function Blog() {
  const [activeCategory, setActiveCategory] =
    useState<BlogCategoryFilter>("todos");
  const [visiblePosts, setVisiblePosts] = useState(INITIAL_VISIBLE_POSTS);
  const [searchParams, setSearchParams] = useSearchParams();
  const articleSlug = searchParams.get("articulo");
  const selectedPost = articleSlug
    ? sortedBlogPosts.find((post) => post.slug === articleSlug)
    : undefined;

  useEffect(() => {
    if (!articleSlug || selectedPost) return;

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("articulo");
    setSearchParams(nextSearchParams, { replace: true });
  }, [articleSlug, searchParams, selectedPost, setSearchParams]);

  const handleCategoryChange = (category: BlogCategoryFilter) => {
    setActiveCategory(category);
    setVisiblePosts(INITIAL_VISIBLE_POSTS);
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

  return (
    <>
      <div className={styles.page}>
        <section aria-labelledby="blog-title" className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>
                <Network aria-hidden="true" strokeWidth={1.8} />
                {blogPageContent.hero.eyebrow}
              </span>

              <SectionTitle
                as="h1"
                className={styles.heroTitle}
                id="blog-title"
                lines={[
                  blogPageContent.hero.title,
                  { content: blogPageContent.hero.accent, accent: true },
                ]}
                nowrap={false}
              />

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
                    src={featuredPost.image}
                  />
                </span>

                <span className={styles.featuredContent}>
                  <span className={styles.featuredEyebrow}>
                    {blogPageContent.featured.eyebrow}
                  </span>
                  <span className={styles.featuredCategory}>
                    {getCategoryLabel(featuredPost.category)}
                  </span>
                  <strong className={styles.featuredTitle} id="featured-post-title">
                    {featuredPost.title}
                  </strong>
                  <span className={styles.featuredExcerpt}>
                    {featuredPost.excerpt}
                  </span>
                  <span className={styles.featuredMeta}>
                    <span>
                      <CalendarDays aria-hidden="true" strokeWidth={1.8} />
                      {formatBlogDate(featuredPost.publishedAt)}
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
                const categoryCount =
                  category.id === "todos"
                    ? sortedBlogPosts.length
                    : sortedBlogPosts.filter(
                        (post) => post.category === category.id,
                      ).length;

                return (
                  <button
                    aria-pressed={activeCategory === category.id}
                    className={`${styles.filterButton} ${
                      activeCategory === category.id ? styles.filterButtonActive : ""
                    }`}
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    type="button"
                  >
                    {category.label}
                    <span>{categoryCount}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.grid} aria-live="polite">
              {visibleCatalogPosts.map((post) => (
                <PostCard
                  categoryLabel={getCategoryLabel(post.category)}
                  key={post.slug}
                  onOpen={handleOpenPost}
                  post={post}
                />
              ))}
            </div>

            {canLoadMore && (
              <div className={styles.loadMoreArea}>
                <button
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
