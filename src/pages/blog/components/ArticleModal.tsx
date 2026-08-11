import { useEffect, useRef, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  UserRound,
  X,
} from "lucide-react";
import BtnElegant from "../../../components/btn-elegant/BtnElegant";
import { ROUTES } from "../../../routes/routePaths";
import { formatBlogDate } from "../blog-utils";
import { blogPageContent, type BlogPost } from "../data-blog";
import styles from "./ArticleModal.module.css";

type ArticleModalProps = {
  post: BlogPost;
  categoryLabel: string;
  onRequestClose: () => void;
};

export function ArticleModal({
  post,
  categoryLabel,
  onRequestClose,
}: ArticleModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `article-title-${post.slug}`;
  const descriptionId = `article-description-${post.slug}`;

  // El mismo diálogo puede cambiar de artículo al navegar por el historial;
  // el foco y el bloqueo de scroll solo se gestionan al montar y desmontar.
  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocusedElement = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;

    if (!dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;

      if (dialog.open) {
        dialog.close();
      }

      if (
        previouslyFocusedElement instanceof HTMLElement &&
        previouslyFocusedElement.isConnected
      ) {
        window.requestAnimationFrame(() => previouslyFocusedElement.focus());
      }
    };
  }, []);

  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onRequestClose();
    }
  };

  return (
    <dialog
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className={styles.dialog}
      onCancel={(event) => {
        event.preventDefault();
        onRequestClose();
      }}
      onClick={handleDialogClick}
      ref={dialogRef}
    >
      <article className={styles.panel}>
        <button
          aria-label={blogPageContent.modal.closeLabel}
          className={styles.closeButton}
          onClick={onRequestClose}
          type="button"
        >
          <X aria-hidden="true" strokeWidth={1.8} />
        </button>

        <div className={styles.hero}>
          <img
            alt={post.imageAlt}
            className={styles.heroImage}
            decoding="async"
            height={788}
            src={post.image}
            width={1400}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <span className={styles.category}>{categoryLabel}</span>
            <h2 className={styles.title} id={titleId}>
              {post.title}
            </h2>
            <p className={styles.excerpt} id={descriptionId}>
              {post.excerpt}
            </p>
          </div>
        </div>

        <div className={styles.articleBody}>
          <div className={styles.byline}>
            <div className={styles.author}>
              <span className={styles.authorIcon} aria-hidden="true">
                <UserRound strokeWidth={1.8} />
              </span>
              <span>
                <small>{blogPageContent.modal.authorLabel}</small>
                <strong>{post.author.name}</strong>
                <small>{post.author.role}</small>
              </span>
            </div>

            <div className={styles.articleMeta}>
              <span>
                <CalendarDays aria-hidden="true" strokeWidth={1.8} />
                <time dateTime={post.publishedAt}>
                  {formatBlogDate(post.publishedAt)}
                </time>
              </span>
              {post.updatedAt && (
                <time dateTime={post.updatedAt}>
                  {blogPageContent.modal.updatedLabel} {formatBlogDate(post.updatedAt)}
                </time>
              )}
              <span>
                <Clock3 aria-hidden="true" strokeWidth={1.8} />
                {post.readingTime} {blogPageContent.modal.readingTimeLabel}
              </span>
            </div>
          </div>

          {post.disclaimer && (
            <aside className={styles.disclaimer}>{post.disclaimer}</aside>
          )}

          <div className={styles.sections}>
            {post.sections.map((section) => (
              <section className={styles.section} key={section.title}>
                <h3>{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.callout && (
                  <blockquote>{section.callout}</blockquote>
                )}
              </section>
            ))}
          </div>

          <div
            className={styles.tags}
            aria-label={blogPageContent.modal.tagsLabel}
          >
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>

          <aside className={styles.articleCta}>
            <span className={styles.ctaEyebrow}>
              {blogPageContent.modal.contactEyebrow}
            </span>
            <h3>{blogPageContent.modal.contactTitle}</h3>
            <p>{blogPageContent.modal.contactDescription}</p>
            <div className={styles.ctaActions}>
              <BtnElegant
                ariaLabel={blogPageContent.modal.contactAction}
                text={blogPageContent.modal.contactAction}
                to={ROUTES.contact}
              />
              <Link
                aria-label={`${blogPageContent.modal.relatedAction}: ${post.relatedProduct.label}. ${post.relatedProduct.description}`}
                className={styles.relatedLink}
                to={post.relatedProduct.path}
              >
                <span>
                  <small>{blogPageContent.modal.relatedAction}</small>
                  <strong>{post.relatedProduct.label}</strong>
                </span>
                <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </dialog>
  );
}

export default ArticleModal;
