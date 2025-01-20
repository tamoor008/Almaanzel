import { StyleSheet, View, Text, Image } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { Header } from "../../home/components/Header";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";

export const UpcomingBookingComp = ({ item }) => {
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.descriptionText}>{item.bookingid}</Text>
          <Text style={styles.headingText}>{item.title}</Text>
        </View>

        <View>
          <Text style={styles.descriptionText}>{"Time"}</Text>
          <Text style={styles.headingText}>{item.time}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 8,
            marginTop: 8,
          }}>
          <View
            style={{
              borderRadius: 100,
              backgroundColor: AppColors.mainBlue,
              paddingHorizontal: 12,
              paddingVertical: 4,
              flexDirection: "row",

              alignItems: "center",
            }}>
            <Text style={styles.labelText}>{item.requiredPersons}</Text>
            <Text style={styles.labelText}>{" Persons"}</Text>
          </View>
          <View
            style={{
              borderRadius: 100,
              backgroundColor: AppColors.mainBlue,
              paddingHorizontal: 12,
              paddingVertical: 4,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Text style={styles.labelText}>{item.requiredHours}</Text>
            <Text style={styles.labelText}>{" Hours"}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          width: "50%",
          height: "100%",
          right: 0,
          bottom: 0,
        }}>
        <Image
          resizeMode="stretch"
          source={AppImages.triangle}
          style={{
            position: "absolute",
            width: "100%",
            height: "95%",
            bottom: 0,
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
          }}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.dateText}>
            {item.priceperHour}
            <Text
              style={{
                fontSize: 12,
                fontFamily: FontFamilty.regular,
                color: AppColors.white80,
              }}>
              {" / hour"}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    elevation: 10,
    padding: 16,
    rowGap: 8,
  },
  descriptionText: {
    fontSize: 8,
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
});
