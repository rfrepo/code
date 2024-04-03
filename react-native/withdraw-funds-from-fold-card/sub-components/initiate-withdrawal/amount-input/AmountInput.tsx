import React from 'react'
import { Platform, TextInput } from 'react-native'
import { styles } from './styles'
import { testID } from 'src/shared/helpers/e2e'

type Props = {
  amount: string
  onChange: (amount: string) => void
}

const { $textInput, $placeholderTextColor } = styles

export const AmountInput = ({ amount, onChange }: Props) => {
  return (
    <TextInput
      autoFocus
      maxLength={9}
      value={amount}
      {...(Platform.OS === 'android' ? { multiline: true } : null)}
      numberOfLines={1}
      placeholder={'$0'}
      style={$textInput}
      returnKeyType="done"
      onChangeText={onChange}
      keyboardType="decimal-pad"
      {...testID('WithdrawalAmountInput')}
      placeholderTextColor={$placeholderTextColor}
    />
  )
}
