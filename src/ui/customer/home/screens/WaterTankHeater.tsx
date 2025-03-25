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

export const WaterTankHeater = ({ item, updateServiceDetails, setPrice,setAddons,addons  }) => {
  const scrollViewRef = useRef(null);

  const [waterTankCleaningOption, setWaterTankCleaningOption] = useState([
    {
      label: "On Ground",
      selected: true,
      price:0,

    },
    {
      label: "Under Ground",
      price:1300,
      selected: false,
      description:
        "The Price of ON-GROUND water tank replacement is quotation base. Our agent will visit your location and will give you the exact price according to your required size.",
    },
  ]);

  const [waterLevelOptions, setWaterLevelOptions] = useState([
    {
      label: "Floor Level",
      selected: true,
      price:0,

    },
    {
      label: "Roof Level",
      price:250,
      selected: false,
      description:
        "Roof Level Tank Cleaning includes the Roof Cleaning and Drainage Flushing which will cost you AED 250",
    },
  ]);
  const [waterHeaterOptions, setWaterHeaterOptions] = useState([
    {
      label: "Repair",
      selected: true,
      price:0,

    },
    {
      label: "Full Change",
      selected: false,
      price:0,

    },
  ]);

  const [onGroundOption, setOnGroundOptions] = useState([
    {
      label: "Less than 1000 Gallon",
      price:800,
      selected: true,
    },
    {
      label: "More than 1000 Gallon",
      price:1100,
      selected: false,
    },
  ]);

  const [tabs, setTabs] = useState([
    {
      label: "Water Tank Cleaning",
      selected: true,
      price:0,

    },
    {
      label: "Water Tank Replacement",
      selected: false,
      price:0,

    },
    {
      label: "Water Heater",
      selected: false,
      price:0,

    },
  ]);

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

  const updateSelectedOptions = () => {
    console.log("FUNCTION RUN");
  
    const selectedTab = tabs.find((tab) => tab.selected)?.label || null;
  
    let selectedWaterTankCleaning = waterTankCleaningOption
      .filter((option) => option.selected)
      .map((option) => ({ label: option.label, price: option.price || 0 }));
  
    let selectedWaterHeater = waterHeaterOptions
      .filter((option) => option.selected)
      .map((option) => ({ label: option.label, price: option.price || 0 }));
  
    let selectedOnGround = onGroundOption
      .filter((option) => option.selected)
      .map((option) => ({ label: option.label, price: option.price || 0 }));
  
    let selectedWaterLevel = waterLevelOptions
      .filter((option) => option.selected)
      .map((option) => ({ label: option.label, price: option.price || 0 }));
  
    let selectedOptions = { serviceCategory: selectedTab };
    let totalPrice = 0;
  
    if (selectedTab === "Water Tank Cleaning") {
      if (selectedWaterTankCleaning.some((item) => item.label === "On Ground")) {
        selectedOptions.waterTankCleaning = "On Ground";
        if (selectedOnGround.length) {
          selectedOptions.onGround = selectedOnGround[0].label;
          totalPrice += selectedOnGround[0].price;
        }
      } else {
        selectedOptions.waterTankCleaning = "Under Ground";
        totalPrice += selectedWaterTankCleaning[0]?.price || 0;
      }
    } else if (selectedTab === "Water Heater") {
      selectedOptions.waterHeater = selectedWaterHeater.length
        ? selectedWaterHeater[0].label
        : null;
      totalPrice += selectedWaterHeater[0]?.price || 0;
    } else if (selectedTab === "Water Tank Replacement") {
      selectedOptions.waterTankReplacement = "Quotation Based";
      totalPrice = 0; // Since the price is determined by an agent
    }
  
    // Add selected water level option
    if (selectedWaterLevel.length) {
      selectedOptions.waterLevel = selectedWaterLevel[0].label;
      totalPrice += selectedWaterLevel[0].price;
    }
  
    // Remove null values
    Object.keys(selectedOptions).forEach((key) => {
      if (!selectedOptions[key]) delete selectedOptions[key];
    });
  
    // Update service details with selected options
    updateServiceDetails("addon", selectedOptions);
  
    // Update the total price
    setPrice(totalPrice);
  };
  





  // Run updateSelectedOptions when any option changes
  useEffect(() => {
    updateSelectedOptions();
    setAddons(true)
  }, [waterTankCleaningOption, waterHeaterOptions, onGroundOption,tabs,waterLevelOptions]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 16 }}
        ref={scrollViewRef}
      >
        <Image
          resizeMode="stretch"
          style={{ height: 249, width: "100%" }}
          source={item.img}
        />
        <Description
          description={
            "This Package allows you to benefit from our services on fixed fees"
          }
        />

        <View style={{ paddingHorizontal: 16, rowGap: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: AppColors.white,
              elevation: 10,
              borderRadius: 4,
            }}
          >
            {tabs.map((item, index) => (
              <TouchableOpacity
                onPress={() => toggleTabsByIndex(index)}
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

          {tabs[0].selected && (
            <View style={{ rowGap: 16 }}>
              <OptionBaseComp
                options={waterTankCleaningOption}
                setOptions={setWaterTankCleaningOption}
                heading={"Select the type of water tank you want us to Clean"}
              />
              {waterTankCleaningOption[0].selected && (
                <View style={{rowGap:16}}>
                <OptionBaseComp
                options={waterLevelOptions}
                setOptions={setWaterLevelOptions}
                heading={
                  "Select the Ground Level of your Tank"
                }
              />
                <OptionBaseComp
                  options={onGroundOption}
                  setOptions={setOnGroundOptions}
                  heading={
                    "Select the approximate size of your water tank to get the estimated cost."
                  }
                />
                </View>
              )}
            </View>
          )}
          {tabs[1].selected && (
            <QoutationBaseComp
              heading={"Package Details"}
              description={
                "The Price of ON-GROUND water tank replacement is quotation base. Our agent will visit your location and will give you the exact price according to your required size."
              }
            />
          )}
          {tabs[2].selected && (
            <OptionBaseComp
              options={waterHeaterOptions}
              setOptions={setWaterHeaterOptions}
              heading={"Select which service you need for your water heater."}
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
