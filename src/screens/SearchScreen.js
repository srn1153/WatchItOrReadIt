import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import { db } from '../../firebaseConfig'; 
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import FollowUser from './FollowUser';

const SearchScreen = ({ navigation }) => {
  // State variables
  const [searchQuery, setSearchQuery] = useState(''); // Stores the current search query
  const [searchResults, setSearchResults] = useState([]); // Stores search results from API
  const [loading, setLoading] = useState(false); // Indicates if data is being fetched
  const [searchType, setSearchType] = useState('user'); // Tracks the type of search (movie, tv, or book)

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
      const API_KEY = '79c14b18444432a1b856be277e49212d';
      let response;

      // Fetch data based on searchType
      if (searchType === 'movie') {
        response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${text}&api_key=${API_KEY}`);
      } else if (searchType === 'tv') {
        response = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${text}&api_key=${API_KEY}`);
      } else if (searchType === 'book') {
        response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
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
    } else { //else go to Temporary Profile Room
      navigation.navigate('TempUserProfileRoom'); 
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

      {/* Search type buttons */}
      <SafeAreaView style={styles.searchTypeContainer}>
        <TouchableOpacity
          style={[
            styles.searchTypeButton,
            searchType === 'movie' && styles.searchTypeButtonActive,
          ]}
          onPress={() => setSearchType('movie')}
        >
          <Text style={styles.searchTypeText}>Movies</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.searchTypeButton,
            searchType === 'tv' && styles.searchTypeButtonActive,
          ]}
          onPress={() => setSearchType('tv')}
        >
          <Text style={styles.searchTypeText}>TV Shows</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.searchTypeButton,
            searchType === 'book' && styles.searchTypeButtonActive,
          ]}
          onPress={() => setSearchType('book')}
        >
          <Text style={styles.searchTypeText}>Books</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.searchTypeButton,
            searchType === 'user' && styles.searchTypeButtonActive,
          ]}
          onPress={() => setSearchType('user')}
        >
          <Text style={styles.searchTypeText}>Users</Text>
        </TouchableOpacity>

      </SafeAreaView>

      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Find movies, TV shows, books, or users..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Loading indicator */}
      {loading && <ActivityIndicator size="large" color="#777" opacity="0.4" />}

      {/* List of search results */}
      <FlatList
      data={searchResults}
      keyExtractor={(item) => (searchType === 'user' ? item.username : `${searchType}-${item.id}`)}
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
        <FollowUser user={item} />
      </View>
    </TouchableOpacity>
  )}
/>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: '100',
    marginBottom: 10,
    marginTop: 60,
    fontFamily: 'Courier-light',
  },
  // Search Types
  searchTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
    marginBottom: 10,
  },
  searchTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9,
    borderWidth: 0.3,
    borderColor: '#ccc',
  },
  searchTypeButtonActive: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  searchTypeText: {
    // fontFamily: 'courier',
    // fontSize: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 10,
    fontFamily: '',
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
