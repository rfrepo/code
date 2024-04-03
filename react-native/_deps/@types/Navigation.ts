export type Navigation = {
  navigate: (route: string, params?: Record<string, unknown>) => void
  goBack: () => void
  reset: (state: unknown) => void
  setOptions: (options: Record<string, unknown>) => void
  dispatch: (action: unknown) => void
  canGoBack: () => boolean
  dangerouslyGetParent: () => unknown
  dangerouslyGetState: () => unknown
  dangerouslyGetScreenProps: () => unknown
  addListener: (type: string, callback: () => void) => void
  removeListener: (type: string, callback: () => void) => void
  isFocused: () => boolean
  push: (route: string, params?: Record<string, unknown>) => void
  replace: (route: string, params?: Record<string, unknown>) => void
  pop: () => void
  popToTop: () => void
}
