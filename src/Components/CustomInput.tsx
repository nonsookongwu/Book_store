import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { ComponentProps, useState } from "react";
import { s, vs } from "react-native-size-matters";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import SmallText from "./CustomTexts/SmallText";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  iconName?: ComponentProps<typeof FontAwesome5>["name"];
  placeHolder: string;
  isPassword?: boolean;
  keyboardType?:
    | "default"
    | "numeric"
    | "email-address"
    | "url"
    | "number-pad"
    | "visible-password";
  inputError: FieldError | undefined;
  control: Control<T>;
  name: Path<T>;
}

const CustomInput = <T extends FieldValues>({
  isPassword,
  iconName,
  placeHolder,
  keyboardType = "default",
  inputError, control, name
}: Props<T>) => {
  const [togglePassword, setTogglePassword] = useState(isPassword);

  const handleTogglePassword = () => {
    setTogglePassword((prev) => !prev);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {iconName && (
          <FontAwesome5 name={iconName} size={s(20)} color="#A8A8A9" />
        )}
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              placeholder={placeHolder}
              style={styles.input}
              keyboardType={keyboardType}
              secureTextEntry={togglePassword}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
            />
          )}
        />

        {isPassword && togglePassword && (
          <Ionicons
            name="eye-outline"
            size={s(20)}
            color="#A8A8A9"
            onPress={handleTogglePassword}
          />
        )}
        {isPassword && !togglePassword && (
          <Ionicons
            name="eye-off-outline"
            size={s(20)}
            color="#A8A8A9"
            onPress={handleTogglePassword}
          />
        )}
      </View>
      {inputError && (
        <View style={styles.ErrorText}>
          <SmallText textColor="#F83758">{inputError.message}</SmallText>
        </View>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    gap: vs(2),
    // borderWidth: s(1),
    // borderColor: "tomato",
  },
  container: {
    width: "100%",
    height: vs(45),
    borderWidth: s(1),
    borderColor: "#A8A8A9",
    flexDirection: "row",
    borderRadius: s(8),
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    paddingHorizontal: s(10),
  },
  input: {
    height: "100%",
    flex: 1,
    paddingHorizontal: s(10),
  },
  ErrorText: {
    paddingHorizontal: s(10),
  },
});
