import { StyleSheet, View, Text } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { CustomButton } from "../../../../components/CustomButton";

export const ServicesFooter = ({
  price,
  priceDescription,
  btnText,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.headingText}>{price}</Text>
        <Text style={styles.descriptionText}>{priceDescription}</Text>
      </View>
      <View style={{ width: "50%" }}>
        <CustomButton text={btnText} onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 16,
    justifyContent: "space-between",
    backgroundColor: AppColors.white,
    elevation: 100,
    padding: 16,
    borderTopWidth: 1,
    borderColor: AppColors.grey,
    alignItems: "center",
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: FontFamilty.regular,
    color: AppColors.black50,
  },
});
