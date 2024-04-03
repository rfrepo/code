import styled from '@emotion/styled'
import {
  md as mediumBreakPoint,
  sm as smallBreakPoint
} from './@dunelm/styling/utils/responsive'
import { theme } from '@dunelm/styling/theme'
import { PadlockIcon } from '@dunelm/core/iconography'

const { sm, xs } = theme.spacers

const { error } = theme.colors

export const MyAccountDetailsHeader = styled.div`
  width: 100%;
  text-align: left;
`

export const MyAccountPadlockIcon = styled(PadlockIcon)<{
  size: string
  fillColor: string
}>`
  margin-right: ${sm};
`

export const MyAccountDetailsTitle = styled.div`
  margin: ${xs} 0 ${sm} ${xs};

  ${mediumBreakPoint(`
    margin: ${xs} 0 ${theme.spacers.md} ${xs};
  `)}
`

export const ErrorText = styled.p`
  color: ${error};
`

export const MyAccountWrapper = styled.div`
  flex: 1;
  padding-top: ${theme.spacers.sm};
  margin-top: ${theme.spacers.sm};
`
export const Input = styled.input`
  height: 48px;
  border-color: ${theme.colors.charcoal};
  margin-bottom: 10px;
`
export const UpdateButton = styled.div`
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

export const FormSection = styled.section`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin-bottom: 0;
  color: ${theme.colors.charcoal};

  &::after,
  &::before {
    display: block;
    margin-bottom: ${sm};
    content: '';
  }

  &::before {
    border-top: 1px solid rgb(231, 231, 231);
    margin-bottom: 24px;
    box-shadow: 0 2px 4px 0 rgba(37, 0, 0, 0.1);
  }

  ${smallBreakPoint(`
    border-bottom: none;
    padding: ${theme.spacers.sm};
    margin-bottom: ${theme.spacers.md};
    border-radius: ${theme.spacers.xxs};
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);

    &:after,
    &:before {
      display: none;
    }
  `)}
`
