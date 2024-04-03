import React from 'react'
import { View } from 'react-native'
import { style } from 'lib/tailwind'
import { useAppSelector } from 'src/redux/hooks'
import { InstantDebitCard } from 'src/api/ach/types'
import { selectDestinationCard } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSelectors'

type Props = {
  cardDetails: InstantDebitCard
}

export const SelectedCardIndicator = ({ cardDetails }: Props) => {
  const isSelected = useAppSelector(selectDestinationCard).id === cardDetails.id

  const $container = style(
    'h-14px',
    'w-14px',
    'rounded-full',
    'border-1',
    'border-grey-700',
    isSelected && style('border-4', 'border-darkerTeal')
  )

  return <View style={$container} />
}
