import React from 'react'
import { View } from 'react-native'
import { useSafeTopAndBottomStyles } from 'src/shared/hooks/use-safe-top-styles/useSafeTopAndBottomStyles'
import { GradientTealButton } from 'src/components-lib/components/button/gradient-teal-button/GradientTealButton'
import { useAppSelector } from 'src/redux/hooks'
import { selectDestinationCard } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSelectors'
import { style } from 'lib/tailwind'
import { useNavigation } from 'src/shared/hooks/use-navigation/useNavigation'

const $container = style('px-6', 'mt-auto')

export const ProceedWithSelectedCardButton = () => {
  const { $mb } = useSafeTopAndBottomStyles()

  const isCardSelected = useAppSelector(selectDestinationCard)

  const { navigateToInitiateWithdrawal } = useNavigation('InitiateWithdrawal')

  return (
    <View style={[$container, $mb]}>
      <GradientTealButton
        text="use this card"
        disabled={!isCardSelected}
        onPressHandler={navigateToInitiateWithdrawal}
      />
    </View>
  )
}
