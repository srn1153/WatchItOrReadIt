import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const [isExpanded, setIsExpanded] = useState(false);

  const getTruncatedDescription = () => {
    const description = book.volumeInfo.description || 'No description available.';
    return !isExpanded && description.length > 400
      ? description.substring(0, 400) + '...'
      : description;
  };

  const addToList = () => {
    console.log('Added to List');
  };

  const addReview = () => {
    console.log("Add review button pressed!");
    let type; 
  
    // Determine the type based on categories
    if (Array.isArray(book.volumeInfo.categories)) {
      if (book.volumeInfo.categories.includes('movie')) {
        type = 'movie';
      } else if (book.volumeInfo.categories.includes('tv')) {
        type = 'tv'; 
      } else {
        type = 'book';
      }
    } else if (typeof book.volumeInfo.categories === 'string') {
      if (book.volumeInfo.categories.includes('movie')) {
        type = 'movie';
      } else if (book.volumeInfo.categories.includes('tv')) {
        type = 'tv'; 
      } else {
        type = 'book';
      }
    }
  
    // Create a plain object with only serializable properties
    const itemWithType = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      type: type,
      // Include other properties you need
    };
    
    console.log('Navigating with item:', itemWithType);
    navigation.navigate('WriteReview', { item: itemWithType });
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: book.volumeInfo.imageLinks?.thumbnail || 'default_image_url' }}
          style={styles.bookImage}
        />
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} style={styles.gradient} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.bookTitle}>{book.volumeInfo.title}</Text>
        <Text style={styles.bookAuthor}>by {book.volumeInfo.authors?.join(', ')}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToListButton} onPress={addToList}>
            <Text style={styles.ButtonText}>Add to List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reviewButton} onPress={addReview}>
            <Text style={styles.ButtonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.infoTitle}>DESCRIPTION</Text>
          <Text style={styles.bookDescription}>
            {getTruncatedDescription()}
            {!isExpanded && book.volumeInfo.description.length > 400 && (
              <Text style={styles.showMore} onPress={() => setIsExpanded(true)}>
                {' read more '}
              </Text>
            )}
            {isExpanded && (
              <Text style={styles.showMore} onPress={() => setIsExpanded(false)}>
                {' show less'}
              </Text>
            )}
          </Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>GENRES</Text>
        <Text style={styles.genresNames}>{book.volumeInfo.categories?.join(', ') || 'No genres available.'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: 'black',
    top: -10,
  },
  bookImage: {
    width: '120',
    aspectRatio: 2/3,
    resizeMode: 'cover',
    marginTop: 8,
    marginLeft: 30,
    borderRadius: 8,
  },
  gradient: {
    position: 'absolute',
   // top: 0,
    left: 0,
    right: 0,
    height: '400',
  },
  overlay: {
    position: 'absolute',
    flexDirection: 'row',
    padding: 16,
    bottom: -50, // Move overlay to slightly below the header image
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)', // no background for now
    alignItems: 'center', // Center items vertically within the overlay
  },
  textContainer: {
    marginTop: -30,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    color: 'black'
  },
  bookAuthor: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  addToListButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  reviewButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookDescription: {
    fontSize: 16,
  },
  showMore: {
    color: '#007BFF',
  },
  infoBox: {
    marginTop: 20,
  },
  genresNames: {
    fontSize: 16,
  },
});

export default BookDetailScreen;
