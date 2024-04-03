import React, { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'

import GradientCircle from 'assets/gradient-circle.svg'

export const SpinningCircleAnimation = () => {
  const rotateAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const startAnimation = () => {
      rotateAnimation.setValue(0)

      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => startAnimation())
    }

    startAnimation()
  }, [rotateAnimation])

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <GradientCircle height={150} width={150} />
    </Animated.View>
  )
}
