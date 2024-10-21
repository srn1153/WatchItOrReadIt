import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, Text, ScrollView, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/authContext'
import { db } from '../../firebaseConfig'; // firestore instance
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { useTVModal } from './useTVModal.js';
import { useBookshelfModal } from './useBookshelfModal.js';
import { useFocusEffect } from '@react-navigation/native'; 
import { useCallback } from 'react';


// Furniture image Imports
//Default furnitures
import retrolamp from '../../assets/ProfileRoom/retrolamp.png';
import tv from '../../assets/ProfileRoom/tv.png';
import bookstack from '../../assets/ProfileRoom/bookstack.png';
import bookstack2 from '../../assets/ProfileRoom/bookstack2.png';
//carpets
import pinkcarpet from '../../assets/ProfileRoom/pinkcarpet.png';
import pinkcarpet1 from '../../assets/ProfileRoom/pinkcarpet1.png';
import bluecarpet from '../../assets/ProfileRoom/bluecarpet.png'; 
import stripedcarpet from '../../assets/ProfileRoom/stripedcarpet.png';
import blackcarpet from '../../assets/ProfileRoom/blackcarpet.png';
import woodcarpet from '../../assets/ProfileRoom/woodcarpet.png';
import orangecarpet from '../../assets/ProfileRoom/orangecarpet.png';
import whitecarpet from '../../assets/ProfileRoom/whitecarpet.png';
import redcarpet from '../../assets/ProfileRoom/redcarpet.png';
import stripes1 from '../../assets/ProfileRoom/stripes1.png';
import redcarpet1 from '../../assets/ProfileRoom/redcarpet1.png';
import wood1 from '../../assets/ProfileRoom/wood1.png';
import blue1 from '../../assets/ProfileRoom/blue1.png';
import white1 from '../../assets/ProfileRoom/white1.png';
import black1 from '../../assets/ProfileRoom/black1.png';
import orange1 from '../../assets/ProfileRoom/orange1.png';
//buttons
import heartButton from '../../assets/ProfileRoom/heartbutton.png'; 
import decorateButton from '../../assets/ProfileRoom/decorateButton.png'; 
import saveButton from '../../assets/ProfileRoom/saveButton.png';
import removeButton from '../../assets/ProfileRoom/removeButton.png';
//bookshelf
import bookshelf from '../../assets/ProfileRoom/bookshelf.png';
import artistBookshelf from '../../assets/ProfileRoom/artistBookshelf.png';
import wizardBookshelf from '../../assets/ProfileRoom/Wizard_Bookshelf.png';
import bookshelf3 from '../../assets/ProfileRoom/bookshelf3.png';
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
import ornateLampOverlay from '../../assets/ProfileRoom/OrnateLamp_Overlay.png'; 
import boxLampOverlay from '../../assets/ProfileRoom/BoxLamp_Overlay.png'; 
//couch
import jojaCouch from '../../assets/ProfileRoom/Joja_Couch.png'; 
import wizardCouch from '../../assets/ProfileRoom/Wizard_Couch.png'; 
import yellowCouch from '../../assets/ProfileRoom/Yellow_Couch.png'; 
import largeBrownCouch from '../../assets/ProfileRoom/Large_Brown_Couch.png'; 
import jojaCouchOverlay from '../../assets/ProfileRoom/JojaCouch_Overlay.png';
import wizardCouchOverlay from '../../assets/ProfileRoom/WizardCouch_Overlay.png'; 
import yellowCouchOverlay from '../../assets/ProfileRoom/YellowCouch_Overlay.png'; 
import largeBrownCouchOverlay from '../../assets/ProfileRoom/LargeBrownCouch_Overlay.png';
import darkcouch from '../../assets/ProfileRoom/darkcouch.png';
import darkcouch1 from '../../assets/ProfileRoom/Dark_Couch.png';

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
//wallpapers
import profileRoom from '../../assets/ProfileRoom/profileRoom.png'; 
import pinkwall from '../../assets/ProfileRoom/pinkwall.png'; 
import pinkwallO from '../../assets/ProfileRoom/pinkwallO.png'; 
import winter from '../../assets/ProfileRoom/winter.png'; 
import rosy from '../../assets/ProfileRoom/rosy.png'; 
import woods from '../../assets/ProfileRoom/woods.png'; 
import underwater from '../../assets/ProfileRoom/underwater.png'; 
import strawb from '../../assets/ProfileRoom/strawb.png'; 
import stripes from '../../assets/ProfileRoom/stripes.png'; 
import forest from '../../assets/ProfileRoom/forest.png'; 
import strawb1 from '../../assets/ProfileRoom/checkered1.png';
import rosy1 from '../../assets/ProfileRoom/rosy1.png';
import maroon1 from '../../assets/ProfileRoom/maroon1.png';
import winter1 from '../../assets/ProfileRoom/winter1.png';
import forest1 from '../../assets/ProfileRoom/forest1.png';
import underwater1 from '../../assets/ProfileRoom/underwater1.png';
import woods1 from '../../assets/ProfileRoom/woods1.png';
import stripeswall from '../../assets/ProfileRoom/stripeswall.png';
//rug
import bigrug from '../../assets/ProfileRoom/bigrug.png';
import blossomrug from '../../assets/ProfileRoom/blossomrug.png'; 
import redrug from '../../assets/ProfileRoom/redrug.png';
import swirlmat from '../../assets/ProfileRoom/swirlmat.png';
import desertrug from '../../assets/ProfileRoom/desertrug.png';
import polkarug from '../../assets/ProfileRoom/polkarug.png';
//mat
import snowyRug from '../../assets/ProfileRoom/Snowy_Rug.png'; 
import mysticRug from '../../assets/ProfileRoom/Mystic_Rug.png'; 
import mysticRugOverlay from '../../assets/ProfileRoom/MysticRug_Overlay.png';
import snowyRugOverlay from '../../assets/ProfileRoom/SnowyRug_Overlay.png'; 
import mat2 from '../../assets/ProfileRoom/mat2.png'; 
import darkmat from '../../assets/ProfileRoom/darkmat.png';
import strawbmat from '../../assets/ProfileRoom/strawbmat.png';

