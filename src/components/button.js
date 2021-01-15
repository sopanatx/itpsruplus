import React from "react";
//import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TouchableOpacity } from "react-native";
import { Button as RButton } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { FONT_FAMILY, FONT_BOLD, FONT_THIN, COLORS } from "../styles";
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
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={["#FFDE6A", "#F87E4D", "#F8804D"]}
      style={{
        borderRadius: 9,
        shadowColor: "rgba(245, 44, 80, 0.38)",
        alignSelf: "center",
      }}
    >
      <RButton
        buttonStyle={{
          width: 60,
          height: 35,
          backgroundColor: "transparent",
          alignSelf: "center",

          ...style,
        }}
        title={title}
        titleStyle={{
          fontSize: 24,
          textAlign: "center",
          fontFamily: FONT_BOLD,
          ...titleStyle,
        }}
        disabled={disabled}
        onPress={onPress}
      />
    </LinearGradient>
  );
};
export const RegisterButton = ({
  onPress,
  title,
  style = {},
  disabled,
  titleStyle = {},
  ...props
}) => {
  return (
    <RButton
      buttonStyle={{
        width: 50,
        height: 48,
        borderRadius: 36,
        margin: 10,
        shadowColor: "#E9E9E9",
        //shadowOffset: 1,
        shadowOpacity: 1,
        backgroundColor: COLORS.WHITE,
        alignSelf: "center",

        ...style,
      }}
      title={title}
      titleStyle={{
        fontSize: 18,
        textAlign: "center",
        fontFamily: FONT_THIN,
        color: "black",
        ...titleStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    />
  );
};
