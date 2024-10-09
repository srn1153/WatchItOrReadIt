<<<<<<< Updated upstream
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import profileRoom from '../../assets/ProfileRoom/room1.png'; //importing the profile room image

export default function ProfileScreen() {
  const navigation = useNavigation(); //navigation object to navigate between screens 
=======
import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import profileRoom from '../../assets/ProfileRoom/room1.png'; // importing the profile room image
import heartButton from '../../assets/ProfileRoom/heartButton.png'; // importing the heart button image
import decorateButton from '../../assets/ProfileRoom/decorateButton.png'; // importing the decorate button image
import countryLamp from '../../assets/ProfileRoom/Country_Lamp.png'; // importing the country lamp image
import ornateLamp from '../../assets/ProfileRoom/Ornate_Lamp.png'; // importing the ornate lamp image
import OrnateLampOverlay from '../../assets/ProfileRoom/OrnateLamp_Overlay.png'; // Overlay image when item selected
import jojaCouch from '../../assets/ProfileRoom/Joja_Couch.png'; // importing the ornate lamp image
import wizardCouch from '../../assets/ProfileRoom/Wizard_Couch.png'; // importing the ornate lamp image
import yellowCouch from '../../assets/ProfileRoom/Yellow_Couch.png'; // importing the ornate lamp image
import largeBrownCouch from '../../assets/ProfileRoom/Large_Brown_Couch.png'; // importing the ornate lamp image
import blueCouch from '../../assets/ProfileRoom/Blue_Couch.png'; // importing the ornate lamp imager


export default function ProfileScreen() {
  const navigation = useNavigation(); // navigation object to navigate between screens
  const [isModalVisible, setModalVisible] = useState(false); // state to manage modal visibility
  const [activeTab, setActiveTab] = useState('Lamp'); // Default active tab is 'Lamp'
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item for overlay


  const toggleModal = () => {
    setModalVisible(!isModalVisible); // Toggle modal visibility
  };
>>>>>>> Stashed changes


    // Function to handle item selection and update the state with the selected item
  const handleItemSelect = (item) => {
    // Check if the selected item is countryLamp
    if (item === 'countryLamp') {
      // If countryLamp is selected, reset the selected item
      setSelectedItem(null);
    } else {
      // Otherwise, set the selected item
      setSelectedItem(item);
    }
    // setModalVisible(false); // Close the modal after selection
  };


  const renderItemsForActiveTab = () => {
    if (activeTab === 'Lamp') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('countryLamp')}>
          <Image source={countryLamp} style={styles.itemImage} />
            {/* <Text style={styles.itemText}>Country Lamp</Text> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('ornateLamp')}>
            <Image source={ornateLamp} style={styles.itemImage} />
            {/* <Text style={styles.itemText}>Ornate Lamp</Text> */}
          </TouchableOpacity>
        </ScrollView>
      );
    } else if (activeTab === 'Couch') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          {/* Added Couch items */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('jojaCouch')}>
          <Image source={jojaCouch} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('wizardCouch')}>
          <Image source={wizardCouch} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('yellowCouch')}>
          <Image source={yellowCouch} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('largeBrownCouch')}>
          <Image source={largeBrownCouch} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('blueCouch')}>
          <Image source={blueCouch} style={styles.itemImage} />
          </TouchableOpacity>


        </ScrollView>
      );
    } else if (activeTab === 'Armchair') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          {/* Add Armchair items here */}
          <Text style={styles.itemText}>No Armchair items available</Text>
        </ScrollView>
      );
    } else if (activeTab === 'Fireplace') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          {/* Add Fireplace items here */}
          <Text style={styles.itemText}>No Fireplace items available</Text>
        </ScrollView>
      );
    } else if (activeTab === 'Chair') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          {/* Add Chair items here */}
          <Text style={styles.itemText}>No Chair items available</Text>
        </ScrollView>
      );
    } else if (activeTab === 'TV') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          {/* Add TV items here */}
          <Text style={styles.itemText}>No TV items available</Text>
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.container}>
<<<<<<< Updated upstream
      <Image source={profileRoom} style={styles.profileRoomImg} /> 
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('List')}>
        <Text style={styles.buttonText}>My Lists</Text>
      </TouchableOpacity>
=======
      <Image source={profileRoom} style={styles.profileRoomImg} />

      {/* Conditionally render the selected item as an overlay */}
      {selectedItem === 'ornateLamp' && (
        <Image source={OrnateLampOverlay} style={styles.overlayImage} />
      )}


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.heartButton} onPress={() => navigation.navigate('List')}>
          <Image source={heartButton} style={styles.heartButtonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.decorateButton} onPress={toggleModal}>
          <Image source={decorateButton} style={styles.decorateButtonImage} />
        </TouchableOpacity>
      </View>

      {/* Modal for popup */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* <Text style={styles.modalText}>Customize Your Room</Text> */}
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>


            {/* Tab Bar */}
            <View style={styles.tabBar}>
              {['Lamp', 'Couch', 'Armchair', 'Fireplace', 'Chair', 'TV'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>


            {/* Scrollable items for the selected tab */}
            {renderItemsForActiveTab()}

          </View>
        </View>
      </Modal>
>>>>>>> Stashed changes
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute', 
    bottom: 30, 
    alignSelf: 'center', 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
  },
  profileRoomImg: {
    flex: 1, 
    height: '100%',
    width: '100%',
<<<<<<< Updated upstream
    resizeMode: 'stretch', 
    position: 'absolute', 
  }
});
=======
    resizeMode: 'contain',
    position: 'absolute',
  },
  overlayImage: {
    position: 'absolute',
    top: 395, // Adjust position of overlay image
    left: -5, // Adjust left alignment of overlay image
    height: 105,
    resizeMode: 'contain',
  },

  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    // alignSelf: 'center',
    marginLeft: 8,
    marginBottom: 104,
  },
  heartButton: {
    marginRight: 8,
  },
  heartButtonImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  decorateButton: {
    // marginLeft: 8,
  },
  decorateButtonImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'black',
    paddingTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 195, // Height of the popup
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: { //
    fontSize: 18,
    marginBottom: 20,
  },
  tabBar: {
    paddingLeft: 15,
    paddingRight: 15,
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: '#FFD186', // Inactive tab color
  },
  activeTab: {
    backgroundColor: '#794A3E', // Active tab color
  },
  tabText: {
    fontSize: 11,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'courier'
  },
  activeTabText: {
    color: '#fff', // Text color for active tab
  },

  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 15, // Space between items
  },
  itemImage: {
    width: 80, // Adjust size of the item images
    height: 80,
    resizeMode: 'contain',
  },
  itemText: {
    marginTop: 5,
    fontSize: 14,
  },
  closeButton: {
    fontSize: 15,
    color: '#FFD186',
    marginLeft: 310,
    bottom: 10,
  },
});
>>>>>>> Stashed changes
