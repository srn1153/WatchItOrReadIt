import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
          params: { api_key: '79c14b18444432a1b856be277e49212d' }
        });
        setMovies(response.data.results); 
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    const fetchTvShows = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/tv/day', {
          params: { api_key: '79c14b18444432a1b856be277e49212d' }
        });
        setTvShows(response.data.results);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };


const fetchBooks = async () => {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: '2022 best reads',
        maxResults: 20,
        key: 'AIzaSyB2QQ4yWOz7n6fmp9hfNE0o0GpJ-gCfRhU'
      }
    });
    setBooks(response.data.items);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};


    fetchMovies();
    fetchTvShows();
    fetchBooks();
  }, []);

  const handlePress = (item) => {
    setSelectedItem(item);
    let type; 

    if(movies.includes(item)){
      type='movie';
    } else if (tvShows.includes(item)) {
      type='tv'; 
    } else if (books.includes(item)){
      type='book'; 
    }
    const itemWithType = { ...item, type };
    console.log('Navigating with item:', itemWithType);
    navigation.navigate('ItemDetail', { item: itemWithType });
  };

  const renderItem = ({ item }, type) => {
    let imageUrl;

    if(type === 'movie'){
      imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/120x180';
    } else if (type === 'tv') {
      imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/120x180';
    }
    else if (type === 'book') {
      imageUrl = item.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/120x180';
    }

    return (
      <TouchableOpacity onPress={() => handlePress(item, type)}>
        <Image
          style={styles.poster}
          source={{ uri: imageUrl }} />
      </TouchableOpacity>
    );
  }; 


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Movies</Text>
          <FlatList
            data={movies}
            horizontal
            renderItem={(item) => renderItem(item, 'movie')}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated TV Shows</Text>
          <FlatList
            data={tvShows}
            horizontal
            renderItem={(item) => renderItem(item, 'tv')}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Books</Text>
          <FlatList
            data={books}
            horizontal
            renderItem={(item) => renderItem(item, 'book')}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>

   

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'ibm-plex-mono',
    marginLeft: 10,
  },
  poster: {
    width: 120,
    height: 180,
    margin: 5,
  },
});



