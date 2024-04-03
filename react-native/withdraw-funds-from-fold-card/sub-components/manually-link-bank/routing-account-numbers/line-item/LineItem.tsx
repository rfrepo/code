import React from 'react'
import { View } from 'react-native'
import Text from 'src/components-lib/components/text/Text'
import { CopyOnTap } from 'src/ui/copy-on-tap'
import tw from 'lib/tailwind'
import { styles } from 'src/screens/withdraw-funds-from-fold-card/sub-components/manually-link-bank/routing-account-numbers/line-item/styles'

const { $lineItem, $titleText, $valueText } = styles

type Props = {
  title: string
  value: string
}

export const LineItem = ({ title, value }: Props) => {
  return (
    <View style={$lineItem}>
      <Text style={$titleText}>{title}</Text>

      <CopyOnTap
        copyText={value}
        confirmationTextColor={tw.color('white')}
        newStyle={true}
      >
        <Text style={$valueText}>{value}</Text>
      </CopyOnTap>
    </View>
  )
}
