import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { useState } from "react";
import RatingModal from "../../../fixer/components/RatingModal";
import { useSelector } from "react-redux";
import database from "@react-native-firebase/database"; // Firebase Realtime Database

export const PastBookingComp = ({ item ,navigation,fetchData}) => {
  const selector = useSelector(state => state.AppReducer);
  const user = selector.user
  console.log(user);
  
  const [modalVisible,setModalVisible]=useState(false)
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

  const [rating,setRating]=useState(5)
  const [review,setReview]=useState('')



  const onSubmitFeedback = async (data) => {
    await updateServiceStatus(item.userId, item.displayId,data);

    // Update item locally before adding to fixer's services
    const updatedItem = { ...item,review:data };

    // Add updated service item to fixer
    await addServiceFixer(item.fixerId, item.displayId, updatedItem);
    fetchData()
  }

  const updateServiceStatus = async (userId, displayId,data) => {
    try {
      await database()
        .ref(`/serviceRequests/${userId}/${displayId}`)
        .update({review:data});

      console.log("Service status updated to assigned");
    } catch (error) {
      console.error("Error updating service status:", error);
      throw error; // Propagate error
    }
  };

  const addServiceFixer = async (fixerId, displayId, updatedItem) => {


    try {
      await database()
        .ref(`/users/${fixerId}/services`)
        .child(displayId)
        .set(updatedItem);

      console.log("Fixer added to service with updated status");
    } catch (error) {
      console.log("Error adding fixer:", error);
      throw error; // Ensure error bubbles up
    }
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('BookingDetails', { item: item })} activeOpacity={0.9} style={{ elevation: 10, backgroundColor: AppColors.white, borderRadius: 16,flexDirection:'row' }}>
      <View style={styles.container}>
        <View>
          {item?.displayId && (
            <Text style={styles.descriptionText}>{'#' + item?.displayId}</Text>
          )}
          <Text style={styles.headingText}>{item?.serviceType}</Text>
        </View>

        <View>
          <Text style={styles.descriptionText}>{"Time"}</Text>
          <Text style={styles.headingText}>{mergeTimeSlots(item?.details?.timeSlot)}</Text>
        </View>

        {item.status == 'Completed'||item.status=='completed' ?
          <View
            style={{
              flexDirection: "row",
              columnGap: 8,
              flex: 1
            }}>
            {item.review ? (
              <View style={{ marginTop: 8 }}>
                <Text style={styles.descriptionText}>{"Review"}</Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 8,
                  }}>
                  <Icon name={"star"} size={16} color={"#FFD700"} />

                  <Text style={styles.headingText}>{item.review.rating.toFixed(1)}</Text>
                </View>
              </View>

            ) : (
              <View style={{ marginTop: 8 }}>
                {user.userType=='client'?
                <Text onPress={()=>setModalVisible(true)} style={{ ...styles.headingText, color: AppColors.mainBlue }}>{'write a review'}</Text>
                :
                <Text  style={{ ...styles.headingText, color: AppColors.mainBlue }}>{'No feedback yet'}</Text>
                }
              </View>
            )}
          </View> :
          <View>
            {item?.reason && (
              <View>
                <Text style={styles.descriptionText}>{"Reason"}</Text>
                <Text style={styles.headingText}>{item.reason}</Text>
              </View>
            )}

          </View>
        }

      </View>

      <View
        style={{
          width: "50%",
          padding: 16,
          height: "100%",
        }}>

        <View
          style={{
            borderRadius: 100,
            backgroundColor:
            item.status === "Completed" || item.status === "completed" 
            ? AppColors.mainBlue 
            : AppColors.red,
            paddingHorizontal: 12,
            paddingVertical: 4,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={styles.labelText}>{item.status}</Text>
        </View>


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
          {item?.price && (
            <Text style={styles.dateText}>
              {'AED ' + item?.price}
            </Text>
          )}

        </View>
      </View>
      <RatingModal onSubmit={(data)=>{onSubmitFeedback(data)}} onClose={()=>setModalVisible(false)} isVisible={modalVisible} setRating={setRating} setReview={setReview} rating={rating} review={review}/>
    </TouchableOpacity>
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
