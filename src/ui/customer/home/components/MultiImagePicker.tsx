// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// const MultiImagePicker = ({ onImagesSelected }) => {
//   const [selectedImages, setSelectedImages] = useState([]);

//   // Function to pick multiple images
//   const pickImages = async () => {
//     // Request media library permissions
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert(
//         "Permission Denied",
//         "We need access to your photos to proceed."
//       );
//       return;
//     }

//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         allowsMultipleSelection: true, // Allows selecting multiple images (iOS 14+ only)
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setSelectedImages(result.assets);
//         onImagesSelected(result.assets); // Send images to parent component (if needed)
//       }
//     } catch (error) {
//       console.log("Image selection failed:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={pickImages}>
//         <Text style={styles.buttonText}>Pick Images</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={selectedImages}
//         keyExtractor={(item) => item.uri}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <Image source={{ uri: item.uri }} style={styles.image} />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     padding: 20,
//   },
//   button: {
//     backgroundColor: "#3498db",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     marginRight: 8,
//   },
// });

// export default MultiImagePicker;
