import { useEffect, useId, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { gameProviders } from "../../data";
import styles from "./AllProviders.module.css";

const DESKTOP_INITIAL_PROVIDER_COUNT = 18;
const MOBILE_INITIAL_ROWS = 5;
const MOBILE_COLUMNS = 3;
const COMPACT_MOBILE_COLUMNS = 2;
const PROVIDERS_PER_LOAD = 5;
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";
const COMPACT_MOBILE_MEDIA_QUERY = "(max-width: 520px)";

function getInitialProviderCount() {
  if (typeof window === "undefined") {
    return DESKTOP_INITIAL_PROVIDER_COUNT;
  }

  if (window.matchMedia(COMPACT_MOBILE_MEDIA_QUERY).matches) {
    return MOBILE_INITIAL_ROWS * COMPACT_MOBILE_COLUMNS;
  }

  if (window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
    return MOBILE_INITIAL_ROWS * MOBILE_COLUMNS;
  }

  return DESKTOP_INITIAL_PROVIDER_COUNT;
}

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

export default function AllProviders() {
  const { t } = useTranslation("gameProvider");
  const searchInputId = useId();
  const providersGridId = useId();
  const resultsStatusId = useId();
  const [searchQuery, setSearchQuery] = useState("");
  const [initialProviderCount, setInitialProviderCount] = useState(
    getInitialProviderCount,
  );
  const [visibleCount, setVisibleCount] = useState(initialProviderCount);

  useEffect(() => {
    const mobileMedia = window.matchMedia(MOBILE_MEDIA_QUERY);
    const compactMobileMedia = window.matchMedia(COMPACT_MOBILE_MEDIA_QUERY);
    const updateInitialCount = () => {
      const nextInitialCount = getInitialProviderCount();

      setInitialProviderCount(nextInitialCount);
      setVisibleCount(nextInitialCount);
    };

    mobileMedia.addEventListener("change", updateInitialCount);
    compactMobileMedia.addEventListener("change", updateInitialCount);

    return () => {
      mobileMedia.removeEventListener("change", updateInitialCount);
      compactMobileMedia.removeEventListener("change", updateInitialCount);
    };
  }, []);

  const normalizedQuery = normalizeSearchValue(searchQuery);
  const isSearching = normalizedQuery.length > 0;
  const filteredProviders = isSearching
    ? gameProviders.filter((provider) =>
        normalizeSearchValue(
          `${provider.name} ${provider.alt} ${provider.id}`,
        ).includes(normalizedQuery),
      )
    : gameProviders;
  const visibleProviders = isSearching
    ? filteredProviders
    : filteredProviders.slice(0, visibleCount);
  const hasMoreProviders =
    !isSearching && visibleProviders.length < gameProviders.length;
  const nextBatchSize = Math.min(
    PROVIDERS_PER_LOAD,
    gameProviders.length - visibleProviders.length,
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(initialProviderCount);
  };

  const loadMoreProviders = () => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + PROVIDERS_PER_LOAD, gameProviders.length),
    );
  };

  const resultsStatus = isSearching
    ? t("catalog.searchResults", {
        count: filteredProviders.length,
        query: searchQuery.trim(),
      })
    : t("catalog.showing", {
        visible: visibleProviders.length,
        total: gameProviders.length,
      });

  return (
    <section
      className={styles.providers}
      id="all-providers"
      aria-labelledby="all-providers-title"
    >
      <div className={styles.container}>
        <div className={styles.panel}>
          <header className={styles.header}>
            <div className={styles.titleGroup}>
              <h2 className={styles.title} id="all-providers-title">
                {t("catalog.title")}
              </h2>
              <span className={styles.providerBadge}>
                {t("catalog.badge")}
              </span>
            </div>

            <div className={styles.search} role="search">
              <label className={styles.visuallyHidden} htmlFor={searchInputId}>
                {t("catalog.searchLabel")}
              </label>
              <input
                className={styles.searchInput}
                id={searchInputId}
                type="search"
                value={searchQuery}
                placeholder={t("catalog.searchPlaceholder")}
                autoComplete="off"
                spellCheck={false}
                aria-controls={providersGridId}
                aria-describedby={resultsStatusId}
                onChange={(event) => handleSearchChange(event.target.value)}
              />
              <Search className={styles.searchIcon} aria-hidden="true" />
            </div>
          </header>

          <p
            className={styles.visuallyHidden}
            id={resultsStatusId}
            role="status"
            aria-live="polite"
          >
            {resultsStatus}
          </p>

          {visibleProviders.length > 0 ? (
            <ul
              className={styles.grid}
              id={providersGridId}
              aria-label={t("catalog.ariaLabel")}
            >
              {visibleProviders.map((provider) => (
                <li className={styles.providerCard} key={provider.id}>
                  <img
                    className={styles.providerLogo}
                    src={provider.src}
                    alt={provider.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState}>
              <strong>{t("catalog.emptyTitle")}</strong>
              <p>{t("catalog.emptyDescription")}</p>
            </div>
          )}

          {hasMoreProviders ? (
            <div className={styles.actions}>
              <button
                className={styles.loadMoreButton}
                type="button"
                aria-controls={providersGridId}
                aria-label={t("catalog.loadMoreLabel", {
                  count: nextBatchSize,
                })}
                onClick={loadMoreProviders}
              >
                <span>{t("catalog.loadMore")}</span>
                <ChevronDown aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
