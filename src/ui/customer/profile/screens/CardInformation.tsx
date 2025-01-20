import { StyleSheet, View } from "react-native";
import { AppColors } from "../../../../constants/AppColors";

import { useState } from "react";

import { Header } from "../../home/components/Header";
import { CustomButton } from "../../../../components/CustomButton";
import { CustomTextInput } from "../../../../components/CustomTextInput";

export const CardInformation = ({ navigation }) => {
  const [fullName, setFullName] = useState("Asim Mehmood");
  const [cardNumber, setCardNumber] = useState("1111-1111-1111-111");
  const [expiry, setExpiry] = useState("08/24");

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header
        heading={"Card Information"}
        back={true}
        navigation={navigation}
      />
      <View style={{ flex: 1, padding: 16, rowGap: 16 }}>
        <CustomTextInput
          text={fullName}
          setText={setFullName}
          placeholder={"Full Name"}
        />
        <CustomTextInput
          text={cardNumber}
          setText={setCardNumber}
          placeholder={"Card Number"}
        />
        <CustomTextInput
          text={expiry}
          setText={setExpiry}
          placeholder={"Expiry"}
        />
      </View>
      <View style={{ padding: 16 }}>
        <CustomButton onPress={goBack} text={"Save"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
