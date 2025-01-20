import * as Font from "expo-font";

export const AppFonts = async () => {
  await Font.loadAsync({
    "Inter-Regular": require("../assets/Fonts/Inter-Regular.otf"),
    "Inter-Bold": require("../assets/Fonts/Inter-Bold.otf"),
    "Inter-Black": require("../assets/Fonts/Inter-Black.otf"),
    "Inter-Italic": require("../assets/Fonts/Inter-Italic.otf"),
    "Inter-SemiBold": require("../assets/Fonts/Inter-SemiBold.otf"),
    "Inter-Medium": require("../assets/Fonts/Inter-Medium.otf"),

    // Add more fonts as needed
  });
};
