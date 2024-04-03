import Text from '_deps/text/Text'
import { View } from 'react-native'
import { Tappable } from '_deps/ui/Tappable/Tappable'
import { formatMoney } from '_deps/shared/util'
import {
  selectTotalSatsEarned,
  selectReferredCardHolderCount
} from '_deps/redux/slice/mySpinSquadSelectors'
import converter from '_deps/services/converter'
import { useAppSelector } from '_deps/redux/hooks'
import React, { useCallback, useState } from 'react'
import { styles } from 'my-spin-squad/squad-stats/styles'
import QuestionMarkIcon from 'my-spin-squad/squad-stats/assets/question-mark.svg'
import { selectFoldIssuedCardWaitListDetails } from '_deps/redux/global-slices/user/userSelectors'
import { SpinSquadInfoModal } from 'my-spin-squad/squad-stats/sub-component/modal/SpinSquadInfoModal'

const {
  $values,
  $heading,
  $container,
  $satsEarned,
  $valueLabel,
  $valuesContainer,
  $referralContainer,
  $satsEarnedContainer,
  $headingTextContainer,
  $leftValueTextContainer,
  $rightValueTextContainer
} = styles

export const SquadStats = () => {
  const numOfReferrals =
    useAppSelector(selectFoldIssuedCardWaitListDetails).referral_count || 0

  const totalSatsEarned = useAppSelector(selectTotalSatsEarned)

  const referredCardholderCount = useAppSelector(selectReferredCardHolderCount)

  let totalSatsEarnedDisplayedValue = String(
    converter.btcToSats(totalSatsEarned)
  )

  totalSatsEarnedDisplayedValue =
    Number(totalSatsEarnedDisplayedValue) > 0
      ? `${formatMoney(Number(totalSatsEarnedDisplayedValue))}`
      : '0'

  const displayNumOfReferralsValue = formatMoney(Number(numOfReferrals))

  const [isSatsInfoVisible, setIsSatsInfoVisible] = useState(false)

  const hideSatsInfo = useCallback(
    () => setIsSatsInfoVisible(isVisible => !isVisible),
    [setIsSatsInfoVisible]
  )

  const showSatsInfo = () => setIsSatsInfoVisible(true)

  const pluralizeUsers =
    Number(displayNumOfReferralsValue) === 1 ? 'user' : 'users'

  const pluralizeCardholders =
    Number(referredCardholderCount) === 1 ? 'cardholder' : 'cardholders'

  return (
    <View style={$container}>
      <Tappable style={$headingTextContainer} onPress={showSatsInfo}>
        <View style={$referralContainer}>
          <Text style={$heading}>Your Referrals</Text>

          <QuestionMarkIcon />
        </View>
      </Tappable>

      <View style={$valuesContainer}>
        <View style={$leftValueTextContainer}>
          <Text style={$values}>{displayNumOfReferralsValue} </Text>

          <Text style={$valueLabel}>{pluralizeUsers}</Text>
        </View>

        <View style={$rightValueTextContainer}>
          <Text style={$values}>{referredCardholderCount} </Text>

          <Text style={$valueLabel}>{pluralizeCardholders}</Text>
        </View>
      </View>

      <View style={$satsEarnedContainer}>
        <Text style={$heading}>Total Sats Earned</Text>

        <Text style={$satsEarned}>{totalSatsEarnedDisplayedValue}</Text>
      </View>

      {isSatsInfoVisible && <SpinSquadInfoModal onClose={hideSatsInfo} />}
    </View>
  )
}
