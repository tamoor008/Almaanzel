import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useRef, useState } from "react";
import { Description } from "../components/Description";
import FontFamilty from "../../../../constants/FontFamilty";
import { CustomLargeTextInput } from "../../../../components/CustomLargeTextInput";

export const EmergencyCall = ({ item }) => {
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
            setText={setIssue}
          />
        </View>
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
