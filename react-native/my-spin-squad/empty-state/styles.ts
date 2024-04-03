import { style } from '_deps/lib/tailwind'

export const styles = {
  $container: style('mt-[13px]', 'mb-[51px]'),

  $icon: style(
    'mb-2',
    'text-3xl',
    'text-black',
    'text-center',
    'font-circular-std'
  ),

  $line1: style('text-sm', 'text-black', 'text-center', 'font-circular-bold'),

  $line2: style(
    'mt-4',
    'mb-6',
    'px-10',
    'text-sm',
    'text-black',
    'text-center',
    'font-circular-std'
  )
}
