import { View, ViewStyle } from 'react-native'
import React from 'react'
import { styles } from '_deps/shared/components/header/sub-components/header/styles'

const {
  $container,
  $leftItemContainer,
  $rightItemContainer,
  $centerItemContainer
} = styles

type HeaderProps = {
  containerStyles?: ViewStyle | ViewStyle[]
  leftItemRenderer: () => JSX.Element
  leftItemContainerStyles?: ViewStyle
  rightItemContainerStyles?: ViewStyle
  rightItemRenderer?: () => JSX.Element
  centerItemContainerStyles?: ViewStyle
  centerItemRenderer?: () => JSX.Element
}

export const Header = ({
  leftItemRenderer,
  rightItemRenderer,
  centerItemRenderer,
  containerStyles = {},
  leftItemContainerStyles = {},
  rightItemContainerStyles = {},
  centerItemContainerStyles = {}
}: HeaderProps) => (
  <View style={[$container, containerStyles]}>
    <View style={[$leftItemContainer, leftItemContainerStyles]}>
      {leftItemRenderer?.()}
    </View>

    <View style={[$centerItemContainer, centerItemContainerStyles]}>
      {centerItemRenderer?.()}
    </View>

    <View style={[$rightItemContainer, rightItemContainerStyles]}>
      {rightItemRenderer?.()}
    </View>
  </View>
)
