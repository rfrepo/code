import React from 'react'
import { Grid } from '@dunelm/core/layout'
import { theme } from '@dunelm/styling/theme'
import { Error } from 'components/email-card-and-form/support/emailFormComponents'

export const ErrorMessage = (
  <Grid.Item>
    <Error data-testid="email-update-error" color={theme.colors.error}>
      Sorry we couldn&apos;t update your address, please try again.
    </Error>
  </Grid.Item>
)
