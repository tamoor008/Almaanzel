import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import FontFamilty from "../../../../constants/FontFamilty";
import Icon from "react-native-vector-icons/FontAwesome";
import { SampleImages } from "../../../../constants/SampleImages";
import { ProductComp } from "../components/ProductComp";
import { AppImages } from "../../../../constants/AppImages";
import { Header } from "../../home/components/Header";
import { CartComp } from "../components/CartComp";
import React from "react";
import { ServicesFooter } from "../../home/components/ServicesFooter";

export const Cart = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const route = useRoute();

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Tank Cleaner",
      price: "AED 99",
      img: SampleImages.product1,
      quantity: 3,
    },
    {
      id: 2,
      name: "Glint Cleaner",
      price: "AED 99",
      img: SampleImages.product2,
      quantity: 2,
    },
  ]);

  const navigateCheckout = () => {
    navigation.navigate("CartCheckOut");
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            backgroundColor: AppColors.white,
            height: 70,
            paddingTop: 8,
            paddingBottom: 8,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }); // Reset tab bar when leaving screen
      };
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} back={true} heading={"Cart"} />

      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{ padding: 16 }}
        style={{ flex: 1 }}
        data={items}
        ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
        renderItem={({ item, index }) => <CartComp item={item} />}
      />
      <ServicesFooter
        onPress={navigateCheckout}
        price={"AED 79.82"}
        btnText={"Checkout"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
