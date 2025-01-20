import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";

export const PageHeader = ({ navigation, img }) => {
  const menuPress = () => {
    navigation.openDrawer();
  };
  const onBackPress = () => {
    navigation.goBack();
  };
  const navigateCart = () => {
    navigation.navigate("Cart");
  };
  return (
    <View style={styles.container}>
      <Image source={img} style={{ height: 300, width: "100%" }} />
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          margin: 16,
          alignSelf: "center",
          width: "90%",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <TouchableOpacity
          onPress={onBackPress}
          activeOpacity={0.9}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            elevation: 10,
            backgroundColor: AppColors.white,
          }}>
          <Image
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: 4 }}
            source={AppImages.backwl}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateCart}
          activeOpacity={0.9}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            elevation: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: AppColors.white,
          }}>
          <Image
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
            source={AppImages.store}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
    height: 20,
    width: 20,
  },
});
