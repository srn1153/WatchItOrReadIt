import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/authContext'
import { db } from '../../firebaseConfig'; // firestore instance
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Add Firebase Firestore methods

// Furniture image Imports
import profileRoom from '../../assets/ProfileRoom/profileRoom.png'; // importing the profile room image
import heartButton from '../../assets/ProfileRoom/heartButton.png'; // importing the heart button image
import decorateButton from '../../assets/ProfileRoom/decorateButton.png'; // importing the decorate button image
import saveButton from '../../assets/ProfileRoom/saveButton.png';

//lamps
import countryLamp from '../../assets/ProfileRoom/Country_Lamp.png';
import ornateLamp from '../../assets/ProfileRoom/Ornate_Lamp.png'; 
import boxLamp from '../../assets/ProfileRoom/Box_Lamp.png'; 
import retroLamp from '../../assets/ProfileRoom/Retro_Lamp.png'; 
import classicLamp from '../../assets/ProfileRoom/Classic_Lamp.png'; 
import junimoLamp from '../../assets/ProfileRoom/Junimo_Lamp.png'; 
import jojaLamp from '../../assets/ProfileRoom/Joja_Lamp.png'; 
import ornateLampOverlay from '../../assets/ProfileRoom/OrnateLamp_Overlay.png'; 
import boxLampOverlay from '../../assets/ProfileRoom/BoxLamp_Overlay.png'; 
//couch
import jojaCouch from '../../assets/ProfileRoom/Joja_Couch.png'; // importing the ornate lamp image
import wizardCouch from '../../assets/ProfileRoom/Wizard_Couch.png'; 
import yellowCouch from '../../assets/ProfileRoom/Yellow_Couch.png'; 
import largeBrownCouch from '../../assets/ProfileRoom/Large_Brown_Couch.png'; 
import blueCouch from '../../assets/ProfileRoom/Blue_Couch.png'; 
import wizardCouchOverlay from '../../assets/ProfileRoom/WizardCouch_Overlay.png'; 
import yellowCouchOverlay from '../../assets/ProfileRoom/YellowCouch_Overlay.png'; 
import largeBrownCouchOverlay from '../../assets/ProfileRoom/LargeBrownCouch_Overlay.png'; 
//armchair
import brownArmchair from '../../assets/ProfileRoom/Brown_Armchair.png';
import blueArmchair from '../../assets/ProfileRoom/Blue_Armchair.png';
import yellowArmchair from '../../assets/ProfileRoom/Yellow_Armchair.png';
import redArmchair from '../../assets/ProfileRoom/Red_Armchair.png';
import greenArmchair from '../../assets/ProfileRoom/Green_Armchair.png';
import blueArmchairOverlay from '../../assets/ProfileRoom/BlueArmchair_Overlay.png'; 
import yellowArmchairOverlay from '../../assets/ProfileRoom/YellowArmchair_Overlay.png'; 
import redArmchairOverlay from '../../assets/ProfileRoom/RedArmchair_Overlay.png'; 
import greenArmchairOverlay from '../../assets/ProfileRoom/GreenArmchair_Overlay.png'; 
//fireplace
import brickFireplace from '../../assets/ProfileRoom/Brick_Fireplace.png';
import elegantFireplace from '../../assets/ProfileRoom/Elegant_Fireplace.png';
import elegantFireplaceOverlay from '../../assets/ProfileRoom/ElegantFireplace_Overlay.png'; 
//chair
import countryChair from '../../assets/ProfileRoom/Country_Chair.png'; 
import purpleOfficeChair from '../../assets/ProfileRoom/Purple_Office_Chair.png'; 
import countryChairOverlay from '../../assets/ProfileRoom/CountryChair_Overlay.png'; 

//rug
import snowyRug from '../../assets/ProfileRoom/Snowy_Rug.png'; 
import mysticRug from '../../assets/ProfileRoom/Mystic_Rug.png'; 

import snowyRugOverlay from '../../assets/ProfileRoom/SnowyRug_Overlay.png'; 






