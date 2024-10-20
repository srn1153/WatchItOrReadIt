import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, SafeAreaView, Animated } from 'react-native';
import axios from 'axios';
import { db } from '../../firebaseConfig'; 
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import FollowUser from './FollowUser'; // Import followUser component for following functionality

const SearchScreen = ({ navigation }) => {
  // State variables
  const [searchQuery, setSearchQuery] = useState(''); // Stores the current search query
  const [searchResults, setSearchResults] = useState([]); // Stores search results from API
  const [loading, setLoading] = useState(false); // Indicates if data is being fetched
  const [searchType, setSearchType] = useState('movie'); // Tracks the type of search (movie, tv, or book)

  const slideAnim = useRef(new Animated.Value(0)).current; // Animation value for sliding

  const buttonWidth = 88; // Set a fixed width for the buttons

   // Function to handle the search type change with animation
   const handleSearchTypeChange = (type, index) => {
    setSearchType(type);

    // Animate the sliding of the active button
    Animated.spring(slideAnim, 
      {
      toValue: index * buttonWidth, // Move the slider to the new button's position
      useNativeDriver: true, // Enable native driver for smoother animation
    }).start();
  };

  // Show the FollowUser component if the search type is user
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
    <Text style={styles.itemTitle}>{searchType === 'user' ? item.username : item.title || item.name || item.volumeInfo?.title}</Text>
    {searchType === 'user' && <FollowUser user={item} />}  
    </View>
  );

  // Resets search results and query when searchType changes
  useEffect(() => {
    setSearchResults([]);
    setSearchQuery('');
  }, [searchType]);

  // Function to handle search input and fetch data
  const handleSearch = async (text) => {
    // Clear results if input is empty
    if (!text.trim()) {
      setSearchQuery(text);
      setSearchResults([]);
      return;
    }

    // Set loading state to true
    setLoading(true);
    setSearchQuery(text);

    try {
    const API_KEY = '79c14b18444432a1b856be277e49212d'; // TMDB API key
    const GOOGLE_BOOKS_API_KEY = 'AIzaSyB2QQ4yWOz7n6fmp9hfNE0o0GpJ-gCfRhU'; // Google Books API key

    let response;

    // Log the search text before making the request
    console.log(`Searching for: ${text}`);

    // Fetch data based on searchType
    if (searchType === 'movie') {
      response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${text}&api_key=${API_KEY}`);
    } else if (searchType === 'tv') {
      response = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${text}&api_key=${API_KEY}`);
    } else if (searchType === 'book') {
      // Check if the search query is valid before making the request
      if (!text || text.trim() === '') {
        console.error('Invalid book search query');
        setSearchResults([]);
        return;
      }

      response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: {
          q: text,
          maxResults: 20,
          key: GOOGLE_BOOKS_API_KEY // Include the API key here
        }
      });
      } //Fetching users from database (firebase)
      else if (searchType === 'user'){
        const userQuery = query(
          collection(db, 'users'), 
          where('username', '>=', text), 
          where('username', '<=', text + '\uf8ff')
        ); 
        const querySnapShot = await getDocs(userQuery); 
        response = querySnapShot.docs.map(doc => doc.data()); 
      }

      // Update search results based on response
      if (response) {
        if(searchType === 'book') {
          if(response.data.items) {
            setSearchResults(response.data.items || [])
          }
        } else if(searchType === 'user') {
          setSearchResults(response); 
        } else {
          setSearchResults(response.data.results || []);
        }
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle item press and navigate to detail page
   const handleItemPress = (item) => {
    const itemWithType = { ...item, type: searchType };
    console.log('Navigating with item:', itemWithType);
    //if searchType is movie, tv show or book, then go to the ItemDetailScreen 
    if(searchType === 'movie' || searchType === 'tv' || searchType === 'book'){
      navigation.navigate('ItemDetail', { item: itemWithType });
    } else if( searchType == 'user') { //else go to user profile room
      navigation.navigate('ProfileRoom', { user : item }); //Goes to specific users profile room
    }
  };

  // Function to get the label for the current search type
  const getTypeLabel = () => {
    switch (searchType) {
      case 'movie':
        return 'Movie';
      case 'tv':
        return 'TV Show';
      case 'book':
        return 'Book';
      case 'user':
        return 'View my profile room!'; 
      default:
        return '';
    }
  };



  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      {/* Search type buttons with sliding animation */}
      <View style={styles.searchTypeContainer}>
        <Animated.View
          style={[
            styles.slidingIndicator,
            { transform: [{ translateX: slideAnim }] },
          ]}
        />
        <TouchableOpacity
          style={styles.searchTypeButton}
          onPress={() => handleSearchTypeChange('movie', 0)}
        >
          <Text
            style={[
              styles.searchTypeText,
              searchType === 'movie' && styles.searchTypeTextActive,
            ]}
          >
            Movies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchTypeButton}
          onPress={() => handleSearchTypeChange('tv', 1)}
        >
          <Text
            style={[
              styles.searchTypeText,
              searchType === 'tv' && styles.searchTypeTextActive,
            ]}
          >
            TV Shows
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchTypeButton}
          onPress={() => handleSearchTypeChange('book', 2)}
        >
          <Text
            style={[
              styles.searchTypeText,
              searchType === 'book' && styles.searchTypeTextActive,
            ]}
          >
            Books
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchTypeButton}
          onPress={() => handleSearchTypeChange('user', 3)}
        >
          <Text
            style={[
              styles.searchTypeText,
              searchType === 'user' && styles.searchTypeTextActive,
            ]}
          >
            Users
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Find movies, TV shows, books, or users..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Loading indicator */}
      {loading && <ActivityIndicator size="large" color="#777" opacity="0.4" />}

      {/* List of search results */}
      <FlatList
  data={searchResults}
  keyExtractor={(item, index) => {
    if (searchType === 'user') {
      return item.username || `user-${index}`; // Fallback to index if username is undefined
    }
    return `${searchType}-${item.id || index}`; // Fallback to index if item.id is undefined
  }}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item)}
    >

      {/* Display poster image based on search type */}
      {(searchType === 'movie' || searchType === 'tv') && item.poster_path && (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
          }}
          style={styles.posterImage}
        />
      )}

      {searchType === 'book' && item.volumeInfo?.imageLinks?.thumbnail && (
        <Image
          source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
          style={styles.posterImage}
        />
      )}

      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>
          {searchType === 'user' ? item.username : item.title || item.name || item.volumeInfo?.title}
        </Text>

        {/* Display additional information based on searchType */}
        {searchType === 'movie' && item.release_date && (
          <Text style={styles.itemDetail}>
            ({item.release_date.split('-')[0]}) {/* Extracting the year from the release_date */}
          </Text>
        )}
        {searchType === 'tv' && item.number_of_seasons && (
          <Text style={styles.itemDetail}>
            {`Seasons ${item.number_of_seasons}`} {/* Displaying the number of seasons */}
          </Text>
        )}
        {searchType === 'book' && item.volumeInfo?.authors && (
          <Text style={styles.itemDetail}>
            {`by ${item.volumeInfo.authors.join(', ')}`} {/* Displaying authors */}
          </Text>
        )}

        <Text style={styles.itemType}>{getTypeLabel()}</Text>
        {searchType === 'user' && <FollowUser user={item} />}
      </View>
    </TouchableOpacity>
  )}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 37,
    fontWeight: '100',
    marginBottom: 10,
    marginTop: 60,
    fontFamily: 'Menlo',
    letterSpacing: -2,
  },
  // Search Types
  searchTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
    marginBottom: 10,
    position: 'relative',
    height: 35,
    left: -2, // Move the slider to the left of the container
    
    
  },
  searchTypeButton: {
    width: 90, // Fixed width for each button
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: '#ccc',
    // backgroundColor: '#EEEEEE',
  },
  searchTypeText: {
    fontFamily: 'menlo',
    fontSize: 12,
    color: '#000', // Default text color
  },
  searchTypeTextActive: {
    color: '#fff', // Text color for active button
  },
  slidingIndicator: {
    position: 'absolute',
    width: 92, // Same width as the button
    height: '100%',
    backgroundColor: '#41509A',
    borderRadius: 3,
    // opacity: 1,
    bottom: 0, // Positioning it at the bottom of the button
    left: 0, // Move the slider to the left of the container
    
  },
  searchBar: {
    height: 40,
    width: '100%',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: '#EEEEEE',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  posterImage: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontFamily: 'IBMPlexMono-Regular',
    flex: 1,
  },
  itemDetail: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'IBMPlexMono-Thin',
  },
  itemType: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'IBMPlexMono-Thin',
    marginTop: 2,
  },
});

export default SearchScreen;