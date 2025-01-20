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
import { SingleOptionComp } from "../components/SingleOptionComp";
import { CustomInputBaseComp } from "../components/CustomInputBaseComp";

export const AcServicePackages = ({ item }) => {
  const scrollViewRef = useRef(null);
  const [numberOfDucts, setNumberOfDucts] = useState("1");
  const [splitType, setSplitType] = useState([
    {
      label: "Add Coil Cleaning",
      supportText: "+ AED 150",
      selected: true,
    },
  ]);

  const [tabs, setTabs] = useState([
    {
      label: "Split Type",
      selected: true,
    },
    {
      label: "Split / Duct System",
      selected: false,
    },
    {
      label: "Centralized AC",
      selected: false,
    },
    {
      label: "New AC Fixing (Split Type)",
      selected: false,
    },
    {
      label: "Duct Cleaning",
      selected: false,
    },
    {
      label: "AC Repair",
      selected: false,
    },
    {
      label: "Full AC Repair & Maintenance",
      selected: false,
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
            "These are the packages tailored specifically to serve your garden’s outdoor area."
          }
        />

        <View style={{ paddingHorizontal: 16, rowGap: 16 }}>
          <Text style={styles.headingText}>
            {"Select which specific service you want"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 8,
              rowGap: 8,
              flexWrap: "wrap",
              borderRadius: 4,
            }}>
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
                  backgroundColor: item.selected
                    ? AppColors.mainBlue
                    : AppColors.grey,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: FontFamilty.medium,
                    color: item.selected ? AppColors.white : AppColors.black,
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {tabs[0].selected && (
            <SingleOptionComp
              options={splitType}
              setOptions={setSplitType}
              description={
                "This package includes the whole cleaning service for your Split AC’s indoor and outdoor units. It includes the Filter and Gas for your AC"
              }
              heading={"Package Details"}
            />
          )}

          {tabs[1].selected && (
            <QoutationBaseComp
              heading={"Package Details"}
              description={
                "This package includes the whole cleaning service for your duct AC’s indoor and outdoor units. It includes the Filter and Gas for your AC"
              }
            />
          )}
          {tabs[2].selected && (
            <QoutationBaseComp
              heading={"Package Details"}
              description={
                "Our agent will visit your location and after inspecting your centralized AC he will give you the quotation according to the requirements."
              }
            />
          )}
          {tabs[3].selected && (
            <QoutationBaseComp
              description={
                "Our agent will help you setup a new AC. The material is not included in this cost."
              }
              heading={"Package Details"}
            />
          )}
          {tabs[4].selected && (
            <View style={{ rowGap: 16 }}>
              <QoutationBaseComp
                heading={"Package Details"}
                description={
                  "Our agent will help you to clean your ducts to have a smooth air flow from them."
                }
              />
              <CustomInputBaseComp
                heading={"Choose the number of Ducts you want us to clean."}
                text={numberOfDucts}
                setText={setNumberOfDucts}
              />
            </View>
          )}
          {tabs[5].selected && (
            <QoutationBaseComp
              heading={"Package Details"}
              description={
                "Our agent will visit your location and after inspecting your AC he will give you the quotation according to the requirements."
              }
            />
          )}
          {tabs[6].selected && (
            <QoutationBaseComp
              heading={"Package Details"}
              description={
                "This is one full service for your AC’s. You can avail this service for everything including the Repair, Maintenance and Services of your AC’s. Just Pay once and never have any stress about your AC"
              }
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
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
});
