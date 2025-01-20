import { View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../ui/customer/profile/screens/ProfileScreen";
import { EditProfile } from "../ui/customer/profile/screens/EditProfile";
import { CardInformation } from "../ui/customer/profile/screens/CardInformation";
import { SavedAddress } from "../ui/customer/profile/screens/SavedAddress";

const ProfileNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"ProfileScreen"} component={ProfileScreen} />
        <Stack.Screen name={"EditProfile"} component={EditProfile} />
        <Stack.Screen name={"CardInformation"} component={CardInformation} />
        <Stack.Screen name={"SavedAddress"} component={SavedAddress} />
      </Stack.Navigator>
    </View>
  );
};

export default ProfileNav;
