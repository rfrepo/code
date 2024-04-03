import React from 'react'
import { styles } from 'src/screens/withdraw-funds-from-fold-card/sub-components/manually-link-bank/content-container/styles'
import GradientView, {
  GradientTypes
} from 'src/components-lib/components/gradient-view'
import { RoutingAccountNumbers } from 'src/screens/withdraw-funds-from-fold-card/sub-components/manually-link-bank/routing-account-numbers/RoutingAccountNumbers'

const { $container } = styles

export const ContentContainer = ({ children }) => {
  return (
    <GradientView
      gradientType={GradientTypes.PREMIUM_HOME_BACKGROUND}
      style={$container}
    >
      {children}

      <RoutingAccountNumbers />
    </GradientView>
  )
}
