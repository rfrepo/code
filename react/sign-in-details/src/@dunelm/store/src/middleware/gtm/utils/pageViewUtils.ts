export const createPageTitle = (reduxState: any, pageViewData: any) => ({
  ...pageViewData,
  pageTitle: 'Dunelm | ' + reduxState.pageTitle
})
export const createPagePath = (reduxState: any, pageViewData: any) => ({
  ...pageViewData,
  pagePath: reduxState.pagePath
})

export const executeDecorators =
  (reduxState: any) => (pageViewData: any, decorator: any) =>
    decorator(reduxState, pageViewData)
