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
import { SingleOptionComp } from "../components/SingleOptionComp";
import { CustomInputBaseComp } from "../components/CustomInputBaseComp";

export const AcServicePackages = ({ item, setPrice, updateServiceDetails }) => {
  const scrollViewRef = useRef(null);
  const [numberOfDucts, setNumberOfDucts] = useState("1");
  
  const [tabs, setTabs] = useState([
    { label: "Split Type", selected: true, price: 150 },
    { label: "Split / Duct System", selected: false, price: 250 },
    { label: "Centralized AC", selected: false, price: 0 },
    { label: "New AC Fixing (Split Type)", selected: false, price: 125 },
    { label: "Duct Cleaning", selected: false, price: 10 },
    { label: "AC Repair", selected: false, price: 0 },
    { label: "Full AC Repair & Maintenance", selected: false, price: 600 },
  ]);

  const [splitType, setSplitType] = useState([
    {
      label: "Coil Cleaning",
      supportText: "+ AED 150",
      selected: true,
      price: 150,
    },
  ]);

  const toggleTabsByIndex = (index) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab, i) => ({ ...tab, selected: i === index }))
    );
  };

  const updateSelectedOptions = () => {
    const selectedTab = tabs.find((tab) => tab.selected)?.label || null;
    let totalPrice = tabs.find((tab) => tab.selected)?.price || 0;
    let selectedOptions = { serviceCategory: selectedTab };

    if (selectedTab === "Duct Cleaning") {
      selectedOptions.numberOfDucts = `${numberOfDucts} Ducts`;
      totalPrice += parseInt(numberOfDucts) * 10;
    }

    if (selectedTab === "Split Type") {
      let selectedSplitOptions = splitType.filter(option => option.selected);
      if (selectedSplitOptions.length) {
        selectedOptions.additionalServices = selectedSplitOptions.map(option => option.label).join(", ");
        totalPrice += selectedSplitOptions.reduce((sum, option) => sum + option.price, 0);
      }
    }

    updateServiceDetails("addon", selectedOptions);
    setPrice(totalPrice);
  };

  useEffect(() => {
    updateSelectedOptions();
  }, [tabs, numberOfDucts, splitType]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }} ref={scrollViewRef}>
        <Image resizeMode="stretch" style={{ height: 249, width: "100%" }} source={item.img} />
        <Description description={"These are the packages tailored specifically to serve your AC servicing needs."} />

        <View style={{ paddingHorizontal: 16, rowGap: 16 }}>
          <Text style={styles.headingText}>{"Select which specific service you want"}</Text>

          <View style={styles.tabContainer}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleTabsByIndex(index)}
                activeOpacity={0.9}
                style={[styles.tab, { backgroundColor: tab.selected ? AppColors.mainBlue : AppColors.grey }]}
              >
                <Text style={{ fontSize: 10, fontFamily: FontFamilty.medium, color: tab.selected ? AppColors.white : AppColors.black }}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {tabs[0].selected && (
            <SingleOptionComp
              options={splitType}
              setOptions={setSplitType}
              description={"This package includes the whole cleaning service for your Split AC’s indoor and outdoor units. It includes the Filter and Gas for your AC"}
              heading={"Package Details"}
            />
          )}

          {tabs[4].selected && (
            <View style={{ rowGap: 16 }}>
              <QoutationBaseComp heading={"Package Details"} description={"Our agent will help you clean your ducts for smooth air flow."} />
              <CustomInputBaseComp heading={"Choose the number of Ducts you want us to clean."} text={numberOfDucts} setText={setNumberOfDucts} />
            </View>
          )}

          {tabs.slice(1, 4).concat(tabs.slice(5)).some(tab => tab.selected) && (
            <QoutationBaseComp heading={"Package Details"} description={"Service details will be provided upon agent inspection."} />
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
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    rowGap: 8,
    flexWrap: "wrap",
    borderRadius: 4,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});