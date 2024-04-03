import React from 'react'
import styled from '@emotion/styled'
import { ErrorText } from '../../styled'
import { theme } from '../../@dunelm/styling/theme'
import { CapsLock, Tick } from '@dunelm/core/iconography'

const { xs, xxs, sm, halfmd } = theme.spacers

const { charcoal, dunelmGreen, disabled } = theme.colors

export const FormContainer = styled.form`
  margin-top: ${sm};
`

export const TextInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${xxs};

  & input[value=''] {
    border-color: ${disabled};
  }

  & input:focus + label {
    top: 3px;
  }

  & label {
    top: 18px;
  }

  & input::-ms-reveal,
  & input::-ms-clear {
    display: none !important;
  }
`
export const CapsLockIcon = styled(CapsLock)`
  position: absolute;
  right: ${xs};
`

export const InputIconsWrapper = styled.div`
  position: absolute;
  top: ${sm};
  right: ${halfmd};
  display: inline-block;

  & > button {
    border: none;
    background: none;
  }
`
export const RuleListContainer = styled.ul`
  padding: 0;
  border-bottom: 1px solid $greyMid;
  margin: -2px 0 ${sm} 0;
  font-weight: lighter;
  list-style: none;
  text-align: left;
`
export const RuleListItem = styled.li<{ isValid: boolean }>`
  position: relative;
  display: flex;
  padding: 0;
  margin: ${xs} 0;

  &::before {
    position: relative;
    z-index: 2;
    top: 6px;
    left: 6px;
    display: inline-block;
    width: 4px;
    height: 8px;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    margin-right: 20px;
    content: '';
    transform: rotate(45deg);
  }

  &::after {
    position: absolute;
    z-index: 1;
    top: 3px;
    left: 0;
    display: block;
    width: ${sm};
    height: ${sm};
    background: ${props => (props.isValid ? dunelmGreen : charcoal)};
    border-radius: 100px;
    content: '';
    transition: background 0.4s;
  }
`

export const SuccessMessageContainer = styled.div`
  flex: 1;
  padding-top: ${theme.spacers.sm};
`

export const SuccessMessage = (
  <SuccessMessageContainer>
    <Tick
      size="sm"
      fillColor={dunelmGreen}
      data-testid="update-password-success-icon"
    />

    <span>&nbsp; Password updated successfully</span>
  </SuccessMessageContainer>
)

export const ErrorMessage = (
  <ErrorText>
    Sorry we couldn’t update your password, please try again.
  </ErrorText>
)

export const errorExceededChars = (
  <ErrorText>You cannot exceed 72 characters</ErrorText>
)
