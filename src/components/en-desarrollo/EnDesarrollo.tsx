import { ArrowLeft, ArrowRight, CodeXml } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routePaths";
import styles from "./EnDesarrollo.module.css";

export function EnDesarrollo() {
  
    return (
    <section className={styles.page} aria-labelledby="development-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glowViolet} aria-hidden="true" />
      <div className={styles.glowCyan} aria-hidden="true" />

      <div className={styles.shell}>
        <div className={styles.copy}>
          <span className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            Próximamente
          </span>

          <p className={styles.eyebrow}>Andes Gaming · Evolución continua</p>
          <h1 className={styles.title} id="development-title">
            Estamos construyendo
            <span> algo extraordinario</span>
          </h1>
          <p className={styles.description}>
            Esta sección se encuentra en desarrollo. Muy pronto encontrarás aquí
            una nueva experiencia diseñada para conectar, escalar y transformar
            el ecosistema iGaming.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primaryAction} to={ROUTES.home}>
              <ArrowLeft aria-hidden="true" size={18} />
              Volver al inicio
            </Link>
            <a className={styles.secondaryAction} href="/#contact-home">
              Hablar con nosotros
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.orbitOuter} />
          <div className={styles.orbitInner} />
          <span className={`${styles.node} ${styles.nodeOne}`} />
          <span className={`${styles.node} ${styles.nodeTwo}`} />
          <span className={`${styles.node} ${styles.nodeThree}`} />
          <div className={styles.core}>
            <span className={styles.coreHalo} />
            <CodeXml size={48} strokeWidth={1.6} />
          </div>
          <span className={styles.visualLabel}>Building</span>
          <span className={styles.progressTrack}>
            <span className={styles.progressBar} />
          </span>
        </div>
      </div>
    </section>
  );
}

export default EnDesarrollo;
