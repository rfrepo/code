import {
  asMock,
  getMocksCallArgByName,
  mockReturnsValue
} from '_deps/shared/test-utils'
import { waitFor, renderHook} from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'
import { useAppContextDispatch } from '_deps/contexts/app-data-context'
import { useSpinPlusTrialOrUpgradeFlow } from '_deps/shared/hooks/subscription/use-spin-plus-trial-or-upgrade-flow/useSpinPlusTrialOrUpgradeFlow'
import { useTrialEligibilityFlow } from '_deps/shared/hooks/subscription/use-trial-eligibility-flow/useTrialEligibilityFlow'

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn().mockReturnValue('return to screen that initiated flow'),
  useNavigation: jest.fn()
}))

jest.mock(
  'src/shared/hooks/subscription/use-trial-eligibility-flow/useTrialEligibilityFlow',
  () => ({
    useTrialEligibilityFlow: jest.fn().mockReturnValue({
      resetTrialEligibilityFlow: jest.fn(),
      executeTrialEligibilityFlow: jest.fn()
    })
  })
)

jest.mock('src/contexts/app-data-context', () => ({
  useAppContextDispatch: jest
    .fn()
    .mockReturnValue({ refreshUser: jest.fn().mockResolvedValue('resolved') })
}))

describe('useSpinPlusTrialOrUpgradeFlow', () => {
  beforeEach(() => {
    mockReturnsValue(useNavigation, {
      goBack: jest.fn(),
      navigate: jest.fn()
    })
  })
  const renderUseSpinPlusTrialOrUpgradeFlow = (
    onFailRouteName?: string,
    onSuccessRouteName?: string
  ) => {
    const { result } = renderHook(() =>
      useSpinPlusTrialOrUpgradeFlow({ onFailRouteName, onSuccessRouteName })
    )
    return result
  }

  const executeSpinPlusTrialOrUpgradeFlow = () => {
    const {
      current: { executeSpinPlusTrialOrUpgradeFlow }
    } = renderUseSpinPlusTrialOrUpgradeFlow()

    executeSpinPlusTrialOrUpgradeFlow()
  }

  const simulateOnEligibleForTrial = () =>
    getMocksCallArgByName(
      useTrialEligibilityFlow().executeTrialEligibilityFlow,
      'onEligibleForTrial'
    )()

  const simulateOnInEligibleForTrial = () =>
    getMocksCallArgByName(
      useTrialEligibilityFlow().executeTrialEligibilityFlow,
      'onInEligibleForTrial'
    )()

  const simulateOnEligibilityUndetermined = () =>
    getMocksCallArgByName(
      useTrialEligibilityFlow().executeTrialEligibilityFlow,
      'onEligibilityUndetermined'
    )()

  it('should provide the trial eligibility hook with callbacks for the various trial eligibility states', () => {
    executeSpinPlusTrialOrUpgradeFlow()

    expect(
      useTrialEligibilityFlow().executeTrialEligibilityFlow
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        onEligibilityUndetermined: expect.any(Function),
        onEligibleForTrial: expect.any(Function),
        onInEligibleForTrial: expect.any(Function)
      })
    )
  })

  it('should determine appropriate behaviour when trial eligibility can not be determined', () => {
    executeSpinPlusTrialOrUpgradeFlow()

    simulateOnEligibilityUndetermined()

    expect(useNavigation().goBack).toHaveBeenCalled()
  })

  it('should determine appropriate behaviour when a user is eligible for a trial', () => {
    executeSpinPlusTrialOrUpgradeFlow()

    simulateOnEligibleForTrial()

    expect(useNavigation().navigate).toHaveBeenCalledWith(
      'SpinPlusFreeTrialModal',
      expect.objectContaining({
        onSkip: expect.any(Function),
        onClose: expect.any(Function),
        onSuccess: expect.any(Function)
      })
    )
  })

  it('should determine appropriate behaviour when a user is not eligible for a trial', () => {
    executeSpinPlusTrialOrUpgradeFlow()

    simulateOnInEligibleForTrial()

    expect(useNavigation().navigate).toHaveBeenCalledWith(
      'UpgradeToSpinPlusModal',
      expect.objectContaining({
        onSkip: expect.any(Function),
        onClose: expect.any(Function),
        onSuccess: expect.any(Function)
      })
    )
  })

  describe('route parameters', () => {
    const resetNavigationAndExecuteCallToActionHandler = (
      callToAction: string
    ) => {
      const mockNavigate = asMock(useNavigation().navigate)

      const handler = getMocksCallArgByName(mockNavigate, callToAction)

      mockNavigate.mockClear()

      handler()
    }

    const assertFlowResetAndRedirectionOccurred = async () =>
      waitFor(() => {
        expect(
          asMock(useTrialEligibilityFlow().resetTrialEligibilityFlow)
        ).toHaveBeenCalled()

        expect(asMock(useNavigation().navigate)).toHaveBeenCalledWith(
          'return to screen that initiated flow'
        )
      })

    it('should handle skipping the trial update', async () => {
      executeSpinPlusTrialOrUpgradeFlow()

      simulateOnEligibleForTrial()

      resetNavigationAndExecuteCallToActionHandler('onSkip')

      await assertFlowResetAndRedirectionOccurred()
    })

    it('should handle skipping the upgrade journey', async () => {
      executeSpinPlusTrialOrUpgradeFlow()

      simulateOnInEligibleForTrial()

      resetNavigationAndExecuteCallToActionHandler('onSkip')

      await assertFlowResetAndRedirectionOccurred()
    })

    it('should handle closing the trial update', async () => {
      executeSpinPlusTrialOrUpgradeFlow()

      simulateOnEligibleForTrial()

      resetNavigationAndExecuteCallToActionHandler('onClose')

      await assertFlowResetAndRedirectionOccurred()
    })

    it('should handle closing the upgrade journey', async () => {
      executeSpinPlusTrialOrUpgradeFlow()

      simulateOnInEligibleForTrial()

      resetNavigationAndExecuteCallToActionHandler('onClose')

      await assertFlowResetAndRedirectionOccurred()
    })

    it('should handle successfully signing up for the trial', async () => {
      executeSpinPlusTrialOrUpgradeFlow()

      simulateOnEligibleForTrial()

      resetNavigationAndExecuteCallToActionHandler('onSuccess')

      await waitFor(() => {
        expect(
          asMock(useTrialEligibilityFlow().resetTrialEligibilityFlow)
        ).toHaveBeenCalled()

        expect(asMock(useNavigation().navigate)).toHaveBeenCalledWith(
          'return to screen that initiated flow'
        )
      })
    })

    it('should handle successfully completing the upgrade journey', async () => {
      executeSpinPlusTrialOrUpgradeFlow()

      simulateOnInEligibleForTrial()

      resetNavigationAndExecuteCallToActionHandler('onSuccess')

      await waitFor(() => {
        expect(asMock(useAppContextDispatch().refreshUser)).toHaveBeenCalled()

        expect(asMock(useNavigation().navigate)).toHaveBeenCalledWith(
          'return to screen that initiated flow'
        )
      })
    })
  })
})
