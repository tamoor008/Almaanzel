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
import { authActions } from "../../../redux/slices/authSlice";
import { AuthButtonsMultiText } from "../components/AuthButtonsMultiText";
import { AuthHeader } from "../components/AuthHeader";
import { SuccessModal } from "../../../components/SuccessModal";

export const ChangePassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrengthIndex, setpasswordStrengthIndex] = useState(0);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const onPasswordChange = (text) => {
    checkPasswordStrength(text);
    setPassword(text);
  };

  const checkPasswordStrength = (password) => {
    let score = 0;

    if (/.{8,}/.test(password)) score++; // At least 8 characters
    if (/[A-Z]/.test(password)) score++; // At least 1 uppercase letter
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++; // At least 1 special character

    setpasswordStrengthIndex(score);
  };

  const signUp = () => {
    dispatch(authActions.setIsLoggedIn(true));
  };

  const navigatetoSignin = () => {
    navigation.navigate("Login");
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
            heading={"Change Password"}
            description={"Enter a new password to secure your account"}
          />
          <View style={{ rowGap: 16 }}>
            <CustomTextInput
              placeholder={"Password"}
              text={password}
              setText={onPasswordChange}
              style={{}}
              secureTextEntry={true}
            />
            <CustomTextInput
              placeholder={"Confirm Password"}
              text={confirmPassword}
              setText={setConfirmPassword}
              style={{}}
              secureTextEntry={true}
            />
          </View>

          <View style={{ rowGap: 12 }}>
            <Text style={styles.regular14}>Password Strength</Text>
            <View style={styles.row}>
              <View
                style={
                  passwordStrengthIndex >= 1
                    ? styles.rowItemMarked
                    : styles.rowItem
                }></View>
              <View
                style={
                  passwordStrengthIndex >= 2
                    ? styles.rowItemMarked
                    : styles.rowItem
                }></View>
              <View
                style={
                  passwordStrengthIndex >= 3
                    ? styles.rowItemMarked
                    : styles.rowItem
                }></View>
            </View>
            <Text style={styles.regular14}>
              Password must be a minimum of 8 characters, include one letter one
              number and one symbol
            </Text>
          </View>
        </View>

        <AuthButtonsMultiText
          btnonPress={() => setSuccessModalVisible(true)}
          btnText={"Submit"}
        />

        <SuccessModal
          btnText={"Sign In"}
          onPress={navigatetoSignin}
          visible={successModalVisible}
          heading={"Congratulations"}
          description={
            "Your Password has been changed successfully try your new password to get logged in into your account."
          }
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
  row: {
    flexDirection: "row",
    columnGap: 8,
  },
  rowItem: {
    flex: 1,
    backgroundColor: AppColors.textInputbg,
    height: 5,
    borderRadius: 100,
  },
  rowItemMarked: {
    flex: 1,
    backgroundColor: AppColors.mainBlue,
    height: 5,
    borderRadius: 100,
  },
});
