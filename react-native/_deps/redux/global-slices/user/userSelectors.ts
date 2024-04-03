import { createSelector } from '@reduxjs/toolkit'
import { PaymentMethods } from '_deps/@types/PaymentMethods'
import {
  CARD_BOOSTS,
  FOLD_CARD_TRANSACTION_FEES,
  FOLD_PHYSICAL_CARD,
  MY_SPIN_SQUAD
} from '_deps/shared/constants/feature-flag-constants'

const selectProfileResult = () => ({
  data: {
    api_id: 'test',
    logged_in: true,
    wallet: {
      account_is_ready: true,
      primary_wallet: 'test'
    },
    username: 'test',
    referrals: {
      total: 0,
      url: 'test',
      completed: 0,
      referral_count: 0
    },
    seen_features: ['test'],
    enabled_features: ['test'],
    default_payment_method: 'test',
    fold_card: {
      tier_id: 0,
      tier_name: 'test',
      shipping_status: 'test',
      membership_status: 'test',
      instant_debit_free_transfers_remaining: 0
    },
    phone_verification: {
      number: 'test'
    },
    fold_issued_card_waitlist_details: {
      total: 0,
      position: 0,
      referral_count: 0
    }
  }
})

export const selectUser = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile || {}
)

export const selectReferrals = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.referrals
)

export const selectFoldIssuedCardWaitListDetails = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.fold_issued_card_waitlist_details
)

export const selectFoldCardMembershipStatus = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.fold_card?.membership_status || null
)

export const selectInstantDebitTransfersRemaining = createSelector(
  selectProfileResult,
  ({ data: profile }) =>
    profile.fold_card?.instant_debit_free_transfers_remaining || 0
)

export const selectIsFoldCardHolder = createSelector(
  selectFoldCardMembershipStatus,
  membershipStatus => {
    return (
      membershipStatus === 'Active' || membershipStatus === 'Late Renewal Fee'
    )
  }
)

export const selectUserTier = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.fold_card?.tier_name
)

export const selectFoldCardPaymentMethodType = createSelector(
  selectUserTier,
  tierName => {
    if (tierName === 'Spin') {
      return PaymentMethods.SPIN
    } else if (tierName === 'Spin+') {
      return PaymentMethods.SPINPLUS
    } else {
      return ''
    }
  }
)

export const selectUsername = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.username
)

export const selectDefaultPaymentMethod = createSelector(
  selectProfileResult,
  ({ data: profile }) => {
    return profile.default_payment_method === 'NULL'
      ? null
      : profile.default_payment_method ?? null
  }
)

export const selectDefaultPMIsFoldCard = createSelector(
  selectDefaultPaymentMethod,
  defaultPM => {
    return (
      defaultPM === PaymentMethods.FoldCard ||
      defaultPM === PaymentMethods.SPIN ||
      defaultPM === PaymentMethods.SPINPLUS
    )
  }
)

export const selectEnabledFeatures = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile?.enabled_features || []
)

export const selectIsSubscriptionActive = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.fold_card?.tier_id === 2
)

export const selectIsMySpinSquadEnabled = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.enabled_features?.includes(MY_SPIN_SQUAD)
)

export const selectIsCardBoostsEnabled = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.enabled_features?.includes(CARD_BOOSTS)
)

export const selectIsFoldCardTransactionFeesEnabled = createSelector(
  selectProfileResult,
  ({ data: profile }) =>
    profile.enabled_features?.includes(FOLD_CARD_TRANSACTION_FEES)
)

export const selectUserApiID = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.api_id
)

export const selectFeatureSeen = (featureKey: string) =>
  createSelector(selectProfileResult, ({ data: profile }) => {
    const seenFeatures = profile.seen_features

    return seenFeatures ? seenFeatures.includes(featureKey) : null
  })

export const selectIsLoggedIn = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.logged_in
)

export const selectIsWalletEnabled = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.wallet?.account_is_ready
)

export const selectIsPhysicalCardEnabled = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile?.enabled_features?.includes(FOLD_PHYSICAL_CARD)
)

export const selectShippingStatus = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile?.fold_card?.shipping_status
)

export const selectPhoneNumber = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.phone_verification.number
)

export const selectPrimaryWallet = createSelector(
  selectProfileResult,
  ({ data: profile }) => profile.wallet.primary_wallet
)
