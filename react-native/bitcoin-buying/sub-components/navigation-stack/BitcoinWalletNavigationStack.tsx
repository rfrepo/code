import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from 'bitcoin-buying/sub-components/home/HomeScreen'
import { PurchaseSuccess } from 'bitcoin-buying/sub-components/purchase-success/PurchaseSuccess'
import { Dashboard } from 'bitcoin-buying/sub-components/home/sub-components/dashboard/Dashboard'
import { RecipientAddress } from 'bitcoin-buying/sub-components/recipient-address/RecipientAddress'
import { PurchaseAmountScreen } from 'bitcoin-buying/sub-components/purchase-amount/PurchaseAmountScreen'
import { BitcoinBuyingEmptyState } from 'bitcoin-buying/sub-components/empty-state/BitcoinBuyingEmptyState'
import { ConfirmWithdrawScreen } from 'bitcoin-buying/sub-components/confirm-withdraw/ConfirmWithdrawScreen'
import { WithdrawalInitiated } from 'bitcoin-buying/sub-components/withdrawal-initiated/WithdrawalInitiated'
import { AddressQRScanner } from 'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/AddressQRScanner'
import { TransactionDetailScreen } from 'bitcoin-buying/sub-components/home/sub-components/bitcoin-transactions/bitcoin-transaction-detail-screen/TransactionDetailScreen'
import { BitcoinTransactionHistoryScreen } from 'bitcoin-buying/sub-components/home/sub-components/bitcoin-transactions/bitcoin-transaction-history-screen/BitcoinTransactionHistoryScreen'

const { Navigator, Screen } = createStackNavigator()

const screenOptions = {
  headerShown: false
}

const homeScreenOptions = {
  cardStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
}

export const BitcoinWalletNavigationStack = () => (
  <Navigator screenOptions={screenOptions} initialRouteName={'Home'}>
    <Screen
      name={'BitcoinBuyingEmptyState'}
      component={BitcoinBuyingEmptyState}
    />

    <Screen
      name={'TransactionHistory'}
      component={BitcoinTransactionHistoryScreen}
    />

    <Screen name={'Dashboard'} component={Dashboard} />

    <Screen name={'PurchaseSuccess'} component={PurchaseSuccess} />

    <Screen name={'RecipientAddress'} component={RecipientAddress} />

    <Screen name={'AddressQRScanner'} component={AddressQRScanner} />

    <Screen name={'PurchaseAmount'} component={PurchaseAmountScreen} />

    <Screen name={'ConfirmWithdraw'} component={ConfirmWithdrawScreen} />

    <Screen name={'WithdrawalInitiated'} component={WithdrawalInitiated} />

    <Screen name={'TransactionDetail'} component={TransactionDetailScreen} />

    <Screen name={'Home'} options={homeScreenOptions} component={HomeScreen} />
  </Navigator>
)
