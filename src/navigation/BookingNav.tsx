import { View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Store } from "../ui/customer/store/screens/Store";
import { ProductPage } from "../ui/customer/store/screens/ProductPage";
import { Cart } from "../ui/customer/store/screens/Cart";
import { CartCheckOut } from "../ui/customer/store/screens/CartCheckout";
import { Bookings } from "../ui/customer/bookings/screens/Bookings";
import { BookingDetails } from "../ui/customer/bookings/screens/BookingDetails";

const BookingNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Bookings"} component={Bookings} />
        <Stack.Screen name={"BookingDetails"} component={BookingDetails} />
      </Stack.Navigator>
    </View>
  );
};

export default BookingNav;
