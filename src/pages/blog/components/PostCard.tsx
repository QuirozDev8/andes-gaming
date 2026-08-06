import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { blogPageContent, type BlogPost } from "../data-blog";
import { formatBlogDate } from "../blog-utils";
import styles from "./PostCard.module.css";

type PostCardProps = {
  post: BlogPost;
  categoryLabel: string;
  onOpen: (post: BlogPost) => void;
};

export function PostCard({ post, categoryLabel, onOpen }: PostCardProps) {
  return (
    <article className={styles.card}>
      <button
        aria-label={`${blogPageContent.card.openLabel}: ${post.title}`}
        className={styles.trigger}
        onClick={() => onOpen(post)}
        type="button"
      >
        <span className={styles.media}>
          <img
            alt={post.imageAlt}
            className={styles.image}
            decoding="async"
            loading="lazy"
            src={post.image}
          />
          <span className={styles.category}>{categoryLabel}</span>
        </span>

        <span className={styles.content}>
          <span className={styles.meta}>
            <span>
              <CalendarDays aria-hidden="true" strokeWidth={1.8} />
              {formatBlogDate(post.publishedAt)}
            </span>
            <span>
              <Clock3 aria-hidden="true" strokeWidth={1.8} />
              {post.readingTime} {blogPageContent.card.minutesLabel}
            </span>
          </span>

          <strong className={styles.title}>{post.title}</strong>
          <span className={styles.excerpt}>{post.excerpt}</span>

          <span className={styles.action} aria-hidden="true">
            {blogPageContent.card.action}
            <ArrowUpRight strokeWidth={1.8} />
          </span>
        </span>
      </button>
    </article>
  );
}

export default PostCard;
