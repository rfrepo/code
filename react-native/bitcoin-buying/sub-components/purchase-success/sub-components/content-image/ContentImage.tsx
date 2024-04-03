import React from 'react'
import { style } from '_deps/lib/tailwind'
import Img from '_deps/assets/robot-with-coins.png'
import { Dimensions, Image } from 'react-native'

const winSize = Dimensions.get('window')

const { width } = Image.resolveAssetSource(Img)

const height = (winSize.width / width) * width

const $imageStyles = style(`mt-3`, `w-100%`, `h-${height}px`, {
  resizeMode: 'contain'
})

export const ContentImage = () => <Image source={Img} style={$imageStyles} />
