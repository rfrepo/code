import {
  View,
  Easing,
  Animated,
  Platform,
  TouchableOpacity
} from 'react-native'
import { styles } from './styles'
import Text from '_deps/text/Text'
import React, { useEffect, useRef } from 'react'
import CloseIcon from '_deps/assets/close-red.svg'

const { $errorContainer, $error, $errorText } = styles

type Props = {
  errorMessage: string
}
export const ErrorToast = ({ errorMessage }: Props) => {
  const animateError = useRef(new Animated.Value(-200)).current

  const yPos = Platform.OS === 'ios' ? 8 : -38

  useEffect(() => {
    if (errorMessage) {
      Animated.timing(animateError, {
        toValue: yPos,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.ease
      }).start()
    }

    if (!errorMessage) {
      Animated.timing(animateError, {
        toValue: -200,
        duration: 250,
        useNativeDriver: false
      }).start()
    }
  }, [errorMessage])

  const handleHideError = () => {
    Animated.timing(animateError, {
      toValue: -200,
      duration: 250,
      useNativeDriver: false
    }).start()
  }

  return (
    <Animated.View style={{ ...$errorContainer, top: animateError }}>
      <View style={$error}>
        <TouchableOpacity onPress={handleHideError}>
          <CloseIcon />
        </TouchableOpacity>

        <Text style={$errorText}>
          {errorMessage || 'Unable to make purchase'}
        </Text>
      </View>
    </Animated.View>
  )
}
