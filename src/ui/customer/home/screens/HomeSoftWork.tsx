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

export const HomeSoftWork = ({ item }) => {
  const scrollViewRef = useRef(null);
  const [gypsumWorkSqft, setGypsumWorkSqft] = useState("1");
  const [falseceilingSqft, setFalseceilingSqft] = useState("1");
  const [dooradjustmenthr, setdooradjustmenthr] = useState("1");
  const [carpentryhr, setcarpentryhr] = useState("1");

  const [splitType, setSplitType] = useState([
    {
      label: "Add Coil Cleaning",
      supportText: "+ AED 150",
      selected: true,
    },
  ]);

  const [tabs, setTabs] = useState([
    {
      label: "Gypsum Work",
      selected: true,
    },
    {
      label: "False Ceiling Work",
      selected: false,
    },
    {
      label: "Door Adjustment",
      selected: false,
    },
    {
      label: "Carpentry / Kitchen Cabinets / Simple",
      selected: false,
    },
    {
      label: "Others",
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
            "These are the packages tailored specifically to handle all the needs for your soft home works."
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
            <View style={{ rowGap: 16 }}>
              <QoutationBaseComp
                heading={"Package Details"}
                description={
                  "This package includes all the work related to Gypsum. Our expert fixer will come and solve your issues. All the material costs are included in this except Paint."
                }
              />
              <CustomInputBaseComp
                heading={
                  "Enter the number of Square Meter you want us to work in."
                }
                text={gypsumWorkSqft}
                descriptionInput={"AED 120 / Sq ft"}
                setText={setGypsumWorkSqft}
              />
            </View>
          )}

          {tabs[1].selected && (
            <View style={{ rowGap: 16 }}>
              <QoutationBaseComp
                heading={"Package Details"}
                description={
                  "This package includes all the work related to False Ceiling. Our expert fixer will come and solve your issues. All the material costs are included in this."
                }
              />
              <CustomInputBaseComp
                heading={
                  "Enter the number of Square Meter you want us to work in."
                }
                text={falseceilingSqft}
                descriptionInput={"AED 130 / Sq ft"}
                setText={setFalseceilingSqft}
              />
            </View>
          )}
          {tabs[2].selected && (
            <View style={{ rowGap: 16 }}>
              <QoutationBaseComp
                heading={"Package Details"}
                description={
                  "This package includes all the work related to Door Adjustment. Our expert fixer will come and solve your issues."
                }
              />
              <CustomInputBaseComp
                heading={"Enter the approximate number of Doors which needs to be changed/adjusted."}
                text={dooradjustmenthr}
                descriptionInput={"AED 100 / Hour"}
                setText={setdooradjustmenthr}
              />
            </View>
          )}
          {tabs[3].selected && (
            <View style={{ rowGap: 16 }}>
              <QoutationBaseComp
                heading={"Package Details"}
                description={
                  "This package includes all the work related to Carpenter, it can be any wood work."
                }
              />
              <CustomInputBaseComp
                heading={"Enter the approximate number of hours required."}
                text={carpentryhr}
                descriptionInput={"AED 90 / Hour"}
                setText={setcarpentryhr}
              />
            </View>
          )}
          {tabs[4].selected && (
            <View style={{ rowGap: 16 }}>
              <QoutationBaseComp
                heading={"Package Details"}
                description={
                  "Our agent will visit your location and after inspecting the work required he will give you the quotation according to the requirements."
                }
              />
            </View>
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
