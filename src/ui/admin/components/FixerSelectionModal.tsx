import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet,Image } from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import { Picker } from "@react-native-picker/picker"; // Custom Dropdown
import { AppImages } from "../../../constants/AppImages";

const FixerSelectionModal = ({ visible, onClose, fixers, onSelectFixer }) => {
    const [selectedFixer, setSelectedFixer] = useState("");

    return ( 
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                 
                    <Text style={styles.title}>Select a Fixer</Text>

                    {/* Custom Dropdown */}
                    <View style={styles.dropdownContainer}>
                        <Picker
                            selectedValue={selectedFixer}
                            onValueChange={(itemValue) => setSelectedFixer(itemValue)}
                        >
                            <Picker.Item label="Select a fixer" value="" />
                            {fixers?.map((fixer) => (
                                <Picker.Item key={fixer.id} label={fixer.userInfo.displayName+' - '+fixer.userInfo.profession} value={fixer.id} />
                            ))}
                        </Picker>
                    </View>

                    {/* Next Button */}
                    <CustomButton
                        text="Next"
                        onPress={() => {
                            if (selectedFixer) {
                                
                                onSelectFixer(selectedFixer);
                                onClose(); // Close Modal
                            } else {
                                alert("Please select a fixer!");
                            }
                        }}
                    />
                       <TouchableOpacity onPress={onClose} style={{position:'absolute',right:16,top:16}}>
                        <Image style={{width:16,height:16}} resizeMode={'contain'} source={AppImages.cross}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    dropdownContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
    },
});

export default FixerSelectionModal;
