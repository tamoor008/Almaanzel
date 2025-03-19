import { StyleSheet, Text, View, StatusBar, Modal, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Login } from "./src/ui/auth/screens/Login";
import ProfileNav from "./src/navigation/ProfileNav";
import { AppColors } from "./src/constants/AppColors";
import AuthNav from "./src/navigation/AuthNav";
import DrawerNav from "./src/navigation/DrawerNav";
import AdminNav from "./src/navigation/AdminNav";

export default function App() {
  const selector = useSelector(state => state.AppReducer);


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={AppColors.white} />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          {selector.isLoggedIn ? selector?.user?.userType=='admin'?<AdminNav/>: <DrawerNav /> : <AuthNav />}
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
