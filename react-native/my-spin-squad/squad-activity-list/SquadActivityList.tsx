import React from 'react'
import {
  SquadActivityFeed,
  SquadActivityMeta
} from '_deps/redux/slice/mySpinSquadSlice'
import { colors } from '_deps/shared-styles'
import { useAppSelector } from '_deps/redux/hooks'
import Text from '_deps/text/Text'
import { styles } from 'my-spin-squad/squad-activity-list/styles'
import { EmptyState } from 'my-spin-squad/empty-state/EmptyState'
import { selectMySpinSquad } from '_deps/redux/slice/mySpinSquadSelectors'
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native'
import { SquadActivityListItem } from 'my-spin-squad/squad-activity-list/sub-components/SquadActivityListItem'

const { $activityIndicator, $recentSquadEarningsHeading } = styles

const activityIndicatorProps = {
  size: 'small',
  animating: true,
  color: colors.black,
  style: $activityIndicator,
  accessibilityHint: 'loading'
} as ActivityIndicatorProps

const renderListState = (
  events: SquadActivityFeed[],
  meta: SquadActivityMeta | undefined
): JSX.Element => (
  <>
    <Text style={$recentSquadEarningsHeading}>Recent Squad Earnings</Text>

    <View>
      {events.map((data: SquadActivityFeed) => (
        <SquadActivityListItem
          data={data}
          key={data.timestamp}
          max_sats_per_purchase={meta?.max_sats_per_purchase}
        />
      ))}
    </View>
  </>
)

const renderEmptyState = (): JSX.Element => (
  <EmptyState text="When your friends sign up for the Fold Card, you'll be rewarded for their spending here!" />
)

export const SquadActivityList = (): JSX.Element => {
  const { events, meta, status } = useAppSelector(selectMySpinSquad)

  const isLoading = status === 'LOADING'

  const Content = events.length
    ? renderListState(events, meta)
    : renderEmptyState()

  return isLoading ? (
    <ActivityIndicator {...activityIndicatorProps} />
  ) : (
    <>{Content}</>
  )
}
