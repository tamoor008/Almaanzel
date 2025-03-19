import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { AppColors } from "../../../constants/AppColors";
import { AppImages } from "../../../constants/AppImages";
import FontFamilty from "../../../constants/FontFamilty";


export const AdminHeaderfixer = ({ heading, profile, navigation, back }) => {
  const menuPress = () => {
    navigation.openDrawer();
  };
  const onBackPress = () => {
    navigation.goBack();
  };
  const navigateProfile = () => {
    navigation.navigate("ProfileNav");
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppColors.white}
        barStyle="dark-content"></StatusBar>
      {back ? (
        <TouchableOpacity onPress={onBackPress} activeOpacity={0.9}>
          <Image style={{ width: 20, height: 20 }} source={AppImages.backwl} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={menuPress} activeOpacity={0.9}>
          <Image style={{ width: 20, height: 20 }} source={AppImages.menu} />
        </TouchableOpacity>
      )}

      {heading ? (
        <Text style={styles.headingText}>{heading}</Text>
      ) : (
        <Text style={{ ...styles.headingText, flex: 1 }}>{"Hey Asim"}</Text>
      )}

      <TouchableOpacity activeOpacity={0.9} onPress={navigateProfile}>
        <Image style={styles.imgStyle} source={profile} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 16,
    justifyContent: "space-between",
    backgroundColor: AppColors.white,
    elevation: 10,
    padding: 16,
    alignItems: "center",
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
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
