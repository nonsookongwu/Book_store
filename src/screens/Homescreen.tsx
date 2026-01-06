import { ActivityIndicator, FlatList, Modal, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '../Components/CustomSafeAreaView';
import BookCard from '../Components/BookCard';
import { s, vs } from 'react-native-size-matters';
import TitleText from '../Components/CustomTexts/TitleText';
import useGetBooks from '../hooks/useGetBooks';
import SmallText from '../Components/CustomTexts/SmallText';
import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import RoundButton from '../Components/RoundButton';
import AddBookScreen from './AddBookScreen';

const HomeScreen = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)
//    onlineManager.setEventListener((setOnline) => {
//      const eventSubscription = Network.addNetworkStateListener((state) => {
//        setOnline(!!state.isConnected);
//      });
//      return eventSubscription.remove;
//    });

    const { data, isLoading, error, isError, refetch, isFetching } = useGetBooks();

    const handleToggleModal = () => {
        setIsModalVisible((prev)=> !prev)
    }
    
    // console.log(data)
    

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        {/* <BookCard /> */}
        {isLoading ? (
          <View style={styles.body}>
            <ActivityIndicator />
          </View>
        ) : !isLoading && isError ? (
          <View style={styles.body}>
            <SmallText textColor="#960a0aba">{error.message}</SmallText>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookCard book={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: vs(20),
              gap: vs(15),
              paddingHorizontal: s(5),
            }}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
          />
        )}
      </View>
        <RoundButton onPress={handleToggleModal} />
        <Modal animationType="slide" visible={isModalVisible}>
          <AddBookScreen onCloseModal={handleToggleModal} />
        </Modal>
    </CustomSafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    paddingHorizontal: s(3),
    paddingVertical: vs(10),
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red"
  },
});