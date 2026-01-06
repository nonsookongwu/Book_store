import { StyleSheet, Text, View } from "react-native";
import React, { Children, ReactNode } from "react";
import { s } from "react-native-size-matters";

interface Props {
  textColor?: string;
  children: ReactNode;
  fontWeight?: "400" | "500" | "600" | "700";
  letterSpacing?: number;
  textAlign?: "left" | "right" | "center";
  lineHeight?: number;
}

const SectionTitleText = ({
  textColor,
  children,
  fontWeight,
  letterSpacing,
  textAlign,
  lineHeight,
}: Props) => {
  return (
    <Text
      style={[
        styles.socialMediaSubTitleText,
        { color: textColor, fontWeight, letterSpacing, textAlign, lineHeight },
      ]}
    >
      {children}
    </Text>
  );
};

export default SectionTitleText;

const styles = StyleSheet.create({
  socialMediaSubTitleText: {
    fontWeight: 600,
    fontSize: s(18),
    lineHeight: s(24),
    color: "#000000",
  },
});
