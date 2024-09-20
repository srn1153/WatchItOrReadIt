import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


const ItemDetailScreen = ({ route }) => {
  <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

  const { item } = route.params;
  const [directorName, setDirectorName] = useState('Director information not available.');
  const [seasonInfo, setSeasonInfo] = useState('Season information not available.');
  const [airingYears, setAiringYears] = useState('Airing years not available.');
  const [releaseDate, setReleaseDate] = useState('Release date not available.');
  const [mainCast, setMainCast] = useState([]);
  const [genres, setGenres] = useState('Genres not available.');
  const [headerImage, setHeaderImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);


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

  const getDetails = () => {
    switch (item.type) {
      case 'movie':
        return {
          poster: item.poster_path ? `https://image.tmdb.org/t/p/w1280${item.poster_path}` : null,
          synopsis: item.overview || 'No synopsis available.',
          directorName: directorName,
          releaseDate: releaseDate, // Added here
          mainCast: mainCast,
          genres: genres,
        };
      case 'tv':
        return {
          poster: item.poster_path ? `https://image.tmdb.org/t/p/w1280${item.poster_path}` : null,
          synopsis: item.overview || 'No synopsis available.',
          directorName: `by ${directorName}`,
          seasonInfo: seasonInfo,
          airingYears: airingYears,
          mainCast: mainCast,
          genres: genres,
        
        };
        case 'book':
          return {
            poster: item.volumeInfo?.imageLinks?.extraLarge || 
                    item.volumeInfo?.imageLinks?.large || 
                    item.volumeInfo?.imageLinks?.medium || 
                    item.volumeInfo?.imageLinks?.thumbnail || 
                    null,
            synopsis: item.volumeInfo?.description || 'No description available.',
            directorName: item.volumeInfo?.authors?.join(', ') || 'Author information not available.',
          };
      default:
        return {
          poster: null,
          synopsis: 'No synopsis available.',
          directorName: 'Director/Author information not available.',
        };
    }
  };

  const getTruncatedSynopsis = () => {
    if (isExpanded) return synopsis;
    return synopsis.length > 400 ? `${synopsis.substring(0, 400)} ...` : synopsis;
  };

  const { poster, synopsis, directorName: displayDirectorName, mainCast: displayMainCast, genres: displayGenres} = getDetails();

  return (
    // <SafeAreaView style={styles.container}> 
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.headerContainer}>
          {headerImage && (
            <>
              <Image source={{ uri: headerImage }} style={styles.headerImage} />

              {/* Apply Blur only for books */}
              {item.type === 'book' && (
                <BlurView intensity={50} style={StyleSheet.absoluteFill}>
              </BlurView>
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
              <Text style={styles.title}>{item.title || item.name || item.volumeInfo?.title || 'No title available'}</Text>
              
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

        {/*TV Series*/}
        <View style={styles.infoBox}>
            {item.type === 'movie' && (
              <>
                <Image source={require('./assets/movieIcon.png')} style={styles.tvIcon} />
                <Text style={styles.infoTitle}>  MOVIE   </Text>
              </> 
            )}


        {/*TV Series*/}
 
            {item.type === 'tv' && (
              <>
                <Image source={require('./assets/TVicon.png')} style={styles.tvIcon} />
                <Text style={styles.infoTitle}>  SERIES  </Text>

                <Image source={require('./assets/seasonsIcon.png')} style={styles.seasonIcon} />
                <Text style={styles.seasonInfo}> {seasonInfo}</Text>

                <Text style={styles.airingYears}>  ‧  {airingYears}</Text>
              </>
            )}
          </View>

          {/* Cast and Genres Box */}
          <View style={styles.infoBox2}>
            {(item.type === 'tv' || item.type === 'movie') && (
              <>
              <View style={styles.castContainer}>
                <Text style={styles.infoTitle}>CAST </Text>
                <Text style={styles.mainCast}>{displayMainCast}</Text>
                </View>

                <View style={styles.castContainer}>
                <Text style={styles.infoTitle}>GENRE</Text>
                <Text style={styles.mainCast}>{displayGenres}</Text>
                </View>

              </>
            )}
          </View>

          {/* Review*/}
        <View style={styles.reviewContainer}>
          

          </View>
  
        
      </ScrollView>
    // </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    padding: 0,
  },
  headerContainer: {
    position: 'relative',
    height: 370, // Adjust height to accommodate the overlay
    backgroundColor: 'black',
    // top: -10,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    fontStyle: 'none',
    opacity: 0.9,
    fontSize: 14,
    color: 'white',
    marginLeft: 2, 
  },
  titleDetails:{
    marginTop: 2,
    flexDirection: 'row',
  },
  releaseDate: {
    fontStyle: 'none',
    opacity: 0.9,
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },

  synopsisContainer: {
    padding: 16,
    marginTop: 10,
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
    color: 'purple',
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
  castContainer:{
    flexDirection: 'row',
    paddingBottom: 15,
  },
  mainCast: {
    fontWeight: '400', // Normal text for main cast
    marginLeft: 0, // Add space between CAST and cast names
    flexShrink: 1, // Ensure text wraps properly
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

  reviewContainer: {


  }

});

export default ItemDetailScreen;
