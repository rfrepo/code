import { style } from '_deps/lib/tailwind'

export const styles = {
  $bgImage: style('absolute', 'z-[1]', 'top-[-12]', 'right-0', 'left-3', {
    transform: [{ scale: 1.4 }]
  }),

  $safeTopView: style('px-0'),

  $container: style('bg-cream', 'flex-1'),

  $spinRewardBadgeContainer: style('mt-7'),

  $title: style('text-30px', 'text-center', 'font-circular-700', 'text-black'),

  $buttonContainer: style('mt-5'),

  $settlementText: style(
    'mt-3',
    'mb-2',
    'mx-4',
    'text-center',
    'text-sm',
    'text-black',
    'font-circular-400'
  ),

  $settlementBoldText: style('font-circular-700')
}
