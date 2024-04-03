import React from 'react'
import {TouchableOpacity} from 'react-native'
import { useAppSelector } from 'src/redux/hooks'
import Text from 'src/components-lib/components/text/Text'
import { selectFoldCardBalance } from 'src/redux/global-slices/foldCard/foldCardSelectors'
import { convertStringToUSD } from 'src/shared/helpers/fiat/convert-string-to-usd/convertStringToUSD'
import { styles } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/balance-text/styles'

type Props = {
  onPress: () => void
}

const { $container, $text } = styles

export const BalanceText = ({ onPress }: Props) => {
  const balance = useAppSelector(selectFoldCardBalance)

  return (
    <TouchableOpacity style={$container} onPress={onPress}>
      <Text style={$text}>{`AVAILABLE: ${convertStringToUSD(balance)}`}</Text>
    </TouchableOpacity>
  )
}
