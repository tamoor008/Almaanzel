import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";
import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomTextInput } from "../../../../components/CustomTextInput";

export const PersonComp = ({ item, removePerson, index, updatePerson }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(item.personType || null); // Set initial value
  const [items, setItems] = useState([
    { label: "Handy Man (AED 125/hr)", value: "Handy Man (AED 125/hr)" },
    { label: "Electrician (AED 165/hr)", value: "Electrician (AED 165/hr)" },
    { label: "Plumber (AED 145/hr)", value: "Plumber (AED 145/hr)" },
  ]);

  const [hours, setHours] = useState(item.hours || 0);
  const [hourOption, setHourOption] = useState([
    { label: "1 Hour", value: 1, selected: false },
    { label: "4 Hours", value: 4, selected: false },
    { label: "Full Day", value: 8, selected: false },
    { label: "Custom", value: "custom", selected: false },
  ]);

  const handleItemPress = (i) => {
    const updatedOptions = hourOption.map((option, index) => ({
      ...option,
      selected: index === i, // Select only the clicked option
    }));

    setHourOption(updatedOptions);

    const selectedOption = updatedOptions[i];
    if (selectedOption.value !== "custom") {
      setHours(selectedOption.value);
      updatePerson(index, "hours", selectedOption.value);
    }
  };

  useEffect(()=>{
    updatePerson()
  },[])

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
          onChangeValue={(value)=>
          updatePerson(index, "personType", value)
          }
          setValue={(selectedValue) => {
          
            setValue(selectedValue);
          
          }}
          setItems={setItems}
          placeholder="Select Person"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <View style={{ rowGap: 16, marginTop: 16 }}>
        <Text style={styles.semiBold16}>{"Choose for how long you need the help."}</Text>
        <View
          style={{
            ...styles.rowContainer,
            columnGap: 16,
            flexWrap: "wrap",
            rowGap: 16,
          }}>
          {hourOption.map((item, i) => (
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
              key={i}
              onPress={() => handleItemPress(i)}>
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
            setText={(text) => {
              setHours(text);
              updatePerson(index, "hours", text);
            }}
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
