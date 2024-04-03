import { style } from '_deps/lib/tailwind'

const $linkStyles = style(
  'py-6',
  'text-center',
  'text-[11px]',
  'text-grey-600',
  'font-circular-italic'
)

export const styles = {
  $container: style('bg-cream', 'flex-1'),

  $content: style(`mx-10]`),

  $recentSquadEarningsHeading: style(
    'pt-7',
    'pb-6',
    'pl-4',
    'text-lg',
    'text-left',
    'text-black',
    'font-circular-bold'
  ),

  $referralURLAndStatsContainer: style(
    'p-4',
    'bg-white',
    'mt-[-112]',
    'rounded-[8]',
    `mx-10`,
    {
      elevation: 16,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowRadius: 20,
      shadowOpacity: 0.25
    }
  ),

  $linkText: $linkStyles,

  $link: {
    ...style('underline'),
    ...$linkStyles
  }
}
