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
import { MultiOptionBase } from "../components/MultiOptionBase";

export const GardenPackages = ({ item }) => {
  const scrollViewRef = useRef(null);

  const [pestControlOptions, setPestControlOptions] = useState([
    {
      label: "Organic\n+ AED 100",
      selected: true,
    },
    {
      label: "Non Organic",
      selected: false,
    },
  ]);

  const [tabs, setTabs] = useState([
    {
      label: "Agricultural Engineer Visit",
      selected: true,
    },
    {
      label: "Gardener Services",
      selected: false,
    },
    {
      label: "Pest Control Spray",
      selected: false,
    },
    {
      label: "Fertilizer & Nutrient Service",
      selected: false,
    },
    {
      label: "Swimming Pool Maintenance",
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
            <QoutationBaseComp
              description={
                "Our Engineer will inspect, Identify and Diagnose your garden needs and present report to you for requests and options"
              }
              heading={"Package Details"}
            />
          )}

          {tabs[1].selected && (
            <QoutationBaseComp
              heading={"Package Details"}
              headingDescription={" / month"}
              headingDescriptionCount={"3 visits"}
              description={
                "Our Skilled Gardener will maintain your garden, watering, clipping, Soil maintenance etc. Will be done under the supervision of agricultural Engineer."
              }
            />
          )}
          {tabs[2].selected && (
            <OptionBaseComp
              options={pestControlOptions}
              setOptions={setPestControlOptions}
              heading={
                "Our engineer will visit, inspect and identify the problem. He will spray the proper pest control material."
              }
            />
          )}
          {tabs[3].selected && (
            <QoutationBaseComp
              description={
                "Our agricultural engineer will visit, inspect and identify your garden needs and recommend fertilizers and nutrients accordingly."
              }
              heading={"Package Details"}
            />
          )}
          {tabs[4].selected && (
            <QoutationBaseComp
              heading={"Package Details"}
              headingDescription={" / month"}
              headingDescriptionCount={"3 visits"}
              description={
                "Cleaning of water, skimming, wall cleaning and addition of chemicals into the pool."
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
    fontFamily: FontFamilty.bold,
    color: AppColors.mainBlue,
  },
});
