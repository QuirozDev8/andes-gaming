import { Link } from "react-router-dom";
import footerLogo from "../../assets/logos/logo_blanco.png";
import { ROUTES } from "../../routes/routePaths";
import styles from "./Footer.module.css";

type FooterLink =
  | {
      label: string;
      to: string;
      href?: never;
    }
  | {
      href: string;
      label: string;
      to?: never;
    };

const footerColumns = [
  {
    title: "PLATAFORMA",
    links: [
      { label: "BackOffice", href: "#" },
      { label: "Integraciones", href: "#" },
      { label: "Reporteria", href: "#" },
      { label: "Soporte", href: "#" },
    ],
  },
  {
    title: "PRODUCTOS",
    links: [
      { label: "Casino Aggregation", to: ROUTES.casinoAggregation },
      { label: "Game Studio", to: ROUTES.gameStudio },
      { label: "Game Providers", to: ROUTES.gameProviders },
    ],
  },
  {
    title: "EMPRESA",
    links: [
      { label: "Nosotros", to: ROUTES.about },
      { label: "Recursos", href: "#" },
      { label: "Contacto", to: ROUTES.contact },
      { label: "Politicas legales", href: "#" },
    ],
  },
] as const satisfies ReadonlyArray<{
  links: ReadonlyArray<FooterLink>;
  title: string;
}>;

const socialLinks = [
  { label: "LinkedIn", text: "in", to: ROUTES.contact },
  { label: "X", text: "X", to: ROUTES.contact },
  { label: "YouTube", text: "\u25B6", to: ROUTES.contact },
  { label: "Email", text: "\u2709", to: ROUTES.contact },
] as const;

function FooterNavLink({ link }: { link: FooterLink }) {
  if (link.to) {
    return (
      <Link className={styles.footerLink} to={link.to}>
        {link.label}
      </Link>
    );
  }

  return (
    <a className={styles.footerLink} href={link.href}>
      {link.label}
    </a>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.main}>
          <section className={styles.brandColumn} aria-label="Andes Gaming">
            <Link
              className={styles.logoLink}
              to={ROUTES.home}
              aria-label="Andes Gaming home"
            >
              <img className={styles.logo} src={footerLogo} alt="Andes Gaming" />
            </Link>

            <p className={styles.description}>
              Plataforma tecnologica B2B para integracion, operacion y
              crecimiento en el ecosistema iGaming.
            </p>

            <ul
              className={`list-unstyled m-0 p-0 d-flex flex-wrap ${styles.socialList}`}
            >
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    className={styles.socialLink}
                    to={item.to}
                    aria-label={item.label}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <nav className={styles.linkColumns} aria-label="Footer navigation">
            {footerColumns.map((column) => (
              <section className={styles.linkColumn} key={column.title}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <ul
                  className={`list-unstyled m-0 p-0 d-grid ${styles.columnList}`}
                >
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterNavLink link={link} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section className={styles.contactColumn} aria-label="Contacto">
              <h2 className={styles.columnTitle}>CONTACTO</h2>

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
                Latinoamerica
              </p>

              <a className={styles.talkButton} href="mailto:hello@andesgaming.com">
                <span className={styles.talkSurface}>
                  <span className={styles.talkContent}>Hablemos</span>
                </span>
              </a>
            </section>
          </nav>
        </div>

        <div className={`d-flex ${styles.bottom}`}>
          <p className={styles.copyright}>
            &copy; 2026 Andes Gaming. Todos los derechos reservados.
          </p>

          <div className={`d-inline-flex ${styles.legalLinks}`}>
            <a href="#terminos">Terminos y condiciones</a>
            <span aria-hidden="true" />
            <a href="#privacidad">Politica de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
