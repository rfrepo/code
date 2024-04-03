import tw, { style } from 'lib/tailwind'

export const styles = {
  $textInput: style(
    'text-16',
    'text-center',
    'text-teal-400',
    'font-circular-700',
    { fontWeight: 'normal' }
  ),

  $placeholderTextColor: tw.color('text-teal-400/50')
}
