import tw, { style } from 'lib/tailwind'
import { useAppSelector } from 'src/redux/hooks'
import { InstantDebitCard } from 'src/api/ach/types'
import { useFocusEffect } from '@react-navigation/native'
import { useLayoutAnimation } from 'src/shared/hooks-utils'
import React, { useCallback, useEffect, useState } from 'react'
import { selectAuthorizationStatus } from 'src/api/ach/achSelectors'
import { useLazyGetACHAccountsDetailsQuery } from 'src/api/ach/achEndpoints'
import { LoadingIndicatorOverlay } from 'src/shared/components/loading-indicator/loading-indicator-overlay/LoadingIndicatorOverlay'
import { ListItemContainer } from 'src/shared/components/list-item-container/ListItemContainer'
import { DeleteDebitCardModal } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-card-management/delete-debit-card-modal/DeleteDebitCardModal'
import { AddDebitCardListItem } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-card-management/add-debit-card-list-item/AddDebitCardListItem'
import { useDebitCardDataWithSetSelectedCard } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/hooks/use-debit-card-data-with-set-selected-card/useDebitCardDataWithSelectionToggle'
import { DebitCardListItemWithSelectAndDeleteControls } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-card-management/debit-card-list-container/debit-card-list-item-with-select-and-delete-controls/DebitCardListItemWithSelectAndDeleteControls'

const activityIndicatorProps = {
  color: tw.color('black')
}

const $loaderStyles = style('my-6')

export const DebitCardListContainer = () => {
  const animateLayout = useLayoutAnimation()

  const [isFetching, setIsFetching] = useState(false)

  const isAuthenticated =
    useAppSelector(selectAuthorizationStatus) === 'approved'

  const [cardToRemove, setCardToRemove] = useState<InstantDebitCard | null>(
    null
  )

  const [getACHAccountsDetails, { data }] = useLazyGetACHAccountsDetailsQuery()

  const { debitCards, setSelectedCard } = useDebitCardDataWithSetSelectedCard()

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated)
        getACHAccountsDetails(undefined, { preferCacheValue: true })
      else getACHAccountsDetails()
    }, [])
  )

  const setIsFetchingAndGetCardDetails = () => {
    setIsFetching(true)

    getACHAccountsDetails()
  }

  useEffect(() => {
    if (!isAuthenticated) {
      setIsFetchingAndGetCardDetails()
    } else {
      setIsFetching(false)
    }
  }, [data])

  const renderDebitCard = (cardDetails: InstantDebitCard) => {
    animateLayout()

    return (
      <DebitCardListItemWithSelectAndDeleteControls
        key={cardDetails.id}
        cardDetails={cardDetails}
        onPress={() => setSelectedCard(cardDetails)}
        onDeletePress={() => setCardToRemove(cardDetails)}
      />
    )
  }

  return (
    <>
      <LoadingIndicatorOverlay
        style={$loaderStyles}
        isLoading={isFetching}
        activityIndicatorProps={activityIndicatorProps}
      />

      <ListItemContainer>
        {!isFetching && debitCards.map(renderDebitCard)}

        <AddDebitCardListItem
          refreshCardList={setIsFetchingAndGetCardDetails}
        />
      </ListItemContainer>

      <DeleteDebitCardModal
        cardDetails={cardToRemove}
        onClose={() => setCardToRemove(null)}
        refreshCardList={setIsFetchingAndGetCardDetails}
      />
    </>
  )
}
