import React from 'react'
import { TextInput } from 'react-native'
import tw from 'lib/tailwind'
import { styles } from 'src/screens/two-factor-authentication/sub-components/styles'

const { $textInput } = styles

type Props = {
  onChangeText: (e: string) => void
}

export const CodeTextInput = ({ onChangeText }: Props) => {
  return (
    <TextInput
      autoFocus
      blurOnSubmit
      style={$textInput}
      returnKeyType="done"
      keyboardType="numeric"
      onChangeText={onChangeText}
      placeholder={'Enter code'}
      textAlignVertical={'center'}
      placeholderTextColor={tw.color('grey-600')}
    />
  )
}
