import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  primary?: boolean;
  secondary?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  disabled = false,
  loading = false,
  primary = true,
  secondary = false,
  outline = false,
}) => {
  const getButtonStyle = () => {
    if (outline) {
      return {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: secondary ? COLORS.secondary : COLORS.primary,
      };
    }

    if (secondary) {
      return {
        backgroundColor: COLORS.secondary,
      };
    }

    return {
      backgroundColor: COLORS.primary,
    };
  };

  const getTextStyle = () => {
    if (outline) {
      return {
        color: secondary ? COLORS.secondary : COLORS.primary,
      };
    }

    return {
      color: COLORS.background,
    };
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getButtonStyle(),
        disabled && styles.disabledContainer,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            outline
              ? secondary
                ? COLORS.secondary
                : COLORS.primary
              : COLORS.background
          }
        />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: SIZES.base,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.extraLarge,
    marginVertical: SIZES.base,
  },
  text: {
    fontSize: SIZES.medium,
    ...FONTS.medium,
  },
  disabledContainer: {
    backgroundColor: COLORS.disabled,
    borderColor: COLORS.disabled,
  },
});

export default Button;
