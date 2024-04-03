import { style } from '_deps/lib/tailwind'

export const styles = {
  $container: style('absolute', 'bottom-6', 'z-10', 'right-3', {
    elevation: 100,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.35
  })
}
