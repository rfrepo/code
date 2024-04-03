import { style } from 'lib/tailwind'

export const styles = {
  $container: style('mt-8', 'mx-6'),

  $lineItem: style('flex-row', 'justify-between', 'mb-3'),

  $titleText: style('text-white', 'font-circular-900', 'text-18px'),

  $valueText: style('text-yellow-500', 'font-circular-900', 'text-18px')
}
