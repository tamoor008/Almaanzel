import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";
import { AppImages } from "../../../../constants/AppImages";

export const AddressComp = ({ item, changeSelected, index }) => {
  return (
    <TouchableOpacity
      onPress={() => changeSelected(index)}
      style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.headingText}>{item.name}</Text>
        <Text style={styles.descriptionText}>{item.address}</Text>
        <Text style={styles.descriptionText}>{item.city}</Text>
        <View
          style={{
            marginTop: 12,
            borderWidth: 1,
            borderRadius: 4,
            padding: 4,
            width: 100,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={styles.descriptionText}>{item.type}</Text>
        </View>
      </View>

      {item.selected ? (
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: AppColors.mainBlue,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 100,
              backgroundColor: AppColors.mainBlue,
            }}></View>
        </View>
      ) : (
        <View></View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 16,
    padding: 16,
    alignItems: "center",
    backgroundColor: AppColors.white,
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: FontFamilty.regular,
    color: AppColors.black,
  },
});
