export function formatCurrencyFloat(value: string) {
  const withoutCurrencySymbol = value.replace("R$ ", "");
  const numericValue = withoutCurrencySymbol.replace(/\./g, "").replace(",", ".");
  const floatValue = parseFloat(numericValue);
  return floatValue
}
