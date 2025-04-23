export function formatAsCurrency(amount: number, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(
    locale,
    {
      style: 'currency',
      currency,
    }
  ).format(amount)
}
