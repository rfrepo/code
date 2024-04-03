import React from 'react'
import { Image, View } from 'react-native'
import { styles } from 'my-spin-squad/squad-activity-list/sub-components/styles'
import { SquadActivityFeed } from '_deps/redux/slice/mySpinSquadSlice'
import Text from '_deps/text/Text'
import converter from '_deps/services/converter'
import moment from 'moment'

type Props = {
  key: string | number
  data: SquadActivityFeed
  max_sats_per_purchase?: number
}

const imageMap = {
  lg: require('my-spin-squad/assets/reward_large.png'),
  md: require('my-spin-squad/assets/reward_medium.png'),
  sm: require('my-spin-squad/assets/reward_small.png')
}

const getImageByStatsEarned = (
  btc_earned: number,
  max_sats_per_purchase = 0
) => {
  const range = (btc_earned / max_sats_per_purchase) * 100

  if (range <= 33) return imageMap.sm

  if (range <= 66) return imageMap.md

  return imageMap.lg
}

const { $container, $satsAndType, $sats, $date, $description, $image } = styles

export const SquadActivityListItem = ({
  max_sats_per_purchase,
  data: { btc_earned, timestamp, event_description }
}: Props): JSX.Element => {
  const date = moment(timestamp).format('MM/DD/YYYY')

  const satsEarned = Math.round(converter.btcToSats(btc_earned))

  const image = getImageByStatsEarned(satsEarned, max_sats_per_purchase)

  return (
    <View style={$container}>
      <Image style={$image} source={image} />

      <View style={$satsAndType}>
        <Text style={$sats}>+{satsEarned} sats</Text>

        <Text style={$description}>{event_description}</Text>
      </View>

      <Text style={$date}>{date}</Text>
    </View>
  )
}
