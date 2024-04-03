import React from 'react'
import { WithdrawalSummaryPanel } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/withdrawal-sumary-modal/withdrawal-summary-panel/WithdrawalSummaryPanel'
import { SwipeDownModalWithHeaderAndParagraph } from 'src/components-lib/components/swipe-down-modal/swipe-down-modal-with-header-and-paragraph/SwipeDownModalWithHeaderAndParagraph'

type Props = {
  onClose: () => void
  withdrawalAmount: string
}

export const WithdrawalSummaryModal = ({
  onClose,
  withdrawalAmount
}: Props) => {
  return (
    <SwipeDownModalWithHeaderAndParagraph
      onClose={onClose}
      title="Transfer Details"
    >
      <WithdrawalSummaryPanel
        onClose={onClose}
        withdrawalAmount={withdrawalAmount}
      />
    </SwipeDownModalWithHeaderAndParagraph>
  )
}
