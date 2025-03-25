import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { Header } from "../../home/components/Header";
import { useEffect, useState } from "react";
import FontFamilty from "../../../../constants/FontFamilty";
import { UpcomingBookingComp } from "../components/UpcomingBookingComp";
import { PastBookingComp } from "../components/PastBookingComp";
import database from "@react-native-firebase/database"; // Firebase Realtime Database
import { useSelector } from "react-redux";
import moment from 'moment';

export const Bookings = ({ navigation }) => {
  const selector = useSelector(state => state.AppReducer);
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
  ]);

  const [pastBookings, setPastBookings] = useState([
  ]);

  const fetchData = async () => {
    setLoader(true);
    try {
      const snapshot = await database().ref('/serviceRequests').child(userId).once('value');

      if (snapshot.exists()) {
        const rawData = snapshot.val();

        const today = moment().format("YYYY-MM-DD");

        const upcoming = [];
        const past = [];

        Object.values(rawData).forEach(item => {
          const bookingDate = moment(item.details.Date).format("YYYY-MM-DD");

          if (bookingDate >= today&&item.status=='assigned'||item.status=='unassigned') {
            upcoming.push(item);
          } else {
            past.push(item);
          }
        });

        setUpcomingBookings(upcoming);
        setPastBookings(past);
      } else {
        console.log('No data available');
        setUpcomingBookings([]);
        setPastBookings([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [tabs])




  return (
    <View style={styles.container}>
      <Header
        heading={"Bookings"}
        navigation={navigation}
        profile={SampleImages.user}
      />
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
                fontSize: 12,
                fontFamily: FontFamilty.medium,
                color: item.selected ? AppColors.white : AppColors.text8181,
              }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {loader ?
        <View style={{ ...styles.container, justifyContent: "center" }}>
          <ActivityIndicator
            size={"large"}
            color={AppColors.mainBlue}></ActivityIndicator>
        </View>
        :
        <ScrollView contentContainerStyle={{ }} showsVerticalScrollIndicator={false} style={{marginTop:16}}>


          {tabs[0].selected && (
            <View style={{ flex: 1,}}>
              {upcomingBookings?.length > 0 ?
                <FlatList
                  contentContainerStyle={{ padding: 16 }}
                  style={{ flex: 1 }}
                  removeClippedSubviews={false} // <- Add This
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
                  renderItem={({ item, index }) => (
                    <UpcomingBookingComp key={index} navigation={navigation} item={item} />
                  )}
                  data={upcomingBookings}
                /> :
                <View style={{ flex: 1, backgroundColor: AppColors.white, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontFamily: FontFamilty.bold, fontSize: 16, color: AppColors.mainBlue, textAlign: 'center' }}>There are no Upcoming Appointments</Text>
                </View>}
            </View>
          )}

          {tabs[1].selected && (
            <View style={{ flex: 1, }}>
              {pastBookings?.length > 0 ?

                <FlatList
                  contentContainerStyle={{ padding: 16 }}
                  style={{ flex: 1 }}
                  removeClippedSubviews={false} // <- Add This
                  ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => <PastBookingComp key={index} navigation={navigation} item={item} fetchData={fetchData} />}
                  data={pastBookings}
                /> :
                <View style={{ flex: 1, backgroundColor: AppColors.white, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontFamily: FontFamilty.bold, fontSize: 16, color: AppColors.mainBlue, textAlign: 'center' }}>There are no Past Appointments</Text>
                </View>}
            </View>
          )}
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

