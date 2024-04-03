import { Text, View } from 'react-native'
import { useAppSelector } from 'src/redux/hooks'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { styles } from 'src/screens/two-factor-authentication/styles'
import { selectPhoneNumber } from 'src/redux/global-slices/user/userSelectors'
import { SafeTopView } from 'src/components-lib/components/safe-top-view/SafeTopView'
import { HeaderWithBackButton } from 'src/shared/components/header/header-with-back-button/HeaderWithBackButton'
import { ConfirmButton } from 'src/screens/two-factor-authentication/sub-components/confirm-button/ConfirmButton'
import { select2FAConfiguration } from 'src/redux/global-slices/two-factor-authentication/twoFactorAuthenticationV2Selectors'
import { formatPhoneNumber } from 'src/screens/withdraw-funds-from-fold-card/sub-components/two-factor-authentication/support'
import { WithdrawError } from 'src/screens/bitcoin-buying/sub-components/confirm-withdraw/sub-components/withdraw-error/WithdrawError'
import { CodeTextInput } from 'src/screens/withdraw-funds-from-fold-card/sub-components/two-factor-authentication/code-text-Input/CodeTextInput'
import { ErrorModal } from 'src/shared/components/error-modal/ErrorModal'
import { useProcessWithdrawal } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/process-withdrawal/use-process-withdrawal/useProcessWithdrawal'
import { TwoFactorRecoveryOption } from 'src/screens/withdraw-funds-from-fold-card/sub-components/two-factor-authentication/two-factor-recovery-options/TwoFactorRecoveryOption'
import { useTwoFactorAuthentication } from 'src/screens/withdraw-funds-from-fold-card/sub-components/two-factor-authentication/hooks/use-two-factor-authentication/useTwoFactorAuthentication'

const { $title, $topTitle, $container, $textContainer } = styles

export const TwoFactorAuthentication = () => {
  const [code, setCode] = useState('')

  const {
    processWithdrawal,
    isProcessingWithdrawal,
    processingWithdrawalError
  } = useProcessWithdrawal()

  const navigator = useNavigation()

  const [isResendingCode, setIsResendingCode] = useState(false)

  const {
    verifyCode,
    isVerified,
    clearError,
    isVerifyingCode,
    verificationError
  } = useTwoFactorAuthentication()

  const { buttonType, buttonTitle } = useAppSelector(select2FAConfiguration)

  const userPhoneNumber = formatPhoneNumber(useAppSelector(selectPhoneNumber))

  const disabled = code.length !== 8 || isResendingCode

  const isLoading = isProcessingWithdrawal || isVerifyingCode

  useEffect(() => {
    if (isVerified) processWithdrawal()
  }, [isVerified, processWithdrawal])

  useEffect(() => {
    if (verificationError) clearError()
  }, [code, isResendingCode])

  const executeCodeVerification = () => verifyCode(code)

  return (
    <SafeTopView style={$container}>
      <HeaderWithBackButton />

      <WithdrawError errorCode={verificationError?.code} />

      <View style={$textContainer}>
        <Text style={$topTitle}>Enter code sent to</Text>

        <Text style={$title}>{userPhoneNumber}</Text>

        <TwoFactorRecoveryOption
          isResendingCode={isResendingCode}
          setIsResendingCode={setIsResendingCode}
        />
      </View>

      {!isResendingCode && <CodeTextInput onChangeText={setCode} />}

      <ConfirmButton
        title={buttonTitle}
        disabled={disabled}
        isLoading={isLoading}
        buttonType={buttonType}
        handlePress={executeCodeVerification}
      />

      <ErrorModal
        onClose={navigator.goBack}
        error={processingWithdrawalError}
      />
    </SafeTopView>
  )
}
