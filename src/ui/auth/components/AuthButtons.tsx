import { StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../constants/AppColors";
import { CustomButton } from "../../../components/CustomButton";
import FontFamilty from "../../../constants/FontFamilty";

export const AuthButtons = ({ textonPress, btnonPress }) => {
  return (
    <View style={styles.container}>
      <CustomButton text={"Next"} onPress={btnonPress}></CustomButton>
      <Text onPress={textonPress} style={{ ...styles.btnText }}>
        Skip
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    alignItems: "center",
    rowGap: 8,
    marginBottom: 16,
  },
  btnText: {
    fontFamily: FontFamilty.black,
    fontSize: 16,
    color: AppColors.mainBlue,
  },
});
