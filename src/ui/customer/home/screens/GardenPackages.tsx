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

export const GardenPackages = ({ item, setPrice, updateServiceDetails }) => {
  const scrollViewRef = useRef(null);

  const [pestControlOptions, setPestControlOptions] = useState([
    {
      label: "Organic + AED 100",
      selected: true,
      price: 100,
    },
    {
      label: "Non Organic",
      selected: false,
      price: 0,
    },
  ]);

  const [tabs, setTabs] = useState([
    { label: "Agricultural Engineer Visit", selected: true, price: 0 },
    { label: "Gardener Services", selected: false, price: 200 },
    { label: "Pest Control Spray", selected: false, price: 100 },
    { label: "Fertilizer & Nutrient Service", selected: false, price: 0 },
    { label: "Swimming Pool Maintenance", selected: false, price: 100 },
  ]);

  const toggleTabsByIndex = (index) => {
    setTabs((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index ? { ...option, selected: true } : { ...option, selected: false }
      )
    );
  };

  const updateSelectedOptions = () => {
    console.log("FUNCTION RUN");
    const selectedTab = tabs.find((tab) => tab.selected)?.label || null;

    let selectedPestControl = pestControlOptions
      .filter((option) => option.selected)
      .map((option) => ({ label: option.label, price: option.price || 0 }));

    let selectedOptions = { serviceCategory: selectedTab };
    let totalPrice = tabs.find((tab) => tab.selected)?.price || 0;

    if (selectedTab === "Pest Control Spray") {
      selectedOptions.pestControl = selectedPestControl.length
        ? selectedPestControl[0].label
        : null;
      totalPrice += selectedPestControl[0]?.price || 0;
    }

    Object.keys(selectedOptions).forEach((key) => {
      if (!selectedOptions[key]) delete selectedOptions[key];
    });

    updateServiceDetails("addon", selectedOptions);
    setPrice(totalPrice);
  };

  useEffect(() => {
    updateSelectedOptions();
  }, [tabs, pestControlOptions]);

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
            <QoutationBaseComp
              heading={"Package Details"}
              headingDescription={" / month"}
              headingDescriptionCount={"3 visits"}
              description={"Our Skilled Gardener will maintain your garden, watering, clipping, soil maintenance, etc., under the supervision of an Agricultural Engineer."}
            />
          )}

          {tabs[2].selected && (
            <OptionBaseComp
              options={pestControlOptions}
              setOptions={setPestControlOptions}
              heading={"Our engineer will visit, inspect and identify the problem. He will spray the proper pest control material."}
            />
          )}

          {tabs[3].selected && (
            <QoutationBaseComp
              description={"Our Agricultural Engineer will visit, inspect, and identify your garden needs and recommend fertilizers and nutrients accordingly."}
              heading={"Package Details"}
            />
          )}

          {tabs[4].selected && (
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
