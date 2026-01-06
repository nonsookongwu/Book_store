import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from "@expo/vector-icons/AntDesign";
import { s, vs } from 'react-native-size-matters';

interface Props{
    onPress: () => void;
}

const RoundButton = ({onPress}:Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AntDesign name="plus" size={30} color="#fff" />
    </TouchableOpacity>
  );
}

export default RoundButton

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: 70,
        borderRadius: s(35),
        backgroundColor: "#25a",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: vs(20),
        // marginTop: vs(5)
    }
})