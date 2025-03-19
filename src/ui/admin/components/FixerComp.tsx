import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { AppColors } from "../../../constants/AppColors";
import { AppImages } from "../../../constants/AppImages";
import FontFamilty from "../../../constants/FontFamilty";


export const FixerComp = ({ item, colorscheme }) => {

    return (

        <View style={{
            ...styles.container, backgroundColor: colorscheme ? AppColors.mainBlue : AppColors.white,
        }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: FontFamilty.semibold, fontSize: 20, color:colorscheme ? AppColors.white :  AppColors.black }}>{item.userInfo.displayName}</Text>
                <Text style={{ fontFamily: FontFamilty.medium, fontSize: 16,  color:colorscheme ? AppColors.white :  AppColors.black }}>{item.userInfo.profession}</Text>
            </View>

            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text style={{ fontFamily: FontFamilty.semibold, fontSize: 12,  color:colorscheme ? AppColors.white :  AppColors.black }}>{item.userInfo.email}</Text>
                <Text style={{ fontFamily: FontFamilty.medium, fontSize: 12,  color:colorscheme ? AppColors.white :  AppColors.black}}>{item.userInfo.phoneNumber}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        elevation: 10,
        flex: 1,
        flexDirection: 'row',
        borderRadius: 12
    },

});
