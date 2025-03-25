import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useRef, useState, useEffect } from "react";
import { Description } from "../components/Description";
import FontFamilty from "../../../../constants/FontFamilty";
import { QoutationBaseComp } from "../components/QoutationBaseComp";
import { OptionBaseComp } from "../components/OptionBaseComp";
import { OptionBaseComp2 } from "../components/OptionBaseComp2";

export const GardenPackages = ({ item, setPrice, updateServiceDetails,setAddons,addons  }) => {
  const scrollViewRef = useRef(null);

  const [pestControlOptions, setPestControlOptions] = useState([
    {
      label: "Organic + AED 100",
      selected: true,
      price: 400,
    },
    {
      label: "Non Organic",
      selected: false,
      price: 300,
    },
  ]);

  const [packages, setPackages] = useState([
    { label: "Basic", selected: true, price: 0 },
    { label: "Comprehensive", selected: false, price: 0 },
  ]);
  
  const [basicOptions, setBasicOption] = useState([
    { label: "Small Villa", selected: true, price: 350 },
    { label: "Large Villa", selected: false, price: 450 },
  ]);
  
  // Effect to update prices dynamically
  useEffect(() => {
    const isBasicSelected = packages.find((pkg) => pkg.label === "Basic")?.selected;
  
    setBasicOption([
      { label: "Small Villa", selected: true, price: isBasicSelected ? 350 : 550 },
      { label: "Large Villa", selected: false, price: isBasicSelected ? 450 : 650 },
    ]);
  }, [packages]); // Runs whenever `packages` changes
  
 

  const [gardernsSerives, setGardernServices] = useState([
    {
      label: "GARDEN PEST CONTROL",
      selected: true,
      price: 300,
    },
    {
      label: "CAR WASH",
      selected: false,
      price: 150,
    },
    {
      label: "SWIMMING POOL CLEANING",
      selected: false,
      price: 300,
    },
   
  ]);

  const [tabs, setTabs] = useState([
    { label: "Agricultural Engineer Visit", selected: true, price: 150 },
    { label: "Gardener Services", selected: false, price: 0 },
    { label: "Gardener Packages", selected: false, price: 0 },

    // { label: "Pest Control Spray", selected: false, price: 0 },
    // { label: "Fertilizer & Nutrient Service", selected: false, price: 0 },
    // { label: "Swimming Pool Maintenance", selected: false, price: 100 },
  ]);

  const toggleTabsByIndex = (index) => {
    setTabs((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index ? { ...option, selected: true } : { ...option, selected: false }
      )
    );
  };

  const updateSelectedOptions = () => {
    // console.log("FUNCTION RUN");
    
    const selectedTab = tabs.find((tab) => tab.selected)?.label || null;
    let totalPrice = tabs.find((tab) => tab.selected)?.price || 0;
    let selectedOptions = { serviceCategory: selectedTab };
  
    // If "Agricultural Engineer Visit" is selected, do not include any add-ons
    if (selectedTab === "Agricultural Engineer Visit") {
      updateServiceDetails("addon", selectedOptions);
      setPrice(totalPrice);
      return;
    }
  
    // If "Gardener Services" is selected, only include garden services
    if (selectedTab === "Gardener Services") {
      let selectedGardenServices = gardernsSerives.filter((service) => service.selected);
      if (selectedGardenServices.length > 0) {
        selectedOptions.gardenServices = selectedGardenServices.map((service) => service.label);
        totalPrice += selectedGardenServices.reduce((sum, service) => sum + service.price, 0);
      }
      updateServiceDetails("addon", selectedOptions);
      setPrice(totalPrice);
      return;
    }
  
    // If "Gardener Packages" is selected, only include package-related add-ons
    if (selectedTab === "Gardener Packages") {
      let selectedPackage = packages.find((pkg) => pkg.selected);
      let selectedBasicOption = basicOptions.find((option) => option.selected);
  
      if (selectedPackage) {
        selectedOptions.package = selectedPackage.label;
      }
  
      if (selectedBasicOption) {
        selectedOptions.basicOption = selectedBasicOption.label;
        totalPrice += selectedBasicOption.price;
      }
  
      updateServiceDetails("addon", selectedOptions);
      setPrice(totalPrice);
      return;
    }
  
    // Get selected options
    let selectedPestControl = pestControlOptions.find((option) => option.selected);
    let selectedGardenServices = gardernsSerives.filter((service) => service.selected);
  
    if (selectedTab === "Pest Control Spray") {
      if (selectedPestControl) {
        selectedOptions.pestControl = selectedPestControl.label;
        totalPrice += selectedPestControl.price;
      }
    }
  
    if (selectedGardenServices.length > 0) {
      selectedOptions.gardenServices = selectedGardenServices.map((service) => service.label);
      totalPrice += selectedGardenServices.reduce((sum, service) => sum + service.price, 0);
    }
  
    // Remove null or undefined values
    Object.keys(selectedOptions).forEach((key) => {
      if (!selectedOptions[key]) delete selectedOptions[key];
    });
  
    // Update service details with selected options
    updateServiceDetails("addon", selectedOptions);
  
    // Update the total price
    setPrice(totalPrice);
  };

  useEffect(() => {
    updateSelectedOptions();
    setAddons(true)
  }, [tabs, pestControlOptions,gardernsSerives,packages,basicOptions]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }} ref={scrollViewRef}>
        <Image resizeMode="stretch" style={{ height: 249, width: "100%" }} source={item.img} />
        <Description description={"These are the packages tailored specifically to serve your garden’s outdoor area."} />

        <View style={{ paddingHorizontal: 16, rowGap: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", borderRadius: 4,rowGap:8,columnGap:8 }}>
            {tabs.map((item, index) => (
              <TouchableOpacity
                onPress={() => toggleTabsByIndex(index)}
                activeOpacity={0.9}
                key={index}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: item.selected ? AppColors.mainBlue : AppColors.grey,
                }}>
                <Text style={{ fontSize: 10, fontFamily: FontFamilty.medium, color: item.selected ? AppColors.white : AppColors.black }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {tabs[0].selected && (
            <QoutationBaseComp
              description={"Our Engineer will inspect, identify, and diagnose your garden needs and present a report to you for requests and options."}
              heading={"Package Details"}
            />
          )}

          {tabs[1].selected && (
              <OptionBaseComp2
              options={gardernsSerives}
              setOptions={setGardernServices}
              heading={"Our engineer will visit, inspect and identify the problem. He will spray the proper pest control material."}
            />
            // <QoutationBaseComp
            //   heading={"Package Details"}
            //   headingDescription={" / month"}
            //   headingDescriptionCount={"3 visits"}
            //   description={"Our Skilled Gardener will maintain your garden, watering, clipping, soil maintenance, etc., under the supervision of an Agricultural Engineer."}
            // />
          )}

          {tabs[2]?.selected && (
                            <View style={{rowGap:16}}>

            <OptionBaseComp
              options={packages}
              setOptions={setPackages}
              heading={"Select the packages to see the option for small and large villas"}
            />

              <OptionBaseComp
              options={basicOptions}
              setOptions={setBasicOption}
              heading={"Select the Option to see the tailored prices just for you"}
            />
            
            </View>
          )}

          {tabs[3]?.selected && (
            <QoutationBaseComp
              description={"Our Agricultural Engineer will visit, inspect, and identify your garden needs and recommend fertilizers and nutrients accordingly."}
              heading={"Package Details"}
            />
          )}

          {tabs[4]?.selected && (
            <QoutationBaseComp
              heading={"Package Details"}
              headingDescription={" / month"}
              headingDescriptionCount={"3 visits"}
              description={"Cleaning of water, skimming, wall cleaning, and addition of chemicals into the pool."}
            />
          )}
        </View>
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
    fontFamily: FontFamilty.bold,
    color: AppColors.mainBlue,
  },
});
