export function formatTimestamp(ts, locale = "en-GB") {
  if (!ts) return "";

  const date = ts.toDate();
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
