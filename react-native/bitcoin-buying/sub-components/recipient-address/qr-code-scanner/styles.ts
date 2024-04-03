import { style } from '_deps/lib/tailwind'

export const styles = {
  $container: style('bg-cream', 'flex-1'),

  $contentContainer: style('mt-8', 'px-6'),

  $button: (enabled: boolean) => {
    const color = enabled ? 'orange-300' : 'orange-200'

    return style(
      'h-14',
      'mt-8',
      ' w-[100%]',
      `bg-${color} `,
      'items-center',
      'justify-center',
      'rounded-[40px]'
    )
  },

  $textInput: style(
    'mb-6',
    'text-5',
    'text-black',
    'text-center ',
    'font-circular-bold '
  ),

  $buttonContainer: style('px-6 ', ' mt-14'),

  $buttonText: style('text-white ', ' font-circular-bold'),

  $whiteCloseButton: style('absolute', 'z-1', 'right-8', 'top-12'),

  $scannerView: style('self-center', 'absolute')
}
