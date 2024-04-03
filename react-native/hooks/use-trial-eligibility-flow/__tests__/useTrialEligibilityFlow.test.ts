import { renderHook } from '@testing-library/react-hooks'
import { useSubscriptionDataAvailability } from '_deps/shared/hooks/use-subscription-data-availability/useSubscriptionDataAvailability'
import { selectIsEligibleForTrial } from '_deps/redux/global-slices/subscription/subscriptionSelectors'

import {
  TrialEligibilityFlowOptions,
  useTrialEligibilityFlow
} from '_deps/shared/hooks/subscription/use-trial-eligibility-flow/useTrialEligibilityFlow'
import { act } from '@testing-library/react-hooks/native'
import { asMock, mockReturnsValue } from '_deps/shared/test-utils'

jest.mock(
  'src/shared/hooks/use-subscription-data-availability/useSubscriptionDataAvailability',
  () => ({
    useSubscriptionDataAvailability: jest.fn().mockReturnValue({
      getSubscriptionData: jest.fn(),
      isSubscriptionDataRetrievalFailed: {}
    })
  })
)

jest.mock('src/redux/hooks')

jest.mock('src/redux/global-slices/subscription/subscriptionSelectors', () => ({
  selectIsEligibleForTrial: jest.fn()
}))

describe('useTrialEligibilityFlow', () => {
  let trialEligibilityFlowOptions: TrialEligibilityFlowOptions

  beforeEach(() => {
    trialEligibilityFlowOptions = {
      onEligibleForTrial: jest.fn(),
      onInEligibleForTrial: jest.fn()
    }

    asMock(useSubscriptionDataAvailability().getSubscriptionData).mockClear()
  })

  const renderUseTrialEligibilityFlow = () =>
    renderHook(useTrialEligibilityFlow)

  it('should retrieve the subscription data once', async () => {
    const { result, waitFor } = renderUseTrialEligibilityFlow()

    act(() => {
      result.current.executeTrialEligibilityFlow(trialEligibilityFlowOptions)
    })

    await waitFor(() => {
      expect(
        useSubscriptionDataAvailability().getSubscriptionData
      ).toHaveBeenCalled()
    })
  })

  it('should enable retrieving the subscription data again', async () => {
    const { result, waitFor } = renderUseTrialEligibilityFlow()

    act(() => {
      result.current.executeTrialEligibilityFlow(trialEligibilityFlowOptions)
    })

    await waitFor(() => {
      expect(
        asMock(useSubscriptionDataAvailability().getSubscriptionData)
      ).toHaveBeenCalledTimes(1)
    })

    act(() => {
      result.current.resetTrialEligibilityFlow()
    })

    act(() => {
      result.current.executeTrialEligibilityFlow(trialEligibilityFlowOptions)
    })

    await waitFor(() => {
      expect(
        useSubscriptionDataAvailability().getSubscriptionData
      ).toHaveBeenCalledTimes(2)
    })
  })

  it('should call the set configuration callback when eligible for the spin + trial', async () => {
    const { result, waitFor } = renderUseTrialEligibilityFlow()

    mockReturnsValue(selectIsEligibleForTrial, true)

    act(() => {
      result.current.executeTrialEligibilityFlow(trialEligibilityFlowOptions)
    })

    await waitFor(() => {
      expect(
        trialEligibilityFlowOptions.onEligibleForTrial
      ).toHaveBeenCalledTimes(1)
    })
  })

  it('should call the set configuration callback when ineligible for the spin + trial', async () => {
    const { result, waitFor } = renderUseTrialEligibilityFlow()

    mockReturnsValue(selectIsEligibleForTrial, false)

    act(() => {
      result.current.executeTrialEligibilityFlow(trialEligibilityFlowOptions)
    })

    await waitFor(() => {
      expect(
        trialEligibilityFlowOptions.onInEligibleForTrial
      ).toHaveBeenCalledTimes(1)
    })
  })

  it('should invoke onInEligibleForTrial only once', async () => {
    const { result, waitFor, rerender } = renderUseTrialEligibilityFlow()

    mockReturnsValue(selectIsEligibleForTrial, false)

    act(() => {
      result.current.executeTrialEligibilityFlow(trialEligibilityFlowOptions)
    })

    mockReturnsValue(selectIsEligibleForTrial, true)

    rerender()

    mockReturnsValue(selectIsEligibleForTrial, false)

    rerender()

    await waitFor(() => {
      expect(
        trialEligibilityFlowOptions.onEligibleForTrial
      ).not.toHaveBeenCalled()

      expect(
        trialEligibilityFlowOptions.onInEligibleForTrial
      ).toHaveBeenCalledTimes(1)
    })
  })

  it('should allow the set configuration callbacks to be called once again after resetting', async () => {
    const { result, waitFor, rerender } = renderUseTrialEligibilityFlow()

    mockReturnsValue(selectIsEligibleForTrial, false)

    act(() => {
      result.current.executeTrialEligibilityFlow(trialEligibilityFlowOptions)
    })

    mockReturnsValue(selectIsEligibleForTrial, true)

    rerender()

    act(() => {
      result.current.resetTrialEligibilityFlow()
      result.current.executeTrialEligibilityFlow(trialEligibilityFlowOptions)
    })

    mockReturnsValue(selectIsEligibleForTrial, false)

    rerender()

    await waitFor(() => {
      expect(
        trialEligibilityFlowOptions.onEligibleForTrial
      ).not.toHaveBeenCalled()

      expect(
        trialEligibilityFlowOptions.onInEligibleForTrial
      ).toHaveBeenCalledTimes(2)
    })
  })
})
