import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useState } from "react";
import { PaymentMethodComp } from "../components/PaymentMethodComp";
import { AppImages } from "../../../../constants/AppImages";
import FontFamilty from "../../../../constants/FontFamilty";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { SuccessModal } from "../../../../components/SuccessModal";

export const PaymentInformation = ({ navigation }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, img: AppImages.card, label: "Card/Debit Card", selected: true },
    { id: 2, img: AppImages.cash, label: "Cash", selected: false },
  ]);
  const changeSelectedStatus = (index) => {
    setPaymentMethods((prevMethods) =>
      prevMethods.map((method, i) => ({
        ...method,
        selected: i === index, // Set `selected` to true only for the clicked index
      }))
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ rowGap: 16 }}>
          <Text style={styles.semiBold16}>{"Payment Methods"}</Text>
          <FlatList
            scrollEnabled={false}
            data={paymentMethods}
            ItemSeparatorComponent={() => <View style={{ margin: 4 }}></View>}
            renderItem={({ item, index }) => (
              <PaymentMethodComp
                index={index}
                onPress={changeSelectedStatus}
                item={item}
              />
            )}
          />
        </View>

        <View style={{ rowGap: 16 }}>
          <Text style={styles.semiBold16}>{"Payment Information"}</Text>
          <CustomTextInput
            text={name}
            setText={setName}
            placeholder={"Full Name"}></CustomTextInput>
          <CustomTextInput
            text={cardNumber}
            keyboardType={"numeric"}
            setText={setCardNumber}
            placeholder={"Card Number"}></CustomTextInput>
          <View style={{ flexDirection: "row", columnGap: 16 }}>
            <View style={{ flex: 1 }}>
              <CustomTextInput
                text={expiry}
                setText={setExpiry}
                placeholder={"MM/YY"}></CustomTextInput>
            </View>
            <View style={{ flex: 1 }}>
              <CustomTextInput
                text={cvc}
                setText={setCVC}
                placeholder={"CVC"}></CustomTextInput>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: 16,
    rowGap: 16,
  },
  semiBold16: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
});
