import React from 'react'
import Text from '_deps/text/Text'
import { style } from '_deps/lib/tailwind'
import { Header } from '_deps/shared/components/header/sub-components/header/Header'
import { HeaderLeft } from '_deps/shared/components/header/sub-components/header-left/HeaderLeft'

type Props = {
  title: string
}

const $title = style(
  'text-4.5',
  'text-black',
  'text-center',
  'font-circular-700'
)

export const HeaderWithBackButtonAndTitle = ({ title, ...rest }: Props) => (
  <Header
    {...rest}
    leftItemRenderer={() => <HeaderLeft />}
    centerItemRenderer={() => <Text style={$title}>{title}</Text>}
  />
)
