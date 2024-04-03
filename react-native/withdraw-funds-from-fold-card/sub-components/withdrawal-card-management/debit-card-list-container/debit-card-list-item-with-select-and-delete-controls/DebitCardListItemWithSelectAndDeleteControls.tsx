import React from 'react'
import { SelectOrDeleteControl } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-card-management/debit-card-list-container/debit-card-list-item-with-select-and-delete-controls/select-or-delete-control/SelectOrDeleteControl'
import { DebitCardListItem } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/debit-card-list-item/DebitCardListItem'
import { InstantDebitCard } from 'src/api/ach/types'

type Props = {
  onPress: () => void
  onDeletePress: () => void
  cardDetails: InstantDebitCard
}

export const DebitCardListItemWithSelectAndDeleteControls = ({
  onPress,
  cardDetails,
  onDeletePress
}: Props) => (
  <DebitCardListItem
    onPress={onPress}
    cardDetails={cardDetails}
  >
    <SelectOrDeleteControl
      cardDetails={cardDetails}
      onDeletePress={onDeletePress}
    />
  </DebitCardListItem>
)
