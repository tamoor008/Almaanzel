import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useEffect, useRef, useState } from "react";
import { Description } from "../components/Description";
import FontFamilty from "../../../../constants/FontFamilty";
import { AnnualMaintenanceComp } from "../components/AnnualMaintenanceComp";

export const AnnualMaintenancePackage = ({ item, setPrice, updateServiceDetails }) => {
  const scrollViewRef = useRef(null);


  const changeSelectedStatus = (index) => {
    setOptions((prevOptions) => {
      // Toggle the selected state of the clicked service
      const updatedOptions = prevOptions.map((option, i) =>
        i === index ? { ...option, selected: !option.selected } : option
      );
  
      // Get the currently selected package (Essential, Enhanced, Premium)
      const selectedTab = tabs.find((tab) => tab.selected)?.label || "Essential";
  
      // Get selected services
      const selectedServices = updatedOptions.filter((opt) => opt.selected);
  
      // Calculate the total price dynamically based on the selected package
      const totalPrice = selectedServices.reduce((sum, opt) => {
        return sum + getPriceForOption(opt.label, selectedTab);
      }, 0);
  
      // Update selected services & price
      updateServiceDetails("addon", selectedServices.map((opt) => opt.label));
      setPrice(totalPrice);
  
      return updatedOptions;
    });
  };


  const [tabs, setTabs] = useState([
    { label: "Essential", selected: true, price: 3950 },
    { label: "Enhanced", selected: false, price: 10000 },
    { label: "Premium", selected: false, price: 14000 },
  ]);
  
  const [options, setOptions] = useState(() => {
    const getPrice = (essential, enhanced, premium) => {
      const selectedTab = tabs.find(tab => tab.selected);
      switch (selectedTab.label) {
        case "Enhanced":
          return enhanced;
        case "Premium":
          return premium;
        default:
          return essential;
      }
    };
  
    return [
      { 
        label: "AC MAINTENANCE (MAJOR DEEP CLEANING) WITH INTERNAL & EXTERNAL COIL", 
        time: "Per AC", 
        price: getPrice(3400, 4250, 6375), 
        selected: false 
      },
      { 
        label: "Preventative AC Maintenance", 
        time: "Annual (pressure water, filter, drainage blower)", 
        price: getPrice(1000, 1000, 1000), 
        selected: false 
      },
      { 
        label: "Electrical Inspection Home", 
        time: "Annual", 
        price: getPrice(165, 165, 330), 
        selected: false 
      },
      { 
        label: "Plumbing Inspection Home", 
        time: "Annual", 
        price: getPrice(165, 165, 330), 
        selected: false 
      },
      { 
        label: "Water Tank Cleaning", 
        time: "Per Service", 
        price: getPrice(800, 1600, 1600), 
        selected: false 
      },
      { 
        label: "Roof Cleaning", 
        time: "Per Service (brush and vacuum ONLY)", 
        price: getPrice(150, 150, 150), 
        selected: false 
      },
      { 
        label: "Garden Pest Control", 
        time: "Annual", 
        price: getPrice(350, 700, 1050), 
        selected: false 
      },
      { 
        label: "Floor Polishing", 
        time: "Per Service (NO SKIMMING)", 
        price: getPrice(2500, 2500, 3750), 
        selected: false 
      },
      { 
        label: "Window Cleaning", 
        time: "Per Service (maximum 100sq/m of ACCESSIBLE glass, skyroof not inclusive)", 
        price: getPrice(2500, 2500, 2500), 
        selected: false 
      },
      { 
        label: "Handyman Callout", 
        time: "Annual (FREE 1HR/YR)", 
        price: getPrice(165, 330, 495), 
        selected: false 
      },
      { 
        label: "Emergency Callout", 
        time: "8AM - 5PM)", 
        price: 0, 
        selected: false 
      },
    ];
  });
  
  // Function to update selected tab and adjust prices
  const handleTabChange = (selectedLabel) => {
    setTabs(prevTabs =>
      prevTabs.map(tab => ({ ...tab, selected: tab.label === selectedLabel }))
    );
  
    setOptions(prevOptions =>
      prevOptions.map(option => ({
        ...option,
        price: getPriceForOption(option.label, selectedLabel),
      }))
    );
  };
  
  // Function to get price based on selected tab
  const getPriceForOption = (label, selectedLabel) => {
    const pricingMap = {
      "AC MAINTENANCE (MAJOR DEEP CLEANING) WITH INTERNAL & EXTERNAL COIL": { Essential: 3400, Enhanced: 4250, Premium: 6375 },
      "Preventative AC Maintenance": { Essential: 1000, Enhanced: 1000, Premium: 1000 },
      "Electrical Inspection Home": { Essential: 165, Enhanced: 165, Premium: 330 },
      "Plumbing Inspection Home": { Essential: 165, Enhanced: 165, Premium: 330 },
      "Water Tank Cleaning": { Essential: 800, Enhanced: 1600, Premium: 1600 },
      "Roof Cleaning": { Essential: 150, Enhanced: 150, Premium: 150 },
      "Garden Pest Control": { Essential: 350, Enhanced: 700, Premium: 1050 },
      "Floor Polishing (No Skimming)": { Essential: 2500, Enhanced: 2500, Premium: 3750 },
      "Window Cleaning (100 sq/m accessible glass)": { Essential: 2500, Enhanced: 2500, Premium: 2500 },
      "Handyman Callout (1 HR/Year)": { Essential: 165, Enhanced: 330, Premium: 495 },
      "Emergency Callout (8AM - 5PM)": { Essential: "Included", Enhanced: "Included", Premium: "Included" },
    };
  
    return pricingMap[label]?.[selectedLabel] || 0;
  };

  // Function to update the selected service category
  const toggleTabsByIndex = (index) => {
    setTabs((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index
          ? { ...option, selected: true }
          : { ...option, selected: false }
      )
    );

  };


  const calculateTotalPrice = () => {
    // Get the currently selected package
    const selectedTab = tabs.find(tab => tab.selected)?.label || "Essential";
  
    // Calculate total price dynamically based on selected services & package
    const totalPrice = options
      .filter(option => option.selected) // Only selected services
      .reduce((sum, option) => {
        const price = getPriceForOption(option.label, selectedTab);
        return sum + price;
      }, 0);
  
    setPrice(totalPrice); // Update the total price state
  };

  useEffect(()=>{
    calculateTotalPrice()
  },[tabs])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }} ref={scrollViewRef}>
        <Image resizeMode="stretch" style={{ height: 249, width: "100%" }} source={item.img} />
        <Description
          heading={"Create your own custom Package"}
          description={"Select all the services you want for this year in your maintenance package."}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: AppColors.white,
            borderRadius: 4,
            margin:16,
            marginTop:0,
            marginBottom:16,
            elevation:10
          }}
        >
          {tabs.map((item, index) => (
            <TouchableOpacity
              onPress={() => handleTabChange(item.label)}
              activeOpacity={0.9}
              key={index}
              style={{
                flex: 1,
                height: 50,
                padding: 12,
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: item.selected
                  ? AppColors.mainBlue
                  : AppColors.white,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: FontFamilty.medium,
                  color: item.selected ? AppColors.white : AppColors.text8181,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          scrollEnabled={false}
          removeClippedSubviews={false}
          ItemSeparatorComponent={() => <View style={{ margin: 8 }} />}
          renderItem={({ item, index }) => (
            <AnnualMaintenanceComp index={index} changeSelectedStatus={changeSelectedStatus} item={item} />
          )}
          data={options}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
});
