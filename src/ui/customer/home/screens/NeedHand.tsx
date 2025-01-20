import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppColors } from "../../../../constants/AppColors";
import React, { useRef, useState } from "react";
import { Description } from "../components/Description";
import { PersonComp } from "../components/PersonComp";
import { AppImages } from "../../../../constants/AppImages";
import FontFamilty from "../../../../constants/FontFamilty";

export const NeedHand = ({ item }) => {
  const scrollViewRef = useRef(null);

  const [persons, setPersons] = useState([
    {
      id: "Person 1",
      person: "",
      time: "",
    },
  ]);

  const addPerson = () => {
    // Calculate the next ID (e.g., "Person 2", "Person 3")
    const nextId = `Person ${persons.length + 1}`;

    // Create a new person object
    const newPerson = {
      id: nextId,
      person: "",
      time: "",
    };

    // Update the state by appending the new person to the array
    setPersons([...persons, newPerson]);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100); // Small delay to ensure the new person is rendered
  };
  const removePerson = (index) => {
    if (index >= 0 && index < persons.length) {
      setPersons(persons.filter((person, i) => i !== index));
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <Image style={{ height: 249, width: "100%" }} source={item.img} />
        <Description
          description={
            "This service allows you to benefit from professional skilled personals to assist you on your tasks and instructions. Handyman, Electrician, Plumber etc. This is Handy based charges you can choose 1 hour, 4 hours, half day, full day."
          }
        />
        <FlatList
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ margin: 8 }}></View>}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item, index }) => (
            <PersonComp index={index} removePerson={removePerson} item={item} />
          )}
          data={persons}
        />
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={addPerson}
        style={{
          borderRadius: 100,
          borderColor: AppColors.mainBlue,
          padding: 12,
          borderWidth: 1,
          alignItems: "center",
          marginVertical: 16,
          justifyContent: "center",
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          columnGap: 8,
          bottom: 0,
        }}>
        <Image style={{ width: 16, height: 16 }} source={AppImages.plus} />
        <Text style={styles.headingText}>Add Person</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.bold,
    color: AppColors.mainBlue,
  },
});
