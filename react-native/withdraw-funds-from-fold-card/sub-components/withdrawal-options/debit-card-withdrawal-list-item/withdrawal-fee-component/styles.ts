import tw, { style } from 'lib/tailwind'

export const styles = {
  $container: style(
    'py-1',
    'px-2',
    'rounded',
    'min-w-16',
    'text-center',
    'bg-purple-300',
    'justify-center'
  ),

  $text: style(
    'font-circular-700',
    'text-purple-200',
    'text-12px',
    'mt--.5',
    'text-center'
  ),

  $loaderColor: tw.color('purple-200'),

  $loadIndicator: { transform: [{ scale: 0.5 }] }
}
