import React from 'react'
import FoldIcon from 'assets/fold-logo-circular-b&w.svg'
import { BankAccountDetailsBlock } from 'src/shared/components/bank-account-details-block/BankAccountDetailsBlock'

export const SourceCardDetails = () => {
  return (
    <BankAccountDetailsBlock
      iconLabel="FROM"
      iconRenderer={FoldIcon}
      title="Fold Card Balance"
    />
  )
}
