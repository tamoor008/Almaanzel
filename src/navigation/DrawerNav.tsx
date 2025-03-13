import { View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Login } from "../ui/auth/screens/Login";
import { Onboard } from "../ui/auth/screens/Onboard";
import { HomeScreen } from "../ui/customer/home/screens/HomeScreen";
import { ProfileScreen } from "../ui/customer/profile/screens/ProfileScreen";
import ProfileNav from "./ProfileNav";
import BtmNav from "./BtmNav";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="BtmNav" component={BtmNav} />
        <Drawer.Screen name="ProfileNav" component={ProfileNav} />
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerNav;
