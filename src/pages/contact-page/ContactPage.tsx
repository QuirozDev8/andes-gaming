import type { FormEvent } from "react";
import {
  ArrowUpRight,
  AtSign,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import BtnElegant from "../../components/btn-elegant/BtnElegant";
import RevealOnScroll from "../../components/reveal-on-scroll/RevealOnScroll";
import SectionTitle from "../../components/section-title/SectionTitle";
import styles from "./ContactPage.module.css";

const contactFields = [
  {
    autoComplete: "name",
    icon: UserRound,
    id: "contact-page-name",
    name: "fullName",
    required: true,
    translationKey: "name",
    type: "text",
  },
  {
    autoComplete: "organization-title",
    icon: BriefcaseBusiness,
    id: "contact-page-role",
    name: "role",
    required: true,
    translationKey: "role",
    type: "text",
  },
  {
    autoComplete: "organization",
    icon: Building2,
    id: "contact-page-company",
    name: "company",
    required: true,
    translationKey: "company",
    type: "text",
  },
  {
    autoComplete: "country-name",
    icon: MapPin,
    id: "contact-page-country",
    name: "country",
    required: true,
    translationKey: "country",
    type: "text",
  },
  {
    autoComplete: "email",
    icon: Mail,
    id: "contact-page-email",
    name: "email",
    required: true,
    translationKey: "email",
    type: "email",
  },
  {
    autoComplete: "tel",
    icon: Phone,
    id: "contact-page-whatsapp",
    name: "whatsapp",
    required: false,
    translationKey: "whatsapp",
    type: "tel",
  },
  {
    autoComplete: "url",
    icon: Globe2,
    id: "contact-page-website",
    name: "website",
    required: false,
    translationKey: "website",
    type: "url",
  },
] as const;

const contactChannels = [
  {
    external: true,
    href: "https://www.instagram.com/",
    icon: AtSign,
    translationKey: "instagram",
    value: "@andesgaming",
  },
  {
    external: true,
    href: "https://www.linkedin.com/",
    icon: UsersRound,
    translationKey: "linkedin",
    value: "Andes Gaming",
  },
  {
    external: true,
    href: "https://wa.me/",
    icon: MessageCircle,
    translationKey: "whatsapp",
    value: "+57 300 000 0000",
  },
  {
    external: false,
    href: "mailto:hello@andesgaming.com",
    icon: Mail,
    translationKey: "email",
    value: "hello@andesgaming.com",
  },
] as const;

const partnershipReasons = [
  { icon: Network, translationKey: "integration" },
  { icon: ChartNoAxesCombined, translationKey: "scalability" },
  { icon: Globe2, translationKey: "regional" },
  { icon: ShieldCheck, translationKey: "support" },
] as const;

const heroHighlights = ["b2b", "latam", "integration"] as const;

export function ContactPage() {
  const { t } = useTranslation("contactPage");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.page}>
      <section
        aria-labelledby="contact-page-title"
        className={styles.hero}
      >
        <span className={styles.heroGlowLeft} aria-hidden="true" />
        <span className={styles.heroGlowRight} aria-hidden="true" />

        <div className="container position-relative">
          <div className={styles.landingShell}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>
                <Sparkles aria-hidden="true" strokeWidth={1.8} />
                {t("hero.eyebrow")}
              </span>

              <SectionTitle
                accentClassName={styles.heroTitleAccent}
                as="h1"
                className={styles.heroTitle}
                id="contact-page-title"
                lines={[
                  t("hero.titleFirst"),
                  { accent: true, content: t("hero.titleAccent") },
                ]}
                nowrap={false}
              />

              <p className={styles.heroDescription}>{t("hero.description")}</p>

              <ul className={styles.heroHighlights}>
                {heroHighlights.map((highlight) => (
                  <li key={highlight}>
                    <CheckCircle2 aria-hidden="true" strokeWidth={1.8} />
                    <span>{t(`hero.highlights.${highlight}`)}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.mobileHeroActions}>
                <BtnElegant
                  ariaLabel={t("hero.ctaLabel")}
                  className={styles.mobilePrimaryAction}
                  href="#contact-page-form"
                  text={t("hero.cta")}
                />
                <a
                  aria-label={t("hero.secondaryCtaLabel")}
                  className={styles.mobileSecondaryAction}
                  href="#contact-channels"
                >
                  <MessageCircle aria-hidden="true" strokeWidth={1.8} />
                  <span>{t("hero.secondaryCta")}</span>
                </a>
              </div>
            </div>

            <div className={styles.formCard}>
              <header className={styles.sectionHeader}>
                <span className={styles.sectionEyebrow}>
                  {t("form.eyebrow")}
                </span>
                <h2 id="contact-form-title">{t("form.title")}</h2>
                <p>{t("form.description")}</p>
              </header>

              <form
                aria-label={t("form.ariaLabel")}
                className={styles.form}
                id="contact-page-form"
                onSubmit={handleSubmit}
              >
                <div className={styles.formGrid}>
                  {contactFields.map((field) => {
                    const FieldIcon = field.icon;
                    const fieldLabel = t(
                      `form.fields.${field.translationKey}`,
                    );

                    return (
                      <div className={styles.field} key={field.id}>
                        <label htmlFor={field.id}>
                          {fieldLabel}
                          {field.required ? (
                            <span
                              aria-hidden="true"
                              className={styles.requiredMark}
                            >
                              *
                            </span>
                          ) : (
                            <span className={styles.optionalLabel}>
                              {t("form.optional")}
                            </span>
                          )}
                        </label>

                        <div className={styles.inputShell}>
                          <FieldIcon
                            aria-hidden="true"
                            className={styles.fieldIcon}
                            strokeWidth={1.8}
                          />
                          <input
                            autoComplete={field.autoComplete}
                            id={field.id}
                            name={field.name}
                            placeholder={fieldLabel}
                            required={field.required}
                            type={field.type}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <label
                  className={styles.consent}
                  htmlFor="contact-page-consent"
                >
                  <input
                    id="contact-page-consent"
                    name="privacyConsent"
                    required
                    type="checkbox"
                  />
                  <span>{t("form.consent")}</span>
                </label>

                <div className={styles.formActions}>
                  <BtnElegant
                    ariaLabel={t("form.submitLabel")}
                    className={styles.submitButton}
                    text={t("form.submit")}
                    type="submit"
                  />
                </div>
              </form>
            </div>

            <aside
              aria-labelledby="contact-channels-title"
              className={styles.channelsPanel}
              id="contact-channels"
            >
              <header className={styles.channelsHeader}>
                <span>{t("channels.eyebrow")}</span>
                <h2 id="contact-channels-title">{t("channels.title")}</h2>
                <p>{t("channels.description")}</p>
              </header>

              <ul className={styles.channelList}>
                {contactChannels.map((channel) => {
                  const ChannelIcon = channel.icon;

                  return (
                    <li key={channel.translationKey}>
                      <a
                        aria-label={t(
                          `channels.items.${channel.translationKey}.ariaLabel`,
                        )}
                        className={styles.channelCard}
                        href={channel.href}
                        rel={channel.external ? "noreferrer" : undefined}
                        target={channel.external ? "_blank" : undefined}
                      >
                        <span className={styles.channelIcon}>
                          <ChannelIcon aria-hidden="true" strokeWidth={1.8} />
                        </span>
                        <span className={styles.channelContent}>
                          <strong>
                            {t(
                              `channels.items.${channel.translationKey}.label`,
                            )}
                          </strong>
                          <span>{channel.value}</span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className={styles.channelArrow}
                          strokeWidth={1.8}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className={styles.channelsNote}>
                <CheckCircle2 aria-hidden="true" strokeWidth={1.8} />
                <p>{t("channels.note")}</p>
              </div>
            </aside>

            <RevealOnScroll
              className={styles.reasonsReveal}
              delayMs={80}
              distancePx={12}
            >
              <section
                aria-labelledby="contact-reasons-title"
                className={styles.reasonsPanel}
              >
                <header className={styles.reasonsHeader}>
                  <span className={styles.sectionEyebrow}>
                    {t("reasons.eyebrow")}
                  </span>
                  <SectionTitle
                    accentClassName={styles.reasonsTitleAccent}
                    as="h2"
                    className={styles.reasonsTitle}
                    id="contact-reasons-title"
                    lines={[
                      t("reasons.titleFirst"),
                      { accent: true, content: t("reasons.titleAccent") },
                    ]}
                    nowrap={false}
                  />
                </header>

                <div
                  aria-label={t("reasons.ariaLabel")}
                  className={styles.reasonsGrid}
                  role="list"
                >
                  {partnershipReasons.map((reason) => {
                    const ReasonIcon = reason.icon;
                    const reasonKey = `reasons.items.${reason.translationKey}`;

                    return (
                      <article
                        className={styles.reasonCard}
                        key={reason.translationKey}
                        role="listitem"
                      >
                        <span className={styles.reasonIcon}>
                          <ReasonIcon aria-hidden="true" strokeWidth={1.7} />
                        </span>
                        <div>
                          <h3>{t(`${reasonKey}.title`)}</h3>
                          <p>{t(`${reasonKey}.description`)}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
