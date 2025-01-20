import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useState, useRef } from "react";
import FontFamilty from "../../../../constants/FontFamilty";
import DatePicker from "../components/DatePicker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomSheetTimeSlots from "../components/BottomSheetTimeSlot";

export const DateSelection = () => {
  const bottomSheetRef = useRef(null);
  const [timeSlot, setTimeSlot] = useState("");

  const onSelectTime = (time) => {
    setTimeSlot(time);
  };

  const handleShowBottomSheet = () => {
    bottomSheetRef?.current?.present();
  };

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.semiBold16}>
              {"On which specific date you want to take this service?"}
            </Text>
            <DatePicker />
          </View>
          <View style={styles.timeSlotSection}>
            <Text style={styles.semiBold16}>
              {"Select a Time slot for this service"}
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleShowBottomSheet}
              style={styles.timeSlotContainer}>
              <Text
                style={timeSlot ? styles.buttonTextFilled : styles.buttonText}>
                {timeSlot ? timeSlot : "Select Time"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheetTimeSlots
          onSelectTime={onSelectTime}
          bottomSheetRef={bottomSheetRef}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    rowGap: 16,
  },
  datePickerContainer: {
    rowGap: 16,
  },
  timeSlotSection: {
    rowGap: 16,
  },
  semiBold16: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  timeSlotContainer: {
    height: 50,
    width: "100%",
    borderRadius: 4,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: AppColors.textInputbg,
    borderColor: AppColors.borderGrey,
    borderWidth: 1,
  },
  buttonText: {
    color: AppColors.greyText,
    fontSize: 14,
  },
  buttonTextFilled: {
    color: AppColors.textGrey,
    fontSize: 14,
  },
});
