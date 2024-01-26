export function formatCurrencyFloat(value: string) {
  const withoutCurrencySymbol = value.replace("R$ ", "");
  const numericValue = withoutCurrencySymbol.replace(/\s+/g, '');

  const floatValue = parseFloat(numericValue);

  return floatValue
}