import saveTV from '../../assets/ProfileRoom/saveTV2.png';


export default function ProfileScreen({ route }) {
  const { user: searchedUser } = route?.params || {}; //Get searched user 
  const { user: currentUser } = useAuth(); // Get the current logged-in user from authContext
  const navigation = useNavigation(); // navigation object to navigate between screens
  const [isModalVisible, setModalVisible] = useState(false); // state to manage modal visibility
  const [activeTab, setActiveTab] = useState('Wall'); // Default active tab
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false); // New state for logout confirmation modal

  //Figuring out which user's profile room to display
  const displayingUser = searchedUser || currentUser; 

  // useTVModal
  const {
    tvModalVisible,
    searchModalVisible,
    searchType,
    searchQuery,
    searchResults,
    loading,
    selectedMovies,
    selectedTVShows,
    toggleTVfaves,
    handleContainerClick,
    handleShowSelect,
    handleSearch,
    setSearchModalVisible,
    handleTVClose,
  } = useTVModal({ userId: displayingUser?.uid || displayingUser?.userid});

    // useBookshelfModal
    const {
      bookshelfModalVisible,
      searchModalVisible: bookSearchModalVisible,
      searchType: bookSearchType,
      searchQuery: bookSearchQuery,
      searchResults: bookSearchResults,
      loading: bookLoading,
      selectedBooks,
      toggleBookshelf,
      handleContainerClick: handleBookContainerClick,
      handleBookSelect,
      handleSearch: handleBookSearch,
      setSearchModalVisible: setBookSearchModalVisible,
      handleBookshelfClose,
    } = useBookshelfModal({ userId: displayingUser?.uid || displayingUser?.userid});


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
      const userId = displayingUser?.uid || displayingUser?.userid; 
      if (userId) {
        try {
          const furnitureDoc = doc(db, "users", userId, "furnitures", "selected");
    
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


    // Fetch saved furniture selection from Firestore
    const fetchSelectedFurniture = async (displayingUser) => {
      const userId = displayingUser?.uid || displayingUser?.userid; 
        if (userId) {

          try {
          const furnitureDoc = doc(db, "users", userId, "furnitures", "selected");
                   
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
        } catch (error){
          console.error("Error fetching furniture", error);
        }
      } else  {
        console.log("Invalid user id, idk bruh");
      }
    };

      // Fetch the furniture selection when the component mounts or user changes
      useEffect(() => {
        if (displayingUser && displayingUser) {
          console.log("Diplsaying furniture for fetch: ", displayingUser); 
          fetchSelectedFurniture(displayingUser);
        } 
      }, [displayingUser]); // Only run when the user changes
  
    // Trigger save when modal closes
    const handleModalClose = () => 
      {
      saveSelectedFurniture();
      setModalVisible(false); // Close the modal
    };

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
          <Image source={countryLamp} style={styles.lampImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('ornateLamp')}>
            <Image source={ornateLamp} style={styles.lampImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('boxLamp')}>
            <Image source={boxLamp} style={styles.lampImages} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('classicLamp')}>
            <Image source={classicLamp} style={styles.lampImages} />
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

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('darkcouch')}>
          <Image source={darkcouch1} style={styles.itemImage} />
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

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('artistBookshelf')}>
          <Image source={artistBookshelf} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('bookshelf3')}>
          <Image source={bookshelf3} style={styles.itemImage} />
          </TouchableOpacity>
          

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('wizardBookshelf')}>
          <Image source={wizardBookshelf} style={styles.itemImage} />
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

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('cuteChair')}>
          <Image source={cuteChair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('yellowChair')}>
          <Image source={yellowChair} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('orangechair')}>
          <Image source={orangechairO} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('redDinerChair')}>
          <Image source={redDinerChair} style={styles.itemImage} />
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


          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('snowyRug')}>
          <Image source={snowyRug} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('swirlmat')}>
          <Image source={swirlmat} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('darkmat')}>
          <Image source={darkmat} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('strawbmat')}>
          <Image source={strawbmat} style={styles.itemImage} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('mysticRug')}>
          <Image source={mysticRug} style={styles.itemImage} />
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

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('minishelf')}>
          <Image source={minishelf} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('minishelf2')}>
          <Image source={minishelf2} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('miniBookshelf')}>
          <Image source={miniBookshelf} style={styles.itemImage} />
          </TouchableOpacity>

          


        </ScrollView>
      );  

    } else if (activeTab === 'Rug') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Rug */}

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect(null)}>
          <Image source={removeButton} style={styles.removeButton} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('desertrug')}>
          <Image source={desertrug} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('redrug')}>
          <Image source={redrug} style={styles.itemImage} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('bigrug')}>
          <Image source={bigrug} style={styles.itemImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('polkarug')}>
          <Image source={polkarug} style={styles.itemImage} />
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
          <Image source={forest1} style={styles.carpetItems} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('pinkwall')}>
          <Image source={pinkwall} style={styles.carpetItems} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('winter')}>
          <Image source={winter1} style={styles.carpetItems} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('rosy')}>
          <Image source={rosy1} style={styles.carpetItems} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('woods')}>
          <Image source={woods1} style={styles.carpetItems} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('underwater')}>
          <Image source={underwater1} style={styles.carpetItems} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('strawb')}>
          <Image source={strawb1} style={styles.carpetItems} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('stripes')}>
          <Image source={stripeswall} style={styles.carpetItems} />
          </TouchableOpacity>

        </ScrollView>
      );  
    
    } else if (activeTab === 'Carpet') {
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
          
          {/* Carpet */}

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('redcarpet')}>
          <Image source={redcarpet1} style={styles.carpetItems} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('whitecarpet')}>
          <Image source={white1} style={styles.carpetItems} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('bluecarpet')}>
          <Image source={blue1} style={styles.carpetItems} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('stripedcarpet')}>
          <Image source={stripes1} style={styles.carpetItems} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('blackcarpet')}>
          <Image source={black1} style={styles.carpetItems} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('woodcarpet')}>
          <Image source={wood1} style={styles.carpetItems} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemSelect('orangecarpet')}>
          <Image source={orange1} style={styles.carpetItems} />
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

      {/* Rendered Items as an Overlay */}
      {/* WALL */}
      {selectedWall === 'pinkwall' && (
          <Image source={pinkwallO} style={styles.wallOverlay} />
      )} 
      {selectedWall === 'winter' && (
          <Image source={winter} style={styles.profileRoomImg} />
      )} 
      {selectedWall === 'rosy' && (
          <Image source={rosy} style={styles.profileRoomImg} />
      )} 
      {selectedWall === 'woods' && (
          <Image source={woods} style={styles.profileRoomImg} />
      )} 
      {selectedWall === 'underwater' && (
          <Image source={underwater} style={styles.profileRoomImg} />
      )} 
      {selectedWall === 'strawb' && (
          <Image source={strawb} style={styles.profileRoomImg} />
      )} 
      {selectedWall === 'stripes' && (
          <Image source={stripes} style={styles.profileRoomImg} />
      )} 
      {selectedWall === 'forest' && (
          <Image source={forest} style={styles.profileRoomImg} />
      )} 

      {/* CARPET */}
      <Image source={whitecarpet} style={styles.carpetOverlay} />

      {selectedCarpet === 'pinkcarpet1' && (
          <Image source={pinkcarpet} style={styles.carpetOverlay} />
      )}
      {selectedCarpet === 'whitecarpet' && (
        <Image source={whitecarpet} style={styles.carpetOverlay} />
      )} 
      {selectedCarpet === 'bluecarpet' && (
        <Image source={bluecarpet} style={styles.carpetOverlay} />
      )} 
      {selectedCarpet === 'stripedcarpet' && (
        <Image source={stripedcarpet} style={styles.carpetOverlay} />
      )} 
      {selectedCarpet === 'blackcarpet' && (
        <Image source={blackcarpet} style={styles.carpetOverlay} />
      )} 
      {selectedCarpet === 'woodcarpet' && (
        <Image source={woodcarpet} style={styles.carpetOverlay} />
      )} 
      {selectedCarpet === 'orangecarpet' && (
        <Image source={orangecarpet} style={styles.carpetOverlay} />
      )} 
      {selectedCarpet === 'redcarpet' && (
        <Image source={redcarpet} style={styles.carpetOverlay} />
      )} 



      
      {/* Bookshelf */}
      {selectedBookshelf === 'bookshelf' && (
          <TouchableOpacity onPress={toggleBookshelf} style={styles.bookshelf}>
              <Image source={bookshelf} style={styles.bookshelf} />
          </TouchableOpacity>
      )} 
      {selectedBookshelf === 'wizardBookshelf' && (
          <TouchableOpacity onPress={toggleBookshelf} style={styles.bookshelf}>
            <Image source={wizardBookshelf} style={styles.bookshelf} />
          </TouchableOpacity>
      )}
      {selectedBookshelf === 'artistBookshelf' && (
          <TouchableOpacity onPress={toggleBookshelf} style={styles.bookshelf}>
            <Image source={artistBookshelf} style={styles.bookshelf} />
            </TouchableOpacity>
      )}
      {selectedBookshelf === 'bookshelf3' && (
          <TouchableOpacity onPress={toggleBookshelf} style={styles.bookshelf}>
            <Image source={bookshelf3} style={styles.bookshelf} />
            </TouchableOpacity>
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
      {selectedRug === 'desertrug' && (
        <Image source={desertrug} style={styles.redrug} />
      )}
      {selectedRug === 'polkarug' && (
        <Image source={polkarug} style={styles.redrug} />
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
        {selectedMat=== 'darkmat' && (
          <Image source={darkmat} style={styles.matOverlay_dark} />
        )}
        {selectedMat=== 'strawbmat' && (
          <Image source={strawbmat} style={styles.matOverlay_strawb} />
        )}
        {selectedMat=== 'swirlmat' && (
          <Image source={swirlmat} style={styles.matOverlay_swirl} />
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
        {selectedCouch === 'darkcouch' && (
          <Image source={darkcouch} style={styles.couchOverlay_small} />
        )}

      {/* SHELF */}

      {selectedShelf === 'miniBookshelf' && (
          <TouchableOpacity onPress={toggleBookshelf} style={styles.miniBookshelf}>
            <Image source={miniBookshelf} style={styles.miniBookshelf} />
          </TouchableOpacity>
      )}
      {selectedShelf === 'minishelf' && (
          // <TouchableOpacity onPress={toggleBookshelf} style={styles.miniBookshelf}>
            <Image source={minishelf} style={styles.miniBookshelf2} />
            // </TouchableOpacity>
      )}
      {selectedShelf === 'minishelf2' && (
          // <TouchableOpacity onPress={toggleBookshelf} style={styles.miniBookshelf}>
            <Image source={minishelf2} style={styles.miniBookshelf2} />
          // </TouchableOpacity>
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

        {selectedChair === 'yellowChair' && (
          <Image source={yellowChairOverlay} style={styles.chairOverlay} />
        )}
        {selectedChair === 'cuteChair' && (
          <Image source={cuteChairOverlay} style={styles.chairOverlay} />
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


        {/* Default Furnitures */}
        {/* <Image source={retrolamp} style={styles.retrolamp} /> */}
        <TouchableOpacity onPress={toggleBookshelf} style={styles.bookstack}>
          <Image source={bookstack} style={styles.bookstack} />
        </TouchableOpacity>
        {/* <Image source={bookstack2} style={styles.bookstack2} /> */}

        {/* Buttons: Decorate & Lists */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.heartButton} onPress={() => navigation.navigate('List')}>
            <Image source={heartButton} style={styles.heartButtonImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.decorateButton} onPress={toggleModal}>
            <Image source={decorateButton} style={styles.decorateButtonImage} />
          </TouchableOpacity>
        </View>
      

      {/* Decorate Modal */}
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
              <View style={styles.fixedTabBar}>
                <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
                  <View style={styles.tabBar}>
                    {['Wall','Carpet', 'Lamp', 'Couch', 'Rug', 'Shelf', 'Pet', 'Bookshelf', 'Chair', 'Mat','Armchair'].map((tab) => (
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
                </ScrollView>
              </View>

              {/* Scrollable Content */}
              <ScrollView contentContainerStyle={styles.scrollableContent}>
                {renderItemsForActiveTab()}
              </ScrollView>
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



      {/* TV Modal: Movies & Shows */}
      <TouchableOpacity onPress={toggleTVfaves} style={styles.tvFavesModal}>
            <Image source={tv} style={styles.tv}/>
      </TouchableOpacity>

        {/* Container */}
        <Modal visible={tvModalVisible} transparent={true} animationType="fade">
          <View style={styles.tvContainer}>
            <View style={styles.tvContent}>


              {/* <Text style={styles.tvModalTitle}>Film & Show favourites</Text> */}

              {/* Movie containers */}
              <Text style={styles.showsTitle}>FILM</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15,  marginHorizontal: -8 }}>
              {/* <Image source={tvstatic} style={styles.tvstatic} /> */}

                {[...Array(4)].map((_, index) => (
                  <TouchableOpacity key={index} onPress={() => handleContainerClick('movie', index)} style={styles.containerBox}>
                    {selectedMovies[index] ? (
                      <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${selectedMovies[index].poster_path}` }}
                        style={styles.posterImage}
                      />
                    ) : (
                      <><Text style={styles.plusSign}></Text><Text style={styles.plusSign}>Movie</Text></>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Separator */}
              <View style={styles.separator} />
              <Text style={styles.showsTitle}>TV</Text>


              {/* TV Show containers */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: -8}}>
                {[...Array(4)].map((_, index) => (
                  <TouchableOpacity key={index} onPress={() => handleContainerClick('tv', index)} style={styles.containerBox}>
                    {selectedTVShows[index] ? (
                      <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${selectedTVShows[index].poster_path}` }}
                        style={styles.posterImage}
                      />
                    ) : (
                      <Text style={styles.plusSign}>Show</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

                {/* SAVE BUTTON */}
              <TouchableOpacity onPress={handleTVClose} style={styles.saveTVButton}>
                <Text style={styles.saveTvButtonText}>x</Text>
                {/* <Image source={saveButton} style={styles.saveTV} /> */}
              </TouchableOpacity>

            </View>
          </View>
        </Modal>

        {/* Search Modal */}
        <Modal visible={searchModalVisible} transparent={true} animationType="slide">
          <View style={styles.searchModalContainer}>
            <View style={styles.searchModalContent}>
              <TextInput
                style={styles.searchBar}
                placeholder={`Search for ${searchType === 'movie' ? 'movies' : 'TV shows'}...`}
                value={searchQuery}
                onChangeText={handleSearch}
              />

              {loading ? (
                <ActivityIndicator size="large" color="#777" />
              ) : (
                <View style={styles.resultsContainer}>
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => `${searchType}-${item.id}`}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.resultItem} onPress={() => handleShowSelect(item)}>
                      <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.posterImage} />
                      <Text style={styles.resultText}>{item.title || item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
                </View>
              )}

              <TouchableOpacity onPress={() => setSearchModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Bookshelf Modal: Books */}

        {/* Bookshelf Container */}
        <Modal visible={bookshelfModalVisible} transparent={true} animationType="fade">
            <View style={styles.bookshelfContainer}>
                <View style={styles.bookshelfContent}>

                    {/* Title for Books Section */}
                    <Text style={styles.booksTitle}>FAVOURITE  BOOKS</Text>
                    {/* Separator */}
                      <View style={styles.bookSeparator} />

                    {/* Book containers */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, marginHorizontal: 10 }}>
                        {[...Array(4)].map((_, index) => (
                            <TouchableOpacity key={index} onPress={() => handleBookContainerClick('book', index)} style={styles.booksContainerBox}>
                                {selectedBooks[index] ? (
                                    <Image
                                        source={{ uri: selectedBooks[index].volumeInfo.imageLinks?.thumbnail }}
                                        style={styles.bookCover}
                                    />
                                ) : (
                                    <>
                                        <Text style={styles.plusSign}></Text>
                                        <Text style={styles.plusSign}>Book</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* SAVE BUTTON */}
                    <TouchableOpacity onPress={handleBookshelfClose} style={styles.saveBookshelfButton}>
                        <Text style={styles.saveBookshelfButtonText}>x</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>

        {/* Bookshelf Search Modal */}
        <Modal visible={bookSearchModalVisible} transparent={true} animationType="slide">
            <View style={styles.searchModalContainer}>
                <View style={styles.searchModalContent}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search for books..."
                        value={bookSearchQuery}
                        onChangeText={handleBookSearch}
                    />

                    {bookLoading ? (
                        <ActivityIndicator size="large" color="#777" />
                    ) : (
                        <View style={styles.resultsContainer}>
                            <FlatList
                                data={bookSearchResults}
                                keyExtractor={(item) => `book-${item.id}`}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.resultItem} onPress={() => handleBookSelect(item)}>
                                        <Image source={{ uri: item.volumeInfo.imageLinks?.thumbnail }} style={styles.posterImage} />
                                        <Text style={styles.resultText}>{item.volumeInfo.title}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}

                    <TouchableOpacity onPress={() => setBookSearchModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
    top: 203,
    left: 47,
  },
  miniBookshelf2: {
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
    top: 150,
    right: 129,
  },

  //to fix
  bookstack:{
    resizeMode: 'contain',
    position: 'absolute',
    width: 66,
    height: 66,
    top: 215,
    right: 70,
  },
  bookstack2:{
    resizeMode: 'contain',
    position: 'absolute',
    width: 70,
    height: 70,
    top: 435,
    right: 70,
  },

  bigrug: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 235,
    height: 235,
    top: 338,
    left: 52,
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
    width: 240,
    height: 240,
    top: 340,
    left: 15,
  },

  //Overlay styles
  //pets
  cat_Overlay: {
    position: 'absolute',
    top: 490, 
    left: 33, 
    height: 59,
    width: 59,
    resizeMode: 'contain',
  },
  cat2_Overlay: {
    position: 'absolute',
    top: 545, 
    left: 120,
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
    top: 105,
    right: -12,
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
  lampOverlay_retro: {
  position: 'absolute',
    top: 395, // Adjust position of overlay image
    left: -33, // Adjust left alignment of overlay image
    height: 107,
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
    width: 130,
    height: 130,
    top: 526,
    left: 120,
  },
  matOverlay_dark: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 120,
    height: 120,
    top: 535,
    left: 127,
  },
  matOverlay_strawb: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 120,
    height: 120,
    top: 530,
    left: 122,
  },
  matOverlay_swirl: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 120,
    height: 120,
    top: 534,
    left: 125,
  },
  matOverlay_mat2: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 88,
    height: 88,
    top: 545,
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
    width: 29,
    height: 29,
    left: 2,
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
  fixedTabBar: {
    position: 'absolute',
    top: 20, // Adjust based on where you want the tab bar
    width: '100%',
    backgroundColor: 'black', // Optional background color for tab bar
    zIndex: 1, // Ensure the tab bar stays on top
  },
  scrollableContent: {
    top: 60, // Adjust padding based on tab bar height
    justifyContent: 'space-around',
    },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabButton: {
    paddingVertical: 12.3,
    paddingHorizontal: 14, // Set a consistent padding for all buttons
    borderRadius: 5,
    marginHorizontal: 1,
    backgroundColor: '#FFD186', // Inactive tab color
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    minWidth: 80, // Set a minimum width for uniform size
  },
  activeTab: {
    backgroundColor: '#794A3E', // Active tab color
  },
  tabText: {
    fontSize: 11.5,
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
    marginTop: 20,
    marginBottom: 30,
  },
  itemImage: {
    bottom: 0,
    width: 80, // Adjust size of the item images
    height: 80,
    resizeMode: 'contain',
    marginHorizontal: 3, // Space between items
  },  
  lampImages: {
    bottom: 0,
    width: 80, // Adjust size of the item images
    height: 80,
    resizeMode: 'contain',
    marginHorizontal: 3, // Space between items
  },  
  petImages: {
    top: 10,
    width: 50, // Adjust size of the item images
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 4, // Space between items
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


  // TV Modal
  saveTVButton:{
    bottom: 302,
    width: 21,
    paddingVertical: 2,
    alignItems: 'center',
    backgroundColor: 'rgba(232,232,232,0.9)',
    borderColor: '#D4D4ED',
    // borderWidth: 2,
    borderRadius: 20,
    left: 300,
  },
  saveTvButtonText: {
    // fontFamily: 'courier',
    size: 14,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.3)',
    top:-1,
  },

  tvFavesModal: {
    position: 'absolute',
    top: 100,
    right: 20,
  },

  tvContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  tvContent: {
    width: '86%',
    backgroundColor:'rgba(30,37,45, 0.94)',
    padding: 20,
    borderRadius: 10,
    bottom: 30,
    height: 320,
  },
  tvModalTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
    // fontFamily: 'Courier',
    fontWeight: 'bold',
  },
  saveTV: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    position: 'absolute',
    left: 130,
    top: 150,
  },

  separator: {
    height: 0.5, // Height of the separator
    backgroundColor: '#445466', // Color of the separator
    marginVertical: 10, // Vertical spacing around the separator
    bottom: 10,
  },
  showsTitle: {
    bottom: 7,
    fontSize: 12,
    letterSpacing: 1,
    color: '#8995A1',
    left: -3,
    paddingTop: 0,
  },
  
  containerBox: {
    width: 70,
    height: 105,
    // borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: 'gray',
  },
  posterImage: {
    width: 70,
    height: 105,
    marginRight: 0,
    borderRadius: 2,

  },
  plusSign: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.2)',
  },

  searchModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  searchModalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  resultsContainer: {
    maxHeight: 300, // Limit the height of the results container
    overflow: 'scroll', // Allow scrolling if results exceed max height
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  resultText: {
    fontSize: 16,
    left: 15,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },


  // Books Modal
  bookshelfContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      // marginBottom: 40,
  },

  bookshelfContent: {
      width: '94%',
      backgroundColor: 'rgba(245,245,245, 0.97)',
      paddingTop: 13,
      borderRadius: 10,
  },

  booksContainerBox: {
    width: 80,
    height: 120,
    // borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: '#D3D3D3',
  },

  saveBookshelfButton: {
      width: 21,
      paddingVertical: 2,
      alignItems: 'center',
      backgroundColor: 'rgba(225,225,225,0.9)',
      borderColor: '#D4D4ED',
      // borderWidth: 2,
      borderRadius: 20,
      left: 348,
      top: -185,
    
  },
  saveBookshelfButtonText: {
      size: 14,
      fontWeight: 'bold',
      color: 'rgba(0,0,0,0.3)',
      top:-1,
  },
  booksTitle: {
    bottom: -4,
    left: 15,
    color: 'rgba(0,0,0,0.7)',
    fontSize: 11.5,
    letterSpacing: 0,
    fontWeight: '555',
  },
  bookSeparator: {
    height: 0.5, // Height of the separator
    backgroundColor: 'rgba(0,0,0,0.2)', // Color of the separator
    marginVertical: 10, // Vertical spacing around the separator
    bottom: 0,
    width: '90%',
    left: 14,
  },

  bookCover: {
    width: 80,
    height: 120,
    marginRight: 0,
    borderRadius: 2,

  },

  

});
