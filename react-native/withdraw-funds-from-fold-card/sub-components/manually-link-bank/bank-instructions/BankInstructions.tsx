import React from 'react'
import { View } from 'react-native'
import Text from 'src/components-lib/components/text/Text'
import BankIcon from 'assets/bank.svg'
import { styles } from 'src/screens/withdraw-funds-from-fold-card/sub-components/manually-link-bank/bank-instructions/styles'

const { $container, $titleText, $contentText } = styles

export const BankInstructions = () => {
  return (
    <View style={$container}>
      <BankIcon width={32} height={32} />

      <Text style={$titleText}>Manually Link a Bank</Text>

      <View>
        <Text style={$contentText}>
          <Text>
            Follow the steps below to transfer money from your Fold Card to your
            bank account.{'\n\n'}
          </Text>

          <Text>
            1. Log in to the account you plan to send money to, and look for an
            option to “add an external account.”{'\n\n'}
          </Text>

          <Text>
            2. Provide the routing number and account number below (tap to
            copy).
            {'\n\n'}
          </Text>

          <Text>
            3. Select how much money you want to withdraw and voila!{'\n\n'}
          </Text>

          <Text>
            If your bank requires you to verify test deposits, these will show
            up in your transaction history.
          </Text>
        </Text>
      </View>
    </View>
  )
}
