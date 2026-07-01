import {
  ChartNoAxesCombined,
  Network,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import andesGamingImage from "../../../../assets/img/img-andesgaming.webp";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import { ROUTES } from "../../../../routes/routePaths";
import styles from "./AboutCompany.module.css";

const benefits = [
  {
    title: "Single API",
    description: "Una sola integracion para conectar multiples proveedores y servicios.",
    icon: Network,
  },
  {
    title: "Ecosistema de Proveedores",
    description: "Casino, sportsbook, pagos, KYC, CRM y mas desde una misma capa.",
    icon: UsersRound,
  },
  {
    title: "Operacion Escalable",
    description: "Preparado para crecer por marca, pais, vertical y volumen operativo.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Gestion Centralizada",
    description: "Mas control, visibilidad y eficiencia para la operacion iGaming.",
    icon: ShieldCheck,
  },
] as const;

export function AboutCompany() {
  return (
    <section className={styles.about} aria-labelledby="about-company-title">
      <div className="container position-relative">
        <div className="row align-items-stretch g-5 gx-xl-4">
          <div className="col-12 col-lg-6 d-flex text-center text-lg-start">
            <div className={`${styles.content} mx-auto mx-lg-0`}>
              <span className={styles.eyebrow}>
                Tecnologia que conecta ecosistemas
              </span>

              <SectionTitle
                as="h2"
                className={styles.title}
                accentClassName={styles.titleAccent}
                id="about-company-title"
                lines={[
                  "Que es",
                  { content: "Andes Gaming?", accent: true },
                ]}
              />

              <p className={styles.description}>
                Andes Gaming es una infraestructura tecnologica B2B para
                iGaming que centraliza integraciones, conecta proveedores y
                simplifica la operacion de plataformas a traves de una sola
                capa tecnologica.
              </p>

              <div className={`${styles.benefitsGrid} row g-3`}>
                {benefits.map((benefit) => {
                  const BenefitIcon = benefit.icon;

                  return (
                    <div className="col-12 col-sm-6" key={benefit.title}>
                      <article className={styles.benefit}>
                        <div className={styles.benefitIcon}>
                          <BenefitIcon aria-hidden="true" strokeWidth={1.8} />
                        </div>
                        <div>
                          <h3>{benefit.title}</h3>
                          <p>{benefit.description}</p>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>

              <Link className={styles.cta} to={ROUTES.about}>
                Conoce mas sobre nosotros 
              </Link>

              
            </div>
          </div>

          <div className="col-12 col-lg-6 d-flex">
            <div className={`${styles.visual} ms-lg-auto`}>
              <img
                className={styles.image}
                src={andesGamingImage}
                alt="Infraestructura Andes Gaming conectando verticales de iGaming"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;
