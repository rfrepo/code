import { useMutation } from '@apollo/client'
import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import useUpdateCustomerPassword from 'components/password-reset-form/hooks/use-update-customer-password/useUpdateCustomerPassword'

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn()
}))

jest.mock('graphql', () => ({
  UPDATE_PASSWORD: 'UPDATE_PASSWORD'
}))

describe('useUpdateCustomerPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const useMutationMock = useMutation as jest.Mock

  it('should successfully update password', async () => {
    const mockUpdate = jest.fn().mockResolvedValue({ data: {} })

    useMutationMock.mockReturnValue([
      mockUpdate,
      { loading: false, error: null }
    ])

    const { result } = renderHook(() => useUpdateCustomerPassword())

    result.current.updatePassword('newPassword')

    await waitFor(() => {
      expect(result.current.passwordSuccessfullyUpdated).toBe(false)
    })

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({
        variables: {
          input: {
            password: 'newPassword'
          }
        }
      })

      expect(result.current.passwordSuccessfullyUpdated).toBe(true)
    })
  })
})
