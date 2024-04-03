import { StyleSheet } from 'react-native'
import { style } from '_deps/lib/tailwind'

export const styles = StyleSheet.create({
  $activityIndicator: style('mt-10'),

  $recentSquadEarningsHeading: style(
    'pt-5',
    'pb-6',
    'pl-4',
    'text-lg',
    'text-left',
    'text-black',
    'font-circular-bold'
  )
})
