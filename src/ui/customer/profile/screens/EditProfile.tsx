import { StyleSheet, View } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { useState } from "react";
import { Header } from "../../home/components/Header";
import { CustomButton } from "../../../../components/CustomButton";
import { CustomTextInput } from "../../../../components/CustomTextInput";

export const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("Asim Mehmood");
  const [email, setEmail] = useState("asimmehmood@gmail.com");
  const [number, setNumber] = useState("+92-3215799205");

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header heading={"Edit Profile"} back={true} navigation={navigation} />
      <View style={{ flex: 1, padding: 16, rowGap: 16 }}>
        <CustomTextInput text={name} setText={setName} placeholder={"Name"} />
        <CustomTextInput
          text={email}
          setText={setEmail}
          placeholder={"Email"}
        />
        <CustomTextInput
          text={number}
          setText={setNumber}
          placeholder={"Number"}
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
