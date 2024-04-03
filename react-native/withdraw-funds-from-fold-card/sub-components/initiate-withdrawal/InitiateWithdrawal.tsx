import { styles } from './styles'
import { View } from 'react-native'
import React, { useState } from 'react'
import { useAppSelector } from 'src/redux/hooks'
import { selectFoldCardBalance } from 'src/redux/global-slices/foldCard/foldCardSelectors'
import { GradientTealButton } from 'src/components-lib/components/button/gradient-teal-button/GradientTealButton'
import { LegalText } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/legal-text/LegalText'
import { ErrorToast } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/error-toast/ErrorToast'
import { VerticalLayoutContainer } from 'src/shared/components/layout/vertically-spaced-children-container/VerticalLayoutContainer'
import { AmountInput } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/amount-input/AmountInput'
import { BalanceText } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/balance-text/BalanceText'
import { HeaderAndParagraph } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/header-and-paragraph/HeaderAndParagraph'
import { WithdrawalFeeText } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/transfer-fee-display/WithdrawalFeeText'
import { CardSelectionModal } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/card-selection-modal/CardSelectionModal'
import { formatTransferAmountInput } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/support/formatTransferAmountInput'
import { WithdrawalSummaryModal } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/withdrawal-sumary-modal/WithdrawalSummaryModal'
import { SourceAndDestinationDetails } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/source-and-destination-details/SourceAndDestinationDetails'
import { useTransferAmountValidation } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/hooks/use-transfer-amount-validation/useTransferAmountValidation'

const { $container, $content } = styles

export const InitiateWithdrawal = () => {
  const balance = useAppSelector(selectFoldCardBalance)

  const [withdrawalAmount, setWithdrawalAmount] = useState('')

  const { error } = useTransferAmountValidation(withdrawalAmount)

  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const [showCardSelectionModal, setShowCardSelectionModal] = useState(false)

  const formatAndSetWithdrawalAmount = (userInput: string) => {
    setWithdrawalAmount(formatTransferAmountInput(userInput))
  }

  const setMaxBalance = () => {
    formatAndSetWithdrawalAmount(balance)
  }

  const transferButtonIsDisabled = Boolean(error || !withdrawalAmount)

  return (
    <View style={$container}>
      <HeaderAndParagraph title="Instant Debit Card Withdrawal" />

      <ErrorToast amount={withdrawalAmount} />

      <AmountInput
        amount={withdrawalAmount}
        onChange={formatAndSetWithdrawalAmount}
      />

      <VerticalLayoutContainer
        verticalGap={8}
        style={$content}
        includeVerticalMargins="bottom"
      >
        <BalanceText onPress={setMaxBalance} />

        <WithdrawalFeeText amount={withdrawalAmount} />

        <SourceAndDestinationDetails
          onChangePress={() => setShowCardSelectionModal(true)}
        />

        <GradientTealButton
          text="transfer funds"
          disabled={transferButtonIsDisabled}
          onPressHandler={() => setShowConfirmationModal(true)}
        />

        <LegalText />
      </VerticalLayoutContainer>

      {showConfirmationModal && (
        <WithdrawalSummaryModal
          withdrawalAmount={withdrawalAmount}
          onClose={() => setShowConfirmationModal(false)}
        />
      )}

      {showCardSelectionModal && (
        <CardSelectionModal onClose={() => setShowCardSelectionModal(false)} />
      )}
    </View>
  )
}
