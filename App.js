import { StyleSheet, Text, View, StatusBar, Modal } from "react-native";
import AuthNav from "./src/navigation/AuthNav";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "./src/constants/AppColors";
import { loadFonts } from "./src/constants/AppFonts"; // Adjust the path to match your file structure
import { useState, useEffect } from "react";
import DrawerNav from "./src/navigation/DrawerNav";
import { useSelector } from "react-redux";

export default function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAppFonts = async () => {
      await loadFonts(); // Load fonts from the centralized file
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    };

    loadAppFonts();
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor={AppColors.white} />
        <NavigationContainer>
          {isLoggedIn ? <DrawerNav /> : <AuthNav />}
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
