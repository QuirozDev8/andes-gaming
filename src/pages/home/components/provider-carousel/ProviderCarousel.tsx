import type { CSSProperties } from "react";
import styles from "./ProviderCarousel.module.css";

export interface ProviderCarouselItem {
  id?: string;
  src: string;
  alt: string;
  href?: string;
  logoScale?: number;
  offsetY?: number | string;
}

interface ProviderCarouselProps {
  items: ProviderCarouselItem[];
  secondRowItems?: ProviderCarouselItem[];
  className?: string;
  ariaLabel?: string;
  logoWidth?: number | string;
  logoHeight?: number | string;
  gap?: number | string;
  durationSeconds?: number;
  pauseOnHover?: boolean;
}

type CarouselStyle = CSSProperties & Record<`--${string}`, string | number>;

const LOOP_REPEAT_COUNT = 4;

function toCssSize(value: number | string | undefined, fallback: string) {
  if (typeof value === "number") {
    return `${value}px`;
  }

  return value ?? fallback;
}

function getItemKey(item: ProviderCarouselItem, index: number) {
  return item.id ?? `${item.src}-${item.alt}-${index}`;
}

function ProviderLogo({
  item,
  isDuplicate = false,
}: {
  item: ProviderCarouselItem;
  isDuplicate?: boolean;
}) {
  const imageStyle: CarouselStyle = {
    "--item-logo-scale": item.logoScale ?? 1,
    "--item-logo-offset-y": toCssSize(item.offsetY, "0px"),
  };

  const logo = (
    <span className={styles.logoTile}>
      <img
        className={styles.logoImage}
        src={item.src}
        alt={isDuplicate ? "" : item.alt}
        style={imageStyle}
      />
    </span>
  );

  if (!item.href) {
    return logo;
  }

  return (
    <a
      className={styles.logoLink}
      href={item.href}
      aria-label={isDuplicate ? undefined : item.alt}
      tabIndex={isDuplicate ? -1 : undefined}
    >
      {logo}
    </a>
  );
}

function CarouselRow({
  items,
  direction,
}: {
  items: ProviderCarouselItem[];
  direction: "left" | "right";
}) {
  const repeatedGroups = Array.from({ length: LOOP_REPEAT_COUNT }, (_, index) => index);

  return (
    <div className={styles.row} data-direction={direction}>
      <div className={styles.track}>
        {repeatedGroups.map((groupIndex) => (
          <div
            className={styles.group}
            key={groupIndex}
            aria-hidden={groupIndex > 0}
          >
            {items.map((item, itemIndex) => (
              <ProviderLogo
                item={item}
                isDuplicate={groupIndex > 0}
                key={`${groupIndex}-${getItemKey(item, itemIndex)}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProviderCarousel({
  items,
  secondRowItems,
  className,
  ariaLabel = "Provider logos carousel",
  logoWidth,
  logoHeight,
  gap,
  durationSeconds = 28,
  pauseOnHover = true,
}: ProviderCarouselProps) {
  if (!items.length) {
    return null;
  }

  const lowerRowItems = secondRowItems?.length ? secondRowItems : [...items].reverse();
  const style: CarouselStyle = {
    "--logo-width": toCssSize(logoWidth, "164px"),
    "--logo-height": toCssSize(logoHeight, "88px"),
    "--logo-gap": toCssSize(gap, "24px"),
    "--duration": `${durationSeconds}s`,
    "--scroll-distance": `${-100 / LOOP_REPEAT_COUNT}%`,
  };

  return (
    <section
      className={`${styles.carousel} ${className ?? ""}`}
      style={style}
      aria-label={ariaLabel}
      data-pause-on-hover={pauseOnHover}
    >
      <CarouselRow items={items} direction="left" />
      <CarouselRow items={lowerRowItems} direction="right" />
    </section>
  );
}

export default ProviderCarousel;
