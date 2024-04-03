import React from 'react'
import { Linking, View } from 'react-native'
import { Tappable } from '_deps/ui/Tappable/Tappable'
import { mockReturnsValue } from '_deps/shared/test-utils'
import { SquadStats } from 'my-spin-squad/squad-stats/SquadStats'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { selectReferredCardHolderCount } from '_deps/redux/slice/mySpinSquadSelectors'
import { selectFoldIssuedCardWaitListDetails } from '_deps/redux/global-slices/user/userSelectors'

jest.mock('_deps/redux/hooks', () => ({
  useAppSelector: jest.fn()
}))

jest.mock('_deps/services/converter', () => ({
  btcToSats: (value: number) => value
}))

jest.mock('_deps/ui/Tappable/Tappable', () => ({
  Tappable: jest.fn()
}))

jest.mock('_deps/redux/global-slices/user/userSelectors', () => ({
  selectReferrals: {}
}))

jest.mock('_deps/redux/slice/mySpinSquadSelectors', () => ({
  selectMySpinSquad: {}
}))

jest.mock('_deps/redux/hooks', () => ({
  useAppSelector: jest
    .fn()
    .mockImplementation((mockedSelector: () => any) => mockedSelector())
}))

jest.mock('my-spin-squad/squad-stats/assets/question-mark.svg', () =>
  jest.fn().mockReturnValue(null)
)

jest.mock('_deps/redux/slice/mySpinSquadSelectors', () => ({
  selectTotalSatsEarned: jest.fn().mockReturnValue(10),
  selectReferredCardHolderCount: jest.fn()
}))

jest.mock('_deps/redux/global-slices/user/userSelectors', () => ({
  selectFoldIssuedCardWaitListDetails: jest
    .fn()
    .mockReturnValue({ referral_count: 123 })
}))

describe('SquadStats', () => {
  const mockTappable = Tappable as jest.Mock

  mockTappable.mockImplementation(({ children }) => <View>{children}</View>)

  it('should render titles and values', () => {
    mockReturnsValue(selectReferredCardHolderCount, 50)

    const { getByText } = render(<SquadStats />)

    expect(getByText(/123/)).toBeDefined()

    expect(getByText(/10/)).toBeDefined()

    expect(getByText(/50/)).toBeDefined()

    expect(getByText(/Total Sats Earned/)).toBeDefined()

    expect(getByText(/users/)).toBeDefined()

    expect(getByText(/cardholders/)).toBeDefined()
  })

  it('should render the singular form of cardholder and user when referral_count is 1', () => {
    mockReturnsValue(selectReferredCardHolderCount, 1)

    mockReturnsValue(selectFoldIssuedCardWaitListDetails, { referral_count: 1 })

    const { getByText } = render(<SquadStats />)

    expect(getByText('user')).toBeDefined()

    expect(getByText('cardholder')).toBeDefined()
  })

  describe('modal content', () => {
    let LinkingSpy: ReturnType<typeof jest.spyOn>

    beforeEach(() => {
      LinkingSpy = jest.spyOn(Linking, 'openURL')
    })

    const openModalAndAssertOpenedURL = (
      linkText: RegExp,
      expectedURL: string
    ) => {
      const { getByText } = render(<SquadStats />)

      fireEvent.press(getByText(/Your Referrals/))

      fireEvent.press(getByText(linkText))

      return waitFor(() => {
        expect(LinkingSpy).toHaveBeenCalledWith(expectedURL)
      })
    }

    it('should click through and open the link to the FAQ', async () => {
      await openModalAndAssertOpenedURL(
        /Spin Squad FAQs/,
        'https://www.fold.com/spin-squad-faqs'
      )
    })
  })
})
