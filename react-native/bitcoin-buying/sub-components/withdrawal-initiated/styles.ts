import { style } from '_deps/lib/tailwind'

export const styles = {
  $imageContainer: style('flex', 'justify-center', 'items-center', 'pr-4'),
  $bgImage: style(
    'z-[1]',
    'left-0',
    'right-0',
    'absolute',
    'top-[-12]',
    'bg-blue-300',
    {
      transform: [{ scale: 1.4 }]
    }
  ),

  $withdrawalAmount: style(
    'mt-8',
    'text-6',
    'text-center',
    'text-orange-300',
    'font-circular-bold'
  ),

  $infoContainer: style(
    'p-5',
    'flex',
    'mt-7',
    'mx-6',
    'mb-10',
    'mx-auto',
    'bg-white',
    'shadow-lg',
    'items-start',
    'rounded-2xl',
    'max-w-300px',
    'justify-center'
  ),
  $infoTitle: style(
    'mb-3',
    'text-md',
    'font-bold',
    'text-black',
    'font-circular-700'
  ),

  $infoText: style(
    'py-1',
    'text-sm',
    'text-center',
    'text-grey-800',
    'font-circular-std'
  ),

  $infoTextBold: style('font-circular-bold', 'text-black'),

  $title: style(
    'mt-6',
    'text-6',
    'text-black',
    'text-center',
    'font-circular-900'
  ),

  $bgColor: 'bg-brown-300',

  $button: style('mb-5'),

  $primeTrustLogo: style('mx-auto'),

  $footerText: style(
    'mt-1',
    'mx-6',
    'italic',
    'text-xs',
    'text-black',
    'text-center',
    'font-circular-italic'
  )
}
