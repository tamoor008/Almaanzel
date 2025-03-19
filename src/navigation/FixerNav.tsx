import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FixerHomeScreen } from "../ui/fixer/screen/FixerHomeScreen";
import { BookingDetails } from "../ui/customer/bookings/screens/BookingDetails";

const FixerNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"FixerHomeScreen"} component={FixerHomeScreen} />
      <Stack.Screen name={"BookingDetails"} component={BookingDetails} />

    </Stack.Navigator>
  );
};

export default FixerNav;
