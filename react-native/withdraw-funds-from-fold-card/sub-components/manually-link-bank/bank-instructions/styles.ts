import { style } from 'lib/tailwind'

export const styles = {
  $container: style(
    'items-center',
    'p-5',
    'mx-6',
    'mt--12',
    'bg-white',
    'rounded-6px'
  ),

  $titleText: style('text-grey-900', 'font-circular-900', 'text-18px', 'py-4'),

  $contentText: style('text-black', 'text-sm', 'font-circular-400')
}
