import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

const MovieDetailScreen = ({ route }) => {
  const { item } = route.params; // Get the movie item from navigation
 // const { navigation } = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
        style={styles.movieImage}
        />

      <View style={styles.detailsContainer}>
        <Text style={styles.movieTitle}>{item.item || item.name}</Text>
    <Text style={styles.movieOverview}>{item.overview}</Text>

    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Add Review</Text>
    </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  movieImage: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieOverview: {
    fontSize: 16,
    marginBottom: 16,
  },
  movieDetails: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
});

export default MovieDetailScreen;

