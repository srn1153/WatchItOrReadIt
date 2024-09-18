import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const loadReviews = async () => {
  try {
    const reviews = JSON.parse(await AsyncStorage.getItem('reviews')) || [];
    return reviews;
  } catch (error) {
    console.error('Failed to load reviews:', error);
    return [];
  }
};

const saveReview = async (review) => {
  try {
    const existingReviews = JSON.parse(await AsyncStorage.getItem('reviews')) || [];
    const updatedReviews = [...existingReviews, review];
    await AsyncStorage.setItem('reviews', JSON.stringify(updatedReviews));
  } catch (error) {
    console.error('Failed to save review:', error);
  }
};

export default function WriteReviewScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [searchType, setSearchType] = useState('movie');

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await loadReviews();
      setReviews(reviewsData);
    };
    fetchReviews();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSearchResults([]);
    setSelectedItem(null);

    try {
      const API_KEY = '79c14b18444432a1b856be277e49212d'; 
      if (searchType === 'movie') {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${API_KEY}`);
        setSearchResults(response.data.results);
      } else if (searchType === 'tv') {
        const response = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${searchQuery}&api_key=${API_KEY}`);
        setSearchResults(response.data.results);
      } else if (searchType === 'book') {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
        setSearchResults(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSearchResults([]);
  };

  const handleSubmitReview = async () => {
    if (selectedItem && reviewText) {
      const review = {
        item: selectedItem,
        text: reviewText,
      };
      await saveReview(review);
      setReviews((prevReviews) => [...prevReviews, review]);
      console.log(`Review submitted for ${selectedItem.title || selectedItem.name || selectedItem.volumeInfo.title}: ${reviewText}`);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}> 
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[styles.segmentButton, searchType === 'movie' && styles.activeSegment]}
          onPress={() => setSearchType('movie')}
        >
          <Text style={[styles.segmentText, searchType === 'movie' && styles.activeSegmentText]}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentButton, searchType === 'tv' && styles.activeSegment]}
          onPress={() => setSearchType('tv')}
        >
          <Text style={[styles.segmentText, searchType === 'tv' && styles.activeSegmentText]}>TV Shows</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentButton, searchType === 'book' && styles.activeSegment]}
          onPress={() => setSearchType('book')}
        >
          <Text style={[styles.segmentText, searchType === 'book' && styles.activeSegmentText]}>Books</Text>
        </TouchableOpacity>
      </View>

      {selectedItem ? (
        <>
          <Text style={styles.itemTitle}>
            Reviewing: {selectedItem.title || selectedItem.name || selectedItem.volumeInfo.title}
          </Text>

          {selectedItem.poster_path && (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${selectedItem.poster_path}` }}
              style={styles.itemPoster}
            />
          )}

          {selectedItem.volumeInfo && selectedItem.volumeInfo.imageLinks && (
            <Image
              source={{ uri: selectedItem.volumeInfo.imageLinks.thumbnail }}
              style={styles.itemPoster}
            />
          )}

          <TextInput
            style={styles.input}
            multiline
            numberOfLines={5}
            value={reviewText}
            onChangeText={setReviewText}
            placeholder="Write your review here..."
          />
          <Button title="Post Review" onPress={handleSubmitReview} />
        </>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={24} color="gray" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={`Search for a ${searchType}`}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType='search'
            />
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => (searchType === 'book' ? item.id : item.id.toString())}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemSelect(item)}>
                <View style={styles.resultItem}>
                  {item.poster_path && (
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                      style={styles.posterImage}
                    />
                  )}

                  {item.volumeInfo && item.volumeInfo.imageLinks && (
                    <Image
                      source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                      style={styles.posterImage}
                    />
                  )}

                  <Text style={styles.itemTitle}>
                    {item.title || item.name || item.volumeInfo.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {/* Displaying existing reviews */}
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => item.item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text>{item.item.title || item.item.name || item.item.volumeInfo.title}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  segmentedControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeSegment: {
    backgroundColor: '#007bff',
  },
  segmentText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'ibm-plex-mono',
  },
  activeSegmentText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontFamily: 'ibm-plex-mono',
    color: '#333',
  },
  searchButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ibm-plex-mono',
    fontWeight: 'bold',
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'ibm-plex-mono',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemPoster: {
    width: 100,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  posterImage: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  reviewItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  reviewText: {
    fontFamily: 'ibm-plex-mono',
  },
});
