import { StyleSheet, Text, View, Image, Modal } from "react-native";
import { AppColors } from "../constants/AppColors";
import FontFamilty from "../constants/FontFamilty";
import { AppImages } from "../constants/AppImages";
import { CustomButton } from "./CustomButton";

export const SuccessModal = ({
  onPress,
  visible,
  heading,
  description,
  btnText,
}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Image
            resizeMode="contain"
            style={styles.imgStyle}
            source={AppImages.congratulationsView}
          />
          <View style={{ rowGap: 4, alignItems: "center" }}>
            <Text style={styles.headingText}>{heading}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
          <CustomButton onPress={onPress} text={btnText}></CustomButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.black50,
    padding: 16,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: AppColors.white,
    borderRadius: 16,
    padding: 16,
    rowGap: 16,
  },
  imgStyle: {
    height: 200,
    width: "100%",
  },
  headingText: {
    fontSize: 18,
    fontFamily: FontFamilty.semibold,
    color: AppColors.black,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: FontFamilty.regular,
    color: AppColors.greyText,
    textAlign: "center",
  },
});
