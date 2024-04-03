import conf from '_deps/config'
import UserObj from '_deps/domain/user'
import { styles } from 'my-spin-squad/styles'
import React, { useCallback, useLayoutEffect } from 'react'
import { EmptyState } from 'my-spin-squad/empty-state/EmptyState'
import { SquadStats } from 'my-spin-squad/squad-stats/SquadStats'
import { useAppDispatch, useAppSelector } from '_deps/redux/hooks'
import { ReferralURL } from 'my-spin-squad/referral-url/ReferralURL'
import { updateUser } from '_deps/redux/global-slices/user/userSlice'
import { Linking, RefreshControl, ScrollView, Text, View } from 'react-native'
import { SquadActivityList } from 'my-spin-squad/squad-activity-list/SquadActivityList'
import { selectFoldIssuedCardWaitListDetails } from '_deps/redux/global-slices/user/userSelectors'
import { retrieveMySpinSquadActivityFeed } from '_deps/redux/thunks/retrieveMySpinSquadActivityFeed'

const {
  $link,
  $content,
  $linkText,
  $container,
  $referralURLAndStatsContainer
} = styles

export const MySpinSquadScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const numberOfReferrals = useAppSelector(
    selectFoldIssuedCardWaitListDetails
  )?.referral_count

  const refreshData = useCallback(() => {
    dispatch(retrieveMySpinSquadActivityFeed())

    UserObj.init().then(user => dispatch(updateUser(user)))
  }, [dispatch])

  useLayoutEffect(() => {
    dispatch(retrieveMySpinSquadActivityFeed())
  }, [])

  const termAndConditionHandler = () => {
    Linking.openURL(conf.termsOfReferralProgramUrl)
  }

  return (
    <ScrollView
      style={$container}
      testID="my-spin-squad-screen"
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refreshData} />
      }
    >
      <Text>My Spin Squad</Text>

      <View style={$content}>
        <View style={$referralURLAndStatsContainer}>
          <ReferralURL />

          <SquadStats />
        </View>

        <Text style={$linkText} onPress={termAndConditionHandler}>
          <Text style={$link}>Spin Squad Terms and Conditions</Text> apply.
        </Text>

        {numberOfReferrals ? (
          <SquadActivityList />
        ) : (
          <EmptyState text="Refer a friend to start stacking sats on your friends’ spending!" />
        )}
      </View>
    </ScrollView>
  )
}
