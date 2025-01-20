import { StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import Icon from "react-native-vector-icons/FontAwesome";

export const ReviewsComp = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.headingText}>{item.title}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={{ flexDirection: "row", columnGap: 4 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon
            key={index}
            name={index < item.rating ? "star" : "star"}
            size={20}
            color={index < item.rating ? "#FFD700" : AppColors.greystar}
          />
        ))}
      </View>

      <Text style={styles.dateText}>{item.review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    columnGap: 16,
    backgroundColor: AppColors.white,
    paddingHorizontal: 16,
    rowGap: 8,
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    fontFamily: FontFamilty.regular,
    color: AppColors.text8181,
  },
  imgStyle: {
    borderRadius: 100,
    height: 32,
    width: 32,
  },
});
