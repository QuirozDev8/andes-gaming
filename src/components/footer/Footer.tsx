import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import footerLogo from "../../assets/logos/logo_blanco.png";
import { ROUTES } from "../../routes/routePaths";
import styles from "./Footer.module.css";

type FooterLink =
  | {
      labelKey: string;
      to: string;
      href?: never;
    }
  | {
      href: string;
      labelKey: string;
      to?: never;
    };

const footerColumns = [
  {
    titleKey: "footer.columns.platform.title",
    links: [
      { labelKey: "footer.columns.platform.backoffice", href: "#" },
      { labelKey: "footer.columns.platform.integrations", href: "#" },
      { labelKey: "footer.columns.platform.reporting", href: "#" },
      { labelKey: "footer.columns.platform.support", href: "#" },
    ],
  },
  {
    titleKey: "footer.columns.products.title",
    links: [
      {
        labelKey: "footer.columns.products.casinoAggregation",
        to: ROUTES.casinoAggregation,
      },
      {
        labelKey: "footer.columns.products.gameStudio",
        to: ROUTES.gameStudio,
      },
      {
        labelKey: "footer.columns.products.gameProviders",
        to: ROUTES.gameProviders,
      },
    ],
  },
  {
    titleKey: "footer.columns.company.title",
    links: [
      { labelKey: "footer.columns.company.about", to: ROUTES.about },
      { labelKey: "footer.columns.company.contact", to: ROUTES.contact },
      { labelKey: "footer.columns.company.legal", href: "#" },
    ],
  },
] as const satisfies ReadonlyArray<{
  links: ReadonlyArray<FooterLink>;
  titleKey: string;
}>;

const socialLinks = [
  { labelKey: "LinkedIn", text: "in", to: ROUTES.contact },
  { labelKey: "X", text: "X", to: ROUTES.contact },
  { labelKey: "YouTube", text: "\u25B6", to: ROUTES.contact },
  { labelKey: "footer.social.email", text: "\u2709", to: ROUTES.contact },
] as const;

function FooterNavLink({ label, link }: { label: string; link: FooterLink }) {
  if (link.to) {
    return (
      <Link className={styles.footerLink} to={link.to}>
        {label}
      </Link>
    );
  }

  return (
    <a className={styles.footerLink} href={link.href}>
      {label}
    </a>
  );
}

function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.main}>
          <section className={styles.brandColumn} aria-label="Andes Gaming">
            <Link
              className={styles.logoLink}
              to={ROUTES.home}
              aria-label={t("footer.homeLabel")}
            >
              <img className={styles.logo} src={footerLogo} alt="Andes Gaming" />
            </Link>

            <p className={styles.description}>
              {t("footer.description")}
            </p>

            <ul
              className={`list-unstyled m-0 p-0 d-flex flex-wrap ${styles.socialList}`}
            >
              {socialLinks.map((item) => (
                <li key={item.labelKey}>
                  <Link
                    className={styles.socialLink}
                    to={item.to}
                    aria-label={
                      item.labelKey.startsWith("footer.")
                        ? t(item.labelKey)
                        : item.labelKey
                    }
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <nav
            className={styles.linkColumns}
            aria-label={t("footer.navigationLabel")}
          >
            {footerColumns.map((column) => (
              <section className={styles.linkColumn} key={column.titleKey}>
                <h2 className={styles.columnTitle}>{t(column.titleKey)}</h2>
                <ul
                  className={`list-unstyled m-0 p-0 d-grid ${styles.columnList}`}
                >
                  {column.links.map((link) => (
                    <li key={link.labelKey}>
                      <FooterNavLink label={t(link.labelKey)} link={link} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section
              className={styles.contactColumn}
              aria-label={t("footer.contact.sectionLabel")}
            >
              <h2 className={styles.columnTitle}>
                {t("footer.contact.title")}
              </h2>

              <a className={styles.contactItem} href="mailto:hello@andesgaming.com">
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                correojemplo@andesgaming.com
              </a>

              <p className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
                    <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                </span>
                {t("footer.contact.location")}
              </p>

              <a className={styles.talkButton} href="mailto:hello@andesgaming.com">
                <span className={styles.talkSurface}>
                  <span className={styles.talkContent}>
                    {t("footer.contact.talk")}
                  </span>
                </span>
              </a>
            </section>
          </nav>
        </div>

        <div className={`d-flex ${styles.bottom}`}>
          <p className={styles.copyright}>
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>

          <div className={`d-inline-flex ${styles.legalLinks}`}>
            <a href="#terminos">{t("footer.terms")}</a>
            <span aria-hidden="true" />
            <a href="#privacidad">{t("footer.privacy")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
