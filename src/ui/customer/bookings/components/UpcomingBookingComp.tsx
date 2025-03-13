import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { Header } from "../../home/components/Header";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";
import moment from "moment";

export const UpcomingBookingComp = ({ item, navigation }) => {
  console.log(item.details.addon);
  const dataArray = Object.entries(item.details.addon).map(([key, value]) => ({ key, value }));

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
    <TouchableOpacity onPress={() => navigation.navigate('BookingDetails', { item: item })} activeOpacity={0.9} style={{ elevation: 10, backgroundColor: AppColors.white, borderRadius: 16 }}>
      <View style={styles.container}>
        <View>
          {item?.displayId && (
            <Text style={styles.descriptionText}>{'#' + item?.displayId}</Text>
          )}
          <Text style={styles.headingText}>{item?.serviceType}</Text>
        </View>

        <View>
          <Text style={styles.descriptionText}>{"Time"}</Text>
          <Text style={styles.headingText}>{mergeTimeSlots(item?.details?.timeSlot?item?.details?.timeSlot:'')}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 8,
            marginTop: 8,
            flexWrap:'wrap',
            rowGap:8,
            width:'65%'
          }}>
          {dataArray.map((item ) => 

            <View
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
          position: "absolute",
          width: "50%",
          height: "100%",
          right: 0,
          bottom: 0,
          zIndex: 100,
        }}>
        <Image
          resizeMode="stretch"
          source={AppImages.triangle}
          style={{
            position: "absolute",
            width: "100%",
            height: "95%",
            bottom: 0,
            zIndex: 10
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            right: 0,
            alignItems: "flex-end",
            padding: 8,
            zIndex: 100,
            // backgroundColor:'red',
            rowGap: 8
          }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.dateTextDim}>{day}</Text>
            <Text style={styles.dateText}>{month}</Text>
            <Text style={styles.dateTextDim}>{year}</Text>

          </View>
          {item?.price && (
            <Text style={styles.dateText}>
              {'AED ' + item?.price}
            </Text>
          )}

        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
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
    fontFamily: FontFamilty.black,
    color: AppColors.white,
    textAlign: "right",
  },
  dateTextDim: {
    fontSize: 14,
    fontFamily: FontFamilty.medium,
    color: AppColors.white80,
    textAlign: "right",
  },
});
