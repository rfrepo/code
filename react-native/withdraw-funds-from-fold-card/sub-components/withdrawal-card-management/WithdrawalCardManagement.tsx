import React from 'react'
import { View } from 'react-native'
import { style } from 'lib/tailwind'
import { HeaderAndParagraph } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/header-and-paragraph/HeaderAndParagraph'
import { DebitCardListContainer } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-card-management/debit-card-list-container/DebitCardListContainer'
import { ProceedWithSelectedCardButton } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-card-management/proceed-with-selected-card-button/ProceedWithSelectedCardButton'

const $container = style('flex-1', 'bg-cream', 'pb-5')

export const WithdrawalCardManagement = () => (
  <View style={$container}>
    <HeaderAndParagraph title="Instant Debit Card Withdrawal">
      Choose a debit card to transfer your funds to
    </HeaderAndParagraph>

    <DebitCardListContainer />

    <ProceedWithSelectedCardButton />
  </View>
)
