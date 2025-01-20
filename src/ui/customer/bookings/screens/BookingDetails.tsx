import { StyleSheet, View } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { Header } from "../../home/components/Header";

export const BookingDetails = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        heading={"Booking Details"}
        navigation={navigation}
        profile={SampleImages.user}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
