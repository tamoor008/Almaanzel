import { StyleSheet, View, TextInput } from "react-native";
import { AppColors } from "../constants/AppColors";

export const CustomLargeTextInput = ({
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
          textAlignVertical: "top",
        }}
        onChangeText={(text) => setText(text)}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: "100%",
    borderRadius: 4,
    backgroundColor: AppColors.textInputbg,
    borderColor: AppColors.borderGrey,
    borderWidth: 1,
    paddingTop:8,
  },
});
