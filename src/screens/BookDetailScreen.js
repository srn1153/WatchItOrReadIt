import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: book.volumeInfo.imageLinks?.thumbnail || 'default_image_url' }}
        style={styles.bookImage}
      />
      <Text style={styles.bookTitle}>{book.volumeInfo.title}</Text>
      <Text style={styles.bookAuthor}>by {book.volumeInfo.authors?.join(', ')}</Text>
      <Text style={styles.bookDescription}>{book.volumeInfo.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bookImage: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 16,
  },
  bookDescription: {
    fontSize: 16,
  },
});

export default BookDetailScreen;
