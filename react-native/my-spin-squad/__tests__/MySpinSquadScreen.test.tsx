import React from 'react'
import UserObj from '_deps/domain/user'
import { Linking } from 'react-native'
import { useAppDispatch, useAppSelector } from '_deps/redux/hooks'
import { SquadStats } from 'my-spin-squad/squad-stats/SquadStats'
import { EmptyState } from 'my-spin-squad/empty-state/EmptyState'
import { updateUser } from '_deps/redux/global-slices/user/userSlice'
import { MySpinSquadScreen } from 'my-spin-squad/MySpinSquadScreen'
import { ReferralURL } from 'my-spin-squad/referral-url/ReferralURL'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { SquadActivityList } from 'my-spin-squad/squad-activity-list/SquadActivityList'
import { retrieveMySpinSquadActivityFeed } from '_deps/redux/thunks/retrieveMySpinSquadActivityFeed'

jest.mock('_deps/domain/user', () => ({
  init: jest.fn()
}))

jest.mock('_deps/redux/hooks', () => ({
  useAppDispatch: jest.fn().mockReturnValue(jest.fn()),
  useAppSelector: jest.fn().mockReturnValue({ referral_count: 1 })
}))

jest.mock('my-spin-squad/squad-stats/SquadStats', () => ({
  SquadStats: jest.fn().mockReturnValue(null)
}))

jest.mock('my-spin-squad/empty-state/EmptyState', () => ({
  EmptyState: jest.fn().mockReturnValue(null)
}))

jest.mock('_deps/redux/global-slices/user/userSlice', () => ({
  updateUser: jest.fn()
}))

jest.mock('my-spin-squad/referral-url/ReferralURL', () => ({
  ReferralURL: jest.fn().mockReturnValue(null)
}))

jest.mock('_deps/redux/thunks/retrieveMySpinSquadActivityFeed', () => ({
  retrieveMySpinSquadActivityFeed: jest.fn()
}))

jest.mock('my-spin-squad/squad-activity-list/SquadActivityList', () => ({
  SquadActivityList: jest.fn().mockReturnValue(null)
}))

describe('MySpinSquadScreen', () => {
  const useAppSelectorMock = useAppSelector as jest.Mock

  const useAppDispatchMock = useAppDispatch as jest.Mock

  const retrieveMySpinSquadActivityFeedMock =
    retrieveMySpinSquadActivityFeed as unknown as jest.Mock

  const expectHeaderReferralURLAndStatsRender = () => {
    expect(ReferralURL).toHaveBeenCalled()

    expect(SquadStats).toHaveBeenCalled()
  }

  it('should render the basic components and the squad activity list view', () => {
    render(<MySpinSquadScreen />)

    expectHeaderReferralURLAndStatsRender()

    expect(SquadActivityList).toHaveBeenCalled()
  })

  it('should render the basic components and the no squad view', () => {
    useAppSelectorMock.mockReturnValue({ conversion_count: 0 })

    render(<MySpinSquadScreen />)

    expectHeaderReferralURLAndStatsRender()

    expect(EmptyState).toHaveBeenCalled()
  })

  it('should retrieve the spin squad activity data when the component renders', async () => {
    render(<MySpinSquadScreen />)

    await waitFor(() => {
      expect(useAppDispatchMock).toBeCalled()

      expect(retrieveMySpinSquadActivityFeed).toBeCalled()
    })
  })

  it('should handle clicking through to the terms and conditions', async () => {
    const LinkingSpy = jest.spyOn(Linking, 'openURL')

    const { getByText } = render(<MySpinSquadScreen />)

    await waitFor(() => {
      fireEvent.press(
        getByText('Spin Squad Terms and Conditions', { exact: false })
      )

      expect(LinkingSpy).toBeCalledWith(
        'https://www.fold.com/terms-of-referral-program'
      )
    })
  })

  it('should check for new referrals and new squad activity on refresh', async () => {
    const UserInitMock = UserObj.init as jest.Mock

    const dispatchMock = useAppDispatchMock() as jest.Mock

    const updateUserMock = updateUser as unknown as jest.Mock

    UserInitMock.mockResolvedValue({ user: 'new user data' })

    updateUserMock.mockImplementation(payload => ({
      type: 'mock update user action',
      payload
    }))

    const { getByTestId } = render(<MySpinSquadScreen />)

    dispatchMock.mockClear()

    retrieveMySpinSquadActivityFeedMock.mockClear()

    const { refreshControl } = getByTestId('my-spin-squad-screen').props

    retrieveMySpinSquadActivityFeedMock.mockReturnValue({
      type: 'mock retrieveMySpinSquadActivityFeed thunks action'
    })

    refreshControl.props.onRefresh()

    await waitFor(() => {
      expect(dispatchMock).toBeCalledWith({
        type: 'mock retrieveMySpinSquadActivityFeed thunks action'
      })

      expect(dispatchMock).toBeCalledWith({
        type: 'mock update user action',
        payload: { user: 'new user data' }
      })
    })
  })
})
