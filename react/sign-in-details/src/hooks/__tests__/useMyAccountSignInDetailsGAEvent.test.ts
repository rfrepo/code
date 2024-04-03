import { renderHook } from '@testing-library/react-hooks'
import { reportPageView } from '@dunelm/tooling/integrations'
import useMyAccountSignInDetailsGAEvent from 'hooks/useMyAccountSignInDetailsGAEvent'

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({
    pagePath: '/my-account/sign-in',
    pageTitle: 'My Account - Sign In',
    breadCrumbValue: 'My Account - Sign In',
    user: { name: 'Guy Person', email: 'example@domain.com' }
  })
}))

jest.mock('@dunelm/tooling/integrations', () => ({
  reportPageView: jest.fn()
}))

describe('useMyAccountSignInDetailsGAEvent', () => {
  it('should send the page view analytics data extracted from the redux store', () => {
    renderHook(useMyAccountSignInDetailsGAEvent)

    const reportPageViewMock = reportPageView as jest.Mock

    expect(reportPageViewMock.mock.calls[0][0]).toStrictEqual({
      pagePath: '/my-account/sign-in',
      breadCrumbValue: 'My Account - Sign In',
      pageType: 'MY_ACCOUNT_SIGN_IN_PAGE_TYPE',
      pageTitle: 'Dunelm | My Account - Sign In',
      user: { name: 'Guy Person', email: 'example@domain.com' }
    })
  })
})
