import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ComponentProps } from "react";
import SubTitleText from "./CustomTexts/SubTitleText";
import { s, vs } from "react-native-size-matters";
import SmallText from "./CustomTexts/SmallText";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

interface Props {
  bgColor: string;
  buttonText: string;
  buttonFn?: () => void;
  loading?: boolean;
  iconName?: ComponentProps<typeof FontAwesome5>["name"];
}

const CustomButton = ({
  bgColor,
  buttonText,
  buttonFn,
  loading,
  iconName,
}: Props) => {

const isValidFA5 = (name: string) => {
  return FontAwesome5.getRawGlyphMap()[name] !== undefined;
};

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      onPress={buttonFn}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.iconText}>
          {iconName && isValidFA5(iconName) ? (
            <FontAwesome5 name={iconName} size={s(20)} color="#fff" />
          ) : (
            iconName &&
            !isValidFA5(iconName) && (
              <AntDesign name={iconName} size={s(20)} color="#fff" />
            )
          )}
          <SmallText textColor="#fff" fontWeight="700">
            {buttonText}
          </SmallText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#75563B",
    borderRadius: s(8),
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    flexDirection: "row",
    gap: s(8),
    justifyContent: "center",
    alignItems: "center"
  },
});
