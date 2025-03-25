import { View, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { useState } from "react";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth"; // Firebase Auth
import { launchImageLibrary } from "react-native-image-picker"; // Image Picker
import { AdminHeaderfixer } from "../components/AdminHeaderfIxer";
import { CustomTextInput } from "../../../components/CustomTextInput";
import { CustomButton } from "../../../components/CustomButton";
import { AppColors } from "../../../constants/AppColors";
import { AppImages } from "../../../constants/AppImages";

export const Addfixer = ({ navigation }) => {
    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [phone, setPhone] = useState(null);

    // Function to pick an image from the gallery
    const pickImage = () => {
        launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (response.didCancel) {
                // console.log("User cancelled image picker");
            } else if (response.error) {
                // console.log("Image picker error: ", response.error);
            } else {
                setImage(response.assets[0].uri); // Set selected image URI
            }
        });
    };

    // Function to create a fixer in Firebase Auth & save their details in Firebase Realtime Database
    const createFixer = async () => {
        if (!name || !profession || !email || !password || !image) {
            Alert.alert("Error", "Please fill in all fields and select an image.");
            return;
        }

        setUploading(true);
        try {
            // Step 1: Create User in Firebase Authentication
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const fixerId = userCredential.user.uid;

            // Step 2: Upload Image to Firebase Storage
            // const fileName = `fixers/${fixerId}.jpg`;
            // const reference = storage().ref(fileName);
            // await reference.putFile(image);

            // // Step 3: Get Image URL
            // const imageUrl = await reference.getDownloadURL();

            // Step 4: Save Fixer Data to Firebase Realtime Database
            await database().ref(`/users/${fixerId}`).child('userInfo').set({
                uid: fixerId,
                email: email,
                displayName: name,
                phoneNumber: phone,
                photoURL: '',
                providerId:'',
                userType:'fixer',
                profession:profession
               
            });

            Alert.alert("Success", "Fixer added successfully!");
            setName("");
            setProfession("");
            setEmail("");
            setPassword("");
            setImage(null);
            navigation.goBack(); // Navigate back
        } catch (error) {
            console.error("Error adding fixer: ", error);
            Alert.alert("Error", error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <AdminHeaderfixer heading={"Add Fixer"} back={true} navigation={navigation} />

            <View style={{ rowGap: 16, padding: 16, flex: 1, alignItems: "center" }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={pickImage}
                    style={{
                        borderWidth: 2,
                        borderRadius: 1000,
                        width: 75,
                        height: 75,
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    {image ? (
                        <Image
                            resizeMode="cover"
                            style={{ width: 75, height: 75, borderRadius: 1000 }}
                            source={{ uri: image }}
                        />
                    ) : (
                        <Image
                            resizeMode="cover"
                            style={{ width: 40, height: 40, borderRadius: 1000 }}
                            source={AppImages.profile}
                        />
                    )}
                </TouchableOpacity>

                <CustomTextInput placeholder={"Name"} text={name} setText={setName} />
                <CustomTextInput placeholder={"Profession"} text={profession} setText={setProfession} />
                <CustomTextInput placeholder={"Phone Number"} text={phone} setText={setPhone} keyboardType={'numeric'} />
                <CustomTextInput placeholder={"Email"} text={email} setText={setEmail} keyboardType="email-address" />
                <CustomTextInput placeholder={"Password"} text={password} setText={setPassword} secureTextEntry={true} />
            </View>

            <View style={{ margin: 16 }}>
                <CustomButton
                    text={uploading ? "Adding..." : "Add Fixer"}
                    onPress={createFixer}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
});
