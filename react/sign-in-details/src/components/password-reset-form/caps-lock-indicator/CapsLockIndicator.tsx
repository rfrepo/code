import React, { useEffect, useState } from 'react'

import { CapsLockIcon } from 'components/password-reset-form/styled'

export const CapsLockIndicator = ({ target }: { target: HTMLInputElement }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const checkCapsLock = (evt: Event): void => {
    const isCapsLockOn = (evt as KeyboardEvent).getModifierState('CapsLock')

    if (isCapsLockOn) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const onBlur = () => setIsVisible(false)

  const addListeners = () => {
    target.addEventListener('blur', onBlur)

    target.addEventListener('keyup', checkCapsLock)

    target.addEventListener('keydown', checkCapsLock)
  }

  const removeListeners = () => {
    target.removeEventListener('blur', onBlur)

    target.removeEventListener('keyup', checkCapsLock)

    target.removeEventListener('keydown', checkCapsLock)
  }

  useEffect(() => {
    if (target) {
      removeListeners()

      addListeners()

      return removeListeners
    }
  }, [setIsVisible, target])

  return isVisible ? <CapsLockIcon /> : null
}
