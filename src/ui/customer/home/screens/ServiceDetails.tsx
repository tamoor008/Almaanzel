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
import database from "@react-native-firebase/database"; // Firebase Realtime Database
import { useSelector } from "react-redux";

export const ServiceDetails = ({ navigation }) => {
  const selector = useSelector(state => state.AppReducer);
  const user = selector.user
  const userId = user.uid
  const router = useRoute();
  const [progress, setProgress] = useState(0.25);
  const { type, item } = router.params; // Fetch userId from params
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [price, setPrice] = useState(0)

  // ✅ Centralized service data state
  const [serviceData, setServiceData] = useState({
    displayId:'123123',
    serviceType: item.heading,
    userId: userId,
    status: 'Upcoming',
    price:price,
    details: {},
  });

  // ✅ Function to update service details dynamically
  const updateServiceData = (key, value) => {
    console.log('serviceData',serviceData);

    setServiceData((prevData) => ({
      ...prevData,
      price:price,
      details: {
        ...prevData.details,
        [key]: value,
      },
    }));
  };

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
        });
      };
    }, [navigation])
  );

  const goBack = () => {
    navigation.goBack();
  };

  // ✅ Function to handle service submission
  const submitServiceRequest = async () => {
    console.log('final service data', serviceData);

    try {
      await database()
        .ref(`/serviceRequests/${userId}`)
        .push(serviceData);
      setSuccessModalVisible(true);
    } catch (error) {
      console.log("Error submitting service request:", error.message);
    }
  };

  // ✅ Function to render the correct component based on service type
  const renderComponent = (key) => {
    const commonProps = { item, updateServiceData };

    switch (key) {
      case "NeedHand":
        return <NeedHand setPrice={setPrice} updateServiceDetails={updateServiceData} item={item} />;
      case "watertank&services":
        return <WaterTankHeater setPrice={setPrice} updateServiceDetails={updateServiceData} item={item} />;
      case "GardenPackages":
        return <GardenPackages setPrice={setPrice} updateServiceDetails={updateServiceData} item={item}/>;
      case "AcServicePackages":
        return <AcServicePackages setPrice={setPrice} updateServiceDetails={updateServiceData} item={item}/>;
      case "EmergencyCall":
        return <EmergencyCall setPrice={setPrice} updateServiceDetails={updateServiceData} item={item} />;
      case "WindowsCleaning":
        return <WindowsCleaning setPrice={setPrice} updateServiceDetails={updateServiceData} item={item} />;
      case "HomeSoftWork":
        return <HomeSoftWork setPrice={setPrice} updateServiceDetails={updateServiceData} item={item} />;
      case "AnnualMaintenancePackage":
        return <AnnualMaintenancePackage setPrice={setPrice} updateServiceDetails={updateServiceData} item={item} />;
      default:
        return <View style={{ flex: 1 }}></View>;
    }
  };

  return (
    <View style={styles.container}>
      <Header back={true} heading={item.heading} navigation={navigation} />
      <ProgressBar progress={progress} />

      {progress === 0.25 && renderComponent(type)}
      {progress === 0.5 && <DateSelection type={type} updateServiceData={updateServiceData} />}
      {progress === 0.75 && <CustomRequirements navigation={navigation} updateServiceData={updateServiceData} />}
      {progress === 1 && <PaymentInformation navigation={navigation} updateServiceData={updateServiceData} />}

      <ServicesFooter
        onPress={() => {
          setProgress((progress) => {
            if (progress < 1) {
              return progress + 0.25;
            } else {
              submitServiceRequest();
              return 1;
            }
          });
        }}
        price={price}
        priceDescription={item.footerDescription}
        btnText={"Next"}
      />

      <SuccessModal
        onPress={goBack}
        visible={successModalVisible}
        heading={"Congratulations"}
        description={
          "Your request has been submitted Successfully. You will receive a confirmation email soon.\nThank You."
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
