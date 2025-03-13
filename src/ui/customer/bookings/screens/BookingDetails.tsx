import { StyleSheet, View, Text } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { Header } from "../../home/components/Header";
import { useRoute } from "@react-navigation/native";
import FontFamilty from "../../../../constants/FontFamilty";
import moment from "moment";

export const BookingDetails = ({ navigation }) => {

  const route = useRoute()

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

  return (
    <View style={styles.container}>
      <Header
        heading={"Booking Details"}
        navigation={navigation}
        profile={SampleImages.user}
        back={true}
      />
      <View style={{alignItems:'center',justifyContent:'center',rowGap:8}}>
      <Text style={styles.dateText}>{day+' '+month+' '+year+'-'+mergeTimeSlots(item?.details?.timeSlot)}</Text>
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
            width:'50%'
          }}>
          <Text style={styles.labelText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    rowGap: 8,
    backgroundColor:AppColors.white
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
