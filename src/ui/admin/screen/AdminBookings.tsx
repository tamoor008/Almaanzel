import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";

import database from "@react-native-firebase/database"; // Firebase Realtime Database
import { useSelector } from "react-redux";
import moment from 'moment';
import { useState, useEffect } from "react";
import { AppColors } from "../../../constants/AppColors";
import FontFamilty from "../../../constants/FontFamilty";
import { SampleImages } from "../../../constants/SampleImages";
import { PastBookingComp } from "../../customer/bookings/components/PastBookingComp";
import { UpcomingBookingComp } from "../../customer/bookings/components/UpcomingBookingComp";
import { useRoute } from "@react-navigation/native";
import { AdminHeaderfixer } from "../components/AdminHeaderfIxer";
import { BookingComp } from "../components/BookingComp";

export const AdminBookings = ({ navigation }) => {
  const selector = useSelector(state => state.AppReducer);
  const route = useRoute()
  const { name, item, fixers } = route.params
  const user = selector.user
  const userId = user.uid

  const [loader, setLoader] = useState(false)

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

  const [bookings, setBookings] = useState(item);

  return (
    <View style={styles.container}>
      <AdminHeaderfixer
        heading={name + " Bookings"}
        navigation={navigation}
        back={true}

      />

      {loader ?
        <View style={{ ...styles.container, justifyContent: "center" }}>
          <ActivityIndicator
            size={"large"}
            color={AppColors.mainBlue}></ActivityIndicator>
        </View>
        :
        <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false} style={{ marginTop: 16 }}>
          <View style={{ flex: 1, }}>
            {bookings?.length > 0 ? <FlatList
              contentContainerStyle={{ padding: 16 }}
              style={{ flex: 1 }}
              removeClippedSubviews={false}
              ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
              scrollEnabled={false}
              renderItem={({ item, index }) => <BookingComp fixers={fixers} key={index} navigation={navigation} item={item} />}
              data={bookings}
            /> :
              <View style={{ flex: 1, backgroundColor: AppColors.white, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: FontFamilty.bold, fontSize: 16, color: AppColors.mainBlue, textAlign: 'center' }}>{`There are no ${name} Bookings`}</Text>
              </View>}
          </View>
        </ScrollView>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});

