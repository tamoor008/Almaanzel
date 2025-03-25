import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useEffect, useRef, useState } from "react";
import { Description } from "../components/Description";
import FontFamilty from "../../../../constants/FontFamilty";
import { CustomLargeTextInput } from "../../../../components/CustomLargeTextInput";

export const EmergencyCall = ({  item, setPrice, updateServiceDetails }) => {
  const scrollViewRef = useRef(null);

  const [issue, setIssue] = useState("");
  
  const helpUpdate=(text)=>{
    updateServiceDetails("addon", [text]);
    setIssue(text)
  }

  useEffect(()=>{
  })

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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 16 }}
        ref={scrollViewRef}>
        <Image
          resizeMode="stretch"
          style={{ height: 249, width: "100%" }}
          source={item.img}
        />
        <Description
          description={
            "With this service you are going to get the expert Fixer of your requirement within 15 minutes."
          }
        />

        <View style={{ paddingHorizontal: 16, rowGap: 16 }}>
          <Text style={styles.headingText}>
            {"Just Tell us about what kind of help you need (2-3 lines)"}
          </Text>
          <CustomLargeTextInput
            placeholder={"Type your issue"}
            multiline={true}
            text={issue}
            setText={helpUpdate}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={openWhatsApp} style={{ backgroundColor:AppColors.green, borderRadius: 16, margin: 16, padding: 16, width: '80%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: AppColors.white, fontFamily: FontFamilty.medium }}>Anyy Questions? Give us a Call</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
});
