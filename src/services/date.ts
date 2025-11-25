export function getCurrentDateString(locale: string = "es-ES") {
  try {
    const now = new Date();
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(now);
  } catch {
    // Fallback simple date format
    return new Date().toDateString();
  }
}

export function getWeatherPlaceholder() {
  // Placeholder to match the provided mock: temperature + city
  return "11.7 ° London";
}