const blogDateFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatBlogDate(date: string) {
  // UTC evita que una fecha sin hora cambie de día según la zona del visitante.
  return blogDateFormatter.format(new Date(`${date}T00:00:00Z`));
}
