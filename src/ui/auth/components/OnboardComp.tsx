import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import fontFamily from "../../../constants/FontFamilty";
import { AppColors } from "../../../constants/AppColors";

export const OnboardComp = ({ item }) => {
  const { height, width } = Dimensions.get("window");
  // console.log(height);

  return (
    <View style={styles.container}>
      <Image
        style={{ ...styles.onboardImage, height: height / 2 }}
        source={item.img}
      />
      <Text style={styles.headingText}>{item.heading}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
    backgroundColor: AppColors.white,
    alignItems: "center",
  },
  onboardImage: {
    width: "100%",
    marginBottom: 16,
  },
  headingText: {
    fontSize: 24,
    color: AppColors.black,
    includeFontPadding: false,
    fontFamily: fontFamily.bold,
  },
  descriptionText: {
    fontSize: 16,
    color: AppColors.greyText,
    includeFontPadding: false,
    fontFamily: fontFamily.regular,
    textAlign: "center",
  },
});
