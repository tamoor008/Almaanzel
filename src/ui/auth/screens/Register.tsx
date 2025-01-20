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

export const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrengthIndex, setpasswordStrengthIndex] = useState(0);

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

  const navigateSignIn = () => {
    navigation.navigate("Login");
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <View style={{ rowGap: 16 }}>
          <AuthHeader
            heading={"Welcome to Almaanzel"}
            description={"Let’s create your profile and get started"}
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
            <CustomTextInput
              placeholder={"Password"}
              text={password}
              setText={onPasswordChange}
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
          textonPress={navigateSignIn}
          btnonPress={signUp}
          btnText={"Sign Up"}
          textPrefix={"Already have an account?"}
          textSuffix={"Sign In"}
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