export default function ProfileScreen() {
  const navigation = useNavigation(); // navigation object to navigate between screens
  const [isModalVisible, setModalVisible] = useState(false); // state to manage modal visibility
  const [activeTab, setActiveTab] = useState('Lamp'); // Default active tab is 'Lamp'
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false); // New state for logout confirmation modal
  const { user } = useAuth(); // Get the current logged-in user from authContext


    //Separate states for each furniture type
    const [selectedLamp, setSelectedLamp] = useState(null);
    const [selectedCouch, setSelectedCouch] = useState(null);
    const [selectedArmchair, setSelectedArmchair] = useState(null);
    const [selectedFireplace, setSelectedFireplace] = useState(null);
    const [selectedChair, setSelectedChair] = useState(null);
    const [selectedRug, setSelectedRug] = useState(null);


    // Saves selected furniture to Firestore
    const saveSelectedFurniture = async () => {
      if (user) {
        try {
          const furnitureDoc = doc(db, "users", user.uid, "furnitures", "selected");
    
          // Log selected items to ensure they have values
          console.log("Saving selected furniture:", selectedLamp, selectedCouch, selectedArmchair, selectedFireplace, selectedChair, selectedRug);
    
          await setDoc(furnitureDoc, {
            lamp: selectedLamp || null,
            couch: selectedCouch || null,
            armchair: selectedArmchair || null,
            fireplace: selectedFireplace || null,
            chair: selectedChair || null,
            rug: selectedRug || null,
          }, { merge: true });
    
          console.log("Furniture selection saved successfully!");
        } catch (error) {
          console.error("Error saving furniture selection:", error);
        }
      } else {
        console.log("User is not authenticated. Cannot save furniture.");
      }
    };
  
    // Trigger save when modal closes
    const handleModalClose = () => {
      saveSelectedFurniture();
      setModalVisible(false); // Close the modal
    };


    // Fetch saved furniture selection from Firestore
    const fetchSelectedFurniture = async () => {
      if (user) {
        try {
          const furnitureDoc = doc(db, "users", user.uid, "furnitures", "selected");
          const docSnap = await getDoc(furnitureDoc);
    
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Fetched furniture data:", data);
            setSelectedLamp(data.lamp);
            setSelectedCouch(data.couch);
            setSelectedArmchair(data.armchair);
            setSelectedFireplace(data.fireplace || null);
            setSelectedChair(data.chair || null);
            setSelectedRug(data.rug || null);
          } else {
            console.log("No furniture selections found.");
          }
        } catch (error) {
          console.error("Error fetching furniture selections:", error);
        }
      } else {
        console.log("User is not authenticated. Cannot fetch furniture.");
      }
    };

      // Fetch the furniture selection when the component mounts or user changes
      useEffect(() => {
        if (user) {
          console.log("User detected, fetching furniture selections...");
          fetchSelectedFurniture();
        }
      }, [user]); // Only run when the user changes




      // Toggle modal visibility
      const toggleModal = () => {
        setModalVisible(!isModalVisible); 
      };

      // Toggle logout confirmation modal visibility
      const toggleLogoutModal = () => {
        setLogoutModalVisible(!isLogoutModalVisible); 
      };



  // LOG OUT BUTTON
      //Accessing the logout function from authContext
      const {logout} = useAuth()

      // Function to open the logout confirmation modal
      const handleLogoutButtonPress = () => {
        setLogoutModalVisible(true); // Open the confirmation modal
      };

      // Function to handle the actual logout process
      const onLogOutPressed = async () => {
        setLogoutModalVisible(false); // Close confirmation modal first
        console.log("Logout Button was pressed!");

        const response = await logout();
        console.log("Results", response); // Print out the results

        if (response.success) {
          navigation.navigate('Login'); // Navigate to the login screen
        } else {
          console.log("Logout error:", response.msg);
        }
      };


    // handle item selection and update the state with the selected item
    const handleItemSelect = (item) => {
      if (activeTab === 'Lamp') {
        setSelectedLamp(item); // only set the lamp state if the active tab is 'Lamp'
      } else if (activeTab === 'Couch') {
        setSelectedCouch(item); 
      } else if (activeTab === 'Armchair') {
        setSelectedArmchair(item);
      } else if (activeTab === 'Fireplace') {
        setSelectedFireplace(item);
      } else if (activeTab === 'Chair') {
        setSelectedChair(item);
      } else if (activeTab === 'Rug') {
        setSelectedRug(item);
      }
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

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('boxLamp')}>
            <Image source={boxLamp} style={styles.itemImage} />
            {/* <Text style={styles.itemText}>Ornate Lamp</Text> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('classicLamp')}>
            <Image source={classicLamp} style={styles.itemImage} />
            {/* <Text style={styles.itemText}>Ornate Lamp</Text> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('junimoLamp')}>
            <Image source={junimoLamp} style={styles.itemImage} />
            {/* <Text style={styles.itemText}>Ornate Lamp</Text> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('jojaLamp')}>
            <Image source={jojaLamp} style={styles.itemImage} />
            {/* <Text style={styles.itemText}>Ornate Lamp</Text> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('retroLamp')}>
            <Image source={retroLamp} style={styles.retroLampImage} />
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
          
          {/* Add Armchair items */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('brownArmChair')}>
          <Image source={brownArmchair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('blueArmchair')}>
          <Image source={blueArmchair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('yellowArmchair')}>
          <Image source={yellowArmchair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('redArmchair')}>
          <Image source={redArmchair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('greenArmchair')}>
          <Image source={greenArmchair} style={styles.itemImage} />
          </TouchableOpacity>


        </ScrollView>
      );
    } else if (activeTab === 'Fireplace') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Fireplace items */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('brickFireplace')}>
          <Image source={brickFireplace} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('elegantFireplace')}>
          <Image source={elegantFireplace} style={styles.itemImage} />
          </TouchableOpacity>

        </ScrollView>
      );
    } else if (activeTab === 'Chair') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Chair items */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('purpleOfficeChair')}>
          <Image source={purpleOfficeChair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('countryChair')}>
          <Image source={countryChair} style={styles.itemImage} />
          </TouchableOpacity>

        </ScrollView>
      );
    } else if (activeTab === 'Rug') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Rug items */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('mysticRug')}>
          <Image source={mysticRug} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('snowyRug')}>
          <Image source={snowyRug} style={styles.itemImage} />
          </TouchableOpacity>

        </ScrollView>
      );
    }
  };



  return (
    <View style={styles.container}>
      
      {/* Default Profile Room */}
      <Image source={profileRoom} style={styles.profileRoomImg} />


      {/* Conditionally render the selected item as an overlay */}
        {/* Lamps */}
        {selectedLamp === 'ornateLamp' && (
          <Image source={ornateLampOverlay} style={styles.lampOverlay} />
        )}
        {selectedLamp === 'boxLamp' && (
          <Image source={boxLampOverlay} style={styles.lampOverlay} />
        )}

        {/* Couch */}
        {selectedCouch === 'wizardCouch' && (
          <Image source={wizardCouchOverlay} style={styles.couchOverlay_wizard} />
        )}
        {selectedCouch === 'yellowCouch' && (
          <Image source={yellowCouchOverlay} style={styles.couchOverlay_yellow} />
        )}
        {selectedCouch === 'largeBrownCouch' && (
          <Image source={largeBrownCouchOverlay} style={styles.couchOverlay_lbrown} />
        )}

        {/* Armchair */}
        {selectedArmchair === 'blueArmchair' && (
          <Image source={blueArmchairOverlay} style={styles.armchairOverlay} />
        )}
        {selectedArmchair === 'yellowArmchair' && (
          <Image source={yellowArmchairOverlay} style={styles.armchairOverlay} />
        )}
        {selectedArmchair === 'redArmchair' && (
          <Image source={redArmchairOverlay} style={styles.armchairOverlay} />
        )}
        {selectedArmchair === 'greenArmchair' && (
          <Image source={greenArmchairOverlay} style={styles.armchairOverlay} />
        )}

        {/* Fireplace */}
        {/* {selectedFireplace === 'brickFireplace' && (
          <Image source={brickFireplace} style={styles.brickplaceOverlay} />
        )} */}

        {selectedFireplace === 'elegantFireplace' && (
          <Image source={elegantFireplaceOverlay} style={styles.fireplaceOverlay} />
        )}

        {/* Chair */}
        {selectedChair=== 'countryChair' && (
          <Image source={countryChairOverlay} style={styles.chairOverlay} />
        )}

        {/* Rug */}
        {selectedRug=== 'snowyRug' && (
          <Image source={snowyRugOverlay} style={styles.rugOverlay} />
        )}


      {/* Buttons: Decorate & Lists */}
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
        onRequestClose={handleModalClose} // Save furniture on modal close
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

          <TouchableOpacity style={styles.saveButton} onPress={handleModalClose}>
          <Image source={saveButton} style={styles.saveButtonImage} />
          </TouchableOpacity>

            {/* Tab Bar */}
            <View style={styles.tabBar}>
              {['Lamp', 'Couch', 'Armchair', 'Fireplace', 'Chair', 'Rug'].map((tab) => (
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


      {/* Logout Confirmation Modal */}
      <Modal transparent={true} animationType="fade" visible={isLogoutModalVisible} onRequestClose={toggleLogoutModal}>
        <View style={styles.logoutModalContainer}>
          <View style={styles.logoutModalContent}>
          <Text style={styles.logoutModalTitle}>Log Out</Text>
            <Text style={styles.logoutModalText}>Are you sure you want to log out?</Text>
            <View style={styles.logoutModalButtons}>
              <TouchableOpacity onPress={toggleLogoutModal} style={styles.logoutCancelButton}>
                <Text style={styles.logoutButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLogOutPressed} style={styles.logoutConfirmButton}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={handleLogoutButtonPress}>
        <Image style={styles.logOutButton} source={require("../../assets/ProfileRoom/logoutButton.png")} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background to black
  },

  // Default Room
  profileRoomImg: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    position: 'absolute',
  },

  //Overlay styles
  //lamps
  lampOverlay: {
    position: 'absolute',
    top: 395, // Adjust position of overlay image
    left: -5, // Adjust left alignment of overlay image
    height: 105,
    resizeMode: 'contain',
  },
  //couches
  couchOverlay_wizard: {
    position: 'absolute',
    height: 86,
    resizeMode: 'contain',
    top: 367.5, 
    left: 17, 
  },
  couchOverlay_yellow: {
    position: 'absolute',
    height: 83.7,
    resizeMode: 'contain',
    top: 368.5, 
    left: 17, 
  },
  couchOverlay_lbrown: {
    position: 'absolute',
    height: 85,
    resizeMode: 'contain',
    top: 367.9, 
    left: 16, 
  },
  armchairOverlay: {
    position: 'absolute',
    height: 58,
    resizeMode: 'contain',
    top: 566,
    left: 179,
  },
  fireplaceOverlay: {
    position: 'absolute',
    height: 245,
    resizeMode: 'contain',
    top: 108,
    left: 33, 
  },
  chairOverlay: {
    position: 'absolute',
    height: 96,
    resizeMode: 'contain',
    top: 503,
    left: 282,
  },
  rugOverlay: {
    position: 'absolute',
    height: 72,
    resizeMode: 'contain',
    top: 552,
    left: 77,
  },


  // Buttons style
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    marginLeft: 2,
    marginBottom: 104,
  },
  heartButtonImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  decorateButtonImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  saveButtonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    left: 130,
    bottom: 7,
  },

  // Modal style
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
    marginHorizontal: 5, // Space between items
    bottom: 10,
  },
  itemImage: {
    width: 80, // Adjust size of the item images
    height: 80,
    resizeMode: 'contain',
  },
  retroLampImage:{
    width: 120,
    height: 120,
    left: -21,
    resizeMode: 'contain',
  },
  itemText: {
    marginTop: 5,
    fontSize: 14,
  },

  // LogOut style
  logOutButton: {
    top: 80,
    height: 30, 
    width: 30, 
    right: 15, 
    position: "absolute", 
  },
  logoutModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.77)', // Semi-transparent background
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutModalTitle: {
    color: 'white',
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'courier',
  },
  logoutModalText: {
    color: 'white',
    fontSize: 13,
    marginBottom: 25,
    textAlign: 'center',
    // fontFamily: 'courier',

  },
  logoutModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoutCancelButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
  },
  logoutConfirmButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#F2D49D', // Red for log out confirmation
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#000', // Text color
    fontWeight: 'light',
    fontSize: 15,
    // fontFamily: 'courier',
  },
  

});
