import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { AppImages } from "../../../constants/AppImages";
import { AppColors } from "../../../constants/AppColors";

const RatingModal = ({ isVisible, onClose, onSubmit, review, setReview, rating, setRating }) => {


  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit({ rating, review }); // Pass rating and review to the function
      setRating(0);
      setReview("");
      onClose(); // Close the modal after submitting
    } else {
      alert("Please select a rating!");
    }
  };

  return (
    <Modal transparent visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: AppColors.black50,justifyContent:'center',padding:16 }}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image source={AppImages.cross} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>

          <Text style={styles.title}>Leave a Review</Text>

          <StarRating rating={rating} onChange={setRating} starSize={30} />

          <TextInput
            style={styles.input}
            placeholder="Write your review..."
            value={review}
            onChangeText={setReview}
            multiline
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
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
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RatingModal;
