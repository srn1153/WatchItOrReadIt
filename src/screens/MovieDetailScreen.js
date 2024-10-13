
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const MovieDetailScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Placeholder for variables not defined in the original code
  const headerImage = item.backdrop_path ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}` : null;
  const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null;
  const displayDirectorName = item.director || 'Director not available';
  const releaseDate = item.release_date || 'Release date not available';
  const synopsis = item.overview || 'No synopsis available';
  const seasonInfo = 'Season Info';
  const airingYears = 'Airing Years';
  const displayMainCast = 'Main Cast';
  const displayGenres = 'Genres';

  const getTruncatedSynopsis = () => {
    if (!isExpanded && synopsis.length > 400) {
      return synopsis.substring(0, 400) + '...';
    }
    return synopsis;
  };

  const addToList = () => {
    // Add to list logic
    console.log('Added to List');
  };

  const addReview = (item) => {
    console.log("Add review button pressed!");
    let type; 

  // Check if item.type is a string or an array
  if (Array.isArray(item.type)) {
    if (item.type.includes('movie')) {
      type = 'movie';
    } else if (item.type.includes('tv')) {
      type = 'tv'; 
    } else if (item.type.includes('book')) {
      type = 'book'; 
    }
  } else if (typeof item.type === 'string') {
    if (item.type.includes('movie')) {
      type = 'movie';
    } else if (item.type.includes('tv')) {
      type = 'tv'; 
    } else if (item.type.includes('book')) {
      type = 'book'; 
    }
  }

  const itemWithType = { ...item, type };
  console.log('Navigating with item:', itemWithType);
  navigation.navigate('WriteReview', { item: itemWithType });
};
useEffect(() => {
  const fetchDetails = async () => {
    const API_KEY = '79c14b18444432a1b856be277e49212d';

    if (item.type === 'movie' && item.id) {
      try {
        // Fetch movie details
        const movieDetailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${API_KEY}`);
        setReleaseDate(movieDetailsResponse.data.release_date ? new Date(movieDetailsResponse.data.release_date).getFullYear() : 'Release date not available.');
        setHeaderImage(movieDetailsResponse.data.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movieDetailsResponse.data.backdrop_path}` : null);
        
        // Fetch genres
        setGenres(movieDetailsResponse.data.genres.map(genre => genre.name).join(', ') || 'Genres not available.');

        

        // Fetch movie credits for director and main cast
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${API_KEY}`);
        const crew = creditsResponse.data.crew || [];
        const cast = creditsResponse.data.cast || []; // Add fallback in case `cast` doesn't exist
        const director = crew.find(person => person.job === 'Director');
        
        setDirectorName(director ? director.name : 'Director information not available.');

        // Main cast (taking first 9 actors)
        if (cast.length > 0) {
          setMainCast(cast.slice(0, 9).map(actor => actor.name).join(', '));
        } else {
          setMainCast('Main cast not available.');
        }
      } catch (error) {
        console.error('Error fetching movie details or credits:', error);
        setDirectorName('Director information not available.');
        setMainCast('Main cast not available.');
        setReleaseDate('Release date not available.');
      }
    } else if (item.type === 'tv' && item.id) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${item.id}?api_key=${API_KEY}`);
        const creators = response.data.created_by || [];
        setDirectorName(creators.length > 0 ? creators.map(creator => creator.name).join(', ') : 'Creator information not available.');
        
        // Fetch genres
        setGenres(response.data.genres.map(genre => genre.name).join(', ') || 'Genres not available.');

        const seasons = response.data.number_of_seasons;
        const firstAirDate = new Date(response.data.first_air_date).getFullYear();
        const lastAirDate = new Date(response.data.last_air_date).getFullYear();
        setSeasonInfo(`${seasons} SEASON${seasons > 1 ? 'S' : ''}`);
        setAiringYears(`${firstAirDate} - ${lastAirDate}`);
        setHeaderImage(response.data.backdrop_path ? `https://image.tmdb.org/t/p/w1280${response.data.backdrop_path}` : null);

        // Fetch TV show credits for main cast
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${item.id}/credits?api_key=${API_KEY}`);
        const cast = creditsResponse.data.cast || [];
        
        if (cast.length > 0) {
          setMainCast(cast.slice(0, 9).map(actor => actor.name).join(', '));
        } else {
          setMainCast('Main cast not available.');
        }
      } catch (error) {
        console.error('Error fetching TV show details or credits:', error);
        setDirectorName('Creator information not available.');
        setMainCast('Main cast not available.');
        setSeasonInfo('Season information not available.');
        setAiringYears('Airing years not available.');
      }
    } else if (item.type === 'book') {
      setHeaderImage(item.volumeInfo?.imageLinks?.extraLarge || 
        item.volumeInfo?.imageLinks?.large || 
        item.volumeInfo?.imageLinks?.medium || 
        item.volumeInfo?.imageLinks?.thumbnail || 
        null);

      // Fetch genres for books
      setGenres(item.volumeInfo?.categories?.join(', ') || 'Genres not available.');
    }
  };
  fetchDetails();
}, [item]);

  return (
    <ScrollView style={styles.container}>
      {/* Movie Image (Top Banner) */}
      <Image
        source={{ uri: headerImage }}
        style={styles.movieImage}
      />

      <View style={styles.headerContainer}>
        {headerImage && (
          <>
            <Image source={{ uri: headerImage }} style={styles.headerImage} />

            {/* Apply Blur only for books */}
            {item.type === 'book' && (
              <BlurView intensity={50} style={StyleSheet.absoluteFill} />
            )}

            {/* Gradient */}
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            />
          </>
        )}

        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title || item.name || 'No title available'}</Text>

            <View style={styles.titleDetails}>
              <Text style={styles.director}>{displayDirectorName}</Text>
              {item.type === 'movie' && (
                <Text style={styles.releaseDate}> {releaseDate}</Text>
              )}
            </View>
          </View>
          {poster && (
            <Image source={{ uri: poster }} style={styles.posterImage} />
          )}
        </View>
      </View>

      <View style={styles.topBox}>
        <View style={styles.synopsisContainer}>
          <Text style={styles.infoTitle}>SYNOPSIS</Text>
          <Text style={styles.synopsis}>
            {getTruncatedSynopsis()}
            {!isExpanded && synopsis.length > 400 && (
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

        {/* Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToListButton} onPress={addToList}>
            <Text style={styles.ButtonText}>Add to List</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reviewButton} onPress={() => addReview(item)}>
            <Text style={styles.ButtonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TV Series Info */}
      <View style={styles.infoBox}>
        {item.type === 'movie' && (
          <>
            <Image source={require('../../assets/movieIcon.png')} style={styles.tvIcon} />
            <Text style={styles.infoTitle}>MOVIE</Text>
          </>
        )}

        {item.type === 'tv' && (
          <>
            <Image source={require('../../assets/TVicon.png')} style={styles.tvIcon} />
            <Text style={styles.infoTitle}>SERIES</Text>
            <Image source={require('../../assets/seasonsIcon.png')} style={styles.seasonIcon} />
            <Text style={styles.seasonInfo}>{seasonInfo || 'No season info available'}</Text>
            <Text style={styles.airingYears}> ‧ {airingYears}</Text>
          </>
        )}
      </View>

      {/* Cast and Genre */}
      <View style={styles.infoBox2}>
        {(item.type === 'tv' || item.type === 'movie') && (
          <>
            <View style={styles.castContainer}>
              <Text style={styles.infoTitle}>CAST</Text>
              <Text style={styles.mainCast}>{displayMainCast || 'No cast available'}</Text>
            </View>

            <View style={styles.castContainer}>
              <Text style={styles.infoTitle}>GENRE</Text>
              <Text style={styles.mainCast}>{displayGenres || 'No genres available'}</Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 0,
  },
  headerContainer: {
    position: 'relative',
    height: 3,
    top: -10

  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 400, // Adjust height of the gradient overlay
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
  movieImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  posterImage: {
    width: 120,
    aspectRatio: 2/3,
    resizeMode: 'cover',
    marginTop: 8,
    marginLeft: 30,
    borderRadius: 8,
  },
  director: {
    opacity: 0.9,
    fontSize: 14,
    color: 'white',
    marginLeft: 2, 
  },
  titleDetails: {
    marginTop: 2,
    flexDirection: 'row',
  },
  releaseDate: {
    opacity: 0.9,
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },

  synopsisContainer: {
    paddingLeft: 10,
    paddingRight: 27,
    marginTop: 0,
    flex: 1,
  },
  infoTitle: {
    fontWeight: '700',
    marginBottom: 6,
    marginRight: 10,
  },
  synopsis: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#555',
  },
  showMore: {
    fontSize: 14,
    color: '#41509A',
    opacity: 0.5,
    fontWeight: '700',
    fontStyle: 'italic',
    textDecorationLine: 'none',
  },
  infoBox: {
    backgroundColor: '#f7f7f7', // Box background color
    borderRadius: 0,
    padding: 16,
    marginVertical: 16,
    borderColor: '#ddd', 
    flexDirection: 'row',
    borderTopWidth: 0.8,

  },
  infoBox2: {
    padding: 16,
    
  },
  castContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  mainCast: {
    fontWeight: '400',
    marginLeft: 0,
    flexShrink: 1,
  },
  seasonInfo: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  airingYears: {
    fontWeight: '600',
    color: 'black',
  },
  tvIcon:{
    aspectRatio: 1/1,
    width: 15,
  },
  seasonIcon:{
    aspectRatio: 1/1,
    width: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  addToListButton: {
    backgroundColor: '#41509A',
    paddingVertical: 14,
    paddingHorizontal: 0,
    borderRadius: 8,
    width: 130,
    alignItems: 'center',
    marginLeft: 230,
    marginVertical: 5,

  },
  reviewButton: {
    backgroundColor: '#41509A',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 130,
    alignItems: 'center',
   // marginVertical:5,
    marginLeft: 230
  },
  ButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'courier',
  },
  buttonContainer: {
    marginTop: 30,
  },
 
  topBox: {
    flexDirection: 'column', // Stack the items vertically
    alignItems: 'center',    // Center the buttons horizontally
    padding: 16,
  },
});

export default MovieDetailScreen;

