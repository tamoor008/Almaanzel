import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { AppImages } from "../../../../constants/AppImages";
import FontFamilty from "../../../../constants/FontFamilty";

export const QoutationBaseComp = ({
  heading,
  description,
  headingDescription,
  headingDescriptionCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ rowGap: 4 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.headingText}>{heading}</Text>
          {headingDescription && (
            <Text style={styles.headingDescriptionCount}>
              {headingDescriptionCount}
              <Text style={styles.headingDescription}>
                {headingDescription}
              </Text>
            </Text>
          )}
        </View>
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
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
    flex: 1,
  },
  headingDescriptionCount: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.mainBlue,
  },
  headingDescription: {
    fontSize: 12,
    fontFamily: FontFamilty.regular,
    color: AppColors.text8181,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: FontFamilty.regular,
    color: AppColors.text8181,
  },
});
