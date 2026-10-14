import { useEffect, useRef, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ArrowUpRight, CalendarDays, Clock3, UserRound, X } from "lucide-react";
import BtnElegant from "../../../components/btn-elegant/BtnElegant";
import { ROUTES } from "../../../routes/routePaths";

import type { BlogArticleBlock, BlogPost } from "../data-blog";
import { formatBlogDate } from "../blog-utils";
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
  const language = i18n.resolvedLanguage ?? "es";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `article-title-${post.slug}`;
  const descriptionId = `article-description-${post.slug}`;
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [post.slug]);

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
      <article className={styles.panel} ref={panelRef}>
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
              {post.articleTitle}
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
              <div className={styles.authorDetails}>
                <small>{t("modal.authorLabel")}</small>
                <strong>{post.author.name}</strong>
                <small>{post.author.role}</small>
              </div>
            </div>
            <div className={styles.articleMeta}>
              <span>
                <CalendarDays aria-hidden="true" strokeWidth={1.8} />
                <time dateTime={post.publishedAt}>
                  {formatBlogDate(post.publishedAt, language)}
                </time>
              </span>
              <span>
                <Clock3 aria-hidden="true" strokeWidth={1.8} />
                {t("modal.readingTime", { count: post.readingTime })}
              </span>
            </div>
          </div>

          <div className={styles.section}>
            <ArticleBlocks blocks={post.introduction} />
          </div>

          <div className={styles.sections}>
            {post.sections.map((section) => (
              <section className={styles.section} key={section.title}>
                <h3>{section.title}</h3>
                <ArticleBlocks blocks={section.blocks} />
              </section>
            ))}
          </div>

          <aside className={styles.articleCta}>
            <h3>{post.contactCta.title}</h3>
            <div className={styles.ctaActions}>
              <BtnElegant
                variant="blog"
                ariaLabel={post.contactCta.action}
                text={post.contactCta.action}
                to={ROUTES.contact}
              />
              <Link className={styles.secondaryAction} to={ROUTES.casinoAggregation}>
                <span>{t("cta.secondaryAction")}</span>
                <ArrowUpRight aria-hidden="true" strokeWidth={1.8} />
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </dialog>
  );
}

function ArticleBlocks({ blocks }: { blocks: readonly BlogArticleBlock[] }) {
  return blocks.map((block, index) =>
    block.type === "paragraph" ? (
      <p key={index}>{block.text}</p>
    ) : (
      <ul key={index}>
        {block.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
      </ul>
    ),
  );
}

export default ArticleModal;
