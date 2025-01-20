import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../constants/AppColors";
import { CustomButton } from "../../../components/CustomButton";
import FontFamilty from "../../../constants/FontFamilty";
import { AppImages } from "../../../constants/AppImages";

export const AuthHeader = ({ heading, description, back }) => {
  return (
    <View style={styles.container}>
      {back && (
        <TouchableOpacity onPress={back} activeOpacity={0.9}>
          <Image style={{ width: 20, height: 20 }} source={AppImages.back} />
        </TouchableOpacity>
      )}
      <View style={{ rowGap: 4 }}>
        <Text style={styles.headingText}>{heading}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
  headingText: {
    fontSize: 24,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: FontFamilty.regular,
    color: AppColors.greyText,
  },
});
