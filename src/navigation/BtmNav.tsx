import { View, Image } from "react-native";
import React from "react";
import { Bookings } from "../ui/customer/bookings/screens/Bookings";
import { Chat } from "../ui/customer/chat/screens/Chat";
import { Store } from "../ui/customer/store/screens/Store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppImages } from "../constants/AppImages";
import { AppColors } from "../constants/AppColors";
import HomeNav from "./HomeNav";
import StoreNav from "./StoreNav";
import BookingNav from "./BookingNav";

const Tab = createBottomTabNavigator();

const BtmNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: AppColors.white,
            height: 70,
            paddingTop: 8,
            paddingBottom: 8,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },

          tabBarActiveTintColor: AppColors.mainBlue, // Change this to the desired color for active tabs
          tabBarInactiveTintColor: "#00000070", // Change this to the desired color for inactive tabs
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <Image
                resizeMode="contain"
                source={focused ? AppImages.homefocused : AppImages.home} // Replace with your image path
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            ),
          }}
          name="HomeNav"
          component={HomeNav}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Bookings",
            tabBarIcon: ({ focused }) => (
              <Image
                resizeMode="contain"
                source={focused ? AppImages.bookingfocused : AppImages.booking} // Replace with your image path
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            ),
          }}
          name="BookingNav"
          component={BookingNav}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ focused }) => (
              <Image
                resizeMode="contain"
                source={focused ? AppImages.chatfocused : AppImages.chat} // Replace with your image path
                style={{
                  width: 28,
                  height: 28,
                }}
              />
            ),
          }}
          name="Chat"
          component={Chat}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Store",
            tabBarIcon: ({ focused }) => (
              <Image
                resizeMode="contain"
                source={focused ? AppImages.storefocused : AppImages.shop} // Replace with your image path
                style={{
                  width: 28,
                  height: 28,
                }}
              />
            ),
          }}
          name="StoreNav"
          component={StoreNav}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BtmNav;
