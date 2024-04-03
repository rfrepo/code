import { convertBTCToSats } from '_deps/shared/helpers/bitcoin/convert-btc-to-sats/convertBTCToSats'

describe('convertBTCToSats', () => {
  it('should correctly convert BTC value to sats', () => {
    const converted = convertBTCToSats('0.00000055')

    expect(converted.value).toEqual('55')

    expect(converted.strValue).toEqual('55 sats')

    expect(converted.satsAsNumber).toEqual(55)

    expect(converted.plusMinusFormattedSats).toEqual('+55')
  })

  it('should correctly format sats and display commas every 3 characters', () => {
    const converted = convertBTCToSats('0.12345678')

    expect(converted.value).toEqual('12,345,678')

    expect(converted.strValue).toEqual('12,345,678 sats')

    expect(converted.satsAsNumber).toEqual(12345678)

    expect(converted.plusMinusFormattedSats).toEqual('+12,345,678')
  })

  it('should correctly format sats and display commas every 3 characters when given a negative value', () => {
    const converted = convertBTCToSats('-0.12345678')

    expect(converted.value).toEqual('12,345,678')

    expect(converted.strValue).toEqual('12,345,678 sats')

    expect(converted.satsAsNumber).toEqual(-12345678)

    expect(converted.plusMinusFormattedSats).toEqual('-12,345,678')
  })

  it('should correctly handle a value of 0', () => {
    const converted = convertBTCToSats('0.000')

    expect(converted.value).toEqual('0')

    expect(converted.strValue).toEqual('0 sats')

    expect(converted.satsAsNumber).toEqual(0)

    expect(converted.plusMinusFormattedSats).toEqual('0')
  })
})
