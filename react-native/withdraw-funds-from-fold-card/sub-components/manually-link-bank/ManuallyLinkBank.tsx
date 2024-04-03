import React from 'react'
import { Header } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/header/Header'
import { BankInstructions } from 'src/screens/withdraw-funds-from-fold-card/sub-components/manually-link-bank/bank-instructions/BankInstructions'
import { ContentContainer } from 'src/screens/withdraw-funds-from-fold-card/sub-components/manually-link-bank/content-container/ContentContainer'
import { SafeTopView } from 'src/components-lib/components/safe-top-view/SafeTopView'
import { style } from 'lib/tailwind'

const $container = style('px-0')

export const ManuallyLinkBank = () => {
  return (
    <SafeTopView style={$container}>
      <Header title="Withdraw Funds" />

      <ContentContainer>
        <BankInstructions />
      </ContentContainer>
    </SafeTopView>
  )
}
