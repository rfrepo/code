import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { useNavigation } from '_deps/shared/hooks/use-navigation/useNavigation'
import { HeaderRight } from '_deps/shared/components/header/sub-components/header-right/HeaderRight'

jest.mock('assets/close-black.svg', () => jest.fn().mockReturnValue(null))

jest.mock(
  'src/shared/hooks/use-navigation/useNavigation',
  () => ({
    useNavigation: jest.fn().mockReturnValue({ navigateToFoldCard: jest.fn() })
  })
)

describe('HeaderRight', () => {
  it('should handle pressing the back button', () => {
    const { getByTestId } = render(<HeaderRight />)

    const backButton = getByTestId('CloseButton')

    fireEvent.press(backButton)

    expect(useNavigation().navigateToFoldCard).toHaveBeenCalled()
  })
})
