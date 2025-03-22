import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import FontFamilty from "../../../../constants/FontFamilty";


export const BookingDetailUiComp = ({ item }) => {
    return (
        <View style={{flexDirection:'row',columnGap:12,alignItems:'center'}}>
            <Image source={item.icon} style={{width:20,height:20}}/>
            <View
                style={{}}
            >

                <Text style={{ ...styles.desText, }}>{item.description}</Text>
                <Text style={{ ...styles.titleText, }}>{item.title}</Text>

            </View>
        </View>

    );
};

const styles = StyleSheet.create({

    titleText: {
        fontFamily: FontFamilty.semibold,
        fontSize: 16,
        color: AppColors.black,
    },
    desText: {

        fontFamily: FontFamilty.regular,
        fontSize: 10,
        color: AppColors.text8181,
    },
});
