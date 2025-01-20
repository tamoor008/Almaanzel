import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import { AppImages } from "../../../../constants/AppImages";

export const ChatFooter = ({ text, setText, sendMessage }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ ...styles.messageBox }}>
          <TextInput
            placeholder={"Type Message"}
            multiline={true}
            value={text}
            placeholderTextColor={AppColors.text8181}
            style={{
              paddingHorizontal: 16,
              flex: 1,
              fontSize: 14,
              textAlignVertical: "center",
            }}
            onChangeText={(text) => setText(text)}></TextInput>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          sendMessage(text);
          setText("");
        }}
        disabled={text == "" ? true : false}
        style={{
          width: 32,
          height: 32,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          opacity: text == "" ? 0.5 : 1,
          backgroundColor: AppColors.mainBlue,
        }}>
        <Image style={{ width: 16, height: 16 }} source={AppImages.send} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 16,
    backgroundColor: AppColors.white,
    elevation: 100,
    padding: 16,
    borderTopWidth: 1,
    borderColor: AppColors.grey,
    alignItems: "center",
  },
  messageBox: {
    height: 40,
    width: "100%",
    borderRadius: 12,
    borderColor: AppColors.text8181,
    borderWidth: 1,
  },
});
