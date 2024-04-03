import React, { ReactNode } from 'react'
import { Text as RNText, TextProps } from 'react-native'

type Props = {
  children: ReactNode
} & TextProps

const Text = ({ children, ...props }: Props) => (
  <RNText allowFontScaling={false} maxFontSizeMultiplier={1} {...props}>
    {children}
  </RNText>
)

export default Text
