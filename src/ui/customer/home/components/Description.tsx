import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { AppImages } from "../../../../constants/AppImages";
import FontFamilty from "../../../../constants/FontFamilty";

export const Description = ({ description, heading }) => {
  return (
    <View style={styles.container}>
      <View style={{ rowGap: 4 }}>
        <Text style={styles.headingText}>
          {heading ? heading : "Description"}
        </Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: FontFamilty.regular,
    color: AppColors.text8181,
  },
});
