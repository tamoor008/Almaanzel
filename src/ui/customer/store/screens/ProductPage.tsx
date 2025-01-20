import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import FontFamilty from "../../../../constants/FontFamilty";
import Icon from "react-native-vector-icons/FontAwesome";
import { SampleImages } from "../../../../constants/SampleImages";
import { ProductComp } from "../components/ProductComp";
import { AppImages } from "../../../../constants/AppImages";
import React from "react";

export const ProductPage = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const route = useRoute();
  const { item } = route.params;

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Glint Cleaner",
      rating: "4.9",
      price: "AED 99",
      previousPrice: "AED 199",
      descriptionText:
        "This is the best gardern spray to control the pests ins your gardens. This spray is best for bugs and small pests in your garden which can be harmful for your gardern. Its one spray is enough for controlling the pests for more then a month.",

      img: SampleImages.product1,
      totalReviews: "112",
      totalSold: "1.2k",
    },
    {
      id: 2,
      name: "Tank Cleaner",
      rating: "4.9",
      price: "AED 99",
      previousPrice: "AED 199",
      descriptionText:
        "This is the best gardern spray to control the pests ins your gardens. This spray is best for bugs and small pests in your garden which can be harmful for your gardern. Its one spray is enough for controlling the pests for more then a month.",
      totalReviews: "112",
      totalSold: "1.2k",

      img: SampleImages.product2,
    },
    {
      id: 3,
      name: "Duct Coil for AC",
      rating: "4.9",
      price: "AED 99",
      previousPrice: "AED 199",
      totalSold: "1.2k",

      totalReviews: "112",

      descriptionText:
        "This is the best gardern spray to control the pests ins your gardens. This spray is best for bugs and small pests in your garden which can be harmful for your gardern. Its one spray is enough for controlling the pests for more then a month.",

      img: SampleImages.product3,
    },
    {
      id: 4,
      name: "Garden Spray",
      rating: "4.9",
      price: "AED 99",
      totalSold: "1.2k",

      previousPrice: "AED 199",
      totalReviews: "112",
      descriptionText:
        "This is the best gardern spray to control the pests ins your gardens. This spray is best for bugs and small pests in your garden which can be harmful for your gardern. Its one spray is enough for controlling the pests for more then a month.",
      img: SampleImages.product4,
    },
  ]);

  const productPress = (item) => {
    navigation.navigate("ProductPage", { item: item });
  };
  const navigatetoSupport = () => {
    navigation.navigate("Chat");
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            backgroundColor: AppColors.white,
            height: 70,
            paddingTop: 8,
            paddingBottom: 8,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }); // Reset tab bar when leaving screen
      };
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ rowGap: 16 }}
        showsVerticalScrollIndicator={false}>
        <PageHeader img={item.img} navigation={navigation} />
        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: FontFamilty.medium,
                color: AppColors.black,
              }}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 8,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FontFamilty.bold,
                  color: AppColors.mainBlue,
                }}>
                {item.price}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  textDecorationLine: "line-through",
                  fontFamily: FontFamilty.regular,
                  color: AppColors.text8181,
                }}>
                {item.previousPrice}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: FontFamilty.regular,
              color: AppColors.text8181,
              marginTop: 8,
            }}>
            {item.descriptionText}
          </Text>
          <View style={{ flexDirection: "row", columnGap: 8, marginTop: 16 }}>
            <View
              style={{
                flexDirection: "row",
                columnGap: 2,
                alignItems: "center",
                borderRightWidth: 1,
                paddingRight: 8,
              }}>
              <Icon name={"star"} size={16} color={"#FFD700"} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FontFamilty.medium,
                  color: AppColors.black,
                }}>
                {item.rating}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FontFamilty.medium,
                  color: AppColors.text8181,
                }}>
                ({item.totalReviews})
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: FontFamilty.medium,
                color: AppColors.black,
              }}>
              {item.totalSold} sold
            </Text>
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: FontFamilty.medium,
              color: AppColors.black,
              marginHorizontal: 16,
            }}>
            Product Loved by others
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            data={products}
            renderItem={({ item, index }) => (
              <ProductComp
                horizontal={true}
                onPress={productPress}
                item={item}
              />
            )}
          />
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          paddingHorizontal: 16,
          columnGap: 12,
          paddingVertical: 16,
        }}>
        <TouchableOpacity
          onPress={navigatetoSupport}
          style={{
            height: 40,
            width: 40,
            borderWidth: 1,
            borderColor: AppColors.grey,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: AppColors.white,
            borderRadius: 100,
          }}>
          <Image
            resizeMode="contain"
            source={AppImages.support}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            flex: 1,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            backgroundColor: AppColors.mainBlue,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FontFamilty.bold,
              color: AppColors.white,
            }}>
            Buy Now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            flex: 1,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            borderColor: AppColors.mainBlue,
            borderWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FontFamilty.bold,
              color: AppColors.mainBlue,
            }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
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
