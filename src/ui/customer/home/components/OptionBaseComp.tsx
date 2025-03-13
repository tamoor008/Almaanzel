import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { AppImages } from "../../../../constants/AppImages";
import FontFamilty from "../../../../constants/FontFamilty";
import { useEffect, useState } from "react";

export const OptionBaseComp = ({ heading, options, setOptions }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const toggleSelectedOptionByIndex = (index) => {
    console.log("Selected Index:", index);
    console.log("Previous Options:", options);

    setOptions((prevOptions) =>
      prevOptions.map((option, i) => {
        if (i === index) {
          console.log("Updating index:", i);
          return { ...option, selected: true }; // Set selected option to true
        } else {
          return { ...option, selected: false }; // Set other options to false
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

        <View style={{ flexDirection: "row", columnGap: 16 }}>
          {options?.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                toggleSelectedOptionByIndex(index);
              }}
              key={index}
              style={{
                flex: 1,
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
                  textAlign: "center",
                  fontFamily: FontFamilty.medium,
                  color: item.selected
                    ? AppColors.mainBlue
                    : AppColors.text8181,
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedItem.more && (
          <OptionBaseComp
            inner={true}
            options={options}
            heading={selectedItem.more.heading}
            setOptions={setOptions}
          />
        )}
        {selectedItem.description && (
          <Text style={styles.descriptionText}>{selectedItem.description}</Text>
        )}
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
