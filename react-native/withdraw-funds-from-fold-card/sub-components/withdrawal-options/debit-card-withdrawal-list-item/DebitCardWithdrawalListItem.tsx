import React from 'react'
import { style } from 'lib/tailwind'
import { TouchableOpacity } from 'react-native'
import InstantDebitIcon from 'assets/instant-debit.svg'
import { useNavigation } from '@react-navigation/native'
import RightCaretIcon from 'assets/black-right-caret.svg'
import { LabelAndIcon } from 'src/shared/components/label-and-icon/LabelAndIcon'
import { TitleWithTagAndSubText } from 'src/shared/components/title-with-tag-and-sub-text/TitleWithTagAndSubText'
import { useIsUserAstraAuthenticated } from 'src/shared/hooks/use-is-user-astra-authenticated/useIsUserAstraAuthenticated'
import { LoadingIndicatorOverlay } from 'src/shared/components/loading-indicator/loading-indicator-overlay/LoadingIndicatorOverlay'
import { styles } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-options/debit-card-withdrawal-list-item/styles'
import { WithdrawalFeeComponent } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-options/debit-card-withdrawal-list-item/withdrawal-fee-component/WithdrawalFeeComponent'

const $loader = style('ml-3')

const $container = style('flex-row', 'items-center', 'mx-6', 'py-4')

const activityIndicatorProps = {
  color: styles.$loadingIndicatorColor
}

type Props = {
  setIsLoading: (isLoading: boolean) => void
}

export const DebitCardWithdrawalListItem = ({ setIsLoading }: Props) => {
  const navigator = useNavigation()

  const { initialiseAuthenticationCheck, isAuthenticationCheckInProgress } =
    useIsUserAstraAuthenticated()

  const setLoadingStateAndInitialiseAuthenticationCheck = () => {
    initialiseAuthenticationCheck(
      (isAuthenticated: boolean, isNotInitialized: boolean) => {
        setIsLoading(true)

        if (isAuthenticated) {
          navigator.navigate('WithdrawalCardManagement')
        } else if (isNotInitialized) {
          navigator.navigate('ConfirmSSN')
        } else {
          navigator.navigate('AstraAuthorisation', {
            onSuccessfulAuthenticationRedirectTo: 'WithdrawalCardManagement'
          })
        }

        setIsLoading(false)
      }
    )
  }

  return (
    <TouchableOpacity
      style={$container}
      onPress={setLoadingStateAndInitialiseAuthenticationCheck}
    >
      <LabelAndIcon iconRenderer={InstantDebitIcon} />

      <TitleWithTagAndSubText
        title="Instant Debit Card Withdrawal"
        subText="Withdraw from your Fold Card instantly!"
        titleTagRenderer={() => <WithdrawalFeeComponent />}
      />

      <LoadingIndicatorOverlay
        style={$loader}
        isLoading={isAuthenticationCheckInProgress}
        activityIndicatorProps={activityIndicatorProps}
      >
        <RightCaretIcon />
      </LoadingIndicatorOverlay>
    </TouchableOpacity>
  )
}
