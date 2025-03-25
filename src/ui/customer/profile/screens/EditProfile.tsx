import { StyleSheet, View, ActivityIndicator,Text } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { useState } from "react";
import { Header } from "../../home/components/Header";
import { CustomButton } from "../../../../components/CustomButton";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useDispatch } from "react-redux";
import { setUser, setisLoggedin } from "../../../../redux/AppReducer";
import { useSelector } from "react-redux";

export const EditProfile = ({ navigation }) => {
  const selector = useSelector(state => state.AppReducer);
  const user=selector.user
  
  const dispatch = useDispatch();
  const [name, setName] = useState(user.displayName);
  const [number, setNumber] = useState(user.phoneNumber);
  const userId = user?.uid;
  const reference = database().ref('/users/');
  const [loader, setLoader] = useState(false)
  const [errorText, setErrorText] = useState('')

  const updateUserInfo = async (updatedData) => {
    setLoader(true);
  
    if (!userId) {
      setLoader(false);
      dispatch(setisLoggedin(false));
      return;
    }
  
    try {
      // Update user data in Firebase
      await reference.child(`${userId}/userInfo`).update(updatedData);
  
      // Fetch updated user data
      const snapshot = await reference.child(`${userId}/userInfo`).once("value");
  
      if (snapshot.exists()) {
        const updatedUserData = snapshot.val();
        dispatch(setUser(updatedUserData)); // Save updated data in Redux
      } else {
      }
  
      setLoader(false);
      navigation.goBack();
    } catch (error) {
      setErrorText("Error updating user info: " + error.message);
      // console.log("Error updating user info:", error.message);
      setLoader(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Header heading={"Edit Profile"} back={true} navigation={navigation} />
      {loader ?
        <View style={{ ...styles.container, justifyContent: "center" }}>
          <ActivityIndicator
            size={"large"}
            color={AppColors.mainBlue}></ActivityIndicator>
        </View>
        :
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 16, rowGap: 16 }}>
            <CustomTextInput text={name} setText={setName} placeholder={"Name"} />
            <CustomTextInput
              text={number}
              setText={setNumber}
              placeholder={"Number"}
            />
             {errorText && (
                  <Text
                    style={{color:AppColors.red,alignSelf:'flex-start',fontSize:14}}>
                    {errorText}
                  </Text>
                )}
          </View>
          <View style={{ padding: 16 }}>
            <CustomButton onPress={() => updateUserInfo({
              displayName: name,
              phoneNumber: number,
            })
            } text={"Save"} />
          </View>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
