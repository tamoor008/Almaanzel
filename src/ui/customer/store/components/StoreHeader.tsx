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

export const StoreHeader = ({ heading, profile, navigation, back }) => {
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

      {/* <TouchableOpacity activeOpacity={0.9} onPress={navigateCart}> */}
      <TouchableOpacity activeOpacity={0.9} onPress={()=>{}}>

        <Image
          resizeMode="contain"
          style={styles.imgStyle}
          source={AppImages.store}
        />
        {/* <View
          style={{
            borderRadius: 100,
            height: 16,
            position: "absolute",
            right: -5,
            top: -5,
            alignItems: "center",
            justifyContent: "center",
            width: 16,
            backgroundColor: AppColors.mainBlue,
          }}>
          <Text
            style={{
              fontSize: 8,
              color: "white",
              fontFamily: FontFamilty.medium,
            }}>
            2
          </Text>
        </View> */}
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
    height: 20,
    width: 20,
  },
});
