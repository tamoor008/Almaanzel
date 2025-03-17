import { FlatList, StyleSheet, View,Text } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { SampleImages } from "../../../../constants/SampleImages";
import { StoreHeader } from "../components/StoreHeader";
import { CustomIconTextInput } from "../../../../components/CustomIconTextInput";
import { useState } from "react";
import { AppImages } from "../../../../constants/AppImages";
import { ProductComp } from "../components/ProductComp";
import FontFamilty from "../../../../constants/FontFamilty";

export const Store = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([
    // {
    //   id: 1,
    //   name: "Glint Cleaner",
    //   rating: "4.9",
    //   price: "AED 99",
    //   previousPrice: "AED 199",
    //   descriptionText:
    //     "This is the best gardern spray to control the pests ins your gardens. This spray is best for bugs and small pests in your garden which can be harmful for your gardern. Its one spray is enough for controlling the pests for more then a month.",

    //   img: SampleImages.product1,
    //   totalReviews: "112",
    //   totalSold: "1.2k",
    // },
    // {
    //   id: 2,
    //   name: "Tank Cleaner",
    //   rating: "4.9",
    //   price: "AED 99",
    //   previousPrice: "AED 199",
    //   descriptionText:
    //     "This is the best gardern spray to control the pests ins your gardens. This spray is best for bugs and small pests in your garden which can be harmful for your gardern. Its one spray is enough for controlling the pests for more then a month.",
    //   totalReviews: "112",
    //   totalSold: "1.2k",

    //   img: SampleImages.product2,
    // },
    // {
    //   id: 3,
    //   name: "Duct Coil for AC",
    //   rating: "4.9",
    //   price: "AED 99",
    //   previousPrice: "AED 199",
    //   totalSold: "1.2k",

    //   totalReviews: "112",

    //   descriptionText:
    //     "This is the best gardern spray to control the pests ins your gardens. This spray is best for bugs and small pests in your garden which can be harmful for your gardern. Its one spray is enough for controlling the pests for more then a month.",

    //   img: SampleImages.product3,
    // },
    // {
    //   id: 4,
    //   name: "Garden Spray",
    //   rating: "4.9",
    //   price: "AED 99",
    //   totalSold: "1.2k",

    //   previousPrice: "AED 199",
    //   totalReviews: "112",
    //   descriptionText:
    //     "This is the best gardern spray to control the pests ins your gardens. This spray is best for bugs and small pests in your garden which can be harmful for your gardern. Its one spray is enough for controlling the pests for more then a month.",
    //   img: SampleImages.product4,
    // },
  ]);

  const productPress = (item) => {
    navigation.navigate("ProductPage", { item: item });
  };
  return (
    <View style={styles.container}>
      <StoreHeader
        heading={"Almaanzel Store"}
        navigation={navigation}
        profile={SampleImages.user}
      />{products.length > 0 ?
        <View style={{ paddingHorizontal: 16, rowGap: 16, flex: 1 }}>
          <CustomIconTextInput
            text={search}
            setText={setSearch}
            placeholder={"Search"}
            icon={AppImages.search}
          />
          <FlatList
            removeClippedSubviews={false} // <- Add This
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            data={products}
            renderItem={({ item, index }) => (
              <ProductComp onPress={productPress} item={item} />
            )}
          />
        </View> : 

        <View style={{ flex: 1, backgroundColor: AppColors.white, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: FontFamilty.bold, fontSize: 16, color: AppColors.mainBlue, textAlign: 'center' }}>Sold Out! The Products will be restocked soon.</Text>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    rowGap: 16,
  },
});
