import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { s, vs } from "react-native-size-matters";
import SmallText from "./CustomTexts/SmallText";
import SubTitleText from "./CustomTexts/SubTitleText";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Books, useDeleteBooks } from "../hooks/useGetBooks";
import { capitalizeFirstLetter, formatAmount } from "../utils/helperFunctions";

interface Props {
  book: Books;
}

const BookCard = ({ book }: Props) => {

  const { mutate, isPending } = useDeleteBooks({ book })
  
  const handleMutate = () => {
    mutate(book.bookTitle)
  }
  
  const handleOpenAlert = () => {
    Alert.alert(
      "Deleting Book",
      `Are you sure you want to delete ${book.bookTitle} ?`,
      [
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: handleMutate },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `${book.bookCover}`,
        }}
      />

      <View style={styles.detailsContainer}>
        <View style={styles.topWrapper}>
          <View style={styles.textContainer}>
            <SubTitleText fontWeight="700">{`${capitalizeFirstLetter(book.bookTitle)}`}</SubTitleText>
            <SmallText textColor="#888">{`by ${book.name_of_author}`}</SmallText>
            <SubTitleText textColor="#25a" fontWeight="700">
              {`${formatAmount(+book.bookPrice)}`}
            </SubTitleText>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="edit-3" size={20} color="#25a" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleOpenAlert}
              style={styles.iconButton}
            >
              <MaterialIcons name="delete-outline" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <SmallText>{`${book.sellerEmail}`}</SmallText>
      </View>
    </View>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: s(10),
    padding: s(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    gap: s(10),
  },
  image: {
    height: vs(100),
    width: "25%",
    borderRadius: s(8),
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",

    // backgroundColor: "red"
  },
  topWrapper: {
    // flexDirection: "row",
    width: "100%",
    // alignItems: "flex-end"
  },
  textContainer: {
    gap: s(2),
    // backgroundColor: "red"
  },
  iconContainer: {
    gap: s(5),
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  iconButton: {
    height: 35,
    width: 35,
    borderRadius: s(20),
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
});
