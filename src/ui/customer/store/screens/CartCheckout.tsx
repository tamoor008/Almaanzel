import { FlatList, StyleSheet, View } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { SampleImages } from "../../../../constants/SampleImages";
import { Header } from "../../home/components/Header";
import { CartComp } from "../components/CartComp";
import React from "react";
import { ServicesFooter } from "../../home/components/ServicesFooter";
import { PaymentInformation } from "../../home/screens/PaymentInformation";
import { SuccessModal } from "../../../../components/SuccessModal";

export const CartCheckOut = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const route = useRoute();
  const [successModalVisible, setSuccessModalVisible] = useState(false);

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
    setSuccessModalVisible(true);
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

  const goBack = () => {
    navigation.navigate("Store");
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} back={true} heading={"Checkout"} />

      <FlatList
                removeClippedSubviews={false} // <- Add This
        scrollEnabled={false}
        contentContainerStyle={{ padding: 16 }}
        data={items}
        ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
        renderItem={({ item, index }) => <CartComp item={item} />}
      />
      <PaymentInformation navigation={navigation} />
      <ServicesFooter
        onPress={navigateCheckout}
        price={"AED 79.82"}
        btnText={"Checkout"}
      />

      <SuccessModal
        onPress={goBack}
        visible={successModalVisible}
        heading={"Congratulations"}
        description={
          "Your order has been created successfully, The items will be delivered to your door step in 2-3 business days."
        }
        btnText={"Ok"}
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
