export function money(value, currency = "USD", locale = "en-US") {
  const num = Number(value) || 0;
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(num);
}
