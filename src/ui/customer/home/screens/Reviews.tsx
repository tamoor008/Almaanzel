import { FlatList, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { Header } from "../components/Header";
import React, { useEffect, useState } from "react";
import { ReviewsComp } from "../components/ReviewsComp";
import database from "@react-native-firebase/database"; // Firebase Realtime Database
import { useRoute } from "@react-navigation/native";
import FontFamilty from "../../../../constants/FontFamilty";

export const Reviews = ({ navigation }) => {
  const route = useRoute()
  const { serviceType } = route.params

  const [reviews, setReviews] = useState([
  
  ]);
  const [loader, setLoader] = useState(false)
  const fetchData = async () => {

    setLoader(true);
    try {
      const snapshot = await database().ref('/reviews').child(serviceType).once('value');

      if (snapshot.exists()) {
   

        // Convert object to array with key as `id`
        const data = snapshot.val();
        const formattedArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setReviews(formattedArray);
      } else {
        setReviews([]); // Ensure it's an empty array if no data exists
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoader(false);
    }
  };


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <Header back={true} heading={"Reviews"} navigation={navigation} />
      {loader ?
        <View style={{ ...styles.container, justifyContent: "center" }}>
          <ActivityIndicator
            size={"large"}
            color={AppColors.mainBlue}></ActivityIndicator>
        </View>
        :
        <View style={{ flex: 1 }}>
          {reviews.length <= 0 ? (
            <View style={{ flex: 1, backgroundColor: AppColors.white, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: FontFamilty.bold, fontSize: 16, color: AppColors.mainBlue, textAlign: 'center' }}>There are no Reviews yet!!</Text>
            </View>
          ) : (
            <FlatList
              removeClippedSubviews={false} // <- Add This
              data={reviews}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    borderColor: AppColors.text8181,
                    margin: 8,
                  }}></View>
              )}
              renderItem={({ item, index }) => <ReviewsComp item={item} />}
            />
          )

          }

        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 16,
    backgroundColor: AppColors.white,
  },
});
