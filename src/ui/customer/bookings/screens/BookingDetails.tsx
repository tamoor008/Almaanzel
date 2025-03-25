import { StyleSheet, View, Text, Image, ScrollView, Alert, Linking } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { Header } from "../../home/components/Header";
import { useRoute } from "@react-navigation/native";
import FontFamilty from "../../../../constants/FontFamilty";
import moment from "moment";
import { CustomButton } from "../../../../components/CustomButton";
import { useSelector } from "react-redux";
import database from "@react-native-firebase/database"; // Firebase Realtime Database
import RatingModal from "../../../fixer/components/RatingModal";
import { useState } from "react";
import ConfirmModal from "../../../fixer/components/ConfirmModal";
import CancelModal from "../../../fixer/components/CancelModal";
import { BookingDetailUiComp } from "../components/BookingdetailUIComp";
import { AppImages } from "../../../../constants/AppImages";

export const BookingDetails = ({ navigation }) => {
  const selector = useSelector(state => state.AppReducer);
  const route = useRoute()
  const user = selector.user
  console.log(user);
  const fixerId = user.uid
  const [reason, setReason] = useState("");

  const { item } = route.params
  const dataArray = Object.entries(item.details.addon).map(([key, value]) => ({ key, value }));




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

  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);


  const formatDate = (dateString) => {
    const date = moment(dateString);

    const month = date.format("MMM").toUpperCase(); // "MAR"
    const day = date.format("DD"); // "22"
    const year = date.format("YYYY"); // "2025"

    return { month, day, year };
  };


  const { month, day, year } = formatDate(item.details.Date);

  const onConfirm = async () => {
    await updateServiceStatus(item.userId, item.displayId, fixerId, 'completed', '');

    // Update item locally before adding to fixer's services
    const updatedItem = { ...item, status: "completed", fixerId: fixerId, reason: '' };

    // Add updated service item to fixer
    await addServiceFixer(fixerId, item.displayId, updatedItem);
    setModalVisible(false)
    navigation.goBack()
  }

  const onCancel = async () => {
    await updateServiceStatus(item.userId, item.displayId, fixerId, 'cancelled', reason);

    // Update item locally before adding to fixer's services
    const updatedItem = { ...item, status: "cancelled", fixerId: fixerId, reason: reason };

    // Add updated service item to fixer
    await addServiceFixer(fixerId, item.displayId, updatedItem);
    setCancelModalVisible(false)
    navigation.goBack()
  }

  const updateServiceStatus = async (userId, displayId, fixerId, status, reason) => {
    try {
      await database()
        .ref(`/serviceRequests/${userId}/${displayId}`)
        .update({ status: status, fixerId: fixerId, reason: reason });

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

  const bookingDetailItem = {
    title: item.serviceType,
    description: 'Job Type',
    icon: AppImages.jobtype
  }


  const paymentMethod = {
    title: item.details.selectedPayment.label,
    description: 'Payment Method',
    icon: AppImages.jobtype
  }


  const price = {
    title: 'AED ' + item.price,
    description: 'Price',
    icon: AppImages.jobtype
  }

  const openWhatsApp = () => {
    let phoneNumber = '+971509819899'; // WhatsApp number
    let url = `https://wa.me/${phoneNumber}`; // WhatsApp URL scheme

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'WhatsApp is not installed on this device');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <Header
        heading={"Booking Details"}
        navigation={navigation}
        // profile={SampleImages.user}
        back={true}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32, paddingTop: 16 }}>
        <View style={{ alignItems: 'center', rowGap: 16, flex: 1 }}>

          <View style={{ alignItems: 'center', width: '100%', rowGap: 8 }}>
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

          <View style={{ width: '100%', backgroundColor: AppColors.white, padding: 16, rowGap: 8,elevation:10 }}>
            <Text style={{ ...styles.dateText, textAlign: 'left', color: AppColors.black, fontSize: 16 }}>Booking Details</Text>
            <BookingDetailUiComp item={bookingDetailItem} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 8,
                marginTop: 8,
                flexWrap: 'wrap',
                rowGap: 8,
                width: '100%',
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
                  <Text key={index} style={styles.labelText2}>{item.value}</Text>
                </View>
              )}


            </View>

          </View>

          <View style={{ width: '100%', backgroundColor: AppColors.white, padding: 16, rowGap: 8,elevation:10 }}>
            <Text style={{ ...styles.dateText, textAlign: 'left', color: AppColors.black, fontSize: 16 }}>Special Instructions</Text>
            {item.details.Description && (
              <View style={{ rowGap: 4 }}>
                <Text style={{ ...styles.desText }}>Description</Text>
                <Text style={{ ...styles.dateText, textAlign: 'left', color: AppColors.black, fontSize: 14, fontFamily: FontFamilty.medium }}>{item.details.Description}</Text>
              </View>
            )}

            <View style={{ rowGap: 4 }}>
              <Text style={{ ...styles.desText }}>Images</Text>
              <View style={{ flexDirection: 'row', columnGap: 8 }}>
                <Image style={{ width: 75, height: 75, borderRadius: 8, }} source={SampleImages.product1} />
                <Image style={{ width: 75, height: 75, borderRadius: 8, }} source={SampleImages.service4} />

              </View>
            </View>



          </View>

          <View style={{ width: '100%', backgroundColor: AppColors.white, padding: 16, rowGap: 8,elevation:10 }}>
            <Text style={{ ...styles.dateText, textAlign: 'left', color: AppColors.black, fontSize: 16 }}>Payment Information</Text>
            <BookingDetailUiComp item={paymentMethod} />
            <BookingDetailUiComp item={price} />




          </View>
        </View>
      </ScrollView>


      {user?.userType != 'client' && item.status == 'assigned' && (
        <View style={{ elevation: 10, backgroundColor: AppColors.white, flexDirection: 'row', padding: 16, columnGap: 16 }}>
          <CustomButton onPress={() => setCancelModalVisible(true)} btnTextStyle={{ color: AppColors.red }} text={'Cancel'} btnStyle={{ flex: 1, width: '0%', borderWidth: 2, backgroundColor: AppColors.white, borderColor: AppColors.red }}></CustomButton>
          <CustomButton onPress={() => { setModalVisible(true) }} text={'Complete'} btnStyle={{ flex: 1, width: '0%', backgroundColor: AppColors.mainBlue }}></CustomButton>
        </View>
      )}

      {user?.userType == 'client' && (
        <View style={{ elevation: 10, backgroundColor: AppColors.white, flexDirection: 'row', padding: 16, columnGap: 16 }}>
          {/* <CustomButton onPress={() => setCancelModalVisible(true)} btnTextStyle={{ color: AppColors.red }} text={'Cancel'} btnStyle={{ flex: 1, width: '0%', borderWidth: 2, backgroundColor: AppColors.white, borderColor: AppColors.red }}></CustomButton> */}
          <CustomButton btnTextStyle={{color:AppColors.mainBlue}} onPress={() => { openWhatsApp() }} text={'Contact Support'} btnStyle={{ flex: 1, width: '0%', backgroundColor: AppColors.white,borderWidth:2,borderColor:AppColors.mainBlue }}></CustomButton>
        </View>
      )}

      <ConfirmModal
        isVisible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={onConfirm}
      />

      <CancelModal
        reason={reason}
        setReason={setReason}
        isVisible={cancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        onConfirm={onCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: AppColors.greybg
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
  labelText2: {
    fontSize: 12,
    fontFamily: FontFamilty.regular,
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
  desText: {
    fontFamily: FontFamilty.regular,
    fontSize: 10,
    color: AppColors.text8181,
  },
});
