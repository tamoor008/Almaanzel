import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useRef, useState } from "react";
import { Description } from "../components/Description";
import FontFamilty from "../../../../constants/FontFamilty";
import { CustomLargeTextInput } from "../../../../components/CustomLargeTextInput";

export const WindowsCleaning = ({ item }) => {
  const scrollViewRef = useRef(null);

  const [issue, setIssue] = useState("");
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
            "This package contains the window cleaning of your whole house from both internal and external side. This package includes all the things like windows cleaning foams etc"
          }
        />
      </ScrollView>
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
