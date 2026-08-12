const blogDateFormatters = {
  es: new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
  en: new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
} as const;

export function formatBlogDate(date: string, language: string) {
  // UTC evita que una fecha sin hora cambie de día según la zona del visitante.
  const formatter = language.startsWith("en")
    ? blogDateFormatters.en
    : blogDateFormatters.es;

  return formatter.format(new Date(`${date}T00:00:00Z`));
}
