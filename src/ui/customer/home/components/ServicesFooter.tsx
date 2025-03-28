import { StyleSheet, View, Text } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { CustomButton } from "../../../../components/CustomButton";

export const ServicesFooter = ({
  price,
  priceDescription,
  btnText,
  onPress,
  btnStyle,
  btndisable
}) => {
  return (
    <View style={styles.container}>
      {price>0?
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.headingText}>{'AED '+price}</Text>
        <Text style={styles.descriptionText}>{priceDescription}</Text>
      </View>:
       <View style={{ flexDirection: "row", alignItems: "center" }}>
       <Text style={styles.headingText}>{'Qoutation'}</Text>
     </View>
      }
      <View style={{ width: "50%" }}>
        <CustomButton disable={btndisable} btnStyle={btnStyle} text={btnText} onPress={onPress} />
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
