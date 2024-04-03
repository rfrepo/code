import React from 'react'
import { style } from 'lib/tailwind'
import { ListItemContainer } from 'src/shared/components/list-item-container/ListItemContainer'
import { DestinationCardDetails } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/source-and-destination-details/desitination-card-details/DestinationCardDetails'
import { SourceCardDetails } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/source-and-destination-details/source-card-details/SourceCardDetails'

const $container = style(
  'bg-white',
  'border-t-0',
  'border-b-0',
  'rounded-10px',
  'rounded-shadow-block',
  'p-0'
)

type Props = {
  onChangePress: () => void
}

export const SourceAndDestinationDetails = ({ onChangePress }: Props) => {
  return (
    <ListItemContainer style={$container}>
      <SourceCardDetails />

      <DestinationCardDetails onChangePress={onChangePress} />
    </ListItemContainer>
  )
}
