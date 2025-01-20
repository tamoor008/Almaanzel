import { StyleSheet, View } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { Header } from "../components/Header";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { NeedHand } from "./NeedHand";
import { ServicesFooter } from "../components/ServicesFooter";
import { DateSelection } from "./DateSelection";
import { PaymentInformation } from "./PaymentInformation";
import { CustomRequirements } from "./CustomRequirements";
import { SuccessModal } from "../../../../components/SuccessModal";
import { WaterTankHeater } from "./WaterTankHeater";
import { GardenPackages } from "./GardenPackages";
import { AcServicePackages } from "./AcServicePackages";
import { EmergencyCall } from "./EmergencyCall";
import { WindowsCleaning } from "./WindowsCleaning";
import { HomeSoftWork } from "./HomeSoftWork";
import { AnnualMaintenancePackage } from "./AnnualMaintenancePackage";

export const ServiceDetails = ({ navigation }) => {
  const router = useRoute();
  const [progress, setProgress] = useState(0.25);
  const { type, item } = router.params;
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            backgroundColor: AppColors.white,
            height: 70,
            paddingTop: 8,
            paddingBottom: 8,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }); // Reset tab bar when leaving screen
      };
    }, [navigation])
  );
  const goBack = () => {
    navigation.goBack();
  };

  const renderComponent = (key) => {
    switch (key) {
      case "NeedHand":
        return <NeedHand item={item} />;

      case "watertank&services":
        return <WaterTankHeater item={item} />;
      case "GardenPackages":
        return <GardenPackages item={item} />;
      case "AcServicePackages":
        return <AcServicePackages item={item} />;
      case "EmergencyCall":
        return <EmergencyCall item={item} />;
      case "WindowsCleaning":
        return <WindowsCleaning item={item} />;
      case "HomeSoftWork":
        return <HomeSoftWork item={item} />;
      case "AnnualMaintenancePackage":
        return <AnnualMaintenancePackage item={item} />;
      default:
        return <View style={{ flex: 1 }}></View>;
    }
  };

  return (
    <View style={styles.container}>
      <Header back={true} heading={item.heading} navigation={navigation} />
      <ProgressBar progress={progress} />
      {progress == 0.25 && renderComponent(type)}
      {progress == 0.5 && <DateSelection />}
      {progress == 0.75 && <CustomRequirements />}
      {progress == 1 && <PaymentInformation />}

      <ServicesFooter
        onPress={() => {
          setProgress((progress) => {
            if (progress < 1) {
              return progress + 0.25; // Return the updated progress
            } else {
              setSuccessModalVisible(true);
              return 1; // Ensure progress does not exceed 1
            }
          });
        }}
        price={item.price}
        priceDescription={item.footerDescription}
        btnText={"Next"}
      />

      <SuccessModal
        onPress={goBack}
        visible={successModalVisible}
        heading={"Congratulations"}
        description={
          "Your request has been submitted Successfully you will receive the confirmation email soon.\n Thank You."
        }
        btnText={"Ok"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
