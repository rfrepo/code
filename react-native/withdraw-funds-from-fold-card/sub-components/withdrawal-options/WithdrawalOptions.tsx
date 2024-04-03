import {style} from 'lib/tailwind'
import { View } from 'react-native'
import React, { useState } from 'react'
import { ListItemContainer } from 'src/shared/components/list-item-container/ListItemContainer'
import { HeaderAndParagraph } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/header-and-paragraph/HeaderAndParagraph'
import { ManuallyLinkBankListItem } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-options/manually-link-bank-list-item/ManuallyLinkBankListItem'
import { DebitCardWithdrawalListItem } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-options/debit-card-withdrawal-list-item/DebitCardWithdrawalListItem'

const $container = style('flex-1', 'bg-cream')

export const WithdrawalOptions = () => {
  const [isLoading, setIsLoadingState] = useState(false)

  const shouldAllowInteraction = isLoading ? 'none' : 'auto'

  return (
    <View style={$container}>
      <HeaderAndParagraph title="Withdraw Funds">
        How would you like to withdraw from your Fold Card?
      </HeaderAndParagraph>

      <ListItemContainer pointerEvents={shouldAllowInteraction}>
        <DebitCardWithdrawalListItem setIsLoading={setIsLoadingState} />

        <ManuallyLinkBankListItem />
      </ListItemContainer>
    </View>
  )
}
