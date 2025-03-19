import { Alert, Text, Linking, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { Header } from "../../home/components/Header";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { ChatFooter } from "../components/ChatFooter";
import { MessageComp } from "../components/MessageComp";
import FontFamilty from "../../../../constants/FontFamilty";

export const Chat = ({ navigation }) => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 2,
      message:
        "Hello Asim, we are really sorry for the trouble just give me 2 minutes, I am having a look",
      sender: 1,
    },
    {
      id: 1,
      message:
        "Hello I am having an issue regarding the service booking of PEST CONTROL",
      sender: 0,
    },
  ]);

  const sendMessage = (newMessage) => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    setMessages((prevMessages) => [
      {
        id: prevMessages.length + 1, // Assign a new unique ID
        message: newMessage,
        sender: 0, // Sender is 0
      },
      ...prevMessages, // Keep previous messages
    ]);
  };

  const openWhatsApp = () => {
    let phoneNumber = '+971509819899'; // WhatsApp number
    let url = `https://wa.me/${phoneNumber}`; // WhatsApp URL scheme

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'WhatsApp is not installed on this device');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  return (
    <View style={styles.container}>
      <Header
        heading={"Almaanzel Chat Support"}
        navigation={navigation}
        profile={SampleImages.user}
      />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity onPress={openWhatsApp} style={{ backgroundColor:AppColors.green, borderRadius: 16, margin: 16, padding: 16, width: '50%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: AppColors.white, fontFamily: FontFamilty.medium }}>Chat on Whatsapp</Text>
        </TouchableOpacity>
      </View>

      {/* <FlatList
        data={messages}
        inverted
        removeClippedSubviews={false} // <- Add This
        ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item, index }) => <MessageComp item={item} />}
        style={{ flex: 1, backgroundColor: AppColors.white }}
      />
      <ChatFooter
        sendMessage={sendMessage}
        text={message}
        setText={setMessage}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    rowGap: 16,
  },
});
