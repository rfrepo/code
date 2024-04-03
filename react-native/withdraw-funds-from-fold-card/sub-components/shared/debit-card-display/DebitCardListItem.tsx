import React from 'react'
import VisaLogo from 'assets/visa.svg'
import MasterCardLogo from 'assets/mastercard.svg'
import { InstantDebitCard } from 'src/api/ach/types'
import {
  BankAccountDetailsBlock,
  BankAccountDetailsBlockProps
} from 'src/shared/components/bank-account-details-block/BankAccountDetailsBlock'

type Props = Pick<
  BankAccountDetailsBlockProps,
  'endSlotRenderer' | 'iconLabel'
> & {
  cardDetails: InstantDebitCard
}

export const DebitCardDisplay = ({
  iconLabel,
  cardDetails,
  endSlotRenderer
}: Props) => {
  const { card_company, last_four_digits } = cardDetails

  const CardIcon = card_company === 'Visa' ? VisaLogo : MasterCardLogo

  return (
    <BankAccountDetailsBlock
      title={card_company}
      iconLabel={iconLabel}
      iconRenderer={CardIcon}
      endSlotRenderer={endSlotRenderer}
      subText={`ending in ${last_four_digits}`}
    />
  )
}
