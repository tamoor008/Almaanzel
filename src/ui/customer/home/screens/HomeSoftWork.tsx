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
import { CustomInputBaseComp } from "../components/CustomInputBaseComp";

export const HomeSoftWork = ({ item, setPrice, updateServiceDetails ,setAddons,addons }) => {
  const scrollViewRef = useRef(null);
  const [serviceInput, setServiceInput] = useState("1");

  const [tabs, setTabs] = useState([
    { label: "Gypsum Work", selected: true, price: 120, unit: "Sq ft" },
    { label: "False Ceiling Work", selected: false, price: 130, unit: "Sq ft" },
    { label: "Door Adjustment", selected: false, price: 100, unit: "Hour" },
    { label: "Carpentry / Kitchen Cabinets / Simple", selected: false, price: 90, unit: "Hour" },
    { label: "Others", selected: false, price: 0 },
  ]);

  const toggleTabsByIndex = (index) => {
    setTabs((prevTabs) => {
      const isSameTabSelected = prevTabs[index].selected;
      if (isSameTabSelected) return prevTabs; // Don't update if the same tab is selected
  
      return prevTabs.map((tab, i) => ({ ...tab, selected: i === index }));
    });
  
    setServiceInput((prev) => (tabs[index].selected ? prev : '0'));
  };

  const updateSelectedOptions = () => {
    const selectedTab = tabs.find((tab) => tab.selected);
    let totalPrice = selectedTab?.price || 0;
    let selectedOptions = { serviceCategory: selectedTab?.label };

    if (selectedTab?.price > 0 && selectedTab?.unit) {
      selectedOptions.details = `${serviceInput} ${selectedTab.unit}`;
      totalPrice *= parseInt(serviceInput);
    }

    updateServiceDetails("addon", selectedOptions);
    setPrice(totalPrice);
  }

  useEffect(() => {
    updateSelectedOptions();
  }, [tabs, serviceInput]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }} ref={scrollViewRef}>
        <Image resizeMode="stretch" style={{ height: 249, width: "100%" }} source={item.img} />
        <Description description={"These are the packages tailored specifically to handle all the needs for your soft home works."} />

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

          {tabs.slice(0, 4).some((tab) => tab.selected) && (
            <View style={{ rowGap: 16 }}>
              <QoutationBaseComp heading={"Package Details"} description={`This package includes all the work related to ${tabs.find(tab => tab.selected)?.label}.`} />
              <CustomInputBaseComp
                heading={`Enter the required ${tabs.find(tab => tab.selected)?.unit || "details"}.`}
                text={serviceInput}
                descriptionInput={`AED ${tabs.find(tab => tab.selected)?.price} / ${tabs.find(tab => tab.selected)?.unit || ""}`}
                setText={setServiceInput}
              />
            </View>
          )}
          {tabs[4].selected && (
            <QoutationBaseComp heading={"Package Details"} description={"Our agent will visit your location and provide a quotation after inspection."} />
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
