import React from 'react'
import { TouchableOpacity } from 'react-native'
import { HeaderLeft } from '_deps/shared/components/header/sub-components/header-left/HeaderLeft'
import { Header } from '_deps/shared/components/header/sub-components/header/Header'
import Text from 'src/components-lib/components/text/Text'
import CameraIcon from 'assets/camera-icon.svg'
import { useNavigation } from '@react-navigation/native'
import { styles } from '_deps/shared/components/header/header-with-back-button-and-title-and-camera-icon/styles'

const { $title } = styles

type Props = {
  title: string
}

export const HeaderWithBackButtonAndTitleAndCameraIcon = ({ title }: Props) => {
  const navigation = useNavigation()

  const handleOnPress = () => {
    navigation.navigate('AddressQRScanner')
  }

  const Camera = () => (
    <TouchableOpacity
      onPress={handleOnPress}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
    >
      <CameraIcon />
    </TouchableOpacity>
  )

  return (
    <Header
      leftItemRenderer={() => <HeaderLeft />}
      centerItemRenderer={() => <Text style={$title}>{title}</Text>}
      rightItemRenderer={() => <Camera />}
    />
  )
}
