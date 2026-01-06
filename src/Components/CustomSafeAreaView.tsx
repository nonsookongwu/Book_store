import { StyleSheet, useColorScheme} from "react-native";
import React, { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from "expo-status-bar";



const CustomSafeAreaView = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  // console.log(colorScheme)
   const isDark = colorScheme === "dark";
  return (
    <>
      {/* <StatusBar barStyle={isDark ? "light-content" : "dark-content"} /> from react native */} 
      <StatusBar style={isDark ? "light" : "dark"} />
      <SafeAreaView
        edges={["top"]}
        style={[
          styles.container,
          { backgroundColor: isDark ? "#000" : "#fff" },
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  );
}

export default CustomSafeAreaView

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        // backgroundColor: "transparent"
      }
})