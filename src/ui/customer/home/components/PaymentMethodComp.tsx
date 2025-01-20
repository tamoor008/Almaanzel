import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useState } from "react";
import FontFamilty from "../../../../constants/FontFamilty";

export const PaymentMethodComp = ({ item, index, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      activeOpacity={0.9}
      style={item.selected ? styles.selectedContainer : styles.container}>
      <Image
        resizeMode="contain"
        style={{ width: 32, height: 32 }}
        source={item.img}
      />
      <Text
        style={{
          ...styles.labelText,
          color: item.selected ? AppColors.mainBlue : AppColors.text8181,
        }}>
        {item.label}
      </Text>
      {item.selected && (
        <View
          style={{
            borderRadius: 100,
            height: 24,
            width: 24,
            borderColor: AppColors.mainBlue,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <View
            style={{
              borderRadius: 100,
              height: 18,
              width: 18,
              backgroundColor: AppColors.mainBlue,
            }}></View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    borderColor: AppColors.text8181,
    height: 50,
  },
  selectedContainer: {
    backgroundColor: AppColors.white,
    paddingHorizontal: 16,
    columnGap: 8,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    borderColor: AppColors.mainBlue,
    height: 50,
  },
  labelText: {
    fontSize: 16,
    fontFamily: FontFamilty.medium,
    color: AppColors.mainBlue,
    flex: 1,
  },
});
