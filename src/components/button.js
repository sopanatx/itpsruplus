import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button as RButton} from 'react-native-elements';

export const PrimaryButton = ({
  onPress,
  title,
  style = {},
  disabled,
  titleStyle = {},
  ...props
}) => {
  return (
    <LinearGradient
      colors={['#F87E4D', '#FF6A73']}
      style={{
        borderRadius: 9,
        shadowColor: 'rgba(245, 44, 80, 0.38)',
        alignSelf: 'center',
      }}>
      <RButton
        buttonStyle={{
          width: 293,
          height: 67,
          backgroundColor: 'transparent',
          alignSelf: 'center',
          ...style,
        }}
        title={title}
        titleStyle={{
          fontSize: 30,
          textAlign: 'center',
          fontFamily: 'DBHelvethaicaX-Bd',
          ...titleStyle,
        }}
        disabled={false}
        onPress={onPress}
      />
    </LinearGradient>
  );
};
