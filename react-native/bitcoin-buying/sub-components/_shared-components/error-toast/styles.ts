import { style } from '_deps/lib/tailwind'

export const styles = {
  $errorContainer: style(
    'w-80% h-120px justify-center items-center absolute z-1000 self-center'
  ),

  $error: style(
    'flex-row justify-center items-center bg-red-150 px-1 pr-3 py-2',
    'rounded-2'
  ),

  $errorText: style('ml-2', 'text-grey-700', 'font-circular-400', 'text-xs')
}
