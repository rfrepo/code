import React, { memo } from 'react'
import type { CSSProperties } from 'react'
import {
  RuleListContainer,
  RuleListItem
} from 'components/password-reset-form/styled'
import { ValidationResults } from 'components/password-reset-form/types'

const style = { fontWeight: 'bold' } as CSSProperties

export const ValidationCheckList = memo(
  ({
    minChars,
    commonChar,
    capitalChar,
    specialCharOrNum
  }: ValidationResults) => (
    <RuleListContainer>
      <RuleListItem isValid={minChars}>8 characters minimum</RuleListItem>

      <RuleListItem isValid={commonChar}>1 lowercase letter</RuleListItem>

      <RuleListItem isValid={capitalChar}>1 capital letter</RuleListItem>

      <RuleListItem isValid={specialCharOrNum}>
        <span>
          1 number <span style={style}>or</span> special character - e.g
          123!@#$&
        </span>
      </RuleListItem>
    </RuleListContainer>
  )
)
