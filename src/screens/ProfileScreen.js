import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/authContext'
import { db } from '../../firebaseConfig'; // firestore instance
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Add Firebase Firestore methods


// Furniture image Imports
import profileRoom from '../../assets/ProfileRoom/profileRoom.png'; // importing the profile room image
import wall from '../../assets/ProfileRoom/wall.png'; // importing the profile room image
import pinkwall from '../../assets/ProfileRoom/pinkwall.png'; // importing the profile room image
import pinkwallO from '../../assets/ProfileRoom/pinkwallO.png'; // importing the profile room image

//carpets
import pinkcarpet from '../../assets/ProfileRoom/pinkcarpet.png'; // importing the profile room image
import pinkcarpet1 from '../../assets/ProfileRoom/pinkcarpet1.png'; // importing the profile room image
import carpet from '../../assets/ProfileRoom/carpet.png'; // importing the profile room image

//Default furnitures
import retrolamp from '../../assets/ProfileRoom/retrolamp.png';
import tv from '../../assets/ProfileRoom/tv.png';
import bookstack from '../../assets/ProfileRoom/bookstack.png';
import bookstack2 from '../../assets/ProfileRoom/bookstack2.png';
//buttons
import heartButton from '../../assets/ProfileRoom/heartButton.png'; // importing the heart button image
import decorateButton from '../../assets/ProfileRoom/decorateButton.png'; // importing the decorate button image
import saveButton from '../../assets/ProfileRoom/saveButton.png';
import removeButton from '../../assets/ProfileRoom/removeButton.png';
//bookshelf
import bookshelf from '../../assets/ProfileRoom/bookshelf.png';
import artistBookshelf from '../../assets/ProfileRoom/artistBookshelf.png';
import wizardBookshelf from '../../assets/ProfileRoom/Wizard_Bookshelf.png';
//mini shelf
import miniBookshelf from '../../assets/ProfileRoom/mini_bookshelf.png';
import minishelf from '../../assets/ProfileRoom/minishelf.png';
import minishelf2 from '../../assets/ProfileRoom/minishelf2.png';

//pets
import cat from '../../assets/ProfileRoom/catOverlay.png';
import dog from '../../assets/ProfileRoom/dog.png';
import dog2 from '../../assets/ProfileRoom/dog2.png';
import cat2 from '../../assets/ProfileRoom/cat2.png';
import cat3 from '../../assets/ProfileRoom/cat3.png';



//lamps 
import countryLamp from '../../assets/ProfileRoom/Country_Lamp.png';
import countryLampOverlay from '../../assets/ProfileRoom/CountryLamp_Overlay.png';
import ornateLamp from '../../assets/ProfileRoom/Ornate_Lamp.png'; 
import boxLamp from '../../assets/ProfileRoom/Box_Lamp.png'; 
import retroLamp from '../../assets/ProfileRoom/Retro_Lamp.png'; 
import classicLamp from '../../assets/ProfileRoom/Classic_Lamp.png'; 
import classicLampOverlay from '../../assets/ProfileRoom/ClassicLamp_Overlay.png'; 
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
import jojaCouchOverlay from '../../assets/ProfileRoom/JojaCouch_Overlay.png'; // importing the ornate lamp image
import wizardCouchOverlay from '../../assets/ProfileRoom/WizardCouch_Overlay.png'; 
import yellowCouchOverlay from '../../assets/ProfileRoom/YellowCouch_Overlay.png'; 
import largeBrownCouchOverlay from '../../assets/ProfileRoom/LargeBrownCouch_Overlay.png'; 
//armchair
import brownArmchair from '../../assets/ProfileRoom/Brown_Armchair.png';
import blueArmchair from '../../assets/ProfileRoom/Blue_Armchair.png';
import yellowArmchair from '../../assets/ProfileRoom/Yellow_Armchair.png';
import redArmchair from '../../assets/ProfileRoom/Red_Armchair.png';
import greenArmchair from '../../assets/ProfileRoom/Green_Armchair.png';
import brownArmchairOverlay from '../../assets/ProfileRoom/BrownArmchair_Overlay.png';
import blueArmchairOverlay from '../../assets/ProfileRoom/BlueArmchair_Overlay.png'; 
import yellowArmchairOverlay from '../../assets/ProfileRoom/YellowArmchair_Overlay.png'; 
import redArmchairOverlay from '../../assets/ProfileRoom/RedArmchair_Overlay.png'; 
import greenArmchairOverlay from '../../assets/ProfileRoom/GreenArmchair_Overlay.png'; 
//chair
import countryChair from '../../assets/ProfileRoom/Country_Chair.png'; 
import countryChairOverlay from '../../assets/ProfileRoom/CountryChair_Overlay.png'; 
import redDinerChair from '../../assets/ProfileRoom/Red_Diner_Chair.png'; 
import redDinerChairOverlay from '../../assets/ProfileRoom/redDinerChair_Overlay.png'; 
import purpleOfficeChair from '../../assets/ProfileRoom/Purple_Office_Chair.png'; 
import purpleOfficeChairOverlay from '../../assets/ProfileRoom/PurpleOfficeChair_Overlay.png'; 
import yellowChair from '../../assets/ProfileRoom/Dining_Chair_(yellow).png'; 
import yellowChairOverlay from '../../assets/ProfileRoom/yellowChair_Overlay.png'; 
import cuteChair from '../../assets/ProfileRoom/Cute_Chair.png'; 
import cuteChairOverlay from '../../assets/ProfileRoom/cuteChair_Overlay.png'; 
import orangechair from '../../assets/ProfileRoom/orangechair.png'; 
import orangechairO from '../../assets/ProfileRoom/Retro_Chair.png'; 


