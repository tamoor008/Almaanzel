import { FlatList, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { AppColors } from "../../../constants/AppColors";
import { SampleImages } from "../../../constants/SampleImages";
import { ServiceComp } from "../../customer/home/components/ServiceComp";
import { AdminHeader } from "../components/AdminHeader";
import { useEffect, useState } from "react";
import FontFamilty from "../../../constants/FontFamilty";
import database from "@react-native-firebase/database"; // Firebase Realtime Database
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppImages } from "../../../constants/AppImages";
import { FixerComp } from "../components/FixerComp";
import { useIsFocused } from "@react-navigation/native";
import { setisLoggedin } from "../../../redux/AppReducer";

export const AdminHomeScreen = ({ navigation }) => {
  const selector = useSelector(state => state.AppReducer);
  const user = selector.user
  const userId = user.uid
  const dispatch=useDispatch()

  const [unassignedBookings, setUnassignedBookings] = useState([])
  const [assignedBookings, setAssignedBookings] = useState([])
  const [cancelledBookings, setCancelledBookings] = useState([])
  const [completedBookings, setCompletedBookings] = useState([])
  const [fixers, setFixers] = useState([])
  const [loader, setLoader] = useState(false)


  const fetchData = async () => {
    setLoader(true);
    try {
      const snapshot = await database().ref('/serviceRequests').once('value');
      console.log(snapshot);


      if (snapshot.exists()) {
        const rawData = snapshot.val();
        console.log('Raw Data:', rawData);

        const unassigned = [];
        const assigned = [];
        const cancelled = [];
        const completed = [];

        Object.values(rawData).forEach(requests => {
          Object.values(requests).forEach(item => {
            const status = item.status; // Ensure 'status' exists directly on the object

            switch (status?.toLowerCase()) {
              case 'unassigned':
                unassigned.push(item);
                break;
              case 'assigned':
                assigned.push(item);
                break;
              case 'cancelled':
                cancelled.push(item);
                break;
              case 'completed':
                completed.push(item);
                break;
              default:
                console.warn('Unknown status:', status);
            }
          });
        });

        setUnassignedBookings(unassigned);
        setAssignedBookings(assigned);
        setCancelledBookings(cancelled);
        setCompletedBookings(completed);
      } else {
        console.log('No data available');
        setUnassignedBookings([]);
        setAssignedBookings([]);
        setCancelledBookings([]);
        setCompletedBookings([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoader(false);
    }
  };

  const fetchFixers = async () => {
    try {
      const snapshot = await database().ref("/users").once("value");

      if (snapshot.exists()) {
        const allUsers = snapshot.val();
        const fixerList = Object.keys(allUsers)
          .map((key) => ({ id: key, ...allUsers[key] })) // Convert to array
          .filter((user) => user.userInfo.userType === "fixer"); // Filter fixers only
        console.log(fixerList);

        setFixers(fixerList);
      } else {
        setFixers([]);
      }
    } catch (error) {
      console.error("Error fetching fixers:", error);
    }
  };

  useEffect(() => {
    fetchData()
    fetchFixers()
  }, [useIsFocused()])

  const logout=()=>{
    dispatch(setisLoggedin(false))
  }

  return (
    <View style={styles.container}>
      <AdminHeader logout={logout} navigation={navigation} />
      <ScrollView>

        <Text style={{ fontFamily: FontFamilty.bold, fontSize: 16, color: AppColors.black, marginHorizontal: 16, marginTop: 16 }}>{'Bookings'}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16, paddingHorizontal: 16, marginTop: 16 }}>
          <TouchableOpacity onPress={() => navigation.navigate('AdminBookings', { name: 'Unassigned', item: unassignedBookings, fixers: fixers })} activeOpacity={0.9} style={{ flex: 1, padding: 16, borderRadius: 16, backgroundColor: AppColors.white, elevation: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: FontFamilty.black, fontSize: 16, color: AppColors.mainBlue }}>{unassignedBookings.length}</Text>
            <Text style={{ fontFamily: FontFamilty.black, fontSize: 16, color: AppColors.mainBlue }}>{'Unassigned'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AdminBookings', { name: 'Assigned', item: assignedBookings })} activeOpacity={0.9} style={{ flex: 1, padding: 16, borderRadius: 16, backgroundColor: AppColors.white, elevation: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: FontFamilty.black, fontSize: 16, color: AppColors.mainBlue }}>{assignedBookings.length}</Text>
            <Text style={{ fontFamily: FontFamilty.black, fontSize: 16, color: AppColors.mainBlue }}>{'Assigned'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16, paddingHorizontal: 16, marginTop: 16 }}>
          <TouchableOpacity onPress={() => navigation.navigate('AdminBookings', { name: 'Cancelled', item: cancelledBookings })} activeOpacity={0.9} style={{ flex: 1, padding: 16, borderRadius: 16, backgroundColor: AppColors.white, elevation: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: FontFamilty.black, fontSize: 16, color: AppColors.mainBlue }}>{cancelledBookings.length}</Text>
            <Text style={{ fontFamily: FontFamilty.black, fontSize: 16, color: AppColors.mainBlue }}>{'Cancelled'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AdminBookings', { name: 'Completed', item: completedBookings })} activeOpacity={0.9} style={{ flex: 1, padding: 16, borderRadius: 16, backgroundColor: AppColors.white, elevation: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: FontFamilty.black, fontSize: 16, color: AppColors.mainBlue }}>{completedBookings.length}</Text>
            <Text style={{ fontFamily: FontFamilty.black, fontSize: 16, color: AppColors.mainBlue }}>{'Completed'}</Text>
          </TouchableOpacity>

        </View>

        <Text style={{ fontFamily: FontFamilty.bold, fontSize: 16, color: AppColors.black, marginHorizontal: 16, marginTop: 16 }}>{'Fixers'}</Text>

        <FlatList removeClippedSubviews={false} // <- Add This
          scrollEnabled={false} ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }}></View>} contentContainerStyle={{ padding: 16 }} data={fixers} renderItem={({ item, index }) => <FixerComp item={item} />} />
      </ScrollView>
      <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate('Addfixer') }} style={{ width: 75, height: 75, borderRadius: 1000, position: 'absolute', right: 32, bottom: 32 }}>
        <Image style={{ width: 75, height: 75 }} source={AppImages.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});
