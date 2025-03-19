import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../ui/customer/home/screens/HomeScreen";
import { ServiceDetails } from "../ui/customer/home/screens/ServiceDetails";
import { Reviews } from "../ui/customer/home/screens/Reviews";
import { AdminHomeScreen } from "../ui/admin/screen/AdminHomeScreen";
import { Addfixer } from "../ui/admin/screen/Addfixer";
import { AdminBookings } from "../ui/admin/screen/AdminBookings";

const AdminNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"AdminHomeScreen"} component={AdminHomeScreen} />
      <Stack.Screen name={"Addfixer"} component={Addfixer} />
      <Stack.Screen name={"AdminBookings"} component={AdminBookings} />

    </Stack.Navigator>
  );
};

export default AdminNav;
