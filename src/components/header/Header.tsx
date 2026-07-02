import { type FocusEvent, useEffect, useId, useState } from "react";
import { ArrowBigRightDash, Gamepad2, Network, Puzzle } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import andesLogo from "../../assets/logos/logo-header.png";
import { ROUTES } from "../../routes/routePaths";
import Button from "../Button/Button";
import styles from "./Header.module.css";

type Language = "ES" | "EN";

const LANGUAGE_ICON = "\uD83C\uDF10";
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

const navItems = [
  { label: "Home", to: ROUTES.home },
  { label: "Nosotros", to: ROUTES.about },
  { label: "Blog", to: ROUTES.blog },
  { label: "Contacto", to: ROUTES.contact },
] as const;

type NavItem = (typeof navItems)[number];
const [homeNavItem, ...secondaryNavItems] = navItems;

const productItems = [
  {
    label: "Casino Aggregation",
    to: ROUTES.casinoAggregation,
    description: "Agregacion de contenido iGaming B2B.",
    icon: Puzzle,
  },
  {
    label: "Game Studio",
    to: ROUTES.gameStudio,
    description: "Desarrollo de contenido propio e innovador.",
    icon: Gamepad2,
  },
  {
    label: "Game Providers",
    to: ROUTES.gameProviders,
    description: "Red de proveedores conectados.",
    icon: Network,
  },
] as const;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("ES");
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

  const toggleLanguage = () => {
    setSelectedLanguage((currentLanguage) =>
      currentLanguage === "ES" ? "EN" : "ES",
    );
  };

  const renderLanguageToggle = (className: string) => (
    <div className={`${styles.language} ${className}`}>
      <button
        className={styles.languageButton}
        type="button"
        aria-label={`Cambiar idioma. Idioma actual: ${selectedLanguage}`}
        onClick={toggleLanguage}
      >
        <span className={styles.languageIcon} aria-hidden="true">
          {LANGUAGE_ICON}
        </span>
        <span className={styles.languageCode}>{selectedLanguage}</span>
      </button>
    </div>
  );

  const renderDemoButton = () => (
    <Button text="Solicitar demo" to={ROUTES.contact} onClick={closeMenus} />
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
        {item.label}
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
        <span>Productos</span>
        <span className={styles.productsChevron} aria-hidden="true" />
      </button>

      <div className={styles.productsDropdown} id={productsMenuId}>
        <div className={styles.productsGrid}>
          {productItems.map((item) => {
            const ProductIcon = item.icon;

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
                  <strong>{item.label}</strong>
                  <span>{item.description}</span>
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
        aria-label="Main navigation"
      >
        <Link
          className={`${styles.brand}`}
          to={ROUTES.home}
          aria-label="Andes Gaming home"
        >
          <img className={styles.logo} src={andesLogo} alt="Andes Gaming" />
        </Link>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
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
              {renderLanguageToggle(styles.mobileLanguage)}
            </div>
          )}
        </div>

        <div className={`${styles.rightActions} me-lg-2`}>
          {renderLanguageToggle(styles.desktopLanguage)}
          <div className={styles.demoButton}>{renderDemoButton()}</div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
