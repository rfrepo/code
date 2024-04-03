import React from 'react'
import { Text, View } from 'react-native'
import { useAppSelector } from '_deps/redux/hooks'
import { styles } from 'my-spin-squad/referral-url/styles'
import { selectReferrals } from '_deps/redux/global-slices/user/userSelectors'

const {
  $cta,
  $content,
  $referralLinkText,
  $yourReferralLinkHeading
} = styles

export const ReferralURL = () => {
  const { url: referralUrl } = useAppSelector(selectReferrals)

  const url = referralUrl.replace(/ /g, '')

  const displayURL = url.replace(/^http[s]?:\/\//, '')

  return (
    <View>
      <View style={$content}>
        <Text style={$yourReferralLinkHeading}>Your Referral Link</Text>

        <View style={{ borderBottomWidth: 4 }}>
          <Text style={$referralLinkText}>{displayURL}</Text>
        </View>

        <Text style={$cta}>Tap to copy</Text>
      </View>
    </View>
  )
}
