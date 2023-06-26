export default function toCurrency(value: number) {
  const currency = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
    maximumSignificantDigits: 3,
  });
  return currency.format(value);
}
