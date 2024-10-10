import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const MovieDetailScreen = ({ route }) => {
  const { item } = route.params; // Get the movie item from navigation

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.title || item.name}</Text>
      <Text style={styles.movieOverview}>{item.overview}</Text>
      <Text style={styles.movieDetails}>Release Date: {item.release_date}</Text>
      <Text style={styles.movieDetails}>Vote Average: {item.vote_average}</Text>
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

