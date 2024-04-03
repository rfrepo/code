import React from 'react'
import { useAppSelector } from '_deps/redux/hooks'
import {
  selectFeatureSeen,
  selectIsWalletEnabled,
  selectPrimaryWallet
} from '_deps/redux/global-slices/user/userSelectors'
import { useNavigation } from '_deps/shared/hooks/use-navigation/useNavigation'
import { FORTRESS_MIGRATION_AGREEMENT } from '_deps/shared/constants/feature-flag-constants'
import { LaunchBitcoinBuyingButton } from 'bitcoin-buying/sub-components/launch-bitcoin-buying-button/LaunchBitcoinBuyingButton'

export const BitcoinBuying = () => {
  const hasAgreedToFortressMigration = useAppSelector(
    selectFeatureSeen(FORTRESS_MIGRATION_AGREEMENT)
  )

  const primaryWallet = useAppSelector(selectPrimaryWallet)

  const isWalletEnabled = useAppSelector(selectIsWalletEnabled)

  const { navigateToBitcoinBuying, navigateToTransitionAgreement } =
    useNavigation('BitcoinBuying', 'TransitionAgreement')

  const showTransitionAgreement = primaryWallet && !hasAgreedToFortressMigration

  const navigateTo = showTransitionAgreement
    ? navigateToTransitionAgreement
    : navigateToBitcoinBuying

  return isWalletEnabled ? (
    <LaunchBitcoinBuyingButton onPressHandler={navigateTo} />
  ) : null
}
