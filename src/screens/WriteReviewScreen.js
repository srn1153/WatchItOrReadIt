import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function WriteReviewScreen({ route }) {
  const { item: selectedItem } = route.params; 
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

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

  const handleDeleteReview = async (reviewToDelete) => {
    try {
      const updatedReviews = reviews.filter((review) => review !== reviewToDelete);
      setReviews(updatedReviews);
      await AsyncStorage.setItem('reviews', JSON.stringify(updatedReviews));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true); 
      const reviewsData = await loadReviews();
      setReviews(reviewsData);
      setLoading(false); 
    };
    fetchReviews();
  }, []);

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
    <FlatList
      data={reviews}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.reviewItem}>
          <View style={styles.reviewContent}>
            <Image
              source={{ uri: item?.item?.poster_path ? `https://image.tmdb.org/t/p/w200${item.item.poster_path}` : item?.item?.volumeInfo?.imageLinks?.thumbnail || 'placeholder-image' }}
              style={styles.reviewPoster}
            />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.reviewTitle}>
                {item?.item?.title || item?.item?.name || item?.item?.volumeInfo?.title || 'Unknown Title'}
              </Text>
              <Text>{item.text}</Text>
            </View>

            {/* Three-Dot Button */}
            <TouchableOpacity
              style={styles.threeDotButton}
              onPress={() => {
                setSelectedReview(item); // Set the selected review to handle edit/delete
                setModalVisible(true); // Open modal
              }}
            >
              <Text style={styles.threeDots}>⋮</Text>
            </TouchableOpacity>

            {/* Modal for Edit/Delete */}
            {selectedReview && (
              <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Options</Text>
                    <TouchableOpacity onPress={() => handleDeleteReview(selectedReview)}>
                      <Text style={styles.modalButton}>Delete Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      setModalVisible(false);
                      //  add edit functionality here
                    }}>
                      <Text style={styles.modalButton}>Edit Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text style={styles.modalCloseButton}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          </View>
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          {/* Poster Section */}
          {selectedItem && (
            <View style={styles.posterContainer}>
              {selectedItem.poster_path ? (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${selectedItem.poster_path}` }}
                  style={styles.itemPoster}
                />
              ) : selectedItem.volumeInfo && selectedItem.volumeInfo.imageLinks ? (
                <Image
                  source={{ uri: selectedItem.volumeInfo.imageLinks.thumbnail }}
                  style={styles.bookPoster}
                />
              ) : (
                <Text>No poster available</Text>
              )}
                    <View style={styles.overlay}>
                <Text style={styles.itemTitle}>
                  Reviewing: {selectedItem.title || selectedItem.name || (selectedItem.volumeInfo.title)}
                </Text>
              </View>
            </View>
            )}      

          {/* Review Input Section */}
          <View style={[styles.reviewInputContainer, { marginTop: 20 }]}>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={5}
              value={reviewText}
              onChangeText={setReviewText}
              placeholder="Write your review here..."
            />
            <TouchableOpacity style={styles.postButton} onPress={handleSubmitReview}>
              <Text style={styles.postButtonText}>Post Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  posterContainer: {
    height: 380, // Adjust height based on how much space you want the poster to take
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Adds a translucent black overlay
    justifyContent: 'flex-end',
    padding: 16,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white', 
    marginBottom: 10,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  itemPoster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookPoster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  reviewInputContainer: {
    marginTop: 20,
    borderColor: '#ddd',
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center', // Center the container
  },
  input: {
    height: 120,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#fafafa',
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    fontFamily: 'courier',
  },
  postButton: {
    backgroundColor: '#FFC0CB',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewItem: {
    marginBottom: -10,
    padding: 15,
    borderRadius: 12,
  },
  reviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewPoster: {
    width: 60,
    height: 85,
    marginRight: 10,
    borderRadius: 8,
  },
  reviewTextContainer: {
    flex: 1,
  },
  reviewTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  threeDots: {
    fontSize: 20,
    color: '#333',
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    fontSize: 16,
    color: '#007BFF',
    marginVertical: 10,
  },
  modalCloseButton: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
  },
});


