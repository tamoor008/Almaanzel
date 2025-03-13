import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AppColors } from "../../../constants/AppColors";
import FontFamilty from "../../../constants/FontFamilty";
import { CustomTextInput } from "../../../components/CustomTextInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AuthButtonsMultiText } from "../components/AuthButtonsMultiText";
import { AuthHeader } from "../components/AuthHeader";

export const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const navigateOTP = () => {
    navigation.navigate("Otp");
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <View style={{ rowGap: 16 }}>
          <AuthHeader
            back={onBackPress}
            heading={"Forgot Password"}
            description={"Enter your email to receive the OTP."}
          />

          <View style={{ rowGap: 16 }}>
            <CustomTextInput
              placeholder={"Email"}
              text={email}
              setText={setEmail}
              style={{}}
              keyboardType="email-address"
              secureTextEntry={false}
            />
          </View>
        </View>

        <AuthButtonsMultiText btnonPress={navigateOTP} btnText={"Submit"} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: 16,
    justifyContent: "space-between",
  },
  headingText: {
    fontSize: 24,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: FontFamilty.regular,
    color: AppColors.greyText,
  },
  regular14: {
    fontSize: 14,
    fontFamily: FontFamilty.regular,
    color: AppColors.greyText,
  },
  forgotPasswordText: {
    fontSize: 16,
    fontFamily: FontFamilty.medium,
    color: AppColors.mainBlue,
    alignSelf: "flex-end",
  },
});
