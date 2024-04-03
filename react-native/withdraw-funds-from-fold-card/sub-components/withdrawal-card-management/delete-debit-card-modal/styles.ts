import tw, { style } from 'lib/tailwind'

const $baseTextStyles = style(
  'text-xs',
  'uppercase',
  'text-center',
  'text-red-200',
  'tracking-[1px]',
  'leading-[22px]',
  'font-circular-700'
)

export const styles = {
  $errorContainer: style('my-2'),

  $deleteButton: style('bg-red-150', 'rounded-31px', 'py-4'),

  $deleteButtonText: $baseTextStyles,

  $content: style('px-6'),

  $cancelButtonText: [$baseTextStyles, style('text-black', 'mt-5', 'mb-10')],

  $loaderColor: tw.color('black'),

  $loaderContainer: style('my-10')
}
