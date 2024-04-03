import React from 'react'
import { Text, View } from 'react-native'
import { styles } from 'my-spin-squad/empty-state/styles'

const { $icon, $line2, $line1, $container } = styles

type Props = {
  text: string
}
export const EmptyState = ({ text }: Props) => (
  <View style={$container}>
    <Text style={$icon}>👀</Text>

    <Text style={$line1}>Nothing to see here... yet</Text>

    <Text style={$line2}>{text}</Text>
  </View>
)
