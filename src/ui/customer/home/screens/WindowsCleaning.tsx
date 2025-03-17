import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useEffect, useRef, useState } from "react";
import { Description } from "../components/Description";
import FontFamilty from "../../../../constants/FontFamilty";
import { CustomLargeTextInput } from "../../../../components/CustomLargeTextInput";
import { CustomInputBaseComp } from "../components/CustomInputBaseComp";

export const WindowsCleaning = ({  item, setPrice, updateServiceDetails }) => {
  const scrollViewRef = useRef(null);

  useEffect(()=>{
    updateServiceDetails('addon', ['AED 130 / Sq Meter']);
  },[])

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

        <View style={{paddingHorizontal:16}}>
          <Text style={{fontSize:16,fontWeight:'bold'}}>Per Square meter charges are AED 130</Text>
          <Text>Please call for home visit and Quotation</Text>

          {/* <CustomInputBaseComp
            heading={
              ""
            }
            text={WindowsCleaning}
            descriptionInput={"AED 130 / Sq ft"}
            setText={setWindowsCleaning}
          /> */}
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
