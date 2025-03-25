import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useState } from "react";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";
import { CustomLargeTextInput } from "../../../../components/CustomLargeTextInput";

export const CustomRequirements = ({ navigation,updateServiceData }) => {
  const [description, setDescription] = useState("");
  const handleImagesSelected = (images) => {
  };

  const descriptionUpdated=(text)=>{
    
    setDescription(text)
    updateServiceData('Description',text)
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ rowGap: 16 }}>
          <Text style={styles.semiBold16}>
            {"Add your specific instructions for this job  (Optional)"}
          </Text>

          <CustomLargeTextInput
            placeholder={"Type Description"}
            multiline={true}
            text={description}
            setText={(text)=>{descriptionUpdated(text)}}
          />
        </View>

        <View style={{ rowGap: 16 }}>
          <Text style={styles.semiBold16}>
            Add images for this specific job {"\n"}(Optional)
          </Text>

          <View
            style={{
              borderRadius: 8,
              height: 100,
              width: 100,
              borderWidth: 1,
              borderStyle: "dashed",

              alignItems: "center",
              justifyContent: "center",
            }}>
            <Image
              source={AppImages.plusIcon}
              style={{ width: 48, height: 48 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
    flex: 1,
    padding: 16,
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
