import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";

export const ServiceComp = ({ item, navigatetoReviews }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => item.onPress(item)}
      style={styles.container}>
      <Image
        style={{
          height: 175,
          width: "100%",
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
        }}
        source={item.img}
      />

      <View style={styles.rowContainer}>
        <View style={{ rowGap: 4, flex: 1 }}>
          <Text style={styles.headingText}>{item.heading}</Text>
          <View
            style={{
              flexDirection: "row",
              columnGap: 4,
              alignItems: "center",
            }}>
            <Image
              style={{
                height: 12,
                width: 12,
              }}
              source={AppImages.star}
            />

            <Text style={styles.descriptionText}>{item.rating}</Text>
          </View>
        </View>

        {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
          {item.priceDescription && (
            <Text
              style={{ ...styles.descriptionText, color: AppColors.black50 }}>
              {item.priceDescription}
            </Text>
          )}

          <Text
            style={{
              ...styles.headingText,
              color: AppColors.mainBlue,
              fontFamily: FontFamilty.semibold,
            }}>
            {item.price}
          </Text>
        </View> */}
      </View>

      <TouchableOpacity onPress={()=>navigatetoReviews(item)} style={styles.reviewStyle}>
        <Text style={styles.reviewText}>See all Reviews</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    columnGap: 16,
    backgroundColor: AppColors.white,
    elevation: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: FontFamilty.medium,
    color: AppColors.textGrey,
    textAlign: "center",
  },
  reviewStyle: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: AppColors.mainBlue,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  reviewText: {
    color: AppColors.white,
    fontSize: 10,
    fontFamily: FontFamilty.medium,
  },
});
