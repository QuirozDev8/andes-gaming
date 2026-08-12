import { useEffect, useRef, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
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
import type { BlogPost } from "../data-blog";
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
  const { t, i18n } = useTranslation("blog");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `article-title-${post.slug}`;
  const descriptionId = `article-description-${post.slug}`;
  const language = i18n.resolvedLanguage ?? "es";

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
          aria-label={t("modal.closeLabel")}
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
                <small>{t("modal.authorLabel")}</small>
                <strong>{post.author.name}</strong>
                <small>{post.author.role}</small>
              </span>
            </div>

            <div className={styles.articleMeta}>
              <span>
                <CalendarDays aria-hidden="true" strokeWidth={1.8} />
                <time dateTime={post.publishedAt}>
                  {formatBlogDate(post.publishedAt, language)}
                </time>
              </span>
              {post.updatedAt && (
                <time dateTime={post.updatedAt}>
                  {t("modal.updatedLabel")} {formatBlogDate(post.updatedAt, language)}
                </time>
              )}
              <span>
                <Clock3 aria-hidden="true" strokeWidth={1.8} />
                {t("modal.readingTime", { count: post.readingTime })}
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
            aria-label={t("modal.tagsLabel")}
          >
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>

          <aside className={styles.articleCta}>
            <span className={styles.ctaEyebrow}>
              {t("modal.contactEyebrow")}
            </span>
            <h3>{t("modal.contactTitle")}</h3>
            <p>{t("modal.contactDescription")}</p>
            <div className={styles.ctaActions}>
              <BtnElegant
                ariaLabel={t("modal.contactAction")}
                text={t("modal.contactAction")}
                to={ROUTES.contact}
              />
              <Link
                aria-label={t("modal.relatedLabel", {
                  label: post.relatedProduct.label,
                  description: post.relatedProduct.description,
                })}
                className={styles.relatedLink}
                to={post.relatedProduct.path}
              >
                <span>
                  <small>{t("modal.relatedAction")}</small>
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
