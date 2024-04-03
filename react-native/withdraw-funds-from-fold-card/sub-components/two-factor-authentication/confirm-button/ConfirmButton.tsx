import React from 'react'
import { Button } from 'src/screens/bitcoin-buying/sub-components/_shared-components/button/Button'
import { ThemeButton } from 'src/theme/theme-button'

type ConfirmButtonProps = {
  buttonType?: string
  title?: string
  disabled: boolean
  isLoading: boolean
  handlePress: () => void
}

export const ConfirmButton = ({
  buttonType,
  title,
  disabled,
  handlePress,
  isLoading
}: ConfirmButtonProps) => {
  if (buttonType === 'themed') {
    return (
      <ThemeButton
        text={title}
        disabled={disabled}
        isLoading={isLoading}
        onPress={handlePress}
      />
    )
  }

  return (
    <Button
      text="CONFIRM"
      disabled={disabled}
      isLoading={isLoading}
      onPress={handlePress}
    />
  )
}
