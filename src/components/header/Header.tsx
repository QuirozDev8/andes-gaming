import { type FocusEvent, useEffect, useId, useState } from "react";
import { ArrowBigRightDash, Gamepad2, Network, Puzzle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import andesLogo from "../../assets/logos/logo-header.png";
import type { SupportedLanguage } from "../../i18n";
import { ROUTES } from "../../routes/routePaths";
import Button from "../Button/Button";
import styles from "./Header.module.css";

const LANGUAGE_ICON = "\uD83C\uDF10";
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

const navItems = [
  { labelKey: "header.home", to: ROUTES.home },
  { labelKey: "header.about", to: ROUTES.about },
  { labelKey: "header.blog", to: ROUTES.blog },
  { labelKey: "header.contact", to: ROUTES.contact },
] as const;

type NavItem = (typeof navItems)[number];
const [homeNavItem, ...secondaryNavItems] = navItems;

const productItems = [
  {
    translationKey: "casinoAggregation",
    to: ROUTES.casinoAggregation,
    icon: Puzzle,
  },
  {
    translationKey: "gameStudio",
    to: ROUTES.gameStudio,
    icon: Gamepad2,
  },
  {
    translationKey: "gameProviders",
    to: ROUTES.gameProviders,
    icon: Network,
  },
] as const;

function Header() {
  const { t, i18n } = useTranslation("common");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const mainMenuId = useId();
  const productsMenuId = useId();
  const location = useLocation();
  const isProductActive = location.pathname.startsWith("/productos/");

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const closeMobileStateOnDesktop = () => {
      if (desktopMediaQuery.matches) {
        setIsMenuOpen(false);
        setIsProductsOpen(false);
      }
    };

    closeMobileStateOnDesktop();
    desktopMediaQuery.addEventListener("change", closeMobileStateOnDesktop);

    return () => {
      desktopMediaQuery.removeEventListener("change", closeMobileStateOnDesktop);
    };
  }, []);

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen((currentValue) => {
      if (currentValue) {
        setIsProductsOpen(false);
      }

      return !currentValue;
    });
  };

  const handleProductsBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsProductsOpen(false);
    }
  };

  const openProductsMenu = () => {
    if (!isMenuOpen) {
      setIsProductsOpen(true);
    }
  };

  const closeProductsMenu = () => {
    if (!isMenuOpen) {
      setIsProductsOpen(false);
    }
  };

  const toggleProductsMenu = () => {
    if (isMenuOpen) {
      setIsProductsOpen((currentValue) => !currentValue);
      return;
    }

    setIsProductsOpen(true);
  };

  const selectedLanguage = (i18n.resolvedLanguage ?? "es").split(
    "-",
  )[0] as SupportedLanguage;

  const changeLanguage = (language: SupportedLanguage) => {
    void i18n.changeLanguage(language);
  };

  const renderLanguageSelector = (className: string) => (
    <div className={`${styles.language} ${className}`}>
      <button
        aria-label={`${t("header.languageSelector")}: ${selectedLanguage.toUpperCase()}`}
        className={styles.languageButton}
        onClick={() =>
          changeLanguage(selectedLanguage === "es" ? "en" : "es")
        }
        type="button"
      >
        <span className={styles.languageIcon} aria-hidden="true">
          {LANGUAGE_ICON}
        </span>
        <span className={styles.languageCode} lang={selectedLanguage}>
          {selectedLanguage.toUpperCase()}
        </span>
      </button>
    </div>
  );

  const renderDemoButton = () => (
    <Button text={t("header.sales")} to={ROUTES.contact} onClick={closeMenus} />
  );

  const renderNavItem = (item: NavItem) => (
    <li className={styles.navItem} key={item.to}>
      <NavLink
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
        }
        end={item.to === ROUTES.home}
        onClick={closeMenus}
        to={item.to}
      >
        {t(item.labelKey)}
      </NavLink>
    </li>
  );

  const renderProductsMenu = () => (
    <li
      className={`${styles.navItem} ${styles.productsNavItem} ${
        isProductsOpen ? styles.productsNavItemOpen : ""
      }`}
      onBlur={handleProductsBlur}
      onFocus={openProductsMenu}
      onMouseEnter={openProductsMenu}
      onMouseLeave={closeProductsMenu}
    >
      <button
        aria-controls={productsMenuId}
        aria-expanded={isProductsOpen}
        className={`${styles.navLink} ${styles.productsTrigger} ${
          isProductActive ? styles.navLinkActive : ""
        }`}
        type="button"
        onClick={toggleProductsMenu}
      >
        <span>{t("header.products")}</span>
        <span className={styles.productsChevron} aria-hidden="true" />
      </button>

      <div className={styles.productsDropdown} id={productsMenuId}>
        <div className={styles.productsGrid}>
          {productItems.map((item) => {
            const ProductIcon = item.icon;
            const productKey = `header.productsList.${item.translationKey}`;

            return (
              <NavLink
                className={({ isActive }) =>
                  `${styles.productCard} ${
                    isActive ? styles.productCardActive : ""
                  }`
                }
                key={item.to}
                onClick={closeMenus}
                to={item.to}
              >
                <span className={styles.productIcon}>
                  <ProductIcon aria-hidden="true" strokeWidth={1.8} />
                </span>
                <span className={styles.productContent}>
                  <strong>{t(`${productKey}.label`)}</strong>
                  <span>{t(`${productKey}.description`)}</span>
                </span>
                <span className={styles.productArrow} aria-hidden="true">
                  <ArrowBigRightDash strokeWidth={1.8} />
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </li>
  );

  return (
    <header className={styles.header}>
      <nav
        className={`container-fluid ${styles.navbar}`}
        aria-label={t("header.navigationLabel")}
      >
        <Link
          className={`${styles.brand}`}
          to={ROUTES.home}
          aria-label={t("header.homeLabel")}
        >
          <img className={styles.logo} src={andesLogo} alt="Andes Gaming" />
        </Link>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={
            isMenuOpen ? t("header.closeMenu") : t("header.openMenu")
          }
          aria-controls={mainMenuId}
          aria-expanded={isMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>

        <div
          className={`${styles.navigationPanel} ${
            isMenuOpen ? styles.navigationPanelOpen : ""
          }`}
          id={mainMenuId}
        >
          <ul className={`list-unstyled m-0 p-0 ${styles.navList}`}>
            {renderNavItem(homeNavItem)}
            {renderProductsMenu()}
            {secondaryNavItems.map(renderNavItem)}
          </ul>

          {isMenuOpen && (
            <div className={styles.mobileActions}>
              <div className={styles.demoButton}>{renderDemoButton()}</div>
              {renderLanguageSelector(styles.mobileLanguage)}
            </div>
          )}
        </div>

        <div className={`${styles.rightActions} me-lg-2`}>
          {renderLanguageSelector(styles.desktopLanguage)}
          <div className={styles.demoButton}>{renderDemoButton()}</div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
