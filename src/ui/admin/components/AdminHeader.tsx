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


export const AdminHeader = ({ heading, navigation, logout }) => {
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
  

      {heading ? (
        <Text style={styles.headingText}>{heading}</Text>
      ) : (
        <Text style={{ ...styles.headingText, color:AppColors.black}}>{"Almaanzel - Admin Panel"}</Text>
      )}


{logout&&(
  <TouchableOpacity activeOpacity={0.9} onPress={logout} style={{position:'absolute',right:16}}>
    <Image style={{width:24,height:24}} source={AppImages.logout}/>
  </TouchableOpacity>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 16,
    justifyContent: "center",
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
