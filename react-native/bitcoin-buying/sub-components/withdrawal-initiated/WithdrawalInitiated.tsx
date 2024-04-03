import React from 'react'
import Text from '_deps/text/Text'
import { EXECUTE_WITHDRAWAL } from '_deps/api/cache-constants'
import { Button, StyleProp, View, ViewStyle } from 'react-native'
import { useWithdrawConfirmMutation } from '_deps/api/wallet/walletEndpoints'
import { useNavigation } from '_deps/shared/hooks/use-navigation/useNavigation'
import { styles } from 'bitcoin-buying/sub-components/withdrawal-initiated/styles'
import { convertBTCToSats } from '_deps/shared/helpers/bitcoin/convert-btc-to-sats/convertBTCToSats'
import { useGetTransactionsQuery } from 'bitcoin-buying/redux/slice/bitcoinTransactionHistoryEndpoints'

const {
  $title,
  $button,
  $bgColor,
  $infoText,
  $infoContainer,
  $withdrawalAmount
} = styles

export const WithdrawalInitiated = () => {
  const { navigateToHome } = useNavigation('Home')

  useGetTransactionsQuery({ limit: 4 })

  const result = useWithdrawConfirmMutation({
    fixedCacheKey: EXECUTE_WITHDRAWAL
  })

  return (
    <View style={$bgColor as StyleProp<ViewStyle>}>
      <Text style={$withdrawalAmount}>
        {convertBTCToSats(result[1].data?.sending_amount).strValue}
      </Text>

      <Text style={$title}>{`Withdrawal\nInitiated!`}</Text>

      <View style={$infoContainer}>
        <Text style={$infoText}>
          {`Your withdrawal has been initiated.\nIt shouldn't take any more than 24 hours to process.`}
        </Text>
      </View>

      <View style={$button}>
        <Button title="GOT IT!" onPress={navigateToHome} />
      </View>
    </View>
  )
}
