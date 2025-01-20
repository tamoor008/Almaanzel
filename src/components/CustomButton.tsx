import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../constants/AppColors";
import FontFamilty from "../constants/FontFamilty";

export const CustomButton = ({ onPress, text, btnStyle, btnTextStyle }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...btnStyle }}
      onPress={onPress}>
      <Text style={{ ...styles.btnText, ...btnTextStyle }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: AppColors.mainBlue,
  },
  btnText: {
    fontFamily: FontFamilty.black,
    fontSize: 16,
    color: AppColors.white,
  },
});
