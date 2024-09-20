import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'; // Importing axios for API calls
import { useNavigation } from '@react-navigation/native'; 

export default function SearchScreen() {
  //state variables 
  const [searchQuery, setSearchQuery] = useState(''); //// Query to search
  const [results, setResults] = useState([]); //// Search results
  const [searchType, setSearchType] = useState('movie'); // Dropdown to select content type
  const [loading, setLoading] = useState(false); //// Loading state for API calls
  const [modalVisible, setModalVisible] = useState(false);  // Pop-up window visibility
  const [selectedList, setSelectedList] = useState('watchlist');  //Set to Watchlist by default 
  const [newListName, setNewListName] = useState('');        // New list name input
  const [addingNewList, setAddingNewList] = useState(false); // Track "Add to New List"
  const [selectedItem, setSelectedItem] = useState(null);    // Track selected item for pop-up window
  const navigation = useNavigation(); // Initialize navigation

  // Search function to fetch data from API 
  const handleSearch = async () => {
    setLoading(true); //Start Loading
    setResults([]); //Clear previous results 

    try {
      const API_KEY = '79c14b18444432a1b856be277e49212d'; //API Key 
      let response;
      //API call based on selected search type
      if (searchType === 'movie') {
        response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${API_KEY}`);
        setResults(response.data.results); //show movie results 
      } else if (searchType === 'tv') {
        response = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${searchQuery}&api_key=${API_KEY}`);
        setResults(response.data.results); //Show tv show results
      } else if (searchType === 'book') {
        response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
        setResults(response.data.items); //show book results 
      }
    } catch (error) { //Log any errors
      console.error('Error fetching data:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // "Add to List" pop-up is triggered when clicked
  const handleAddToList = (item) => {
    setSelectedItem(item);
    setModalVisible(true); 
  };

 // Save the new item to specified list (Your List/Watchlist/TBR) as selected by user 
  const handleSave = () => {
    if (addingNewList && newListName) {
      // Create new list and add item
      navigation.navigate('List', { updatedList: [selectedItem], listType: newListName });
    } else {
      // Add item to existing list
      navigation.navigate('ListScreen', { updatedList: [selectedItem], listType: selectedList });
    }

    setModalVisible(false);
    setNewListName('');
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={searchType} 
        onValueChange={(itemValue) => setSearchType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Movie" value="movie" /> 
        <Picker.Item label="TV Show" value="tv" />
        <Picker.Item label="Book" value="book" />
      </Picker>

      <TextInput
        style={styles.searchBar}
        placeholder="Search...." 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} disabled={loading} />
      
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Image
              source={{ uri: item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 'https://via.placeholder.com/200' }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title || item.name}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToList(item)} // Add to list button
              >
                <Text style={styles.addButtonText}>Add to List</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalHeaderText}>Add Me To...</Text>

      <Picker
        selectedValue={selectedList}
        onValueChange={(itemValue) => {
          setSelectedList(itemValue);
          setAddingNewList(itemValue === 'newList');
        }}
        style={styles.picker}
      >
        <Picker.Item label="Your Watchlist" value="watchlist" />
        <Picker.Item label="Your TBR" value="tbr" />
        <Picker.Item label="A New List" value="newList" />
      </Picker>

      {addingNewList && (
        <TextInput
          style={styles.newListInput}
          placeholder="Enter Name Here..." // Placeholder for new list name
          value={newListName} // Current new list name
          onChangeText={setNewListName} // Update new list name
        />
      )}

      <View style={styles.modalButtons}> 
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave} // Save action
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setModalVisible(false)} //Close Pop Up Window 
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resultItem: {
    flexDirection: 'column', //stacks results vertically
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
  },
  listContainer: {
    marginTop: 20,
  },
  modalHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  newListInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  saveButton: {
    padding: 15,
    backgroundColor: 'orange',
    borderRadius: 10,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
