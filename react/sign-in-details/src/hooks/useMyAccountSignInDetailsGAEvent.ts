import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { State } from '@dunelm/store/src/type'
import {
  createPagePath,
  createPageTitle,
  executeDecorators
} from '@dunelm/store/src/middleware/gtm/utils/pageViewUtils'
import { reportPageView } from '@dunelm/tooling/integrations'
import { MY_ACCOUNT_SIGN_IN_PAGE_TYPE } from '@dunelm/store/src/constants'
import {
  createBreadCrumbValue,
  createMyAccountUserData
} from '@dunelm/store/src/middleware/gtm/my-account/utils/myAccountPageViewUtils'

const createPageType = (_: State, pageViewData: object): object => ({
  ...pageViewData,
  pageType: MY_ACCOUNT_SIGN_IN_PAGE_TYPE
})

const createPageViewData = (reduxState: State) =>
  [
    createPageType,
    createPagePath,
    createPageTitle,
    createBreadCrumbValue,
    createMyAccountUserData
  ].reduce(executeDecorators(reduxState), {})

const useMyAccountSignInDetailsGAEvent = (): void => {
  const reduxState: State = useSelector((state: State) => state)

  const pageViewData = createPageViewData(reduxState)

  useEffect(() => reportPageView(pageViewData, reduxState), [])
}

export default useMyAccountSignInDetailsGAEvent
