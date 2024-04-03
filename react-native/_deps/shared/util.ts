import { Dimensions } from 'react-native'

const window = Dimensions.get('screen')

export const screenWidth = window.width

export const formatMoney = (amount: number): string => String(amount)
