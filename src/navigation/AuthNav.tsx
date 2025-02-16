import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Onboard } from "../ui/auth/screens/Onboard";
import { Login } from "../ui/auth/screens/Login";
import { Register } from "../ui/auth/screens/Register";
import { ForgotPassword } from "../ui/auth/screens/ForgotPassword";
import { Otp } from "../ui/auth/screens/Otp";
import { ChangePassword } from "../ui/auth/screens/ChangePassword";
import { AppScreens } from "../constants/AppScreens";

const AuthNav = () => {
  const Stack = createNativeStackNavigator();
  const { onboard } = useSelector((state) => state.auth);
  console.log(onboard, "onboard");

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!onboard && (
          <Stack.Screen name={AppScreens.Onboard} component={Onboard} />
        )}
        <Stack.Screen name={AppScreens.Login} component={Login} />
        <Stack.Screen name={AppScreens.Register} component={Register} />
        <Stack.Screen
          name={AppScreens.ForgotPassword}
          component={ForgotPassword}
        />
        <Stack.Screen name={AppScreens.Otp} component={Otp} />
        <Stack.Screen
          name={AppScreens.ChangePassword}
          component={ChangePassword}
        />
      </Stack.Navigator>
    </View>
  );
};

export default AuthNav;
