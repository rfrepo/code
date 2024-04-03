import React from 'react'
import CloseButton from 'assets/close-black.svg'
import { Tappable } from 'src/ui/tappable'
import { useNavigation } from '_deps/shared/hooks/use-navigation/useNavigation'

export const HeaderRight = () => {
  const { navigateToFoldCard } = useNavigation('FoldCard')

  return (
    <Tappable onPress={navigateToFoldCard} testID="CloseButton">
      <CloseButton />
    </Tappable>
  )
}
