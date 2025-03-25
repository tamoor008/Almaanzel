import { FlatList, StyleSheet, View } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { Header } from "../components/Header";
import { SampleImages } from "../../../../constants/SampleImages";
import { ServiceComp } from "../components/ServiceComp";

export const HomeScreen = ({ navigation }) => {
  const servicesData = [
    {
      id: 1,
      type: "0",
      img: SampleImages.service8,
      heading: "Need a Hand",
      rating: "4.9",
      price: "AED 450",
      priceDescription: "Starting From / ",
      footerDescription: " + Tax",
      onPress: (item) => {
        navigation.navigate("ServiceDetails", { type: "NeedHand", item: item });
      },
    },
    {
      id: 2,
      type: "0",
      img: SampleImages.service7,
      heading: "Water Tank & Heater",
      rating: "4.9",
      price: "AED 450",
      priceDescription: "Starting From / ",
      onPress: (item) => {
        navigation.navigate("ServiceDetails", {
          type: "watertank&services",
          item: item,
        });
      },
    },
    {
      id: 3,
      type: "0",
      img: SampleImages.service6,
      heading: "Garden Services",
      rating: "4.9",
      price: "AED 450",
      priceDescription: "Starting From / ",
      onPress: (item) => {
        navigation.navigate("ServiceDetails", {
          type: "GardenPackages",
          item: item,
        });
      },
    },
    {
      id: 4,
      type: "0",
      img: SampleImages.service5,
      heading: "AC Service Packages",
      rating: "4.9",
      price: "AED 450",
      priceDescription: "Starting From / ",
      onPress: (item) => {
        navigation.navigate("ServiceDetails", {
          type: "AcServicePackages",
          item: item,
        });
      },
    },
    {
      id: 5,
      type: "0",
      img: SampleImages.service4,
      heading: "Emergency Call",
      rating: "4.9",
      price: "AED 450",
      onPress: (item) => {
        navigation.navigate("ServiceDetails", {
          type: "EmergencyCall",
          item: item,
        });
      },
    },
    // {
    //   id: 6,
    //   type: "0",
    //   img: SampleImages.service3,
    //   heading: "Home Soft Work",
    //   rating: "4.9",
    //   price: "AED 450",
    //   priceDescription: "Starting From / ",
    //   onPress: (item) => {
    //     navigation.navigate("ServiceDetails", {
    //       type: "HomeSoftWork",
    //       item: item,
    //     });
    //   },
    // },
    {
      id: 7,
      type: "0",
      img: SampleImages.service2,
      heading: "Windows Cleaning",
      rating: "4.9",
      price: "AED 450",
      onPress: (item) => {
        navigation.navigate("ServiceDetails", {
          type: "WindowsCleaning",
          item: item,
        });
      },
    },
    {
      id: 8,
      type: "0",
      img: SampleImages.service1,
      heading: "Annual Maintenance Package",
      rating: "4.9",
      onPress: (item) => {
        navigation.navigate("ServiceDetails", {
          type: "AnnualMaintenancePackage",
          item: item,
        });
      },
    },
  ];

  const navigatetoReviews = (item) => {
    navigation.navigate("Reviews",{serviceType:item.heading});
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} profile={SampleImages.user} />
      <FlatList
        removeClippedSubviews={false} // <- Add This
        ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item, index }) => (
          <ServiceComp navigatetoReviews={navigatetoReviews} item={item} />
        )}
        data={servicesData}
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
