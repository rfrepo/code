import { style } from 'lib/tailwind'

export const styles = {
  $container: style(
    'bg-white',
    'mx-6',
    'border-t-0',
    'border-b-0',
    'rounded-10px',
    'rounded-shadow-block',
    'p-0'
  ),

  $listItemContainer: style('py-9px'),

  $button: style('mx-6', 'mb-5'),
}