//rug
import bigrug from '../../assets/ProfileRoom/bigrug.png';
import blossomrug from '../../assets/ProfileRoom/blossomrug.png'; 
import redrug from '../../assets/ProfileRoom/redrug.png';

//mat
import snowyRug from '../../assets/ProfileRoom/Snowy_Rug.png'; 
import mysticRug from '../../assets/ProfileRoom/Mystic_Rug.png'; 
import mysticRugOverlay from '../../assets/ProfileRoom/MysticRug_Overlay.png';
import snowyRugOverlay from '../../assets/ProfileRoom/SnowyRug_Overlay.png'; 
import mat2 from '../../assets/ProfileRoom/mat2.png'; 





export default function ProfileScreen() {
  const navigation = useNavigation(); // navigation object to navigate between screens
  const [isModalVisible, setModalVisible] = useState(false); // state to manage modal visibility
  const [activeTab, setActiveTab] = useState('Pet'); // Default active tab is 'Lamp'
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false); // New state for logout confirmation modal
  const { user } = useAuth(); // Get the current logged-in user from authContext


    //Separate states for each furniture type
    const [selectedLamp, setSelectedLamp] = useState(null);
    const [selectedCouch, setSelectedCouch] = useState(null);
    const [selectedArmchair, setSelectedArmchair] = useState(null);
    const [selectedBookshelf, setSelectedBookshelf] = useState(null);
    const [selectedChair, setSelectedChair] = useState(null);
    const [selectedMat, setSelectedMat] = useState(null);
    const [selectedPet, setSelectedPet] = useState(null);
    const [selectedShelf, setSelectedShelf] = useState(null);
    const [selectedRug, setSelectedRug] = useState(null);
    const [selectedWall, setSelectedWall] = useState(null);
    const [selectedCarpet, setSelectedCarpet] = useState(null);




    // Saves selected furniture to Firestore
    const saveSelectedFurniture = async () => {
      if (user) {
        try {
          const furnitureDoc = doc(db, "users", user.uid, "furnitures", "selected");
    
          // Log selected items to ensure they have values
          console.log("Saving selected furniture:", selectedLamp, selectedCouch, selectedArmchair, selectedBookshelf, selectedChair, selectedMat, selectedPet, selectedShelf, selectedRug, selectedWall, selectedCarpet);
    
          await setDoc(furnitureDoc, {
            lamp: selectedLamp || null,
            couch: selectedCouch || null,
            armchair: selectedArmchair || null,
            bookshelf: selectedBookshelf || null,
            chair: selectedChair || null,
            mat: selectedMat || null,
            pet: selectedPet || null,
            shelf: selectedShelf || null,
            rug: selectedRug || null,
            wall: selectedWall || null,
            carpet: selectedCarpet || null,

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
    const handleModalClose = () => 
      {
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
            setSelectedBookshelf(data.bookshelf || null);
            setSelectedChair(data.chair || null);
            setSelectedMat(data.mat || null);
            setSelectedPet(data.pet || null);
            setSelectedShelf(data.shelf || null);
            setSelectedRug(data.rug || null);
            setSelectedWall(data.wall || null);
            setSelectedCarpet(data.carpet || null);

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
      } else if (activeTab === 'Bookshelf') {
        setSelectedBookshelf(item);
      } else if (activeTab === 'Chair') {
        setSelectedChair(item);
      } else if (activeTab === 'Mat') {
        setSelectedMat(item); 
      } else if (activeTab === 'Pet') {
        setSelectedPet(item); 
      } else if (activeTab === 'Shelf') {
        setSelectedShelf(item); 
      } else if (activeTab === 'Rug') {
          setSelectedRug(item); 
      } else if (activeTab === 'Wall') {
        setSelectedWall(item); 
      } else if (activeTab === 'Carpet') {
        setSelectedCarpet(item); 
      }
      
      
    };
    

  const renderItemsForActiveTab = () => {
    if (activeTab === 'Lamp') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={removeButton} style={styles.removeButton} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('countryLamp')}>
          <Image source={countryLamp} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('ornateLamp')}>
            <Image source={ornateLamp} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('boxLamp')}>
            <Image source={boxLamp} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('classicLamp')}>
            <Image source={classicLamp} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('junimoLamp')}>
            <Image source={junimoLamp} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('jojaLamp')}>
            <Image source={jojaLamp} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('retroLamp')}>
            <Image source={retroLamp} style={styles.retroLampImage} />
          </TouchableOpacity>


        </ScrollView>
        
      );
    } else if (activeTab === 'Couch') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          {/* Added Couch items */}

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={removeButton} style={styles.removeButton} />
          </TouchableOpacity>


          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('largeBrownCouch')}>
          <Image source={largeBrownCouch} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('jojaCouch')}>
          <Image source={jojaCouch} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('wizardCouch')}>
          <Image source={wizardCouch} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('yellowCouch')}>
          <Image source={yellowCouch} style={styles.itemImage} />
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

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={removeButton} style={styles.removeButton} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('brownArmchair')}>
          <Image source={brownArmchair} style={styles.armchairImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('blueArmchair')}>
          <Image source={blueArmchair} style={styles.armchairImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('yellowArmchair')}>
          <Image source={yellowArmchair} style={styles.armchairImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('redArmchair')}>
          <Image source={redArmchair} style={styles.armchairImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('greenArmchair')}>
          <Image source={greenArmchair} style={styles.armchairImages} />
          </TouchableOpacity>


        </ScrollView>
      );
    } else if (activeTab === 'Bookshelf') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Bookshelf items */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={removeButton} style={styles.removeButton} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('bookshelf')}>
          <Image source={bookshelf} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('wizardBookshelf')}>
          <Image source={wizardBookshelf} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('artistBookshelf')}>
          <Image source={artistBookshelf} style={styles.itemImage} />
          </TouchableOpacity>

        </ScrollView>
      );
    } else if (activeTab === 'Chair') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Chair items */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={removeButton} style={styles.removeButton} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('purpleOfficeChair')}>
          <Image source={purpleOfficeChair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('countryChair')}>
          <Image source={countryChair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('orangechair')}>
          <Image source={orangechairO} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('redDinerChair')}>
          <Image source={redDinerChair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('yellowChair')}>
          <Image source={yellowChair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('cuteChair')}>
          <Image source={cuteChair} style={styles.itemImage} />
          </TouchableOpacity>

          

        </ScrollView>
      );
    } else if (activeTab === 'Mat') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Mat items */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={removeButton} style={styles.removeButton} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('mysticRug')}>
          <Image source={mysticRug} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('snowyRug')}>
          <Image source={snowyRug} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('mat2')}>
          <Image source={mat2} style={styles.itemImage} />
          </TouchableOpacity>

        </ScrollView>
      );
    } else if (activeTab === 'Pet') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Pets */}

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={removeButton} style={styles.removeButton} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('cat')}>
          <Image source={cat} style={styles.petImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('dog')}>
          <Image source={dog} style={styles.petImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('cat3')}>
          <Image source={cat3} style={styles.petImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('cat2')}>
          <Image source={cat2} style={styles.petImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('dog2')}>
          <Image source={dog2} style={styles.petImages} />
          </TouchableOpacity>




        </ScrollView>
      );  

    } else if (activeTab === 'Shelf') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Shelf */}

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={removeButton} style={styles.removeButton} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('miniBookshelf')}>
          <Image source={miniBookshelf} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('minishelf')}>
          <Image source={minishelf} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('minishelf2')}>
          <Image source={minishelf2} style={styles.itemImage} />
          </TouchableOpacity>


        </ScrollView>
      );  

    } else if (activeTab === 'Rug') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Rug */}
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('redrug')}>
          <Image source={redrug} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('bigrug')}>
          <Image source={bigrug} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('blossomrug')}>
          <Image source={blossomrug} style={styles.itemImage} />
          </TouchableOpacity>

          

        </ScrollView>
      );  
    
    } else if (activeTab === 'Wall') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Wall */}

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={wall} style={styles.carpetItems} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('pinkwall')}>
          <Image source={pinkwall} style={styles.carpetItems} />
          </TouchableOpacity>

        </ScrollView>
      );  
    
    } else if (activeTab === 'Carpet') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Carpet */}

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={carpet} style={styles.carpetItems} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('pinkcarpet1')}>
          <Image source={pinkcarpet1} style={styles.carpetItems} />
          </TouchableOpacity>

        </ScrollView>
      );   
    }
  };


  return (
    <View style={styles.container}>
      
      {/* Default Profile Room */}
      <Image source={profileRoom} style={styles.profileRoomImg} />

      {/* WALL */}
      {selectedWall === 'pinkwall' && (
          <Image source={pinkwallO} style={styles.wallOverlay} />

      )} 

      {/* Conditionally render the selected item as an overlay */}
      {/* CARPET */}
      {selectedCarpet === 'pinkcarpet1' && (
          <Image source={pinkcarpet} style={styles.carpetOverlay} />

      )} 

      {/* Bookshelf */}
      {selectedBookshelf === 'bookshelf' && (
          <Image source={bookshelf} style={styles.bookshelf} />
      )} 
      {selectedBookshelf === 'wizardBookshelf' && (
        <Image source={wizardBookshelf} style={styles.wizardBookshelf} />
      )}
      {selectedBookshelf === 'artistBookshelf' && (
        <Image source={artistBookshelf} style={styles.wizardBookshelf} />
      )}

      {/* RUG */}
      {selectedRug === 'redrug' && (
        <Image source={redrug} style={styles.redrug} />
      )}
      {selectedRug === 'bigrug' && (
        <Image source={bigrug} style={styles.bigrug} />
      )}
      {selectedRug === 'blossomrug' && (
        <Image source={blossomrug} style={styles.blossomrug} />
      )}


      {/* Couch */}
      {selectedCouch === 'jojaCouch' && (
          <Image source={jojaCouchOverlay} style={styles.couchOverlay_joja} />
        )} 
        {selectedCouch === 'wizardCouch' && (
          <Image source={wizardCouchOverlay} style={styles.couchOverlay_small} />
        )}
        {selectedCouch === 'yellowCouch' && (
          <Image source={yellowCouchOverlay} style={styles.couchOverlay_yellow} />
        )}
        {selectedCouch === 'largeBrownCouch' && (
          <Image source={largeBrownCouchOverlay} style={styles.couchOverlay_lbrown} />
        )}

      {/* SHELF */}
      {selectedShelf === 'miniBookshelf' && (
        <Image source={miniBookshelf} style={styles.miniBookshelf} />
      )}
      {selectedShelf === 'minishelf' && (
        <Image source={minishelf} style={styles.miniBookshelf} />
      )}
      {selectedShelf === 'minishelf2' && (
        <Image source={minishelf2} style={styles.miniBookshelf} />
      )}




      

        {/* Lamps */}
        {selectedLamp === 'countryLamp' && (
          <Image source={countryLampOverlay} style={styles.lampOverlay_country} />
        )}
        {selectedLamp === 'ornateLamp' && (
          <Image source={ornateLampOverlay} style={styles.lampOverlay} />
        )}
        {selectedLamp === 'boxLamp' && (
          <Image source={boxLampOverlay} style={styles.lampOverlay} />
        )}
                {selectedLamp === 'classicLamp' && (
          <Image source={classicLampOverlay} style={styles.lampOverlay} />
        )}

        
        {/* Mat */}
        {selectedMat=== 'snowyRug' && (
          <Image source={snowyRugOverlay} style={styles.matOverlay} />
        )}
        {selectedMat=== 'mysticRug' && (
          <Image source={mysticRugOverlay} style={styles.matOverlay_mystic} />
        )}
        {selectedMat=== 'mat2' && (
          <Image source={mat2} style={styles.matOverlay_mat2} />
        )}

        {/* Armchair */}
        {selectedArmchair === 'brownArmchair' && (
          <Image source={brownArmchairOverlay} style={styles.armchairOverlay_brown} />
        )}
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

        {/* Chair */}
        {selectedChair === 'purpleOfficeChair' && (
          <Image source={purpleOfficeChairOverlay} style={styles.chairOverlay} />
        )}
        {selectedChair === 'countryChair' && (
          <Image source={countryChairOverlay} style={styles.chairOverlay} />
        )}
        {selectedChair === 'orangechair' && (
          <Image source={orangechair} style={styles.chairOverlay_orange} />
        )}

        {selectedChair === 'redDinerChair' && (
          <Image source={redDinerChairOverlay} style={styles.chairOverlay} />
        )}
        {selectedChair === 'yellowChair' && (
          <Image source={yellowChairOverlay} style={styles.chairOverlay} />
        )}
        {selectedChair === 'cuteChair' && (
          <Image source={cuteChairOverlay} style={styles.chairOverlay} />
        )}


        {/* Pets */}
        {selectedPet === 'cat' && (
          <Image source={cat} style={styles.cat_Overlay} />
        )}
        {selectedPet === 'dog' && (
          <Image source={dog} style={styles.petOverlay} />
        )}

        {selectedPet === 'dog2' && (
          <Image source={dog2} style={styles.petOverlay} />
        )}
        {selectedPet === 'cat2' && (
          <Image source={cat2} style={styles.cat2_Overlay} />
        )}
        {selectedPet === 'cat3' && (
          <Image source={cat3} style={styles.cat_Overlay} />
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
              {['Pet','Lamp', 'Couch', 'Bookshelf', 'Chair', 'Mat','Armchair', 'Shelf', 'Rug','Wall','Carpet'].map((tab) => (
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

      {/* Default Furnitures */}
      <Image source={retrolamp} style={styles.retrolamp} />
      <Image source={tv} style={styles.tv}/>



      {/* add to furniture selection */}
      <Image source={bookstack} style={styles.bookstack} />
      {/* <Image source={bookstack2} style={styles.bookstack2} /> */}



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
  carpetOverlay
  : {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    top: 82,
  },
  wallOverlay: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    top: -175,
  },

  
  //default furnitures
  miniBookshelf: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 97,
    height: 97,
    top: 409,
    left: 97,
  },
  retrolamp: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 104,
    height: 104,
    top: 251,
    right: 71,
  },
  tv: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 103,
    height: 103,
    top: 256,
    right: 146,
  },

  //to fix
  bookstack:{
    resizeMode: 'contain',
    position: 'absolute',
    width: 66,
    height: 66,
    top: 437,
    right: 140,
  },
  bookstack2:{
    resizeMode: 'contain',
    position: 'absolute',
    width: 70,
    height: 70,
    top: 435,
    right: 130,
  },

  bigrug: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 235,
    height: 235,
    top: 338,
    left: 30,
  },
  blossomrug: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 260,
    height: 260,
    top: 316,
    left: 6,
  },
  redrug: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 252,
    height: 252,
    top: 330,
    left: 15,
  },

  //Overlay styles
  //pets
  cat_Overlay: {
    position: 'absolute',
    top: 490, // Adjust position of overlay image
    left: 33, // Adjust left alignment of overlay image
    height: 59,
    width: 59,
    resizeMode: 'contain',
  },
  cat2_Overlay: {
    position: 'absolute',
    top: 545, // Adjust position of overlay image
    left: 120, // Adjust left alignment of overlay image
    height: 68,
    width: 68,
    resizeMode: 'contain',
  },
  petOverlay: {
    position: 'absolute',
    top: 459, // Adjust position of overlay image
    left: 39, // Adjust left alignment of overlay image
    height: 77,
    width: 77,
    resizeMode: 'contain',
  },
  
  //bookshelf
  bookshelf: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 142,
    height: 142,
    top: 211,
    right: -23,
  },
  wizardBookshelf: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 148,
    height: 148,
    top: 204,
    right: -26,
  },

  //lamps
  lampOverlay: {
    position: 'absolute',
    top: 395, // Adjust position of overlay image
    left: 0, // Adjust left alignment of overlay image
    height: 107,
    resizeMode: 'contain',
  },
  lampOverlay_country: {
    position: 'absolute',
    top: 395, // Adjust position of overlay image
    left: 2, // Adjust left alignment of overlay image
    height: 112,
    resizeMode: 'contain',
  },
  //couches
  couchOverlay_joja: {
    position: 'absolute',
    height: 70,
    resizeMode: 'contain',
    top: 381, 
    left: -131,
  },
  couchOverlay_small: {
    position: 'absolute',
    height: 86,
    resizeMode: 'contain',
    top: 367.5, 
    left: 80, 
  },
  couchOverlay_yellow: {
    position: 'absolute',
    height: 83.7,
    resizeMode: 'contain',
    top: 374, 
    left: 78, 
  },
  couchOverlay_lbrown: {
    position: 'absolute',
    height: 82,
    resizeMode: 'contain',
    top: 367.9, 
    left: 30, 
  },
  armchairOverlay: {
    position: 'absolute',
    height: 58,
    resizeMode: 'contain',
    top: 566,
    left: 179,
  },
  armchairOverlay_brown: {
    position: 'absolute',
    height: 58,
    resizeMode: 'contain',
    top: 566,
    left: 186,
  },

  chairOverlay: {
    position: 'absolute',
    height: 92,
    resizeMode: 'contain',
    top: 503,
    left: 287,
  },
  chairOverlay_orange: {
    position: 'absolute',
    height: 92,
    resizeMode: 'contain',
    top: 503,
    left: 249,
  },
  matOverlay_mystic: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 110,
    height: 110,
    top: 537,
    left: 114,
  },
  matOverlay: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 140,
    height: 140,
    top: 518.9,
    left: 102,
  },
  matOverlay_mat2: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 94,
    height: 94,
    top: 540,
    left: 140,
  },


  // Buttons style
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 33,
    marginLeft: 6,
    marginBottom: 104,
  },
  heartButtonImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  decorateButtonImage: {
    width: 51,
    height: 51,
    left: -5,
    resizeMode: 'contain',
  },
  saveButtonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    left: 130,
    bottom: 8,
  },
  removeButton: {
    width: 28,
    height: 28,
    // position: 'absolute',
    left: 0,
    right: 10,
    // bottom: 7,
  },

  // Modal style
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'black',
    paddingTop: 0,
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
    paddingLeft: 0,
    paddingRight: 0,
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  tabButton: {
    paddingVertical: 13,
    paddingHorizontal: 5,
    borderRadius: 0,
    backgroundColor: '#FFD186', // Inactive tab color
  },
  activeTab: {
    backgroundColor: '#794A3E', // Active tab color
  },
  tabText: {
    fontSize: 8.5,
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
    left: 10,
  },
  itemImage: {
    width: 80, // Adjust size of the item images
    height: 80,
    resizeMode: 'contain',
    marginHorizontal: 3, // Space between items
  },  
  petImages: {
    width: 80, // Adjust size of the item images
    height: 80,
    resizeMode: 'contain',
    marginHorizontal: 6, // Space between items
  },
  
  carpetItems: {
    width: 50, // Adjust size of the item images
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 6, // Space between items
  },

  armchairImages:{
    width: 70, // Adjust size of the item images
    height: 70,
    resizeMode: 'contain',
    marginHorizontal: 4, // Space between items
  },
  retroLampImage:{
    width: 120,
    height: 120,
    left: -21,
    resizeMode: 'contain',
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
