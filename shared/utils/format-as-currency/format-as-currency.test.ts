import { formatAsCurrency } from "./format-as-currency"

describe('Testing function Format As Currency', () => {
  it('Should return a string', () => {
    const formatted = formatAsCurrency(1000)
    expect(typeof formatted).toBe('string')
  })

  it('Should return a formatted string with simbols and decimals', () => {
    const formatted = formatAsCurrency(1000).split(' ').join()

    expect(formatted).toContain('R$')
    expect(formatted).toContain('1.000,00')
  })
})
