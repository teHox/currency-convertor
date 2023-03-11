export function convertFromUsd({fromCurrency, toCurrency, res, value}) {
  const result = (res[fromCurrency] / res[toCurrency]) * value;
  return (result.toFixed(3));
}
