import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { AppImages } from "../../../../constants/AppImages";
import FontFamilty from "../../../../constants/FontFamilty";

export const AnnualMaintenanceComp = ({
  item,
  changeSelectedStatus,
  index,
}) => {
  return (
    <TouchableOpacity
      onPress={() => changeSelectedStatus(index)}
      activeOpacity={0.9}
      style={{
        ...styles.container,
        borderWidth: item.selected ? 0 : 1,
        backgroundColor: item.selected ? AppColors.mainBlue : AppColors.white,
      }}>
      <View
        style={{
          padding: 8,
          paddingHorizontal: 12,
          borderWidth: item.selected ? 1 : 0,
          flex: 1,
          borderRadius: 8,
          flexDirection: "row",
          columnGap: 16,
          alignItems: "center",
          borderColor: AppColors.white,
        }}>
        {item.selected ? (
          <View
            style={{
              backgroundColor: AppColors.white,
              height: 16,
              width: 16,
              borderRadius: 2,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Image source={AppImages.check} style={{ width: 12, height: 12 }} />
          </View>
        ) : (
          <View
            style={{
              borderWidth: 0.5,
              borderColor: AppColors.text8181,
              height: 16,
              width: 16,
              borderRadius: 2,
            }}></View>
        )}

        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...styles.headingText,
              color: item.selected ? AppColors.white : AppColors.black,
            }}>
            {item.label}
          </Text>
          <Text
            style={{
              ...styles.descriptionText,
              color: item.selected ? AppColors.white80 : AppColors.text8181,
            }}>
            {item.time}
          </Text>
        </View>

        <View style={{}}>
          <Text
            numberOfLines={1}
            style={{
              ...styles.priceText,
              color: item.selected ? AppColors.white : AppColors.mainBlue,
            }}>
            {'AED '}{item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 16,
    backgroundColor: AppColors.mainBlue,
    borderWidth: 1,
    borderColor: AppColors.text818150,
    padding: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  headingText: {
    fontSize: 14,
    fontFamily: FontFamilty.medium,
  },
  descriptionText: {
    fontSize: 10,
    fontFamily: FontFamilty.regular,
  },
  priceText: {
    fontSize: 12,
    fontFamily: FontFamilty.bold,
  },
});
