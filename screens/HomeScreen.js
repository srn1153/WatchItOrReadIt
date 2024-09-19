import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
        q: 'trending OR popular fiction',
        maxResult: 20,
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
    setModalVisible(true);
  };

  const renderItem = ({ item }, type) => {
    let imageUrl;

    if(type === 'movie' || type === 'tv'){
      imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/120x180';
    } else if (type === 'book') {
      imageUrl = item.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/120x180';
    }

    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Image
          style={styles.poster}
          source={{ uri: imageUrl }}
        />
      </TouchableOpacity>
    );
  };

  const renderDetails = () => {
    if(!selectedItem) return null;

    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{selectedItem.title || selectedItem.name}</Text>
        <Text>Synopsis: {selectedItem.overview || 'N/A'}</Text>
        <Text>Year: {selectedItem.release_date || selectedItem.first_air_date}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.sectionTitle}>Boring Books</Text>
          <FlatList
            data={books}
            horizontal
            renderItem={(item) => renderItem(item, 'book')}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {renderDetails()}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'ibm-plex-mono',
  },
  closeButton: {
    marginTop: 10,
    color: 'grey',
  },
});


