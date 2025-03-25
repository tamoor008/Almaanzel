import { StyleSheet, View, Text, FlatList, ScrollView, Alert } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useState } from "react";
import { PaymentMethodComp } from "../components/PaymentMethodComp";
import { AppImages } from "../../../../constants/AppImages";
import FontFamilty from "../../../../constants/FontFamilty";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { SuccessModal } from "../../../../components/SuccessModal";

export const PaymentInformation = ({ navigation, updateServiceData,setAddresspayment }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, img: AppImages.card, label: "Card on delivery", selected: true },
    { id: 2, img: AppImages.cash, label: "Cash", selected: false },
  ]);

  const validateAddressPayment = () => {
    if (!name.trim() || !address.trim() || !city.trim() || !number.trim()) {
      setAddresspayment(false);
    } else {
      const selectedPayment = paymentMethods.find(method => method.selected);
      setAddresspayment(true);
      updateServiceData("address", {name:name,number:number,city:city,address:address});
      updateServiceData("selectedPayment", selectedPayment);

    }
  };
  

  const changeSelectedStatus = (index) => {
    setPaymentMethods((prevMethods) =>
      prevMethods.map((method, i) => ({
        ...method,
        selected: i === index, // Set `selected` to true only for the clicked index
      }))
    );

    // Get the selected payment method
    const selectedPayment = paymentMethods.find((_, i) => i === index);
    console.log('selectedPayment', selectedPayment);


    // Update service data with only the selected payment method
    updateServiceData("selectedPayment", selectedPayment);

  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ rowGap: 16 }}>
          <Text style={styles.semiBold16}>{"Enter Address"}</Text>
          <CustomTextInput
            placeholder={"Name"}
            text={name}
            setText={(text)=>{
              setName(text)
              validateAddressPayment()
            }}
            style={{}}
            keyboardType="default"
            secureTextEntry={false}
          />

          <CustomTextInput
            placeholder={"Phone Number"}
            text={number}
            setText={(text)=>{
              setNumber(text)
              validateAddressPayment()
            }}  
                      style={{}}
            keyboardType="numeric"
            secureTextEntry={false}
          />

          <CustomTextInput
            placeholder={"City"}
            text={city}
            setText={(text)=>{
              setCity(text)
              validateAddressPayment()
            }}  
            style={{}}
            keyboardType="default"
            secureTextEntry={false}
          />


          <CustomTextInput
            placeholder={"Address"}
            text={address}
            setText={(text)=>{
              setAddress(text)
              validateAddressPayment()
            }}  

            style={{}}
            keyboardType="default"
            secureTextEntry={false}
          />

          <Text style={styles.semiBold16}>{"Payment Methods"}</Text>
          <FlatList
            removeClippedSubviews={false} // <- Add This
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

        {/* <View style={{ rowGap: 16 }}>
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
        </View> */}
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
