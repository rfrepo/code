export const createBreadCrumbValue = (reduxState: any, pageViewData: any) => {
  const { breadCrumbValue } = reduxState

  return {
    ...pageViewData,
    breadCrumbValue
  }
}
export const createMyAccountUserData = (reduxState: any, pageViewData: any) => {
  const { user } = reduxState

  return {
    ...pageViewData,
    user
  }
}
