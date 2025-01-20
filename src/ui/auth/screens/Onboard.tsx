import { StyleSheet, View, Image } from "react-native";
import { OnboardComp } from "../components/OnboardComp";
import { AppImages } from "../../../constants/AppImages";
import { AppColors } from "../../../constants/AppColors";
import { AuthButtons } from "../components/AuthButtons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/slices/authSlice";

export const Onboard = () => {
  const dispatch = useDispatch();
  const [onBoardIndex, setOnBoardIndex] = useState(0);
  const onBoardData = [
    {
      img: AppImages.onboard1,
      heading: "Simplify Home Services!",
      description:
        "Effortlessly request reliable AC, electrical, or plant-based services, and let skilled fixers handle your needs on demand.",
      btnonPress: () => setOnBoardIndex((prevIndex) => prevIndex + 1),
      textonPress: () => dispatch(authActions.setOnboard(true)),
    },
    {
      img: AppImages.onboard2,
      heading: "Connect. Request. Relax!",
      description:
        "Experience hassle-free home services—request repairs, relax, and let skilled fixers handle the rest with reliability and ease!",
      btnonPress: () => setOnBoardIndex((prevIndex) => prevIndex + 1),
      textonPress: () => dispatch(authActions.setOnboard(true)),
    },
    {
      img: AppImages.onboard3,
      heading: "Opportunities for Fixers!",
      description:
        "Join a network of skilled professionals, apply for jobs, and grow your income with flexible, contract-based opportunities!",
      btnonPress: () => dispatch(authActions.setOnboard(true)),
      textonPress: () => dispatch(authActions.setOnboard(true)),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rowItemMarked}></View>
        <View
          style={
            onBoardIndex >= 1 ? styles.rowItemMarked : styles.rowItem
          }></View>
        <View
          style={
            onBoardIndex >= 2 ? styles.rowItemMarked : styles.rowItem
          }></View>
      </View>
      {onBoardIndex == 0 && <OnboardComp item={onBoardData[onBoardIndex]} />}
      {onBoardIndex == 1 && <OnboardComp item={onBoardData[onBoardIndex]} />}
      {onBoardIndex == 2 && <OnboardComp item={onBoardData[onBoardIndex]} />}
      <AuthButtons
        btnonPress={onBoardData[onBoardIndex]?.btnonPress} // Pass function, not execution
        textonPress={onBoardData[onBoardIndex]?.textonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: AppColors.white,
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    columnGap: 8,
  },
  rowItem: {
    flex: 1,
    backgroundColor: AppColors.grey,
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
