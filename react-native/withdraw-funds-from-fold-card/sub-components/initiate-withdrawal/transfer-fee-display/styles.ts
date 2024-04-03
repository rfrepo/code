import tw, { style } from 'lib/tailwind'

export const styles = {
  $container: style('h-4', 'mb-5'),

  $text: style(
    'mx-auto',
    'text-xs',
    'uppercase',
    'text-grey-700',
    'font-circular-700'
  ),

  $loaderColor: tw.color('black'),

  $loadIndicator: style('mt-1.2', 'mb-5', { transform: [{ scale: 1.65 }] })
}
