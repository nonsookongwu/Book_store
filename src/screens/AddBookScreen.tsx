import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeAreaView from "../Components/CustomSafeAreaView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SubTitleText from "../Components/CustomTexts/SubTitleText";
import { s, vs } from "react-native-size-matters";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import { Resolver, useForm, Watch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Books, useAddBook, useEditBook } from "../hooks/useGetBooks";

interface Props {
  onCloseModal: () => void;
  selectedBook: Books | undefined;
}

const AddBookScreen = ({ onCloseModal, selectedBook }: Props) => {
  const insets = useSafeAreaInsets();
  const { mutate } = useAddBook();
  const { mutate: editBook } = useEditBook();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddBookSchema>({
    resolver: yupResolver(AddBookSchema) as Resolver<TAddBookSchema>,
    defaultValues: {
      bookAuthor: selectedBook?.name_of_author || "",
      bookPrice: selectedBook?.bookPrice || "",
      bookTitle: selectedBook?.bookTitle || "",
      coverURL: selectedBook?.bookCover || "",
      sellerEmail: selectedBook?.sellerEmail|| ""
    },
  });

  const watchedPrice = watch("bookPrice");

  const onSubmit = (data: TAddBookSchema) => {
    // console.log(selectedBook);
    if (selectedBook) {
      editBook({
        bookTitle: data.bookTitle,
        onCloseModal: onCloseModal,
        newBook: {
          bookCover: data.coverURL,
          bookPrice: data.bookPrice,
          bookTitle: data.bookTitle,
          name_of_author: data.bookAuthor,
          sellerEmail: data.sellerEmail,
          id: selectedBook.id,
          createdAt: selectedBook.createdAt,
        },
      });
    } else {
      mutate({
        bookTitle: data.bookTitle,
        onCloseModal: onCloseModal,
        newBook: {
          bookCover: data.coverURL,
          bookPrice: data.bookPrice,
          bookTitle: data.bookTitle,
          name_of_author: data.bookAuthor,
          sellerEmail: data.sellerEmail,
          id: `temp-${Date.now()}`,
          createdAt: new Date().toISOString(),
        },
      });
    }
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

      <KeyboardAwareScrollView
        contentContainerStyle={{
          gap: vs(25),
          width: "100%",
          paddingHorizontal: s(5),
          paddingVertical: vs(5),
        }}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
          watchedAmount={watchedPrice}
        />
        <CustomInput
          placeHolder="Seller Email"
          keyboardType="email-address"
          inputError={errors.sellerEmail}
          control={control}
          name="sellerEmail"
        />

        <CustomInput
          placeHolder="Cover Image"
          keyboardType="url"
          inputError={errors.coverURL}
          control={control}
          name="coverURL"
        />

        <View style={styles.buttonContainer}>
          <CustomButton
            bgColor="#25a"
            buttonText="Add Book"
            buttonFn={handleSubmit(onSubmit)}
            iconName={"plus"}
          />
        </View>
      </KeyboardAwareScrollView>
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
    // width: 350,
    // width: "100%",
    height: vs(45),
  },
});

export const AddBookSchema = yup.object({
  bookTitle: yup.string().required("Book title is required"),

  bookAuthor: yup.string().required("Book author is required"),

  bookPrice: yup
    .string()
    .test("not-zero", "Amount cannot be zero", (value) => {
      if (value !== "0") return true; // Let `.required()` handle empty
      const numericValue = parseFloat(value);
      return numericValue !== 0;
    })
    .required("This field is required"),

  sellerEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  coverURL: yup
    .string()
    .url("Enter a valid URL")
    .required("Cover image is required"),
});

export type TAddBookSchema = yup.InferType<typeof AddBookSchema>;

//alternative to using the KeyboardAwareScrollView
{
  /* <KeyboardAvoidingView
  style={{ flex: 1, width: "100%" }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView
      contentContainerStyle={{
        gap: vs(25),
        paddingHorizontal: s(5),
        paddingVertical: vs(5),
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
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
        watchedAmount={watchedPrice}
      />
      <CustomInput
        placeHolder="Seller Email"
        keyboardType="email-address"
        inputError={errors.sellerEmail}
        control={control}
        name="sellerEmail"
      />

      <CustomInput
        placeHolder="Cover Image"
        keyboardType="default"
        inputError={errors.coverURL}
        control={control}
        name="coverURL"
      />

      <View style={styles.buttonContainer}>
        <CustomButton
          bgColor="#25a"
          buttonText="Add Book"
          buttonFn={handleSubmit(onSubmit)}
          iconName={"plus"}
        />
      </View>
    </ScrollView>
  </TouchableWithoutFeedback>
</KeyboardAvoidingView>; */
}
{
  /* <View style={styles.inputContainer}>
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
          watchedAmount={watchedPrice}
        />
        <CustomInput
          placeHolder="Seller Email"
          keyboardType="email-address"
          inputError={errors.sellerEmail}
          control={control}
          name="sellerEmail"
        />

        <CustomInput
          placeHolder="Cover Image"
          keyboardType="default"
          inputError={errors.coverURL}
          control={control}
          name="coverURL"
        />

        <View style={styles.buttonContainer}>
          <CustomButton
            bgColor="#25a"
            buttonText="Add Book"
            buttonFn={handleSubmit(onSubmit)}
            iconName={"plus"}
          />
        </View>
      </View> */
}
