import React from 'react'
import tw, { style } from '_deps/lib/tailwind'
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  ViewStyle
} from 'react-native'

const activityIndicatorProps = {
  size: 'small',
  animating: true,
  accessibilityHint: 'loading',
  color: tw.color('orange-500')
} as ActivityIndicatorProps

const $defaultStyle = style('flex-1', 'justify-center', 'items-center')

type Props = {
  isLoading: boolean
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  activityIndicatorProps?: ActivityIndicatorProps
}

export const LoadingIndicator = ({
  children,
  isLoading,
  style = {},
  activityIndicatorProps: additionalIndicatorProps = {}
}: Props) => (
  <>
    {isLoading && (
      <ActivityIndicator
        style={[$defaultStyle, style]}
        {...{ ...activityIndicatorProps, ...additionalIndicatorProps }}
      />
    )}

    {!isLoading && children}
  </>
)
