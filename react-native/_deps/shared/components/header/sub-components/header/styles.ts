import { style } from 'lib/tailwind'

export const styles = {
  $container: style('w-100%', 'flex-row', 'items-center', 'justify-between'),
  $leftItemContainer: style('flex-1', 'mr-auto'),
  $rightItemContainer: style('flex-1', 'flex-row', 'justify-end'),
  $centerItemContainer: style('flex-grow-0', 'items-center')
}
