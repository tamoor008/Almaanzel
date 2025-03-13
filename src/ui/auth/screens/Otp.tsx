import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AppColors } from "../../../constants/AppColors";
import FontFamilty from "../../../constants/FontFamilty";
import { CustomTextInput } from "../../../components/CustomTextInput";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthButtonsMultiText } from "../components/AuthButtonsMultiText";
import { AuthHeader } from "../components/AuthHeader";

export const Otp = ({ navigation }) => {
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const inputs = useRef([]);

  const handleChangeText = (text, index) => {
    if (text.length > 1) return; // Prevent pasting multiple characters
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== "" && index < otpLength - 1) {
      inputs.current[index + 1].focus(); // Move to the next input
    }

    if (newOtp.join("").length === otpLength) {
      handleOtpComplete(newOtp.join(""));
    }
  };

  const handleOtpComplete = (otp) => {
    Alert.alert("OTP Entered", otp);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus(); // Move back to the previous input
    }
  };

  const navigateChangePassword = () => {
    navigation.navigate("ChangePassword");
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
            heading={"Verify OTP"}
            description={
              "Enter the OTP sent to your email tamoormalik088@gmail.com"
            }
          />

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>
        </View>

        <AuthButtonsMultiText
          btnonPress={navigateChangePassword}
          btnText={"Veify"}
        />
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
  otpContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginTop: 32,
  },
  input: {
    width: 40,
    height: 50,
    borderBottomWidth: 2,
    textAlign: "center",
    backgroundColor: AppColors.grey,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    fontSize: 20,
  },
});
