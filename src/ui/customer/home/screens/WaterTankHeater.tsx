import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useRef, useState } from "react";
import { Description } from "../components/Description";
import FontFamilty from "../../../../constants/FontFamilty";
import { QoutationBaseComp } from "../components/QoutationBaseComp";
import { OptionBaseComp } from "../components/OptionBaseComp";

export const WaterTankHeater = ({ item }) => {
  const scrollViewRef = useRef(null);

  const [waterTankCleaningOption, setWaterTankCleaningOption] = useState([
    {
      label: "On Ground",
      selected: true,
    },
    {
      label: "Under Ground",
      selected: false,
      description:
        "The Price of ON-GROUND water tank replacement is quotation base. Our agent will visit your location and will give you the exact price according to your required size.",
    },
  ]);
  const [waterHeaterOptions, setWaterHeaterOptions] = useState([
    {
      label: "Repair",
      selected: true,
    },
    {
      label: "Full Change",
      selected: false,
    },
  ]);

  const [onGroundOption, setOnGroundOptions] = useState([
    {
      label: "Less then 1000 Gallon",
      selected: true,
    },
    {
      label: "More then 1000 Gallon",
      selected: false,
    },
  ]);

  const [tabs, setTabs] = useState([
    {
      label: "Water Tank Cleaning",
      selected: false,
    },
    {
      label: "Water Tank Replacement",
      selected: false,
    },
    {
      label: "Water Heater",
      selected: true,
    },
  ]);
  const toggleTabsByIndex = (index) => {
    setTabs((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index
          ? { ...option, selected: true }
          : { ...option, selected: false }
      )
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 16 }}
        ref={scrollViewRef}>
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
            }}>
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
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: FontFamilty.medium,
                    color: item.selected ? AppColors.white : AppColors.text8181,
                  }}>
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
                <OptionBaseComp
                  options={onGroundOption}
                  setOptions={setOnGroundOptions}
                  heading={
                    "Select the approximate size of your water tank to get the estimated cost."
                  }
                />
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
