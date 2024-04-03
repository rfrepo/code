import React from 'react'
import tw from 'lib/tailwind'
import { useStatusbarColor } from 'src/shared/theme-hooks'
import { createStackNavigator } from '@react-navigation/stack'
import { AstraAuthorisation } from 'src/shared/components/astra-authorisation/AstraAuthorisation'
import { ManuallyLinkBank } from 'src/screens/withdraw-funds-from-fold-card/sub-components/manually-link-bank/ManuallyLinkBank'
import { WithdrawalSuccess } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-success/WithdrawalSuccess'
import { WithdrawalOptions } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-options/WithdrawalOptions'
import { InitiateWithdrawal } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/InitiateWithdrawal'
import { TwoFactorAuthentication } from 'src/screens/withdraw-funds-from-fold-card/sub-components/two-factor-authentication/TwoFactorAuthentication'
import { WithdrawalCardManagement } from 'src/screens/withdraw-funds-from-fold-card/sub-components/withdrawal-card-management/WithdrawalCardManagement'
import { ConfirmSSN } from 'src/screens/withdraw-funds-from-fold-card/sub-components/confirm-ssn/ConfirmSSN'

const { Navigator, Screen } = createStackNavigator()

const screenOptions = {
  headerShown: false,
  detachInactiveScreens: true
}

export const WithdrawFundsFromFoldCardNavigationStack = () => {
  useStatusbarColor(tw.color('bg-cream'), true)

  return (
    <Navigator
      screenOptions={screenOptions}
      initialRouteName={'WithdrawalOptions'}
    >
      <Screen name={'WithdrawalOptions'} component={WithdrawalOptions} />

      <Screen name={'ManuallyLinkBank'} component={ManuallyLinkBank} />

      <Screen name={'AstraAuthorisation'} component={AstraAuthorisation} />

      <Screen
        name={'WithdrawalCardManagement'}
        component={WithdrawalCardManagement}
      />

      <Screen name={'InitiateWithdrawal'} component={InitiateWithdrawal} />

      <Screen
        name={'TwoFactorAuthentication'}
        component={TwoFactorAuthentication}
      />

      <Screen name={'WithdrawalSuccess'} component={WithdrawalSuccess} />

      <Screen name={'ConfirmSSN'} component={ConfirmSSN} />
    </Navigator>
  )
}
