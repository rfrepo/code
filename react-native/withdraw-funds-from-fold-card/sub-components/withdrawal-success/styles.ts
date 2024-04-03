import { style } from 'lib/tailwind'
import { Dimensions } from 'react-native'

const WIDTH = 750

const WINDOW_WIDTH = Dimensions.get('window').width

const height = (WINDOW_WIDTH / WIDTH) * WIDTH

const BORDER_RADIUS = WINDOW_WIDTH / 2

export const styles = {
  $container: style('bg-brown-300', 'p-0'),

  $image: style(`h-${height}px`, 'mt-28', 'mb-4', 'w-100%', 'px-3', {
    resizeMode: 'contain'
  }),

  $content: style('flex-1', 'px-6', 'bg-cream'),

  $curveContainer: style('overflow-hidden', 'bg-brown-300', 'h-16'),

  $curve: style(
    'top-4',
    'absolute',
    'bg-cream',
    `w-${WINDOW_WIDTH}px`,
    `h-${WINDOW_WIDTH}px`,
    `rounded-${BORDER_RADIUS}`,
    {
      transform: [{ scaleX: 1.6 }]
    }
  ),

  $title: style(
    'mb-2',
    'mt-6',
    'text-30px',
    'text-black',
    'text-center',
    'font-circular-900'
  ),

  $withdrawalSummaryText: style(
    'mb-2',
    'text-lg',
    'text-black',
    'text-center',
    'font-circular-900'
  ),
  $settlementText: style(
    'mb-8',
    'text-xs',
    'text-center',
    'text-grey-900',
    'font-circular-400'
  ),

  $buttonContainer: style('w-full', 'mb-5')
}
