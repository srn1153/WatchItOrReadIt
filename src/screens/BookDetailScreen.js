import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;

  if (!book || !book.volumeInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book details not available...</Text>
      </View>
    );
  }

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
    let type;
    if (Array.isArray(book.volumeInfo.categories)) {
      type = book.volumeInfo.categories.includes('movie') ? 'movie' : 'book';
    } else {
      type = 'book';
    }

    const itemWithType = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      type: type,
    };

    navigation.navigate('WriteReview', { item: itemWithType });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Book Image */}
      <View style={styles.headerContainer}>
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <Image
            source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
            style={styles.bookImage}
          />
        ) : (
          <Text style={styles.errorText}>Image not available</Text>
        )}
        {/*Title over image*/}
        <View style={styles.overlay}>
          <Text style={styles.bookTitle}>{book.volumeInfo.title}</Text>
          <Text style={styles.bookAuthor}>by {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</Text>
        </View>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
          />
      </View>

      {/* Small poster*/}
      <View style={styles.smallPosterContainer}>
        {book.volumeInfo.imageLinks?.thumbnail && (
          <Image
            source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
            style={styles.smallPoster}
            />
        )}
      </View>

      {/* Book Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{book.volumeInfo.categories?.join(', ') || 'General'}</Text>

        {/* Description */}
        <View style={styles.synopsisContainer}>
          <Text style={styles.infoTitle}>SYNOPSIS</Text>
          <Text style={styles.synopsis}>
            {getTruncatedDescription()}
            {!isExpanded && book.volumeInfo.description?.length > 400 && (
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

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToListButton} onPress={addToList}>
            <Text style={styles.buttonText}>Add to List</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reviewButton} onPress={addReview}>
            <Text style={styles.buttonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  bookImage: {
    width: '100%',
    height: '110%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  detailsContainer: {
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    color: 'white',
  },
  bookAuthor: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  smallPosterContainer: {
    position: 'absolute',
    top: 229,  // Position small poster over the large image
    right: 20,  // Adjust as necessary
    width: 100, 
    height: 150,
    elevation: 10, // Add some depth to the poster
  },
  smallPoster: {
    width: 100,
    aspectRatio: 2/3,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  category: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  synopsisContainer: {
    marginBottom: 20,
  },
  infoTitle: {
    fontWeight: '700',
    marginBottom: 6,
    fontSize: 16,
  },
  synopsis: {
    fontSize: 14,
    color: '#555',
  },
  showMore: {
    color: '#41509A',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addToListButton: {
    backgroundColor: '#41509A',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '130',
    alignItems: 'center',
  },
  reviewButton: {
    flexDirection: 'row',
    backgroundColor: '#41509A',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '130',
    //alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'courier',
  },
  errorText: {
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default BookDetailScreen;
