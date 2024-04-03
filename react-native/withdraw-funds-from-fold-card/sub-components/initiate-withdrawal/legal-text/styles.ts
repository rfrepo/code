import tw, { style } from 'lib/tailwind'

export const styles = {
  $container: style('mt-3'),

  $text: style(
    'text-10px',
    'text-center',
    'text-grey-700',
    'font-circular-400'
  ),

  $loaderColor: tw.color('black')
}
