import type { CSSProperties } from "react";
import camanbetLogo from "../../assets/logos/logos-marcas/camanbet.webp";
import doradobetLogo from "../../assets/logos/logos-marcas/doradobet.webp";
import ecuabetLogo from "../../assets/logos/logos-marcas/ecuabet.webp";
import ganamexLogo from "../../assets/logos/logos-marcas/ganamex.png";
import ganaplayLogo from "../../assets/logos/logos-marcas/ganaplay293X120.webp";
import latinbetLogo from "../../assets/logos/logos-marcas/latinbet-logo.webp";
import netabetLogo from "../../assets/logos/logos-marcas/NETABET.webp";
import redCasinoLogo from "../../assets/logos/logos-marcas/redcasino.webp";
import BtnElegant from "../btn-elegant/BtnElegant";
import styles from "./SliderMarcas.module.css";

export interface MarcaItem {
  id: string;
  nombre: string;
  logo: string;
  href?: string;
}

export interface SliderMarcasProps {
  marcas?: MarcaItem[];
  titulo?: string;
  ctaTexto?: string;
  ctaRuta?: string;
  ctaShowIcon?: boolean;
  className?: string;
  ariaLabel?: string;
  duracionSegundos?: number;
  pausarAlPasar?: boolean;
  transicionHero?: boolean;
}

const marcasPredeterminadas: MarcaItem[] = [
  { id: "camanbet", nombre: "Camanbet", logo: camanbetLogo },
  { id: "doradobet", nombre: "DoradoBet", logo: doradobetLogo },
  { id: "ecuabet", nombre: "Ecuabet", logo: ecuabetLogo },
  { id: "ganamex", nombre: "Ganamex", logo: ganamexLogo },
  { id: "ganaplay", nombre: "Ganaplay", logo: ganaplayLogo },
  { id: "latinbet", nombre: "LatinBet", logo: latinbetLogo },
  { id: "netabet", nombre: "Netabet", logo: netabetLogo },
  { id: "red-casino", nombre: "Red Casino", logo: redCasinoLogo },
];

type SliderStyle = CSSProperties & { "--slider-duration": string };

function LogoMarca({ marca, duplicado }: { marca: MarcaItem; duplicado: boolean }) {
  const contenido = (
    <span className={styles.logoContainer}>
      <img
        className={styles.logo}
        src={marca.logo}
        alt={duplicado ? "" : marca.nombre}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </span>
  );

  if (!marca.href) return contenido;

  return (
    <a
      className={styles.logoLink}
      href={marca.href}
      aria-label={duplicado ? undefined : marca.nombre}
      tabIndex={duplicado ? -1 : undefined}
    >
      {contenido}
    </a>
  );
}

export function SliderMarcas({
  marcas = marcasPredeterminadas,
  titulo,
  ctaTexto,
  ctaRuta,
  ctaShowIcon = true,
  className = "",
  ariaLabel = "Marcas que trabajan con nosotros",
  duracionSegundos = 28,
  pausarAlPasar = true,
  transicionHero = false,
}: SliderMarcasProps) {
  if (marcas.length === 0) return null;

  const style: SliderStyle = {
    "--slider-duration": `${Math.max(duracionSegundos, 1)}s`,
  };

  return (
    <section
      className={`${styles.slider} ${className}`.trim()}
      style={style}
      aria-label={ariaLabel}
      data-pausar={pausarAlPasar}
      data-transicion-hero={transicionHero || undefined}
    >
      {titulo ? <h2 className={styles.title}>{titulo}</h2> : null}
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[false, true].map((duplicado) => (
            <div
              className={styles.group}
              key={duplicado ? "duplicado" : "original"}
              aria-hidden={duplicado || undefined}
            >
              {marcas.map((marca) => (
                <LogoMarca
                  key={`${duplicado ? "copia" : "original"}-${marca.id}`}
                  marca={marca}
                  duplicado={duplicado}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {ctaTexto && ctaRuta ? (
        <div className={styles.cta}>
          <BtnElegant showIcon={ctaShowIcon} text={ctaTexto} to={ctaRuta} />
        </div>
      ) : null}
    </section>
  );
}

export default SliderMarcas;
