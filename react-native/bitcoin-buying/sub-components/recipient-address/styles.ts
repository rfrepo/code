import { style } from '_deps/lib/tailwind'

const baseTextStyles = style(
  'italic',
  'text-sm',
  'text-center',
  'font-circular-std'
)

export const styles = {
  $title: style(
    'text-24px',
    'font-circular-900',
    'mt-13',
    'text-black',
    'mb-9'
  ),

  $infoRow: style('flex-row', 'justify-start', 'mb-15'),

  $container: style('bg-cream', 'flex-1'),

  $contentContainer: style('mt-8', 'mx-auto', 'px-8'),

  $titleInfo: style(baseTextStyles, 'text-grey-700'),

  $link: style(baseTextStyles, 'ml-2', 'underline', 'text-blue-600'),

  $buttonContainer: style('px-6 mt-20'),

  $buttonText: style('text-white font-circular-bold'),

  $titleContainer: style('flex', 'justify-start', 'w-95', 'mx-auto')
}
