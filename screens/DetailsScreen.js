import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';

export default function DetailsScreen({ route }) {
  const { item } = route.params;
  const [watched, setWatched] = useState(false);

  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/300x450';

  const toggleWatched = () => {
    setWatched(!watched);
  };

  return (
    <View style={styles.container}>
      {/* StatusBar is transparent to allow the image to fill the notch area */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView>
        <Image style={styles.poster} source={{ uri: imageUrl }} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title || item.name}</Text>
          <Text style={styles.year}>Year: {item.release_date || item.first_air_date}</Text>
          <Text style={styles.overview}>{item.overview}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, watched ? styles.watchedButton : null]}
              onPress={toggleWatched}
            >
              <Text style={styles.buttonText}>{watched ? 'Watched' : 'Mark as Watched'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  poster: {
    width: '100%',
    height: 500, // Height can be adjusted based on your preference
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 500, // To account for the height of the poster
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'ibm-plex-mono',
    marginBottom: 8,
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    fontFamily: 'ibm-plex-mono',
    marginVertical: 10,
    textAlign: 'justify',
  },
  year: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    width: '30%',
  },
  watchedButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ibm-plex-mono',
  },
});
