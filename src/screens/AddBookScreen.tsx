import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeAreaView from "../Components/CustomSafeAreaView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SubTitleText from "../Components/CustomTexts/SubTitleText";
import { s, vs } from "react-native-size-matters";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  onCloseModal: () => void;
}

const AddBookScreen = ({ onCloseModal }: Props) => {
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddBookSchema>({
    resolver: yupResolver(AddBookSchema) as Resolver<TAddBookSchema>,
  });

  const onSubmit = (data: TAddBookSchema) => {
    // console.log(data);
    //   navigation.navigate("dashboard", { ...data });
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <AntDesign
        name="close-circle"
        size={35}
        color="#F21014"
        onPress={onCloseModal}
      />
      <SubTitleText fontWeight="700">Book Details</SubTitleText>
      <View style={styles.inputContainer}>
        <CustomInput
          placeHolder="Book Title"
          keyboardType="default"
          inputError={errors.bookTitle}
          control={control}
          name="bookTitle"
        />
        <CustomInput
          placeHolder="Book Author"
          keyboardType="default"
          inputError={errors.bookAuthor}
          control={control}
          name="bookAuthor"
        />
        <CustomInput
          placeHolder="Price"
          keyboardType="numeric"
          inputError={errors.bookPrice}
          control={control}
          name="bookPrice"
        />
        <CustomInput
          placeHolder="Seller Email"
          keyboardType="email-address"
          inputError={errors.sellerEmail}
          control={control}
          name="sellerEmail"
        />

        <View style={styles.buttonContainer}>
          <CustomButton
            bgColor="#25a"
            buttonText="Add Book"
            buttonFn={handleSubmit(onSubmit)}
            iconName={"plus"}
          />
        </View>
      </View>
    </View>
  );
};

export default AddBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: vs(20),
    paddingHorizontal: s(10),
  },
  inputContainer: {
    gap: vs(25),
    width: "100%",
  },
  buttonContainer: {
    height: vs(45),
    width: "100%",
  },
});

export const AddBookSchema = yup.object({
  bookTitle: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  bookAuthor: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  bookPrice: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  sellerEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export type TAddBookSchema = yup.InferType<typeof AddBookSchema>;
