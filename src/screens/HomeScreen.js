import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require('../../assets/row.png')}
          style={styles.logo}
          />

        <View style={[styles.section, styles.firstSection]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  section: {
    marginVertical: 5,
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    //fontWeight: 'bold',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  poster: {
    width: 120,
    height: 180,
    margin: 5,
  },
  logo: {
    width: 100,
    height: 50,
    position: 'absolute',
    right: 10,
    top: 20,
  },
  firstSection: {
    paddingTop: 70,
  },
});



