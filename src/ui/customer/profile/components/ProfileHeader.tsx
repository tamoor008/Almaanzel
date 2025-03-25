import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { CustomButton } from "../../../../components/CustomButton";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";

export const ProfileHeader = ({ heading, profile, navigation, name, img }) => {
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={{ backgroundColor: AppColors.mainBlue }}>
      <View style={styles.container}>
        {heading && (
          <Text style={{ ...styles.headingText, flex: 1, textAlign: "center" }}>
            {heading}
          </Text>
        )}
        <TouchableOpacity
          style={{ position: "absolute", marginHorizontal: 16 }}
          onPress={onBackPress}
          activeOpacity={0.9}>
          <Image
            style={{ width: 20, height: 20 }}
            source={AppImages.whiteback}
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 16 }}>
        <View style={{ alignSelf: "center" }}>
          <Image
            style={{ width: 75, height: 85, borderRadius: 100 }}
            source={img}
          />
        </View>
        <Text style={{ ...styles.headingText, alignSelf: "center" }}>
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 16,
    padding: 16,
    alignItems: "center",
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.white,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: FontFamilty.regular,
    color: AppColors.greyText,
  },
  imgStyle: {
    borderRadius: 100,
    height: 32,
    width: 32,
  },
});
