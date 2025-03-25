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
import { OptionBaseComp2 } from "../components/OptionBaseComp2";

export const WindowsCleaning = ({ item, setPrice, updateServiceDetails }) => {
  const scrollViewRef = useRef(null);
  const [tabs, setTabs] = useState([
    { label: "Exterior & interior glass and frame", selected: true, price: 0, description: 'ss' },
    { label: "Exterior & frame", selected: false, price: 0 },
    { label: "Cleaning tbat requires scaffolding", selected: false, price: 0 },
    { label: "Hourly", selected: false, price: 0 },
  ]);




  const toggleTabsByIndex = (index) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab, i) => ({ ...tab, selected: i === index }))
    );
  };

  const updateSelectedOptions = () => {
    console.log("FUNCTION RUN");

    const selectedTab = tabs.find((tab) => tab.selected)?.label || null;
    let totalPrice = tabs.find((tab) => tab.selected)?.price || 0;
    let selectedOptions = { serviceCategory: selectedTab };

    // If "AC Maintenance" is selected, include maintenance options
    if (selectedTab === "AC Maintenance") {
      let selectedMaintenanceOption = maintenanceOptions.find((option) => option.selected);
      if (selectedMaintenanceOption) {
        selectedOptions.maintenance = selectedMaintenanceOption.label;
        totalPrice += selectedMaintenanceOption.price;
      }

      updateServiceDetails("addon", selectedOptions);
      setPrice(totalPrice);
      return;
    }

    updateServiceDetails("addon", selectedOptions);
    setPrice(totalPrice);
  };

  useEffect(() => {
    updateSelectedOptions();
  }, [tabs]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }} ref={scrollViewRef}>
        <Image resizeMode="stretch" style={{ height: 249, width: "100%" }} source={item.img} />
        <Description description={"Select the type of windows cleaning service you want and you will get the rate according to that. Our agent will come and get the measurements for you and give you the exact rate"} />

        <View style={{ paddingHorizontal: 16, rowGap: 16 }}>
          <Text style={styles.headingText}>{"Select which specific type service you want."}</Text>

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
            <QoutationBaseComp heading={'AED 22 sq/m'} />
          )}
           {tabs[1].selected && (
            <QoutationBaseComp heading={'AED 15 sq/m'} />
          )}
           {tabs[2].selected && (
            <QoutationBaseComp heading={'AED 35 sq/m'} />
          )}
           {tabs[3].selected && (
            <QoutationBaseComp heading={'AED 32/Hour'} />
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