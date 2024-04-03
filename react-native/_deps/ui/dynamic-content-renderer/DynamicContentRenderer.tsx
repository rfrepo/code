import Text from '_deps/text/Text'
import { View } from 'react-native'
import React, { ReactNode } from 'react'
import { compose } from '@reduxjs/toolkit'

type Props = {
  styles: any
  contentString: string
  createMainContainerView?: boolean
}
const HIGHLIGHT_DELIMITER = '<b>'

const getLineBreakRegex = (): RegExp => /(\r\n|\n|\r)/gm

const defaultStyles = { $paragraph: {}, $highlighted: {}, $textContainer: {} }

export const DynamicContentRenderer = ({
  contentString,
  styles = defaultStyles,
  createMainContainerView = true
}: Props) => {
  const { $paragraph, $highlighted, $textContainer } = styles

  const createArrayOfParagraphFromLineBreaks = (contentString: string) =>
    contentString
      .split(getLineBreakRegex())
      .filter(Boolean)
      .filter(str => !getLineBreakRegex().exec(str))

  const createSentenceWithPlainOrHighlightedText = (
    sentence: string,
    parentId: string
  ): React.ReactNode[] =>
    sentence.split(HIGHLIGHT_DELIMITER).map((words, i) => (
      <Text key={`${parentId}-s-${i}`} style={i % 2 ? $highlighted : {}}>
        {words}
      </Text>
    )) as ReactNode[]

  const createParagraphContainers = (paragraphs: string[]) => {
    return paragraphs.map((text, i) => (
      <Text style={$paragraph} key={`p-${i}`}>
        {createSentenceWithPlainOrHighlightedText(text, `p-${i}`)}
      </Text>
    ))
  }

  const createMainContainer = (children: ReactNode[]) => {
    return createMainContainerView ? (
      <View style={$textContainer}>{children}</View>
    ) : (
      <Text>{children}</Text>
    )
  }

  return (
    <>
      {compose(
        createMainContainer,
        createParagraphContainers,
        createArrayOfParagraphFromLineBreaks
      )(contentString)}
    </>
  )
}
