import React from 'react'
import Checkmark from 'assets/checkmark.svg'
import { useAppSelector } from 'src/redux/hooks'
import TrashCanIcon from 'assets/trashcan_1.svg'
import { InstantDebitCard } from 'src/api/ach/types'
import { selectDestinationCard } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSelectors'
import {TouchableOpacity} from 'react-native'

type Props = {
  onDeletePress: () => void
  cardDetails: InstantDebitCard
}

const hitSlop = {
  top: 25,
  left: 25,
  right: 25,
  bottom: 25
}

export const SelectOrDeleteControl = ({
  cardDetails,
  onDeletePress
}: Props) => {
  return useAppSelector(selectDestinationCard)?.id === cardDetails.id ? (
    <Checkmark />
  ) : (
    <TouchableOpacity onPress={onDeletePress} hitSlop={hitSlop}>
      <TrashCanIcon />
    </TouchableOpacity>
  )
}
