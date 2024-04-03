import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import Text from 'src/components-lib/components/text/Text';

type Props = {}

const { $container, $text } = styles;

export const Loader = ({}: Props) => {

  return (
    <div style={$container}>
      <Text style={$text}></Text>
    </div>
  );
};
