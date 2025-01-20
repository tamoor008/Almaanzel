import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { AppColors } from "../../../../constants/AppColors";

const screenWidth = Dimensions.get("window").width;

const ProgressBar = ({ progress }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress * screenWidth, // Convert progress (0-1) to pixel width
      duration: 500, // Animation duration
      useNativeDriver: false, // Must be false for width animations
    }).start();
  }, [progress]);

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View style={[styles.progressBar, { width: animatedWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  progressBarContainer: {
    width: screenWidth, // Fixed width instead of percentage
    height: 5,
    backgroundColor: AppColors.grey,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: AppColors.mainBlue,
  },
});

export default ProgressBar;
