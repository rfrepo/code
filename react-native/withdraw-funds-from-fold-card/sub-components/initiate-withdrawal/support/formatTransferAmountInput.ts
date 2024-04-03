export const formatTransferAmountInput = (_userInput: string): string => {
  let userInput = _userInput.trim().replace(/[^0-9.]/g, '')

  if (userInput.startsWith('0')) return ''

  if (userInput.startsWith('.') && userInput.length > 1)
    userInput = userInput.slice(0, 3)

  if (userInput.indexOf('.') !== userInput.lastIndexOf('.'))
    userInput = userInput.replace(/\.([^.]*)\./g, '.$1')

  if (userInput.indexOf('.') !== -1 && userInput.split('.')[1].length > 2)
    userInput = parseFloat(userInput).toFixed(2)

  return userInput ? '$' + userInput : ''
}
