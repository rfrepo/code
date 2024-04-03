import React from 'react'
import { style } from 'lib/tailwind'
import VisaLogo from 'assets/visa.svg'
import { TouchableOpacity } from 'react-native'
import CreditCard from 'assets/credit-card.svg'
import MasterCardLogo from 'assets/mastercard.svg'
import { LabelAndIcon } from 'src/shared/components/label-and-icon/LabelAndIcon'
import { TitleWithTagAndSubText } from 'src/shared/components/title-with-tag-and-sub-text/TitleWithTagAndSubText'

type Props = {
  style?: object
  onPress: () => void
  children: React.ReactNode
  cardDetails: {
    id: string
    card_company: string
    last_four_digits: string
  }
}

const $container = style('flex-row', 'items-center', 'mx-6', 'py-4')

export const DebitCardListItem = ({
  style,
  onPress,
  children,
  cardDetails
}: Props) => {
  const { card_company, last_four_digits } = cardDetails

  const CardIcon =
    card_company === 'Visa'
      ? VisaLogo
      : card_company === 'MasterCard'
      ? MasterCardLogo
      : CreditCard

  return (
    <TouchableOpacity style={[$container, style]} onPress={onPress}>
      <LabelAndIcon iconRenderer={CardIcon} />

      <TitleWithTagAndSubText
        title={card_company}
        subText={`ending in ${last_four_digits}`}
      />

      {children}
    </TouchableOpacity>
  )
}
