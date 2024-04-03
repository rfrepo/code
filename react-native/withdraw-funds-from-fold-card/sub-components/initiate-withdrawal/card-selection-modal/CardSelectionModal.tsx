import React from 'react'
import { InstantDebitCard } from 'src/api/ach/types'
import { styles } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/card-selection-modal/styles'
import { ListItemContainer } from 'src/shared/components/list-item-container/ListItemContainer'
import { DebitCardListItem } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/debit-card-list-item/DebitCardListItem'
import { SwipeDownModalWithHeaderAndParagraph } from 'src/components-lib/components/swipe-down-modal/swipe-down-modal-with-header-and-paragraph/SwipeDownModalWithHeaderAndParagraph'
import { SelectedCardIndicator } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/card-selection-modal/selected-card-indicator/SelectedCardIndicator'
import { useDebitCardDataWithSetSelectedCard } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/hooks/use-debit-card-data-with-set-selected-card/useDebitCardDataWithSelectionToggle'
import { GradientTealButton } from 'src/components-lib/components/button/gradient-teal-button/GradientTealButton'
import { useAppSelector } from 'src/redux/hooks'
import { selectDestinationCard } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSelectors'

const { $container, $listItemContainer, $button } = styles

type Props = {
  onClose: () => void
}

export const CardSelectionModal = ({ onClose }: Props) => {
  const { debitCards, setSelectedCard } = useDebitCardDataWithSetSelectedCard()

  const selectedCardId = useAppSelector(selectDestinationCard).id

  const updateSelectedCard = (cardDetails: InstantDebitCard) => {
    if (cardDetails.id !== selectedCardId) {
      setSelectedCard(cardDetails)
    }
  }

  const renderDebitCard = (cardDetails: InstantDebitCard) => {
    return (
      <DebitCardListItem
        key={cardDetails.id}
        cardDetails={cardDetails}
        style={$listItemContainer}
        onPress={() => updateSelectedCard(cardDetails)}
      >
        <SelectedCardIndicator cardDetails={cardDetails} />
      </DebitCardListItem>
    )
  }

  return (
    <SwipeDownModalWithHeaderAndParagraph
      onClose={onClose}
      title="Select Card"
      paragraph="Choose a debit card to withdraw your funds to"
    >
      <ListItemContainer style={[$container]}>
        {debitCards.map(renderDebitCard)}
      </ListItemContainer>

      <GradientTealButton
        style={$button}
        text="use this card"
        onPressHandler={onClose}
      />
    </SwipeDownModalWithHeaderAndParagraph>
  )
}
