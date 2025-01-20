import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { Header } from "../../home/components/Header";
import { useState } from "react";
import FontFamilty from "../../../../constants/FontFamilty";
import { UpcomingBookingComp } from "../components/UpcomingBookingComp";
import { PastBookingComp } from "../components/PastBookingComp";

export const Bookings = ({ navigation }) => {
  const [tabs, setTabs] = useState([
    {
      label: "Upcoming",
      selected: true,
    },
    {
      label: "Past",
      selected: false,
    },
  ]);
  const toggleTabsByIndex = (index) => {
    setTabs((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index
          ? { ...option, selected: true }
          : { ...option, selected: false }
      )
    );
  };

  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: 1,
      title: "Need a Hand",
      bookingid: "#1224214",
      time: "10:00 - 12:00",
      date: "Dec\n27\n2024",
      priceperHour: "AED 99",
      requiredPersons: "2",
      requiredHours: "8",
    },
  ]);
  const [pastBookings, setPastBookings] = useState([
    {
      id: 1,
      title: "Tank Cleaning",
      bookingid: "#1224214",
      time: "10:00 - 12:00",
      date: "Dec\n27\n2024",
      priceperHour: "AED 99",
      requiredPersons: "2",
      requiredHours: "8",
      status: "Cancelled",
      reason: "Fixer was Late",
    },
    {
      id: 2,
      title: "Tank Cleaning",
      bookingid: "#1224215",
      time: "10:00 - 12:00",
      date: "Dec\n27\n2024",
      priceperHour: "AED 99",
      requiredPersons: "2",
      requiredHours: "8",
      status: "Completed",
      rating: "4.8",
    },
  ]);
  return (
    <View style={styles.container}>
      <Header
        heading={"Bookings"}
        navigation={navigation}
        profile={SampleImages.user}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 16,
            marginHorizontal: 16,
            backgroundColor: AppColors.white,
            elevation: 10,
            borderRadius: 4,
          }}>
          {tabs.map((item, index) => (
            <TouchableOpacity
              onPress={() => toggleTabsByIndex(index)}
              activeOpacity={0.9}
              key={index}
              style={{
                flex: 1,
                height: 50,
                padding: 12,
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: item.selected
                  ? AppColors.mainBlue
                  : AppColors.white,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: FontFamilty.medium,
                  color: item.selected ? AppColors.white : AppColors.text8181,
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tabs[0].selected && (
          <FlatList
            contentContainerStyle={{ padding: 16 }}
            style={{ flex: 1 }}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
            renderItem={({ item, index }) => (
              <UpcomingBookingComp item={item} />
            )}
            data={upcomingBookings}
          />
        )}

        {tabs[1].selected && (
          <FlatList
            contentContainerStyle={{ padding: 16 }}
            style={{ flex: 1 }}
            ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
            scrollEnabled={false}
            renderItem={({ item, index }) => <PastBookingComp item={item} />}
            data={pastBookings}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
