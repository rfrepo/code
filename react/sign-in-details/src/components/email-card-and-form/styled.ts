import styled from '@emotion/styled'
import { theme } from '@dunelm/styling/theme'
import { sm as smallBreakPoint } from '@dunelm/styling/utils/responsive'
import { FormikErrors } from 'formik'

const { xs, xxs, sm } = theme.spacers

export const CardHeading = styled.h3`
  margin-bottom: ${xs};
  font-size: 20px;
  line-height: 1.2;
`

export const FormContainer = styled.form`
  margin-top: ${sm};
`

export const TextInputWrapper = styled.div`
  width: 100%;
  margin-bottom: ${xxs};

  & div[class*='InfoText--TextInput-warningBorder'] {
    top: 48px;
  }
`

export const EmailInput = styled.input<{
  infoText: string
  labelText: string
  uniqueInputId: string
  status: 'error' | 'success' | 'default'
}>`
  height: 48px;
  border-color: ${theme.colors.charcoal};
  margin-bottom: 10px;
`
export const EditButton = styled.div`
  position: absolute;
  right: -5px;

  ${smallBreakPoint(`
    right: ${xs};
  `)}
`

export const EmailActionsWrapper = styled.div`
  display: block;
  min-height: 115px;

  ${smallBreakPoint(`
    min-height: 0;
    display: inline-flex;
  `)}
`

export const CancelButton = styled.div<{
  size: string
  buttonStyle: string
  typeAttribute: string
}>`
  position: relative;
  width: 100%;
  margin-top: ${sm};

  ${smallBreakPoint(`
    right: 0;
    bottom: 0;
    width: 73px;
    min-width: 73px;
    min-height: 32px;
    position: absolute;
  `)}
`

export const UpdateEmailButton = styled.div<{
  size: string
  type: string
  isLoading: boolean
  buttonStyle: string
  isDisabled:
    | string
    | number
    | boolean
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
  typeAttribute: string
}>`
  width: 100%;
  height: 48px;
  margin: 0;
  border-radius: 4px;

  ${smallBreakPoint(`
    margin: 0;
    height: 48px;
    width: 275px;
    min-width: 275px;
  `)}
`
