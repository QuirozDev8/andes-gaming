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

type SocialLink = {
  labelKey: string;
  text?: string;
  icon?: "instagram";
  to?: string;
  href?: string;
  external?: boolean;
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
  {
    labelKey: "Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/andesgamingstudio",
    external: true,
  },
  { labelKey: "YouTube", text: "\u25B6", to: ROUTES.contact },
  {
    labelKey: "footer.social.email",
    text: "\u2709",
    href: "mailto:sales@andesgaming.com",
  },
] as const satisfies ReadonlyArray<SocialLink>;

const scrollToPageStart = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

function FooterNavLink({ label, link }: { label: string; link: FooterLink }) {
  if (link.to) {
    return (
      <Link className={styles.footerLink} to={link.to} onClick={scrollToPageStart}>
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

function FooterSocialLink({ item, label }: { item: SocialLink; label: string }) {
  const content =
    item.icon === "instagram" ? (
      <svg className={styles.socialIcon} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle className={styles.socialIconDot} cx="17" cy="7" r="1" />
      </svg>
    ) : (
      item.text
    );

  if (item.href) {
    return (
      <a
        className={styles.socialLink}
        href={item.href}
        aria-label={label}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={styles.socialLink}
      to={item.to ?? ROUTES.contact}
      onClick={scrollToPageStart}
      aria-label={label}
    >
      {content}
    </Link>
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
              onClick={scrollToPageStart}
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
                  <FooterSocialLink
                    item={item}
                    label={
                      item.labelKey.startsWith("footer.")
                        ? t(item.labelKey)
                        : item.labelKey
                    }
                  />
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

              <a className={styles.contactItem} href="mailto:sales@andesgaming.com">
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                sales@andesgaming.com
              </a>

              <a className={styles.contactItem} href="tel:+573507954061">
                <span className={styles.contactIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M5 4h3l2 5-2 1.5a14 14 0 0 0 5.5 5.5L15 14l5 2v3a2 2 0 0 1-2 2C10.3 21 3 13.7 3 6a2 2 0 0 1 2-2Z" />
                  </svg>
                </span>
                +57 350 7954061
              </a>

              <Link
                className={styles.talkButton}
                to={ROUTES.contact}
                onClick={scrollToPageStart}
              >
                <span className={styles.talkSurface}>
                  <span className={styles.talkContent}>
                    {t("footer.contact.talk")}
                  </span>
                </span>
              </Link>
            </section>
          </nav>
        </div>

        <div className={`d-flex ${styles.bottom}`}>
          <p className={styles.copyright}>
            {t("footer.copyright")}
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
