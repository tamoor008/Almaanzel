import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../ui/customer/home/screens/HomeScreen";
import { ServiceDetails } from "../ui/customer/home/screens/ServiceDetails";
import { Reviews } from "../ui/customer/home/screens/Reviews";

const HomeNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"HomeScreen"} component={HomeScreen} />
      <Stack.Screen name={"ServiceDetails"} component={ServiceDetails} />
      <Stack.Screen name={"Reviews"} component={Reviews} />
    </Stack.Navigator>
  );
};

export default HomeNav;
