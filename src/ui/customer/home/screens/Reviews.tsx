import { FlatList, StyleSheet, View } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { Header } from "../components/Header";
import React, { useState } from "react";
import { ReviewsComp } from "../components/ReviewsComp";

export const Reviews = ({ navigation }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      review:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ",
      title: "Pest Control",
      rating: 4,
      date: "18th Jan 2025",
    },
    {
      id: 2,
      review:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ",
      title: "Pest Control",
      rating: 5,
      date: "18th Jan 2025",
    },
  ]);
  return (
    <View style={styles.container}>
      <Header back={true} heading={"Reviews"} navigation={navigation} />
      <FlatList
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
