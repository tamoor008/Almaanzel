import {
  ActivityIndicator,
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

export const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const onPasswordChange = (text) => {
    setPassword(text);
  };

  const signIn = () => {
    setLoader(true);
    setTimeout(() => {
      dispatch(authActions.setIsLoggedIn(true));
    }, 2000);
  };

  const navigateSignUp = () => {
    navigation.navigate("Register");
  };
  const navigateForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      {loader ? (
        <View style={{ ...styles.container, justifyContent: "center" }}>
          <ActivityIndicator
            size={"large"}
            color={AppColors.mainBlue}></ActivityIndicator>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={{ rowGap: 16 }}>
            <AuthHeader
              heading={"Welcome Back!!"}
              description={"We really missed you, Let’s login now"}
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
              <View style={{ rowGap: 4 }}>
                <CustomTextInput
                  placeholder={"Password"}
                  text={password}
                  setText={onPasswordChange}
                  style={{}}
                  secureTextEntry={true}
                />
                <Text
                  onPress={navigateForgotPassword}
                  style={styles.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </View>
            </View>
          </View>

          <AuthButtonsMultiText
            textonPress={navigateSignUp}
            btnonPress={signIn}
            btnText={"Sign In"}
            textPrefix={"Don't have an account?"}
            textSuffix={"Sign Up"}
          />
        </View>
      )}
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
