import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { ProfileHeader } from "../components/ProfileHeader";
import FontFamilty from "../../../../constants/FontFamilty";
import { useState } from "react";
import { ProfileOptionComp } from "../components/ProfileOptionComp";
import { AppImages } from "../../../../constants/AppImages";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../redux/slices/authSlice";

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [profileOptions, setProfileOptions] = useState([
    {
      id: 1,
      name: "Edit Profile",
      img: AppImages.profile,
      onPress: () => {
        navigateEditProfile();
      },
    },
    {
      id: 2,
      name: "Card Information",
      img: AppImages.payment,
      onPress: () => {
        navigateCardInformation();
      },
    },
    {
      id: 3,
      name: "Saved Addresses",
      img: AppImages.address,
      onPress: () => {
        navigateSavedAddress();
      },
    },
  ]);

  const navigateEditProfile = () => {
    navigation.navigate("EditProfile");
  };
  const navigateCardInformation = () => {
    navigation.navigate("CardInformation");
  };
  const navigateSavedAddress = () => {
    navigation.navigate("SavedAddress");
  };

  const logout = () => {
    dispatch(authActions.setIsLoggedIn(false));
  };
  return (
    <View style={styles.container}>
      <ProfileHeader
        heading={"Profile"}
        navigation={navigation}
        profile={SampleImages.user}
        name={"Asim Mehmood"}
        img={SampleImages.user}
      />

      <View style={{ flex: 1, rowGap: 16, backgroundColor: AppColors.greybg }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FontFamilty.bold,
            marginHorizontal: 16,
            marginTop: 16,
          }}>
          Account
        </Text>
        <FlatList
          style={{ flex: 1 }}
          renderItem={({ item, index }) => <ProfileOptionComp item={item} />}
          data={profileOptions}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={logout}
          style={{
            backgroundColor: AppColors.red30,
            borderRadius: 8,
            padding: 16,
            margin: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            columnGap: 16,
          }}>
          <Image
            source={AppImages.logout}
            resizeMode="contain"
            style={{ width: 24, height: 24 }}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: FontFamilty.bold,
              color: AppColors.red,
            }}>
            {"Logout"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
