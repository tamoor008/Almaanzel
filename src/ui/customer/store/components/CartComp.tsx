import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import FontFamilty from "../../../../constants/FontFamilty";

export const CartComp = ({ item }) => {
  return (
    <View style={{ ...styles.container }}>
      <Image
        resizeMode="stretch"
        style={{ height: 75, width: 75 }}
        source={item.img}
      />
      <View style={{ padding: 12, flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: FontFamilty.bold,
            color: AppColors.black,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: FontFamilty.bold,
            color: AppColors.mainBlue,
          }}>
          {item.price}
        </Text>
      </View>

      <View
        style={{
          borderRadius: 100,
          height: 32,
          marginRight: 16,
          width: 32,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: AppColors.mainBlue,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FontFamilty.bold,
            color: AppColors.white,
          }}>
          {item.quantity}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    elevation: 5,
    width: "100%",
    borderRadius: 8,
    backgroundColor: AppColors.white,
    alignItems: "center",
  },
});
