import { StyleSheet } from 'react-native'
import { colors } from '_deps/shared-styles'
import { style } from '_deps/lib/tailwind'

export const styles = StyleSheet.create({
  $container: style(
    'p-3',
    'mb-3',
    'flex-row',
    'rounded-[10px]',
    'items-center',
    {
      elevation: 12,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowRadius: 20,
      shadowOpacity: 0.1,
      shadowColor: '#291500',
      backgroundColor: colors.white
    }
  ),

  $image: style('h-[9]', 'w-[9]'),

  $satsAndType: style('flex-1', 'ml-3'),

  $sats: style(
    'mb-1',
    'text-xs',
    'font-bold',
    'text-black',
    'font-circular-bold'
  ),

  $description: style('text-[11px]', 'text-grey-700', 'font-circular-std'),

  $date: style('text-[10px]', 'text-grey-700', 'font-circular-std')
})
