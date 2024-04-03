import { style } from '_deps/lib/tailwind'

export const styles = {
  $text: style(
    'font-circular',
    'text-grey-400',
    'mb-7',
    'text-xs',
    'text-center',
    'rounded-2xl'
  ),
  $textContainer: style(
    'absolute',
    'z-2',
    'mx-auto',
    'w-full',
    'px-5',
    'items-center',
    'bottom-40'
  )
}
