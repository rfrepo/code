import { style } from '_deps/lib/tailwind'

export const styles = {
  $content: style(
    'p-4',
    'pt-2',
    'border',
    'bg-white',
    'rounded-[5]',
    'border-dashed',
    'border-grey-600'
  ),

  $yourReferralLinkHeading: style(
    'mt-2',
    'uppercase',
    'text-[.65rem]',
    'text-center',
    'text-grey-700',
    'font-circular-bold'
  ),

  $copyOnTapContainer: style('self-center'),

  $referralLinkText: style(
    'mt-2',
    'pb-2',
    'text-sm',
    'text-center',
    'text-teal-400',
    'font-circular-bold'
  ),

  $cta: style('text-[10px]', 'mt-4', 'text-center', 'text-grey-600')
}
