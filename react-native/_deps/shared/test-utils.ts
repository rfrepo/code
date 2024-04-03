import React, { ReactNode } from 'react'

export const asMock = (fn: unknown) => fn as jest.Mock<typeof fn>

export const rendersChildren = ({ children }: { children: ReactNode[] }) =>
  React.createElement('View', {}, children)

export const mockRendersChildren = (component: unknown) =>
  asMock(component).mockImplementation(rendersChildren)

export const mockReturnsValue = (component: unknown, value: unknown) =>
  asMock(component).mockReturnValue(value)

export const mockResolves = (component: unknown, value: never) =>
  asMock(component).mockResolvedValue(value)

export const createPromiseStub = () => ({
  then: jest.fn().mockReturnThis(),
  catch: jest.fn()
})

export const getMocksLatestCallArgs = (mockFn: unknown) => {
  const mockCalls = asMock(mockFn).mock.calls

  return mockCalls[mockCalls.length - 1]
}

export const getMocksCallArgByName = (mockFn: unknown, propName: string) => {
  let propFound

  const callArgs = getMocksLatestCallArgs(mockFn)

  for (const arg of callArgs) {
    if (typeof arg === 'object' && arg.hasOwnProperty(propName)) {
      propFound = arg[propName]

      break
    }
  }

  return propFound
}
