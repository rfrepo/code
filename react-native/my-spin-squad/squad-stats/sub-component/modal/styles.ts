import { style } from '_deps/lib/tailwind'

const $baseContainer = style(
  'pb-5',
  'px-4.5',
  'pt-1.5',
  'bg-cream',
  'absolute',
  'rounded-2xl'
)

const $textStyles = style(
  'text-sm',
  'text-black',
  'leading-normal',
  'font-circular-std'
)

export const styles = {
  $getContainerStyles: (value: number) => ({
    ...$baseContainer,
    ...style(`bottom-[${(value + 8) / 4}]`)
  }),

  $content: style(`mx-4`),

  $heading: style(
    'pb-2',
    '-mt-2',
    'text-lg',
    'text-left',
    'text-black',
    'font-circular-bold'
  ),

  $closeButton: style('self-end', 'p-2', 'pr-0'),

  $paragraph: {
    ...$textStyles,
    ...style('my-2')
  },

  $link: {
    ...$textStyles,
    ...style('underline')
  }
}
