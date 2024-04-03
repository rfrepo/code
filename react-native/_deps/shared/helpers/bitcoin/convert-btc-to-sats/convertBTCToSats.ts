export const convertBTCToSats = (amount = '0') => {
  const ONE_HUNDRED_MILLION_SATS = 100000000

  const satsConversion = (amount: number): number =>
    Math.round(amount * ONE_HUNDRED_MILLION_SATS)

  const addCommas = new RegExp(/(\d)(?=(\d{3})+(?:\.\d+)?$)/, 'g')

  const valueAsNumber = Number(amount)

  const absoluteValue = Math.abs(valueAsNumber)

  const sats = satsConversion(valueAsNumber)

  const additionSign = sats > 0 ? '+' : ''

  return {
    satsAsNumber: sats,
    plusMinusFormattedSats: `${additionSign}${String(sats).replace(
      addCommas,
      '$1,'
    )}`,
    value: `${String(satsConversion(absoluteValue)).replace(addCommas, '$1,')}`,
    strValue: `${String(satsConversion(absoluteValue)).replace(
      addCommas,
      '$1,'
    )} sats`
  }
}
