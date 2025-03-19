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
import { AuthButtonsMultiText } from "../components/AuthButtonsMultiText";
import { AuthHeader } from "../components/AuthHeader";
import { setUser, setisLoggedin } from "../../../redux/AppReducer";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const Login = ({ navigation }) => {
  const reference = database().ref('/users/');
  const dispatch = useDispatch();
  // const [email, setEmail] = useState("tamoormalik088@gmail.com");
  //   const [email, setEmail] = useState("test@email.com");
  // const [password, setPassword] = useState("11111111");
      const [email, setEmail] = useState("fixer@email.com");
  const [password, setPassword] = useState("11111111");
  // const [email, setEmail] = useState("mohaned.admin@almaanzel.com");
  // const [password, setPassword] = useState("mohaned.admin@almaanzel.com");
  const [loader, setLoader] = useState(false);
  const [errorText, setErrorText] = useState('')

  const onPasswordChange = (text) => {
    setPassword(text);
  };




  const signIn = async (email, password) => {
    setLoader(true);
  
    if (!email || !password) {
      setErrorText("Enter all the credentials");
      setLoader(false);
      return;
    }
  
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
  
      // Fetch user data from Firebase Realtime Database
      const snapshot = await reference.child(`${user.uid}/userInfo`).once("value");
  
      if (snapshot.exists()) {
        const userData = snapshot.val();
        dispatch(setUser(userData)); // Save fetched data into Redux
      } else {
        console.log("User data not found in database");
        dispatch(setUser(null));
      }
  
      setLoader(false);
      dispatch(setisLoggedin(true));
  
    } catch (error) {
      setErrorText(error.message);
      console.log("Sign-in error:", error.toString());
      setLoader(false);
    }
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
                {errorText && (
                  <Text
                    style={{...styles.forgotPasswordText,color:AppColors.red,alignSelf:'flex-start',fontSize:14}}>
                    {errorText}
                  </Text>
                )}

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
            btnonPress={() => signIn(email, password)}
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
