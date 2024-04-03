import { View } from 'react-native'
import { Tappable } from 'src/ui/tappable'
import React, { useEffect, useState } from 'react'
import { InstantDebitCard } from 'src/api/ach/types'
import Text from 'src/components-lib/components/text/Text'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { useDeleteDebitCardMutation } from 'src/api/ach/achEndpoints'
import { BoldTextWithDelimiter } from 'src/ui/bold-text-by-delimiter/BoldTextByDelimiter'
import { InlineErrorToast } from 'src/shared/components/inline-error-toast/InlineErrorToast'
import { useSafeTopAndBottomStyles } from 'src/shared/hooks/use-safe-top-styles/useSafeTopAndBottomStyles'
import { clearSelectedCard } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSlice'
import { selectDestinationCard } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSelectors'
import { LoadingIndicatorOverlay } from 'src/shared/components/loading-indicator/loading-indicator-overlay/LoadingIndicatorOverlay'
import { styles } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-card-management/delete-debit-card-modal/styles'
import { SwipeDownModalWithHeaderAndParagraph } from 'src/components-lib/components/swipe-down-modal/swipe-down-modal-with-header-and-paragraph/SwipeDownModalWithHeaderAndParagraph'

type Props = {
  onClose: () => void
  refreshCardList: () => Promise<void>
  cardDetails: InstantDebitCard | null
}

const {
  $content,
  $loaderColor,
  $deleteButton,
  $errorContainer,
  $loaderContainer,
  $deleteButtonText,
  $cancelButtonText
} = styles

export const DeleteDebitCardModal = ({
  cardDetails,
  onClose,
  refreshCardList
}: Props) => {
  const dispatch = useAppDispatch()

  const { $pb } = useSafeTopAndBottomStyles()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { card_company, last_four_digits, id } = cardDetails || {}

  const isSelectedCardBeingDeleted =
    useAppSelector(selectDestinationCard)?.id === cardDetails?.id

  const [deleteDebitCard, { error, reset, data }] = useDeleteDebitCardMutation()

  const cleanupAndClose = async () => {
    setIsLoading(false)

    reset()

    onClose()
  }

  const initiateDeletingCard = () => {
    setIsLoading(true)

    deleteDebitCard(id)
  }

  useEffect(() => {
    if (!error?.data.message) return

    setIsLoading(false)
  }, [error])

  useEffect(() => {
    if (!data?.success) return

    if (isSelectedCardBeingDeleted) dispatch(clearSelectedCard())

    const resetCardsAndClose = async () => {
      await refreshCardList()
      
      cleanupAndClose()
    }

    resetCardsAndClose()
  }, [data])

  const errorRenderer = () =>
    error?.data && (
      <View style={$errorContainer}>
        <InlineErrorToast error={error?.data} onClose={reset} />
      </View>
    )

  const Paragraph = (
    <BoldTextWithDelimiter
      text={`Are you sure you want to delete your <b>${card_company} (....${last_four_digits})<b>?`}
    />
  )

  return cardDetails ? (
    <SwipeDownModalWithHeaderAndParagraph
      paragraph={Paragraph}
      title={'Delete Card'}
      onClose={cleanupAndClose}
      $content={[$pb, $content]}
      errorRenderer={errorRenderer}
    >
      <LoadingIndicatorOverlay
        isLoading={isLoading}
        style={$loaderContainer}
        activityIndicatorProps={{ color: $loaderColor }}
      >
        <Tappable style={$deleteButton} onPress={initiateDeletingCard}>
          <Text style={$deleteButtonText}>delete card</Text>
        </Tappable>

        <Tappable onPress={cleanupAndClose}>
          <Text style={$cancelButtonText}>cancel</Text>
        </Tappable>
      </LoadingIndicatorOverlay>
    </SwipeDownModalWithHeaderAndParagraph>
  ) : null
}
