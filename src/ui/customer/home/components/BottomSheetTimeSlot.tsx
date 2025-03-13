import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { AppColors } from "../../../../constants/AppColors";
import { Description } from "./Description";
import FontFamilty from "../../../../constants/FontFamilty";

const BottomSheetTimeSlots = ({ bottomSheetRef, onSelectTime,setTimeSlots,timeSlots }) => {
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
 

  const snapPoints = useMemo(() => ["65%"], []);

  const handleSlotSelection = (index) => {
    setTimeSlots((prevSlots) =>
      prevSlots.map((slot, i) =>
        i === index ? { ...slot, selected: !slot.selected } : slot
      )
    );

    onSelectTime()
  };
  
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}>
      <BottomSheetScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Select a Preferred Time Slot</Text>
          <FlatList
            scrollEnabled={false}
            removeClippedSubviews={false} // <- Add This
            data={timeSlots}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSlotSelection(index)}
                style={
                  item.selected
                    ? styles.slotButton
                    : styles.unselectedSlotButton
                }>
                <Text
                  style={{
                    ...styles.slotText,
                    color: item.selected ? AppColors.white : AppColors.black,
                  }}>
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Text style={styles.description}>
            Note : In case the preferred hour is prebooked, kindly contact
            management for assistance
          </Text>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    rowGap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    fontFamily: FontFamilty.medium,
    color: AppColors.text8181,
  },
  slotButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: AppColors.mainBlue,
    alignItems: "center",
    marginVertical: 5,
  },
  slotText: {
    color: "#fff",
    fontSize: 16,
  },
  unselectedSlotButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: AppColors.grey,
    alignItems: "center",
    marginVertical: 5,
  },
});

export default BottomSheetTimeSlots;
