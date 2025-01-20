import { StyleSheet, View, Text, Image } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";
import Icon from "react-native-vector-icons/FontAwesome";

export const PastBookingComp = ({ item }) => {
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
          }}>
          {item.rating ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 8,
              }}>
              <Icon name={"star"} size={16} color={"#FFD700"} />

              <Text style={styles.headingText}>{item.rating}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.descriptionText}>{"Reason"}</Text>
              <Text style={styles.headingText}>{item.reason}</Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          width: "50%",
          padding: 16,
          justifyContent: "space-between",
          height: "100%",
          right: 0,
          bottom: 0,
        }}>
        <View
          style={{
            borderRadius: 100,
            backgroundColor:
              item.status == "Completed" ? AppColors.mainBlue : AppColors.red,
            paddingHorizontal: 12,
            paddingVertical: 4,
            flexDirection: "row",
            justifyContent: "center",

            alignItems: "center",
          }}>
          <Text style={styles.labelText}>{item.status}</Text>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.dateText}>{item.priceperHour}</Text>
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
    fontSize: 14,
    fontFamily: FontFamilty.bold,
    color: AppColors.mainBlue,
    textAlign: "right",
  },
});
