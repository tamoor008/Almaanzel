import { StyleSheet, View, Text } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { Header } from "../../home/components/Header";
import { useRoute } from "@react-navigation/native";
import FontFamilty from "../../../../constants/FontFamilty";
import moment from "moment";
import { CustomButton } from "../../../../components/CustomButton";
import { useSelector } from "react-redux";
import database from "@react-native-firebase/database"; // Firebase Realtime Database

export const BookingDetails = ({ navigation }) => {
  const selector = useSelector(state => state.AppReducer);
  const route = useRoute()
  const user = selector.user
  console.log(user);
  const fixerId=user.uid


  const { item } = route.params




  const mergeTimeSlots = (slots) => {
    if (!slots.length) return "";

    // Extract selected time slots
    const selectedSlots = slots.filter(slot => slot.selected);

    if (selectedSlots.length === 0) return "";

    // Extract start and end times
    const startTime = selectedSlots[0].time.split(" - ")[0];
    const endTime = selectedSlots[selectedSlots.length - 1].time.split(" - ")[1];

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
  
  const onConfirm=async ()=>{
    await updateServiceStatus(item.userId, item.displayId, fixerId,'completed');
  
    // Update item locally before adding to fixer's services
    const updatedItem = { ...item, status: "completed", fixerId:fixerId };

    // Add updated service item to fixer
    await addServiceFixer(fixerId, item.displayId, updatedItem);
  }

  const onCancel=async ()=>{
    await updateServiceStatus(item.userId, item.displayId, fixerId,'cancelled');
  
    // Update item locally before adding to fixer's services
    const updatedItem = { ...item, status: "cancelled", fixerId:fixerId };

    // Add updated service item to fixer
    await addServiceFixer(fixerId, item.displayId, updatedItem);
  }



  
  const updateServiceStatus = async (userId, displayId, fixerId,status) => {
    try {
      await database()
        .ref(`/serviceRequests/${userId}/${displayId}`)
        .update({ status: status, fixerId:fixerId });
  
      console.log("Service status updated to assigned");
    } catch (error) {
      console.error("Error updating service status:", error);
      throw error; // Propagate error
    }
  };
  
  const addServiceFixer = async (fixerId, displayId, updatedItem) => {
    console.log('fixerId',fixerId);
    console.log('displayId',displayId);
    console.log('updatedItem',updatedItem);

    
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
    <View style={styles.container}>
      <Header
        heading={"Booking Details"}
        navigation={navigation}
        // profile={SampleImages.user}
        back={true}
      />
      <View style={{ alignItems: 'center', justifyContent: 'center', rowGap: 8, flex: 1 }}>
        <Text style={styles.dateText}>{day + ' ' + month + ' ' + year + '-' + mergeTimeSlots(item?.details?.timeSlot)}</Text>
        <View
          style={{
            borderRadius: 100,
            backgroundColor:
              item.status == "Cancelled" ? AppColors.red : AppColors.mainBlue,
            paddingHorizontal: 12,
            paddingVertical: 4,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: '50%'
          }}>
          <Text style={styles.labelText}>{item.status}</Text>
        </View>
      </View>
      {user?.userType != 'client' && (
        <View style={{ elevation: 10, backgroundColor: AppColors.white, flexDirection: 'row', padding: 16, columnGap: 16 }}>
          <CustomButton onPress={onCancel} btnTextStyle={{ color: AppColors.red }} text={'Cancel'} btnStyle={{ flex: 1, width: '0%', borderWidth: 2, backgroundColor: AppColors.white, borderColor: AppColors.red }}></CustomButton>
          <CustomButton onPress={onConfirm} text={'Complete'} btnStyle={{ flex: 1, width: '0%', backgroundColor: AppColors.mainBlue }}></CustomButton>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    rowGap: 8,
    backgroundColor: AppColors.grey
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
    fontSize: 16,
    fontFamily: FontFamilty.bold,
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
