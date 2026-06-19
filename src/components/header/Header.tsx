import { useEffect, useState } from "react";
import andesLogo from "../../assets/logos/logo_color.png";
import Button from "../Button/Button";
import styles from "./Header.module.css";

type Language = "ES" | "EN";

const LANGUAGE_ICON = "\uD83C\uDF10";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Casino Aggregation", href: "#casino-aggregation" },
  { label: "Game Studio", href: "#game-studio" },
  { label: "Game Providers", href: "#game-providers" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
] as const;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("ES");

  useEffect(() => {
    const updateActiveHref = () => {
      setActiveHref(window.location.hash || "#home");
    };

    updateActiveHref();
    window.addEventListener("hashchange", updateActiveHref);

    return () => {
      window.removeEventListener("hashchange", updateActiveHref);
    };
  }, []);

  const closeMenus = () => {
    setIsMenuOpen(false);
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
    <Button text="Solicitar demo" href="#contacto" onClick={closeMenus} />
  );

  return (
    <header className={styles.header}>
      <nav className={`container-fluid ${styles.navbar}`} aria-label="Main navigation">
        <a className={`ps-2 ${styles.brand}`} href="#home" aria-label="Andes Gaming home">
          <img className={styles.logo} src={andesLogo} alt="Andes Gaming" />
        </a>

        {/* Menu button desplegable */}
        <button
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
          aria-controls="andes-main-menu"
          aria-expanded={isMenuOpen}
          onClick={() => {
            setIsMenuOpen((currentValue) => !currentValue);
          }}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>

        <div className={`${styles.navigationPanel} ${isMenuOpen ? styles.navigationPanelOpen : ""  }`}
         id="andes-main-menu" >
         
          <ul className={`list-unstyled m-0 p-0 ${styles.navList}`}>
            {navItems.map((item) => (
              <li className={styles.navItem} key={item.href}>
                <a
                  aria-current={activeHref === item.href ? "page" : undefined}
                  className={`${styles.navLink} ${
                    activeHref === item.href ? styles.navLinkActive : ""
                  }`}
                  href={item.href}
                  onClick={closeMenus}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
 
          {isMenuOpen && (
            <div className={styles.mobileActions}>
              <div className={styles.demoButton}>{renderDemoButton()}</div>
              {renderLanguageToggle(styles.mobileLanguage)}
            </div>
          )}
        </div>

        <div className={styles.rightActions}>
          {renderLanguageToggle(styles.desktopLanguage)}
          <div className={styles.demoButton}>{renderDemoButton()}</div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
