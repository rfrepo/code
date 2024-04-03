import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { WithdrawalInitiated } from 'bitcoin-buying/sub-components/withdrawal-initiated/WithdrawalInitiated'

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate
  })
}))

jest.mock('bitcoin-buying/sub-components/assets/curve.svg', () =>
  jest.fn().mockReturnValue(null)
)

jest.mock('_deps/api/wallet/walletEndpoints', () => ({
  useWithdrawConfirmMutation: jest.fn().mockReturnValue([jest.fn(), {}])
}))

jest.mock(
  'bitcoin-buying/redux/slice/bitcoinTransactionHistoryEndpoints',
  () => ({
    useGetTransactionsQuery: jest.fn().mockReturnValue(null)
  })
)

const mockedNavigate = jest.fn()

describe('WithdrawalInitiated', () => {
  it('should navigate to home screen when button is pressed', () => {
    const { getByText } = render(<WithdrawalInitiated />)

    fireEvent.press(getByText('GOT IT!'))

    expect(mockedNavigate).toHaveBeenCalledWith('Home')
  })
})
