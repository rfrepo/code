import React from 'react'
import { style } from 'lib/tailwind'
import { Tappable } from 'src/ui/tappable'
import { useAppSelector } from 'src/redux/hooks'
import Text from 'src/components-lib/components/text/Text'
import { selectInstantDebitCards } from 'src/api/ach/achSelectors'
import { selectDestinationCard } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSelectors'
import { DebitCardDisplay } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/debit-card-display/DebitCardListItem'

type Props = {
  onChangePress: () => void
}

const hitSlop = {
  top: 50,
  left: 50,
  right: 50,
  bottom: 50
}

const $cta = style('font-circular-700', 'text-darkerTeal', 'text-10px')

export const DestinationCardDetails = ({ onChangePress }: Props) => {
  const hasMultipleCards = useAppSelector(selectInstantDebitCards).length >= 2

  const destinationCardDetails = useAppSelector(selectDestinationCard) || {}

  const renderCTAButton = () => {
    return hasMultipleCards ? (
      <Tappable onPress={onChangePress} hitSlop={hitSlop}>
        <Text style={$cta}>CHANGE</Text>
      </Tappable>
    ) : null
  }

  return (
    <DebitCardDisplay
      iconLabel="TO"
      endSlotRenderer={renderCTAButton}
      cardDetails={destinationCardDetails}
    />
  )
}
