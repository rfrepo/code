import React from 'react'
import { TouchableOpacity } from 'react-native'

export const Tappable = props => {
  const { children, onPress, style } = props

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  )
}
