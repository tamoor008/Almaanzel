import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AppColors } from "../constants/AppColors";
import FontFamilty from "../constants/FontFamilty";

export const CustomTextInput = ({
  style,
  setText,
  text,
  placeholder,
  keyboardType,
  secureTextEntry,
  multiline,
  maxLength,
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        maxLength={maxLength}
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
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    borderRadius: 4,
    backgroundColor: AppColors.textInputbg,
    borderColor: AppColors.borderGrey,
    borderWidth: 1,
  },
});
