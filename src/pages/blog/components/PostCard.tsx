import { ArrowUpRight, Clock3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { BlogPost } from "../data-blog";

import styles from "./PostCard.module.css";

type PostCardProps = {
  post: BlogPost;
  categoryLabel: string;
  onOpen: (post: BlogPost) => void;
};

export function PostCard({ post, categoryLabel, onOpen }: PostCardProps) {
  const { t } = useTranslation("blog");

  return (
    <article className={styles.card}>
      <button
        aria-label={t("card.openLabel", { title: post.title })}
        className={styles.trigger}
        onClick={() => onOpen(post)}
        type="button"
      >
        <span className={styles.media}>
          <img
            alt={post.imageAlt}
            className={styles.image}
            decoding="async"
            height={788}
            loading="lazy"
            src={post.image}
            width={1400}
          />
          <span className={styles.category}>{categoryLabel}</span>
        </span>

        <span className={styles.content}>
          <span className={styles.meta}>
            <span>
              <Clock3 aria-hidden="true" strokeWidth={1.8} />
              {post.readingLabel}
            </span>
          </span>

          <strong className={styles.title}>{post.title}</strong>
          <span className={styles.excerpt}>{post.excerpt}</span>

          <span className={styles.action} aria-hidden="true">
            {post.cardAction}
            <ArrowUpRight strokeWidth={1.8} />
          </span>
        </span>
      </button>
    </article>
  );
}

export default PostCard;
