import React from 'react'
import { style } from 'lib/tailwind'
import { HeaderWithBackButtonAndTitle } from 'src/shared/components/header/header-with-back-button-and-title/HeaderWithBackButtonAndTitle'
import { useSafeTopAndBottomStyles } from 'src/shared/hooks/use-safe-top-styles/useSafeTopAndBottomStyles'

type Props = {
  title: string
}

const containerStyles = style('h-12', 'mb-1', 'px-6')

export const Header = ({ title }: Props) => {
  const { $mt } = useSafeTopAndBottomStyles(12)

  return (
    <HeaderWithBackButtonAndTitle
      title={title}
      containerStyles={[containerStyles, $mt]}
    />
  )
}
