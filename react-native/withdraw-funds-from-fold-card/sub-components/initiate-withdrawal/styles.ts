import { style } from 'lib/tailwind'

export const styles = {
  $container: style('flex-1', 'bg-cream'),

  $content: style('px-6'),

  $text: style('font-circular-std', 'text-grey-700', 'text-sm'),

  $balanceText: style(
    'mb-2',
    'mx-auto',
    'text-12px',
    'text-grey-700',
    'font-circular-std'
  )
}
