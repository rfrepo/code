import { style } from 'lib/tailwind'

const baseTextStyles = style('text-sm', 'font-circular-std')

export const styles = {
  $infoRow: style('flex-row', 'justify-between', 'w-11/12'),

  $titleInfo: style(baseTextStyles, 'text-grey-700', 'pb-6'),

  $link: style(
    baseTextStyles,
    'ml-2',
    'underline',
    'text-blue-600',
    'min-w-110px'
  ),

  $loadingContainer: style('justify-center', 'content-center', 'h-48')
}
