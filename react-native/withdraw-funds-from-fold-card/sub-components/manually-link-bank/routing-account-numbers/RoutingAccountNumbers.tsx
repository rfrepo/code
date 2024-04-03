import React from 'react'
import { View } from 'react-native'
import { useGetDirectDepositInfoQuery } from 'src/api/foldCard/foldCardEndpoints'
import { useAppSelector } from 'src/redux/hooks'
import {
  selectAccountNumber,
  selectRoutingNumber
} from 'src/api/foldCard/foldCardSelectors'
import { style } from 'lib/tailwind'
import { LineItem } from 'src/screens/withdraw-funds-from-fold-card/sub-components/manually-link-bank/routing-account-numbers/line-item/LineItem'

const $container = style('mt-8', 'mx-6')

export const RoutingAccountNumbers = () => {
  useGetDirectDepositInfoQuery()

  const routingNumber = useAppSelector(selectRoutingNumber)

  const accountNumber = useAppSelector(selectAccountNumber)

  return (
    <View style={$container}>
      <LineItem title="Routing Number" value={routingNumber} />

      <LineItem title="Account Number" value={accountNumber} />
    </View>
  )
}
