import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomTextInput } from "../../../../components/CustomTextInput";

export const PersonComp = ({ item, removePerson, index }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Handy Man  (AED 14/hr)", value: "Handy Man (AED 14/hr)" },
    { label: "Electrician (AED 14/hr)", value: "Electrician (AED 14/hr)" },
    { label: "Plumber (AED 14/hr)", value: "Plumber (AED 14/hr)" },
  ]);

  const [hours, setHours] = useState(0);
  const [hourOption, setHourOption] = useState([
    {
      label: "1 Hour",
      selected: false,
    },
    {
      label: "4 Hours",
      selected: false,
    },
    {
      label: "Full Day",
      selected: false,
    },
    {
      label: "Custom",
      selected: false,
    },
  ]);

  const handleItemPress = (index) => {
    // Create a copy of the hourOption array
    const updatedOptions = hourOption.map((item, i) => {
      // Toggle the selected property for the clicked item
      if (i === index) {
        return { ...item, selected: !item.selected };
      }
      // Deselect all other items
      return { ...item, selected: false };
    });

    // Update the state with the new array
    setHourOption(updatedOptions);
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.headingText}>{"Person " + (index + 1)}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removePerson(index)}>
          <Image source={AppImages.remove} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>

      <View style={{ rowGap: 16 }}>
        <Text style={styles.semiBold16}>
          {"Choose from whom you need the help for this task?"}
        </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select Person"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
      <View style={{ rowGap: 16, marginTop: 16 }}>
        <Text style={styles.semiBold16}>
          {"Choose for how long you need the help."}
        </Text>
        <View
          style={{
            ...styles.rowContainer,
            columnGap: 16,
            flexWrap: "wrap",
            rowGap: 16,
          }}>
          {hourOption.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 4,
                backgroundColor: item.selected
                  ? AppColors.mainBlue
                  : AppColors.grey,
              }}
              key={index}
              onPress={() => handleItemPress(index)}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FontFamilty.medium,
                  color: item.selected ? AppColors.white : AppColors.black,
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {hourOption[3].selected && (
          <CustomTextInput
            setText={setHours}
            keyboardType={"numeric"}
            placeholder={"Enter Number of Hours"}
            text={hours}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    fontSize: 14,
    fontFamily: FontFamilty.bold,
    flex: 1,
    color: AppColors.mainBlue,
  },
  removeButton: {
    borderRadius: 100,
    width: 24,
    height: 24,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: FontFamilty.bold,
    color: AppColors.mainBlue,
  },
  semiBold16: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  dropdown: {
    backgroundColor: AppColors.textInputbg,
    borderColor: AppColors.borderGrey,
    borderWidth: 1,
    borderRadius: 4,
  },
  dropdownContainer: {
    backgroundColor: AppColors.textInputbg,
    borderColor: AppColors.borderGrey,
    borderWidth: 1,
    borderRadius: 4,
  },
});
