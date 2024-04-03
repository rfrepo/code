import React from 'react'
import tw from 'lib/tailwind'
import Back from 'assets/back.svg'
import { Pressable } from 'react-native'
import { useNavigation } from '_deps/shared/hooks/use-navigation/useNavigation'

type Props = {
  backIconFillColor?: string
  onBackButtonPress?: () => void
}

export const HeaderLeft = ({
  onBackButtonPress,
  backIconFillColor = tw.color('black')
}: Props): JSX.Element => {
  const { goBack } = useNavigation()

  const onPress = () => {
    goBack('Home', { screen: 'Fold Card' })

    onBackButtonPress?.()
  }

  return (
    <Pressable onPress={onPress} hitSlop={20} testID={'header-left'}>
      <Back fill={backIconFillColor} />
    </Pressable>
  )
}
