import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Modal,Image } from "react-native";
import StarRating  from "react-native-star-rating-widget";
import { AppImages } from "../../../constants/AppImages";

const CancelModal = ({ isVisible, onCancel, onConfirm,reason,setReason }) => {


  const handleSubmit = () => {
    if (reason!='') {
        onConfirm(); // Pass rating and review to the function
      setReason(""); 
      onCancel(); // Close the modal after submitting
    } else {
      alert("Please select a rating!");
    }
  };

  return (
    <Modal visible={isVisible}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
          <Image source={AppImages.cross} style={{width:24,height:24}}/>
        </TouchableOpacity>

        <Text style={styles.title}>Write a Reason to cancel</Text>


        <TextInput
          style={styles.input}
          placeholder="Reason"
          value={reason}
          onChangeText={setReason}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CancelModal;
