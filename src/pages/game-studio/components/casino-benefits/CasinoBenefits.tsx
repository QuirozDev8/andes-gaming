import { BarChart3, Gamepad2, Gem, RefreshCw, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./CasinoBenefits.css";

type Benefit = {
  icon: LucideIcon;
  key: "exclusive" | "differentiate" | "fresh" | "entertainment";
};

const benefits: readonly Benefit[] = [
  { key: "exclusive", icon: Gem },
  { key: "differentiate", icon: BarChart3 },
  { key: "fresh", icon: RefreshCw },
  { key: "entertainment", icon: Gamepad2 },
];

export default function CasinoBenefits() {
  const { t } = useTranslation("gameStudio");

  return (
    <section
      id="casino-benefits"
      className="casino-benefits"
      aria-labelledby="casino-benefits-title"
    >
      <div className="container casino-benefits-container">
        <header className="casino-benefits-header">
          <p className="casino-benefits-label">{t("benefits.label")}</p>
          <h2 id="casino-benefits-title" className="casino-benefits-title">
            <span>{t("benefits.titleFirst")}</span>
            <span>{t("benefits.titleSecond")}</span>
          </h2>
          <p className="casino-benefits-description">
            {t("benefits.description")}
          </p>
        </header>

        <ul className="row casino-benefits-grid">
          {benefits.map(({ icon: Icon, key }) => (
            <li className="col-12 col-md-6 casino-benefits-item" key={key}>
              <article className="casino-benefits-card">
                <span className="casino-benefits-icon" aria-hidden="true">
                  <Icon strokeWidth={1.9} />
                </span>
                <div className="casino-benefits-card-copy">
                  <h3>{t(`benefits.cards.${key}.title`)}</h3>
                  <p>{t(`benefits.cards.${key}.description`)}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
