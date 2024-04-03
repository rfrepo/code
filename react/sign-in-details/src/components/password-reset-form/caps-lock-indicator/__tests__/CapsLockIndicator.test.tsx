import React from 'react'
import { act, render, waitFor } from '@testing-library/react'
import { CapsLockIndicator } from 'components/password-reset-form/caps-lock-indicator/CapsLockIndicator'

jest.mock('components/password-reset-form/styled', () => ({
  CapsLockIcon: jest.fn().mockReturnValue(<div data-testid="caps-lock-icon" />)
}))

describe('CapsLockIndicator', () => {
  let target: HTMLInputElement

  let renderResult: ReturnType<typeof render>

  beforeEach(() => {
    target = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    } as unknown as HTMLInputElement

    renderResult = render(<CapsLockIndicator target={target} />)
  })

  const getListenerCallback = (eventName: string) => {
    const eventListener = (
      target.addEventListener as jest.Mock
    ).mock.calls.find(([event]) => event === eventName)

    return eventListener && eventListener[1]
  }

  const createKeyboardEvent = (isCapsLock: boolean = true): KeyboardEvent => {
    return {
      getModifierState: jest.fn().mockReturnValue(isCapsLock)
    } as unknown as KeyboardEvent
  }

  const simulateCapsLockIconVisibleOnKeyup = () => {
    const checkCapsLock = getListenerCallback('keyup')

    act(() => checkCapsLock(createKeyboardEvent()))
  }

  const expectIconIsNotVisible = () =>
    waitFor(() => {
      expect(renderResult.queryByTestId('caps-lock-icon')).toBeNull()
    })

  const expectIconIsVisible = () =>
    waitFor(() => {
      expect(renderResult.getByTestId('caps-lock-icon')).toBeDefined()
    })

  it('should render the caps lock icon', async () => {
    simulateCapsLockIconVisibleOnKeyup()

    await expectIconIsVisible()
  })

  it('should show the caps locks icon on keydown', async () => {
    const checkCapsLock = getListenerCallback('keydown')

    await expectIconIsNotVisible()

    act(() => checkCapsLock(createKeyboardEvent()))

    await expectIconIsVisible()
  })

  it('should hide on blur', async () => {
    simulateCapsLockIconVisibleOnKeyup()

    await expectIconIsVisible()

    const onBlur = getListenerCallback('blur')

    act(() => onBlur())

    await expectIconIsNotVisible()
  })

  it('should hide the caps locks icon on any key interaction', async () => {
    simulateCapsLockIconVisibleOnKeyup()

    await expectIconIsVisible()

    const checkCapsLock = getListenerCallback('keydown')

    act(() => checkCapsLock(createKeyboardEvent(false)))

    await expectIconIsNotVisible()
  })

  it('should remove event listeners on initial render', async () => {
    expect(target.removeEventListener).toHaveBeenCalledTimes(3)
  })

  it('should remove event listeners on unmount render', async () => {
    (target.removeEventListener as jest.Mock).mockClear()

    renderResult.unmount()

    expect(target.removeEventListener).toHaveBeenCalledTimes(3)
  })
})
