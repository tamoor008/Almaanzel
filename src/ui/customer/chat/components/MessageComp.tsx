import { StyleSheet, View, Text, Image } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";

export const MessageComp = ({ item }) => {
  return (
    <View
      style={{
        ...styles.container,
        alignItems: item.sender == 0 ? "flex-end" : "flex-start",
      }}>
      {/* {item.sender == 1 && (
        <Image
          style={{ width: 16, height: 16, borderRadius: 100 }}
          source={AppImages.card}
        />
      )} */}
      <View
        style={
          item.sender == 0 ? styles.messageBodyUser : styles.messageBodySystem
        }>
        <Text
          style={{
            ...styles.messageText,
            color: item.sender == 0 ? AppColors.black : AppColors.white,
          }}>
          {item.message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
  messageBodySystem: {
    width: "90%",
    borderRadius: 12,
    borderTopLeftRadius: 0,
    backgroundColor: AppColors.mainBlue,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  messageBodyUser: {
    width: "90%",
    borderRadius: 12,
    borderTopRightRadius: 0,
    backgroundColor: AppColors.grey,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  messageText: {
    fontSize: 14,
    fontFamily: FontFamilty.regular,
  },
});
