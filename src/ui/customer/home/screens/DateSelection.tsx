import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useState, useRef } from "react";
import FontFamilty from "../../../../constants/FontFamilty";
import DatePicker from "../components/DatePicker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomSheetTimeSlots from "../components/BottomSheetTimeSlot";

export const DateSelection = ({ type, updateServiceData }) => {
  const bottomSheetRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState("");

  const [timeSlots, setTimeSlots] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      time: `${8 + i}:00 - ${9 + i}:00`,
      selected: false,
    }))
  );
  const onSelectTime = () => {
    const selectedSlots = timeSlots.filter(slot => slot.selected); // Get only selected slots
    updateServiceData("timeSlot", selectedSlots); // Send only selected slots
  };
  

  const onSelectDate = (date) => {
    console.log('select date');
    const formattedDate = new Date(date).toISOString(); // Convert to string

    setSelectedDate(date);

    updateServiceData("Date", formattedDate);
  };

  const handleShowBottomSheet = () => {
    bottomSheetRef?.current?.present();
  };

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <BottomSheetModalProvider>
        {type === "AnnualMaintenancePackage" ? (
          <View style={styles.container}>
            <Text style={{ fontSize: 16 }}>
              Call for assistance and home visit
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.datePickerContainer}>
              <Text style={styles.semiBold16}>
                {"On which specific date you want to take this service?"}
              </Text>
              <DatePicker onSelectDate={onSelectDate} />
            </View>
            <View style={styles.timeSlotSection}>
              <Text style={styles.semiBold16}>
                {"Select a Time slot for this service"}
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleShowBottomSheet}
                style={styles.timeSlotContainer}
              >
                <Text
                  style={timeSlots ? styles.buttonText : styles.buttonText}
                >
                  {"Select Time"}
                </Text>
              </TouchableOpacity>

              <View style={{ }}>
                {timeSlots.map((data, index) => {
                  console.log(data); // This will log each time slot
                  return <View >
                    {data.selected==true && (
                      <Text style={{paddingHorizontal:16,paddingVertical:8,backgroundColor:AppColors.mainBlue,marginVertical:8,color:AppColors.white,borderRadius:100,flexWrap:'nowrap'}} key={index}>{data.time}</Text>
                    )}
                  </View>
                })}
              </View>

            </View>
          </View>
        )}
        <BottomSheetTimeSlots
          onSelectTime={onSelectTime}
          bottomSheetRef={bottomSheetRef}
          timeSlots={timeSlots}
          setTimeSlots={setTimeSlots}
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
