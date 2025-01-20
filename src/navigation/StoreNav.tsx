import { View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Store } from "../ui/customer/store/screens/Store";
import { ProductPage } from "../ui/customer/store/screens/ProductPage";
import { Cart } from "../ui/customer/store/screens/Cart";
import { CartCheckOut } from "../ui/customer/store/screens/CartCheckout";

const StoreNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Store"} component={Store} />
        <Stack.Screen name={"ProductPage"} component={ProductPage} />
        <Stack.Screen name={"Cart"} component={Cart} />
        <Stack.Screen name={"CartCheckOut"} component={CartCheckOut} />
      </Stack.Navigator>
    </View>
  );
};

export default StoreNav;
