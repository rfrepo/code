import React from 'react'
import { styles } from './styles'
import Text from 'src/components-lib/components/text/Text'
import { DisplayModal } from 'src/components-lib/components/display-modal/DisplayModal'

type Props = {
  error: string
  handleCloseModal: () => void
}

const { $titleText, $infoText } = styles

export const ErrorModal = ({ error, handleCloseModal }: Props) => {
  return error ? (
    <DisplayModal visible={true} handleClose={handleCloseModal}>
      <Text style={$titleText}>Something went wrong</Text>

      <Text style={$infoText}>{error}</Text>
    </DisplayModal>
  ) : null
}
