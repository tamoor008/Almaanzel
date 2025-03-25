import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
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
  const [loader, setLoader] = useState(false)
  const user = selector.user
  const userId = user.uid
  const router = useRoute();
  const [progress, setProgress] = useState(0.25);
  const { type, item } = router.params; // Fetch userId from params
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [price, setPrice] = useState(0)

  // ✅ Centralized service data state
  const [serviceData, setServiceData] = useState({
    displayId: '123123',
    serviceType: item.heading,
    userId: userId,
    status: 'unassigned',
    price: price,
    details: {},
  });

  // ✅ Function to update service details dynamically
  const updateServiceData = (key, value) => {
    console.log('serviceData', serviceData);

    setServiceData((prevData) => ({
      ...prevData,
      price: price,
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
    console.log('Final service data:', serviceData);
    setLoader(true)

    try {
      const newServiceRef = database().ref(`/serviceRequests/${userId}`).push();
      const newServiceKey = newServiceRef.key; // Get the generated key

      await newServiceRef.set({
        ...serviceData,
        displayId: newServiceKey, // Store the key in displayId
      });

      setSuccessModalVisible(true);
      setLoader(false)
    } catch (error) {
      console.log("Error submitting service request:", error.message);
      Alert.alert('Error', "There is some issue with the service, Kindly try again later.");
      setLoader(false)
    }
  };

  const [addons, setAddons] = useState(false)
  const [timeSlot, setTimeSlot] = useState(false)
  const [addresspayment, setAddresspayment] = useState(false)

  // ✅ Function to render the correct component based on service type
  const renderComponent = (key) => {
    const commonProps = { item, updateServiceData };

    switch (key) {
      case "NeedHand":
        return <NeedHand setAddons={setAddons} addons={addons} setPrice={setPrice} updateServiceDetails={updateServiceData} item={item} />;
      case "watertank&services":
        return <WaterTankHeater setPrice={setPrice} updateServiceDetails={updateServiceData} item={item} />;
      case "GardenPackages":
        return <GardenPackages setPrice={setPrice} updateServiceDetails={updateServiceData} item={item} />;
      case "AcServicePackages":
        return <AcServicePackages setPrice={setPrice} updateServiceDetails={updateServiceData} item={item} />;
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
      {progress === 0.5 && <DateSelection setTimeSlot={setTimeSlot} type={type} updateServiceData={updateServiceData} />}
      {progress === 0.75 && <CustomRequirements navigation={navigation} updateServiceData={updateServiceData} />}
      {progress === 1 && loader == false && <PaymentInformation setAddresspayment={setAddresspayment} navigation={navigation} updateServiceData={updateServiceData} />}
      {loader && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator
            size={"large"}
            color={AppColors.mainBlue}></ActivityIndicator>
        </View>
      )}
      <ServicesFooter
        btndisable={progress == 0.25 ? !addons : progress == 0.5 ? !timeSlot : progress == 1 ? !addresspayment : false}
        btnStyle={{ backgroundColor: AppColors.green }}
        onPress={() => {
          setProgress((progress) => {
            // Validation for progress at 0.25
            if (progress === 0.25) {
              if (!addons) {  // Custom function to check required data
                Alert.alert('Error', "Select all the Options to proceed");
                return progress;  // Do not increase progress
              }
            }

            // // Validation for progress at 0.50
            // if (progress === 0.50) {
            //   if (!isValidStepTwoData()) {
            //     Alert.alert("Incomplete Information", "Ensure all required details are filled before proceeding.");
            //     return progress;
            //   }
            // }

            // // Validation for progress at 0.75
            // if (progress === 0.75) {
            //   if (!isValidStepThreeData()) {
            //     Alert.alert("Complete Previous Steps", "Some required fields are missing.");
            //     return progress;
            //   }
            // }

            // If progress reaches 1, submit the request
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
