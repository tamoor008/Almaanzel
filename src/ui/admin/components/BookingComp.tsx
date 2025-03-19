import { StyleSheet, View, Text, Image } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { AppColors } from "../../../constants/AppColors";
import FontFamilty from "../../../constants/FontFamilty";
import { CustomButton } from "../../../components/CustomButton";
import FixerSelectionModal from "./FixerSelectionModal";
import { useEffect, useState } from "react";
import database from "@react-native-firebase/database"; // Firebase Realtime Database
import { FixerComp } from "./FixerComp";

export const BookingComp = ({ item, navigation, fixers }) => {
  const mergeTimeSlots = (slots) => {
    if (!slots?.length) return "";

    // Extract selected time slots
    const selectedSlots = slots.filter(slot => slot.selected);

    if (selectedSlots?.length === 0) return "";

    // Extract start and end times
    const startTime = selectedSlots[0].time.split(" - ")[0];
    const endTime = selectedSlots[selectedSlots?.length - 1].time.split(" - ")[1];

    return `${startTime}-${endTime}`;
  };

  const formatDate = (dateString) => {
    const date = moment(dateString);

    const month = date.format("MMM").toUpperCase(); // "MAR"
    const day = date.format("DD"); // "22"
    const year = date.format("YYYY"); // "2025"

    return { month, day, year };
  };

  const { month, day, year } = formatDate(item.details.Date);
  const dataArray = Object.entries(item.details.addon).map(([key, value]) => ({ key, value }));

  const [modalVisible, setModalVisible] = useState(false);
  const handleFixerSelect = (fixerId) => {
    console.log("Selected Fixer:", fixerId);
    console.log("item item:", item.userId);
    updateServiceStatus(item.userId, item.displayId, fixerId)
    addServiceFixer(fixerId, item.displayId)
  };


  const [fixer, setFixer] = useState()

  const updateServiceStatus = async (userId, displayId, fixerId) => {
    try {
      await database()
        .ref(`/serviceRequests/${userId}/${displayId}`)
        .update({ status: "assigned", fixerId: fixerId });

      console.log("Service status updated to assigned");
      navigation.goBack()
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  const addServiceFixer = async (fixerId, displayId) => {
    try {
      await database()
        .ref(`/users/${fixerId}/services`).child(displayId)
        .set(item);

      console.log("Service status updated to assigned");
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  const fetchFixerById = async (fixerId) => {
    try {
      const snapshot = await database().ref(`/users/${fixerId}`).once("value");

      if (snapshot.exists()) {
        return snapshot.val(); // Returns the fixer's data
      } else {
        console.log("Fixer not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching fixer:", error);
      return null;
    }
  };

  useEffect(() => {
    const getFixerData = async () => {
      if (item.status === "assigned") {
        console.log(item.fixerId);
        const fixerData = await fetchFixerById(item.fixerId);
        if (fixerData) {
          setFixer(fixerData);
        }
      }
    };
  
    getFixerData();
  }, []); // Dependencies added

  return (
    <View style={{ elevation: 10, backgroundColor: AppColors.white, borderRadius: 16, }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.container}>
          <View>
            {item?.displayId && (
              <Text style={styles.descriptionText}>{'#' + item?.displayId}</Text>
            )}
            <Text style={styles.headingText}>{item?.serviceType}</Text>
          </View>
          {item?.details?.timeSlot && (
            <View>
              <Text style={styles.descriptionText}>{"Time"}</Text>
              <Text style={styles.headingText}>{mergeTimeSlots(item?.details?.timeSlot ? item?.details?.timeSlot : '')}</Text>
            </View>
          )}


          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 8,
              marginTop: 8,
              flexWrap: 'wrap',
              rowGap: 8,
              width: '100%'
            }}>
            {dataArray.map((item, index) =>

              <View
                key={index}
                style={{
                  borderRadius: 100,
                  backgroundColor: AppColors.mainBlue,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Text style={styles.labelText}>{item.value}</Text>
              </View>
            )}


          </View>
        </View>

        <View
          style={{
            width: "50%",
            padding: 16,
            height: "100%",
          }}>




          <View
            style={{
              alignItems: "flex-end",
              padding: 8,
              paddingBottom: 0,
              zIndex: 100,
              rowGap: 8,
              justifyContent: 'flex-end',
            }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.dateTextDim}>{day}</Text>
              <Text style={styles.dateText}>{month}</Text>
              <Text style={styles.dateTextDim}>{year}</Text>

            </View >
            {item?.price ? (
              <Text style={styles.dateText}>
                {'AED ' + item?.price}
              </Text>
            ) :
              <Text style={styles.dateText}>
                {'Quotation'}
              </Text>
            }

          </View>
        </View>
      </View>
      {fixer && (
        <FixerComp colorscheme={true} item={fixer} />
      )}
      {item.status == 'unassigned' && (
        <View style={{ padding: 16 }}>
          <CustomButton onPress={() => setModalVisible(true)} text={'Assign Fixer'}></CustomButton>
        </View>
      )}


      <FixerSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        fixers={fixers}
        onSelectFixer={handleFixerSelect}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    rowGap: 8,
  },
  descriptionText: {
    fontSize: 10,
    fontFamily: FontFamilty.medium,
    color: AppColors.text8181,
  },
  headingText: {
    fontSize: 14,
    fontFamily: FontFamilty.medium,
    color: AppColors.black,
  },
  labelText: {
    fontSize: 10,
    fontFamily: FontFamilty.medium,
    color: AppColors.white,
  },
  dateText: {
    fontSize: 16,
    fontFamily: FontFamilty.bold,
    color: AppColors.mainBlue,
    textAlign: "right",
  },
  dateTextDim: {
    fontSize: 14,
    fontFamily: FontFamilty.medium,
    color: AppColors.black50,
    textAlign: "right",
  },
});
