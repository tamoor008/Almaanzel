import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const ConfirmModal = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Confirm Submission</Text>
        <Text style={styles.message}>Are you sure you want to complete the job?</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.confirm]} onPress={onConfirm}>
            <Text style={styles.buttonText}>Yes</Text>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: "gray",
  },
  confirm: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ConfirmModal;
