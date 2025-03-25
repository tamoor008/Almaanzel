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

export const NeedHand = ({ item, updateServiceDetails,setPrice,setAddons,addons }) => {
  const scrollViewRef = useRef(null);
  const [persons, setPersons] = useState([
  ]);

  const addPerson = () => {
    const nextId = `Person ${persons.length + 1}`;
    const newPerson = { id: nextId, personType: "", hours: 0,priceperhour:0 };
    const updatedPersons = [...persons, newPerson];

    setPersons(updatedPersons);
    updateServiceDetails("NeedHandPersons", updatedPersons);
    compilePrice(updatedPersons)
    console.log('new person',updatedPersons);
    validateAddons(updatedPersons)

  };

  const removePerson = (index) => {
    const updatedPersons = persons.filter((_, i) => i !== index);
    setPersons(updatedPersons);
    updateServiceDetails("NeedHandPersons", updatedPersons);
    compilePrice(updatedPersons)
    validateAddons(updatedPersons)

  };

  const updatePerson = (index, key, value) => {
    
    const updatedPersons = persons.map((person, i) =>
      i === index ? { ...person, [key]: value ,priceperhour:key=='personType'?value=='Handy Man (AED 125/hr)'?125:value=='Electrician (AED 165/hr)'?165:145:person.priceperhour} : person
    );
    
    setPersons(updatedPersons);
    updateServiceDetails("NeedHandPersons", updatedPersons);
    compilePrice(updatedPersons)

    console.log('updatePerson',updatedPersons);
    validateAddons(updatedPersons)
  };

  const compilePrice = (updatedPersons) => {
  
    const totalHours = updatedPersons.reduce((sum, person) => sum + person.hours, 0); // Calculate total hours
    const totalPrice = updatedPersons.reduce((total, person) => total + (person.hours * person.priceperhour), 0); // Calculate total price
  
    updateServiceDetails("addon", { 
      persons: `${updatedPersons.length} ${updatedPersons.length > 1 ? 'Persons' : 'Person'}`, 
      hours: `${totalHours} ${totalHours > 1 ? 'Hours' : 'Hour'}` 
    });  
    setPrice(totalPrice);
  };
  
  const validateAddons = (data) => {
    // Check if every item in the array meets the conditions
    const isValid = data.every(item => 
      item.priceperhour > 0 && 
      item.personType.trim() !== "" && 
      item.hours > 0
    );
  console.log('isValid',isValid);
  
    setAddons(isValid); // Set addons to true if all conditions are met, otherwise false
  };
  

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <Image style={{ height: 249, width: "100%" }} source={item.img} />
        <Description description={"This service provides skilled professionals for handyman tasks."} />

        <FlatList
          removeClippedSubviews={false}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ margin: 8 }} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 64 }}
          data={persons}
          renderItem={({ item, index }) => (
            <PersonComp
              index={index}
              removePerson={removePerson}
              item={item}
              updatePerson={updatePerson}
            />
          )}
        />
      </ScrollView>

      <TouchableOpacity onPress={addPerson} style={styles.addButton}>
        <Image style={{ width: 16, height: 16 }} source={AppImages.plus} />
        <Text style={styles.headingText}>Add Person</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.white },
  addButton: {
    borderRadius: 100,
    borderColor: AppColors.mainBlue,
    padding: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginVertical: 16,
    columnGap: 8,
  },
  headingText: {
    fontSize: 16,
    fontFamily: FontFamilty.bold,
    color: AppColors.mainBlue,
  },
});



