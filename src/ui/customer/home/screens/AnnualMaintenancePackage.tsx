import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useEffect, useRef, useState } from "react";
import { Description } from "../components/Description";
import FontFamilty from "../../../../constants/FontFamilty";
import { AnnualMaintenanceComp } from "../components/AnnualMaintenanceComp";

export const AnnualMaintenancePackage = ({ item, setPrice, updateServiceDetails }) => {
  const scrollViewRef = useRef(null);
  const [options, setOptions] = useState([
    { label: "Agricultural Engineer Visit", time: "6 times / Year", price: 100, selected: false },
    { label: "Pest Control Spray", time: "6 times / Year", price: 100, selected: false },
    { label: "Fertilizer & Nutrient Service", time: "6 times / Year", price: 100, selected: false },
    { label: "Window Cleaning", time: "6 times / Year", price: 100, selected: false },
    { label: "AC maintenance & Cleaning", time: "6 times / Year", price: 100, selected: false },
    { label: "Duct Cleaning", time: "6 times / Year", price: 100, selected: false },
    { label: "Water Tank Cleaning", time: "6 times / Year", price: 100, selected: false },
    { label: "Swimming Pool Clinic", time: "6 times / Year", price: 100, selected: false },
    { label: "Handyman Callout", time: "6 times / Year", price: 100, selected: false },
    { label: "Emergency Call", time: "6 times / Year", price: 100, selected: false },
  ]);

  const changeSelectedStatus = (index) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, selected: !option.selected } : option
    );

    setOptions(updatedOptions);

    // Filter selected services
    const selectedServices = updatedOptions.filter((opt) => opt.selected).map((opt) => opt.label);

    // Calculate total price based on selected services
    const totalPrice = updatedOptions
      .filter((opt) => opt.selected)
      .reduce((sum, opt) => sum + opt.price, 0);

    updateServiceDetails("addon", selectedServices);
    setPrice(totalPrice);
  };

 

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }} ref={scrollViewRef}>
        <Image resizeMode="stretch" style={{ height: 249, width: "100%" }} source={item.img} />
        <Description
          heading={"Create your own custom Package"}
          description={"Select all the services you want for this year in your maintenance package."}
        />
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
