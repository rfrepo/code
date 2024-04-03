import { style } from 'lib/tailwind'

export const styles = {
  $container: style('flex-1', 'bg-cream'),

  $text: style(
    'font-circular-400',
    'text-sm',
    'text-black',
    'text-center',
    'm-6'
  ),

  $input: style('bg-white', 'py-4', 'px-6'),

  $buttonContainer: style('my-6', 'mx-4'),

  $fixedFooter: style('mt-auto')
}
