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
        const response = await axios.get('https://api.themoviedb.org/3/tv/top_rated', {
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
        q: 'Neil'+'Gaiman'+'best books',
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
    
      {/* Header containing Logo and Discover Box */}
      <View style={styles.header}>
        
        <View style={styles.discoverBox}>
          <Text style={styles.discoverText}>Discover</Text>
        </View>
        <Image
          source={require('../../assets/row.png')}
          style={styles.logo}
        />
      </View>


        <View style={[styles.section, styles.firstSection]}>
          <Text style={styles.sectionTitle}>Popular Movies</Text>
          <FlatList
            data={movies}
            horizontal
            renderItem={(item) => renderItem(item, 'movie')}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingLeft: 13, paddingRight: 13 }} 

          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated TV Shows</Text>
          <FlatList
            data={tvShows}
            horizontal
            renderItem={(item) => renderItem(item, 'tv')}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingLeft: 13, paddingRight: 13  }}
          />
        </View>

        <View style={styles.sectionBooks}>
          <Text style={styles.sectionTitle}>Best Books</Text>
          <FlatList
            data={books}
            horizontal
            renderItem={(item) => renderItem(item, 'book')}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingLeft: 13, paddingRight: 13  }}
          />
        </View>
      
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
  header: {
    bottom: 20,
    marginBottom: -10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 110,
    paddingHorizontal: 10,
    backgroundColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 1,
  },
  logo: {
    width: 68,
    height: 30,
    marginTop: 60,
    right: 5,
    // position: 'absolute',
    // right: 10,
    // top: 60,
  },

  discoverBox: {
    backgroundColor: '#41509A', // Light background color
    paddingHorizontal: 26,
    paddingVertical: 7,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    top: 30,
    left: 15,
  },
  discoverText: {
    fontSize: 12,
    // fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    // fontFamily: 'Menlo',
    // fontWeight: '50',
    textTransform: 'uppercase',
  },

  firstSection: {
    paddingTop: 0,
  },
  section: {
    marginVertical: 5,
    width: 400,
    alignItems: 'flex-start',
    backgroundColor: '#F3F3F3',
    marginLeft: 10,
    // shadowColor: '#000', // Shadow for iOS
    shadowOffset: 
    {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 1,
  },
  sectionBooks: {
    marginVertical: 5,
    width: 400,
    alignItems: 'flex-start',
    backgroundColor: '#F3F3F3',
    marginLeft: 10,

  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20,
    // textTransform: 'uppercase',
    bottom: 3,
    marginTop: 6,
    // fontFamily: 'Menlo',
    letterSpacing: 0,

  },
  poster: {
    width: 100,
    height: 160,
    margin: 5,
    borderRadius: 5,
    marginBottom: 13,
  },


  
});



