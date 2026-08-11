import type { CSSProperties } from "react";
import styles from "./BlogHeroEffects.module.css";

type HeroParticle = {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
  tone: "cyan" | "violet";
  kind: "dot" | "node";
};

type ParticleStyle = CSSProperties & {
  "--particle-x": string;
  "--particle-y": string;
  "--particle-size": string;
  "--particle-duration": string;
  "--particle-delay": string;
  "--particle-drift-x": string;
  "--particle-drift-y": string;
  "--particle-opacity": string;
};

// Posiciones fijas: la atmósfera conserva la misma composición en cada render.
const HERO_PARTICLES: readonly HeroParticle[] = [
  { x: 6, y: 18, size: 3, duration: 11, delay: -2, driftX: 12, driftY: -20, opacity: 0.72, tone: "cyan", kind: "dot" },
  { x: 94, y: 22, size: 2, duration: 14, delay: -7, driftX: -10, driftY: -18, opacity: 0.62, tone: "violet", kind: "dot" },
  { x: 12, y: 72, size: 10, duration: 15, delay: -4, driftX: 14, driftY: -13, opacity: 0.58, tone: "violet", kind: "node" },
  { x: 88, y: 78, size: 4, duration: 9, delay: -5, driftX: -14, driftY: -24, opacity: 0.78, tone: "cyan", kind: "dot" },
  { x: 20, y: 40, size: 2, duration: 13, delay: -9, driftX: 9, driftY: -16, opacity: 0.56, tone: "cyan", kind: "dot" },
  { x: 80, y: 48, size: 9, duration: 12, delay: -3, driftX: -12, driftY: -14, opacity: 0.52, tone: "cyan", kind: "node" },
  { x: 32, y: 12, size: 3, duration: 16, delay: -11, driftX: -7, driftY: -19, opacity: 0.54, tone: "violet", kind: "dot" },
  { x: 68, y: 86, size: 3, duration: 10, delay: -6, driftX: 10, driftY: -21, opacity: 0.68, tone: "violet", kind: "dot" },
  { x: 52, y: 14, size: 2, duration: 12, delay: -8, driftX: 8, driftY: -12, opacity: 0.46, tone: "cyan", kind: "dot" },
  { x: 4, y: 52, size: 4, duration: 9, delay: -1, driftX: 15, driftY: -17, opacity: 0.64, tone: "violet", kind: "dot" },
  { x: 96, y: 58, size: 3, duration: 13, delay: -10, driftX: -16, driftY: -11, opacity: 0.66, tone: "cyan", kind: "dot" },
  { x: 74, y: 18, size: 2, duration: 15, delay: -12, driftX: 7, driftY: -16, opacity: 0.48, tone: "violet", kind: "dot" },
  { x: 26, y: 88, size: 3, duration: 11, delay: -4, driftX: -10, driftY: -22, opacity: 0.62, tone: "cyan", kind: "dot" },
  { x: 91, y: 36, size: 11, duration: 16, delay: -7, driftX: -9, driftY: -15, opacity: 0.46, tone: "violet", kind: "node" },
  { x: 9, y: 32, size: 2, duration: 10, delay: -8, driftX: 13, driftY: -18, opacity: 0.7, tone: "cyan", kind: "dot" },
  { x: 38, y: 78, size: 4, duration: 14, delay: -5, driftX: -8, driftY: -12, opacity: 0.5, tone: "violet", kind: "dot" },
  { x: 84, y: 66, size: 8, duration: 12, delay: -9, driftX: 11, driftY: -13, opacity: 0.5, tone: "cyan", kind: "node" },
  { x: 60, y: 90, size: 2, duration: 9, delay: -3, driftX: -7, driftY: -20, opacity: 0.58, tone: "cyan", kind: "dot" },
];

export function BlogHeroEffects() {
  return (
    <div aria-hidden="true" className={styles.root}>
      <span className={styles.aura} />
      <span className={`${styles.halo} ${styles.haloViolet}`} />
      <span className={`${styles.halo} ${styles.haloCyan}`} />

      <span className={styles.particles}>
        {HERO_PARTICLES.map((particle, index) => {
          const particleStyle: ParticleStyle = {
            "--particle-x": `${particle.x}%`,
            "--particle-y": `${particle.y}%`,
            "--particle-size": `${particle.size}px`,
            "--particle-duration": `${particle.duration}s`,
            "--particle-delay": `${particle.delay}s`,
            "--particle-drift-x": `${particle.driftX}px`,
            "--particle-drift-y": `${particle.driftY}px`,
            "--particle-opacity": String(particle.opacity),
          };

          return (
            <span
              className={`${styles.particle} ${styles[particle.tone]} ${styles[particle.kind]}`}
              key={`${particle.x}-${particle.y}-${index}`}
              style={particleStyle}
            />
          );
        })}
      </span>
    </div>
  );
}

export default BlogHeroEffects;
