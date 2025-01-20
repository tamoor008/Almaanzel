import { StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../constants/AppColors";
import { CustomButton } from "../../../components/CustomButton";
import FontFamilty from "../../../constants/FontFamilty";

export const AuthButtonsMultiText = ({
  textonPress,
  btnonPress,
  btnText,
  textPrefix,
  textSuffix,
}) => {
  return (
    <View style={styles.container}>
      <CustomButton text={btnText} onPress={btnonPress}></CustomButton>
      {textonPress && (
        <Text style={{ ...styles.btnText }}>
          {textPrefix + " "}
          <Text onPress={textonPress} style={{ ...styles.suffixText }}>
            {textSuffix}
          </Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    rowGap: 8,
    marginBottom: 16,
  },
  prefixText: {
    fontFamily: FontFamilty.medium,
    fontSize: 16,
    color: AppColors.textGrey,
  },
  suffixText: {
    fontFamily: FontFamilty.black,
    fontSize: 16,
    color: AppColors.mainBlue,
  },
});
