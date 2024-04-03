import { View } from 'react-native'
import React, { useRef } from 'react'
import { Tappable } from '_deps/ui/Tappable/Tappable'
import { styles } from 'bitcoin-buying/sub-components/launch-bitcoin-buying-button/styles'
import BitcoinLogo from 'bitcoin-buying/sub-components/launch-bitcoin-buying-button/assets/bitcoin-logo.svg'

const { $container } = styles

type Props = {
  onPressHandler: () => void
}

export const LaunchBitcoinBuyingButton = ({ onPressHandler }: Props) => {
  const element = useRef()

  return (
    <View ref={element} style={$container}>
      <Tappable
        onPress={onPressHandler}
        style={{ zIndex: 101, elevation: 101 }}
      >
        <BitcoinLogo />
      </Tappable>
    </View>
  )
}
