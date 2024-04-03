import conf from '_deps/config'
import Text from '_deps/text/Text'
import React, { useMemo } from 'react'
import Modal from '_deps/ui/Modal/Modal'
import { Linking, View } from 'react-native'
import { Close, CloseIconColor } from '_deps/ui/Close/Close'
import { styles } from 'my-spin-squad/squad-stats/sub-component/modal/styles'

type Props = {
  onClose: () => void
}

const { $heading, $getContainerStyles, $closeButton, $paragraph, $link } =
  styles

export const SpinSquadInfoModal = ({ onClose }: Props): JSX.Element => {
  const { spinSquadFAQsUrl } = conf

  const faqsLinkHandler = () => Linking.openURL(spinSquadFAQsUrl)

  const $container = useMemo(() => $getContainerStyles(12), [10])

  return (
    <Modal>
      <View style={$container}>
        <Close
          onPress={onClose}
          color={CloseIconColor.Grey}
          containerStyle={$closeButton}
        />

        <Text style={$heading}>More about your Spin Squad</Text>

        <Text style={$paragraph}>
          Your Spin Squad shows both referred users and referred cardholders. A
          &quot;user&quot; is someone who downloads Fold and creates an account.
          A &quot;cardholder&quot; is a someone who completes signing up for the
          Fold Card.
        </Text>

        <Text style={$paragraph}>
          &quot;Total sats earned&quot; shows all rewards earned from Spin Squad
          Qualifying Purchases. This number does not include rewards earned from
          referral bonuses.
        </Text>

        <Text style={$paragraph}>
          For more information, see our&nbsp;
          <Text style={$link} onPress={faqsLinkHandler}>
            Spin Squad FAQs
          </Text>
        </Text>
      </View>
    </Modal>
  )
}
