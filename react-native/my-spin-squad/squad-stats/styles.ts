import { style } from '_deps/lib/tailwind'

const $containerStyles = style('flex-row')

const valueTextContainer = 'flex-row flex-1 items-center justify-center my-4'

export const styles = {
  $container: style('my-4'),

  $heading: style(
    'uppercase',
    'text-center',
    'text-[11px]',
    'tracking-wide',
    'text-grey-700',
    'font-circular-bold',
    'pr-4px'
  ),

  $headingTextContainer: style('flex-1', 'mt-2'),

  $valuesContainer: $containerStyles,

  $leftValueTextContainer: style(`${valueTextContainer}, pl-2`),

  $rightValueTextContainer: style(`${valueTextContainer}, pr-2`),

  $referralContainer: style('flex-row flex-1 items-center justify-center'),

  $values: style(
    'font-circular-bold',
    'text-black',
    'text-base',
    'text-center',
    'pr-2px'
  ),

  $valueLabel: style('font-circular-std font-medium text-base text-black'),

  $satsEarnedContainer: style('justify-center', 'items-center'),

  $satsEarned: style('text-3xl font-circular-bold text-black mt-1')
}
