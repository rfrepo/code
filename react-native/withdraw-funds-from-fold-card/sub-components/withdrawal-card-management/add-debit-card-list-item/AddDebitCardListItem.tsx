import conf from 'src/config'
import {
  selectAstraAuthorizationRequest,
  selectClientId,
  selectInstantDebitCards
} from 'src/api/ach/achSelectors'
import { style } from 'lib/tailwind'
import React, { useState } from 'react'
import PlusIcon from 'assets/plus-teal.svg'
import { TouchableOpacity } from 'react-native'
import { useAppSelector } from 'src/redux/hooks'
import RightCaretIcon from 'assets/black-right-caret.svg'
import MessageModal from 'src/screens/add-card/message-modal'
import { executeAuthorization } from 'src/shared/components/astra-authorisation/hooks/use-astra-authorisation/support'
import { LabelAndIcon } from 'src/shared/components/label-and-icon/LabelAndIcon'
import { TitleWithTagAndSubText } from 'src/shared/components/title-with-tag-and-sub-text/TitleWithTagAndSubText'

type Props = {
  refreshCardList: () => void
}

const $container = style('flex-row', 'items-center', 'mx-6', 'py-4')

export const AddDebitCardListItem = ({ refreshCardList }: Props) => {
  const [error, setError] = useState('')

  const astraAuthorizationRequest = useAppSelector(
    selectAstraAuthorizationRequest
  )

  const isClientIdSet = !!useAppSelector(selectClientId)

  const debitCards = useAppSelector(selectInstantDebitCards)

  const initialiseAddDebitCardFlow = async () => {
    if (!isClientIdSet) return

    astraAuthorizationRequest.authorization_endpoint = conf.astraAppCardsUrl

    try {
      await executeAuthorization(astraAuthorizationRequest)

      refreshCardList()

      setError('')
    } catch (e) {
      setError('Something went wrong. Please try again later.')
    }
  }

  const clearError = () => setError('')

  const isDisabled = debitCards.length >= 2

  const $listItemContainer = [$container, style({ 'opacity-25': isDisabled })]

  return (
    <>
      <TouchableOpacity
        disabled={isDisabled}
        style={$listItemContainer}
        onPress={initialiseAddDebitCardFlow}
      >
        <LabelAndIcon iconRenderer={PlusIcon} />

        <TitleWithTagAndSubText title="Add debit card" />

        <RightCaretIcon />
      </TouchableOpacity>

      {!!error && (
        <MessageModal
          text={error}
          isOpen={true}
          title="Oops!"
          onClose={clearError}
        />
      )}
    </>
  )
}
