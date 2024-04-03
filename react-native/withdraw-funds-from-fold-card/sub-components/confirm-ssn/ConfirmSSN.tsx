import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import Text from 'src/components-lib/components/text/Text'
import Line from 'src/ui/line'
import FloatLabelTextInput from 'src/screens/auth/float-label-text-input'
import MessageModal from 'src/screens/add-card/message-modal'
import { Header } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/header/Header'
import { styles } from 'src/screens/withdraw-funds-from-fold-card/sub-components/confirm-ssn/styles'
import { GradientButtonWithLoading } from 'src/components-lib/components/button/gradient-button-with-loading/GradientButtonWithLoading'
import { useInitializeAstra } from 'src/screens/withdraw-funds-from-fold-card/sub-components/confirm-ssn/hooks/use-initialize-astra/useInitializeAstra'

const { $container, $text, $input, $buttonContainer, $fixedFooter } = styles

export const ConfirmSSN = () => {
  const { initializeAstra, isLoading, errorMessage, setErrorMessage } =
    useInitializeAstra()

  const [ssn, setSsn] = useState('')

  const onPressDone = useCallback(() => {
    if (ssn.length === 9) {
      initializeAstra(ssn)
    }
  }, [ssn])

  return (
    <View style={$container}>
      <Header title="Confirm SSN" />

      <Text style={$text}>
        <Text>
          {'Fold is now partnering with Astra to fund the Fold Card. All' +
            ' previously saved banks will be available after you setup and' +
            ' authorize Astra with a few quick steps.\n\n'}
        </Text>

        <Text>
          {
            'Please verify your identity by entering your full Social Security Number.\n'
          }
        </Text>

        <Text>(You’ll only have to do this once!)</Text>
      </Text>

      <Line />

      <FloatLabelTextInput
        secureTextEntry
        activeUnderLineColor="transparent"
        inactiveUnderlineColor="transparent"
        handleErrorMessage={false}
        inputStyle={$input}
        placeholder="Full SSN Number"
        keyboardType="number-pad"
        maxLength={9}
        valueTransformer={(text: string) => text.replace(/\D/g, '')}
        textContentType="password"
        returnKeyType="done"
        onTextChange={(newString: string) => {
          setSsn(newString)
        }}
        onSubmitEditing={onPressDone}
      />

      <Line />

      <View style={$fixedFooter} />

      <View style={$buttonContainer}>
        <GradientButtonWithLoading
          text="Submit"
          disabled={ssn.length !== 9}
          isLoading={isLoading}
          onPressHandler={onPressDone}
        />
      </View>

      <MessageModal
        isOpen={!!errorMessage}
        title="Something went wrong"
        text={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </View>
  )
}
