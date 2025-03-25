import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { useEffect, useState } from "react";

export const SingleOptionComp = ({
  heading,
  options,
  setOptions,
  description,
}) => {
  const [selectedItem, setSelectedItem] = useState("");
  const toggleSelectedOptionByIndex = (index) => {
   
    setOptions((prevOptions) =>
      prevOptions.map((option, i) => {
        if (i === index) {
          return { ...option, selected: !option.selected }; // Set selected option to true
        }
      })
    );
  };

  const getSelectedOptionDescription = () => {
    const selectedOption = options?.find((option) => option.selected);
    setSelectedItem(selectedOption ? selectedOption : "No option selected");
  };

  useEffect(() => {
    getSelectedOptionDescription();
  }, [options]);
  return (
    <View style={styles.container}>
      <View style={{ rowGap: 16 }}>
        <Text style={styles.headingText}>{heading}</Text>
        {description && (
          <Text style={styles.descriptionText}>{description}</Text>
        )}

        <View style={{ flexDirection: "row", columnGap: 16 }}>
          {options?.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                toggleSelectedOptionByIndex(index);
              }}
              key={index}
              style={{
                width: "80%",
                borderRadius: 4,
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 8,

                flexDirection: "row",
                columnGap: 8,
                alignItems: "center",
                borderColor: item.selected
                  ? AppColors.mainBlue
                  : AppColors.text8181,
              }}>
              {!item.selected ? (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderRadius: 100,
                    borderColor: AppColors.text8181,
                  }}></View>
              ) : (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                    borderColor: AppColors.mainBlue,
                  }}>
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 100,
                      backgroundColor: AppColors.mainBlue,
                    }}></View>
                </View>
              )}

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FontFamilty.medium,
                  color: item.selected
                    ? AppColors.mainBlue
                    : AppColors.text8181,
                  flex: 1,
                }}>
                {item.label}
              </Text>
              <Text
                style={{
                  fontSize: 8,
                  fontFamily: FontFamilty.regular,
                  color: AppColors.text8181,
                }}>
                {item.supportText}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: FontFamilty.regular,
    color: AppColors.text8181,
  },
});
