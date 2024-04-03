import { useAppSelector } from '_deps/redux/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { selectIsEligibleForTrial } from '_deps/redux/global-slices/subscription/subscriptionSelectors'
import { useSubscriptionDataAvailability } from '_deps/shared/hooks/use-subscription-data-availability/useSubscriptionDataAvailability'

export type TrialEligibilityFlowOptions = {
  onEligibleForTrial: () => void
  onInEligibleForTrial: () => void
  onEligibilityUndetermined?: () => void
}

export const useTrialEligibilityFlow = () => {
  const isDone = useRef(false)

  const [isInitialised, setIsInitialised] = useState(false)

  const { getSubscriptionData, isSubscriptionDataRetrievalFailed } =
    useSubscriptionDataAvailability()

  const [trialEligibilityFlowOptions, setTrialEligibilityFlowOptions] =
    useState<TrialEligibilityFlowOptions | undefined>()

  const isEligibleForTrial = useAppSelector(selectIsEligibleForTrial)

  const initialise = useCallback((options: TrialEligibilityFlowOptions) => {
    setTrialEligibilityFlowOptions(options)
    setIsInitialised(true)
  }, [])

  const reset = useCallback(() => {
    isDone.current = false

    setIsInitialised(false)
  }, [])

  const {
    onEligibleForTrial,
    onInEligibleForTrial,
    onEligibilityUndetermined
  } = trialEligibilityFlowOptions || {}

  useEffect(() => {
    if (isInitialised === isDone.current) return
    getSubscriptionData()
  }, [getSubscriptionData, isInitialised])

  useEffect(() => {
    if (isDone.current || !isInitialised || isEligibleForTrial === undefined)
      return

    if (isEligibleForTrial) onEligibleForTrial?.()
    else onInEligibleForTrial?.()

    isDone.current = true
  }, [isEligibleForTrial, isInitialised])

  useEffect(() => {
    if (!(!isInitialised && isSubscriptionDataRetrievalFailed)) return

    if (onEligibilityUndetermined) onEligibilityUndetermined?.()
    else onInEligibleForTrial?.()
  }, [
    onInEligibleForTrial,
    onEligibilityUndetermined,
    isSubscriptionDataRetrievalFailed
  ])

  return {
    resetTrialEligibilityFlow: reset,
    executeTrialEligibilityFlow: initialise
  }
}
