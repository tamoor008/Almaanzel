import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import FontFamilty from "../../../../constants/FontFamilty";

export const ProductComp = ({ item, onPress, horizontal }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.9}
      style={{ ...styles.container, width: !horizontal ? "49%" : null }}>
      <Image
        resizeMode="stretch"
        style={{ height: 150, width: "100%" }}
        source={item.img}
      />
      <View style={{ padding: 12, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: FontFamilty.regular,
              color: AppColors.text8181,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FontFamilty.bold,
              color: AppColors.black,
            }}>
            {item.price}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", columnGap: 2, alignItems: "center" }}>
          <Icon name={"star"} size={16} color={"#FFD700"} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: FontFamilty.medium,
              color: AppColors.black,
            }}>
            {item.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "49%",
    elevation: 10,
    borderRadius: 8,
    backgroundColor: AppColors.white,
  },
});
