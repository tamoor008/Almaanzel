import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardInformation } from "../ui/customer/profile/screens/CardInformation";
import { EditProfile } from "../ui/customer/profile/screens/EditProfile";
import { ProfileScreen } from "../ui/customer/profile/screens/ProfileScreen";
import { SavedAddress } from "../ui/customer/profile/screens/SavedAddress";


const Stack = createNativeStackNavigator();

const ProfileNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CardInformation" component={CardInformation} />
      <Stack.Screen name="SavedAddress" component={SavedAddress} />
    </Stack.Navigator>
  );
};

export default ProfileNav;
