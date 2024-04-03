import React, { memo, useState } from 'react'
import { PasswordConceal, PasswordReveal } from '@dunelm/core/iconography'

export const PasswordObfuscationToggle = memo(
  ({ target }: { target: HTMLInputElement }) => {
    const [isObfuscated, setIsObfuscated] = useState<boolean>(true)

    const onClick = () => {
      setIsObfuscated(!isObfuscated)

      if (target) {
        target.setAttribute('type', isObfuscated ? 'text' : 'password')
      }
    }

    return (
      <button
        type="button"
        onClick={onClick}
        data-testid="password-obfuscation-button"
      >
        {isObfuscated ? <PasswordConceal /> : <PasswordReveal />}
      </button>
    )
  }
)
