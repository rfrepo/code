import React from 'react'
import { style } from 'lib/tailwind'
import Text from 'src/components-lib/components/text/Text'
import { Header } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/header/Header'

type Props = {
  title: string
  children?: React.ReactNode
}

const $text = style(
  'mb-5',
  'mx-6',
  'text-sm',
  'text-black',
  'text-center',
  'font-circular-400'
)

export const HeaderAndParagraph = ({ title, children }: Props) => (
  <>
    <Header title={title} />

    {children && <Text style={$text}>{children}</Text>}
  </>
)
