import { FlatList, StyleSheet, View } from "react-native";
import { AppColors } from "../../../../constants/AppColors";

import { useState } from "react";

import { Header } from "../../home/components/Header";
import { CustomButton } from "../../../../components/CustomButton";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { AddressComp } from "../components/AddressComp";

export const SavedAddress = ({ navigation }) => {
  const [addresses, setAddresses] = useState([
    {
      name: "Asim Mehmood",
      address: "H#8, St#10, Lahore, Pakistan",
      city: "Lahore, Pakistan",
      type: "Home",
      selected: false,
    },
    {
      name: "Alina Mehmood",
      address: "DHA, Karachi, Pakistan",
      city: "Karachi, Pakistan",
      type: "Work",
      selected: true,
    },
  ]);

  const changeSelected = (index) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address, i) => ({
        ...address,
        selected: i === index, // Set selected to true only for the clicked index
      }))
    );
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header heading={"Saved Address"} back={true} navigation={navigation} />

      <View
        style={{
          flex: 1,
          rowGap: 16,
          marginTop: 16,
          backgroundColor: AppColors.greybg,
        }}>
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderWidth: 0.5,
                borderColor: AppColors.text8181,
              }}></View>
          )}
          renderItem={({ item, index }) => (
            <AddressComp
              changeSelected={changeSelected}
              index={index}
              item={item}
            />
          )}
          data={addresses}
        />
      </View>
      <View style={{ padding: 16 }}>
        <CustomButton onPress={goBack} text={"Save"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
