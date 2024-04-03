import { style } from 'lib/tailwind'

export const styles = {
  $container: style(
    'px-6',
    'mt-4',
    'bg-cream',
    'flex-col',
    'rounded-tl-20px',
    'rounded-tr-20px'
  ),

  $loader: style('h-60'),

  $listContainer: style(
    'p-4',
    'pt-1',
    'border-1',
    'rounded-10px',
    'border-grey-500'
  ),

  $text: style('font-circular-std', 'text-grey-900', 'text-sm'),

  $rowContainer: style('my-3'),

  $totalLabel: style('font-circular-bold', 'text-grey-900', 'text-14px'),

  $totalValue: style('font-circular-bold', 'text-grey-900', 'text-30px'),

  $totalContainer: style('flex-row', 'justify-between', 'items-center', 'mt-3'),

  $button: style('mt-5', 'mb-5')
}
