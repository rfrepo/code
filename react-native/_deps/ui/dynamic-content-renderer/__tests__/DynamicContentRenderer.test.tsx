import React from 'react'
import Text from '_deps/text/Text'
import { render } from '@testing-library/react-native'
import { asMock, mockRendersChildren } from '_deps/shared/test-utils'
import { DynamicContentRenderer } from '_deps/ui/dynamic-content-renderer/DynamicContentRenderer'

jest.mock('_deps/text/Text')

describe('DynamicContentRenderer', () => {
  const styles = {
    $paragraph: '$paragraph',
    $highlighted: '$highlighted',
    $textContainer: '$textContainer'
  }

  mockRendersChildren(Text)

  it('should render each paragraph and its container', () => {
    const contentString = `
    paragraph one.
    paragraph two.
    paragraph three.`

    render(
      <DynamicContentRenderer contentString={contentString} styles={styles} />
    )

    expect(Text).toHaveBeenCalledTimes(6)
  })

  it('should render highlighted words', () => {
    asMock(Text).mockClear()

    const contentString = `paragraph <b>one<b>.
    paragraph two.
    paragraph <b>three<b>.`

    render(
      <DynamicContentRenderer contentString={contentString} styles={styles} />
    )

    expect(asMock(Text).mock.calls[2][0].style).toStrictEqual(
      styles.$highlighted
    )

    expect(asMock(Text).mock.calls[8][0].style).toStrictEqual(
      styles.$highlighted
    )
  })
})
