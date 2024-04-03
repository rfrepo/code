import React from 'react'
import { style } from 'lib/tailwind'
import BankIcon from 'assets/bank.svg'
import { TouchableOpacity } from 'react-native'
import RightCaretIcon from 'assets/black-right-caret.svg'
import { useNavigation } from 'src/shared/hooks/use-navigation/useNavigation'
import { LabelAndIcon } from 'src/shared/components/label-and-icon/LabelAndIcon'
import { TitleWithTagAndSubText } from 'src/shared/components/title-with-tag-and-sub-text/TitleWithTagAndSubText'

const $container = style('flex-row', 'items-center', 'mx-6', 'py-4')

export const ManuallyLinkBankListItem = () => {
  const { navigateToManuallyLinkBank } = useNavigation('ManuallyLinkBank')

  return (
    <TouchableOpacity style={$container} onPress={navigateToManuallyLinkBank}>
      <LabelAndIcon iconRenderer={BankIcon} />

      <TitleWithTagAndSubText
        title="Manually Link a Bank"
        subText="Withdrawals in 3-4 business days"
      />

      <RightCaretIcon />
    </TouchableOpacity>
  )
}
