import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";

export const ProfileOptionComp = ({ item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={item.onPress}
      style={styles.container}>
      <Image
        source={item.img}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
      <Text
        style={{
          fontSize: 16,
          flex: 1,
          fontFamily: FontFamilty.regular,
          color: AppColors.black,
        }}>
        {item.name}
      </Text>
      <Image
        source={AppImages.forwardArrow}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 16,
    padding: 16,
    alignItems: "center",
    backgroundColor: AppColors.white,
  },
});
