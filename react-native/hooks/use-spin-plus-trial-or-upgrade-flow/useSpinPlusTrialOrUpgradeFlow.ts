import { useCallback, useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  TrialEligibilityFlowOptions,
  useTrialEligibilityFlow
} from '../use-trial-eligibility-flow/useTrialEligibilityFlow'
import { useAppContextDispatch } from '_deps/contexts/app-data-context'
import { Navigation } from '_deps/@types/Navigation'

type Props = {
  onSkip?: () => void
  onClose?: () => void
  onSuccess?: () => void
  onFailRouteName?: string
  onSuccessRouteName?: string
}

export const useSpinPlusTrialOrUpgradeFlow = ({
  onSkip,
  onClose,
  onSuccess,
  onFailRouteName,
  onSuccessRouteName
}: Props = {}) => {
  const currentRoute = useRoute()

  const navigator = useNavigation<Navigation>()

  const { refreshUser } = useAppContextDispatch()

  const { resetTrialEligibilityFlow, executeTrialEligibilityFlow } =
    useTrialEligibilityFlow()

  const trialEligibilityFlowOptions =
    useMemo<TrialEligibilityFlowOptions>(() => {
      const resetFlowAndRedirect = () => {
        resetTrialEligibilityFlow()

        const route = (onFailRouteName || currentRoute) as string

        navigator.navigate(route)
      }

      const routeParams = {
        onSkip: () => {
          onSkip?.()

          resetFlowAndRedirect()
        },
        onClose: () => {
          onClose?.()

          resetFlowAndRedirect()
        },
        onSuccess: async () => {
          onSuccess?.()

          await refreshUser()

          const route = (onSuccessRouteName || currentRoute) as string

          navigator.navigate(route)
        }
      }

      return {
        onEligibilityUndetermined: navigator.goBack,
        onEligibleForTrial: () => {
          navigator.navigate('SpinPlusFreeTrialModal', routeParams)
        },
        onInEligibleForTrial: () => {
          navigator.navigate('UpgradeToSpinPlusModal', routeParams)
        }
      }
    }, [navigator, resetTrialEligibilityFlow])

  const executeTrialEligibilityFlowWithOptions = useCallback(() => {
    executeTrialEligibilityFlow(trialEligibilityFlowOptions)
  }, [executeTrialEligibilityFlow, trialEligibilityFlowOptions])

  return {
    executeSpinPlusTrialOrUpgradeFlow: executeTrialEligibilityFlowWithOptions
  }
}
