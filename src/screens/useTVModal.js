import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext'
import { db } from '../../firebaseConfig'; // firestore instance
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Add Firebase Firestore methods


export const useTVModal = () => {
  const { user } = useAuth(); // Get the current logged-in user from authContext

  const [tvModalVisible, setTVModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchType, setSearchType] = useState('movie'); // 'movie' or 'tv'
  const [searchQuery, setSearchQuery] = useState(''); // Search query input
  const [searchResults, setSearchResults] = useState([]); // Results from API
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedMovies, setSelectedMovies] = useState(Array(4).fill(null)); // Array for selected movies
  const [selectedTVShows, setSelectedTVShows] = useState(Array(4).fill(null)); // Array for selected TV shows
  const [currentContainerIndex, setCurrentContainerIndex] = useState(null); // Index of the current container being clicked

  // Toggle TV modal visibility
  const toggleTVfaves = () => setTVModalVisible(!tvModalVisible);

  // Handle the container click, show the search modal
  const handleContainerClick = (type, index) => {
    setSearchType(type);
    setCurrentContainerIndex(index);
    setSearchModalVisible(true);
    setTVModalVisible(false);
  };

  // Handle selection of a movie or TV show
  const handleShowSelect = (show) => {
    if (searchType === 'movie') {
      const updatedMovies = [...selectedMovies];
      updatedMovies[currentContainerIndex] = show; // Update the clicked movie container with the selected item
      setSelectedMovies(updatedMovies);
    } else {
      const updatedTVShows = [...selectedTVShows];
      updatedTVShows[currentContainerIndex] = show; // Update the clicked TV show container with the selected item
      setSelectedTVShows(updatedTVShows);
    }

    // Clear search bar and results
    setSearchQuery(''); // Clear search input
    setSearchResults([]); // Clear search results
    
    saveSelectedShows(); // Save the selection to Firestore
    setSearchModalVisible(false); // Close the search modal
    setTVModalVisible(true); // Show the TV modal again
  };
  
  // Function to search for movies or TV shows
  const handleSearch = async (text) => {
    if (!text.trim()) {
      setSearchQuery('');
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setSearchQuery(text);

    try {
      const API_KEY = '79c14b18444432a1b856be277e49212d';
      let response;

      // Fetch from API based on search type
      if (searchType === 'movie') {
        response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${text}&api_key=${API_KEY}`);
      } else if (searchType === 'tv') {
        response = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${text}&api_key=${API_KEY}`);
      }

      setSearchResults(response.data.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };



  const saveSelectedShows = async () => {
    if (user) {
      try {
        const showsDoc = doc(db, "users", user.uid, "shows", "selected");
  
        console.log("Saving selected shows:", selectedMovies, selectedTVShows);
  
        await setDoc(showsDoc, {
          movies: selectedMovies || [], // Save selected movies array
          tvShows: selectedTVShows || [] // Save selected TV shows array
        }, { merge: true });
  
        console.log("Movie and TV show selection saved successfully!");
      } catch (error) {
        console.error("Error saving shows selection:", error);
      }
    } else {
      console.log("User is not authenticated. Cannot save shows.");
    }
  };
  
  // Trigger save when the modal closes
  const handleTVClose = () => {
    saveSelectedShows();
    setTVModalVisible(false); // Close the TV modal 

  };


  const fetchSelectedShows = async () => {
    if (user) {
      try {
        const showsDoc = doc(db, "users", user.uid, "shows", "selected");
        const docSnap = await getDoc(showsDoc);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Fetched shows data:", data);
          setSelectedMovies(data.movies || []); // Set the selected movies
          setSelectedTVShows(data.tvShows || []); // Set the selected TV shows
        } else {
          console.log("No movie or TV show selections found.");
        }
      } catch (error) {
        console.error("Error fetching shows selections:", error);
      }
    } else {
      console.log("User is not authenticated. Cannot fetch shows.");
    }
  };
  
  // Fetch the shows selection when the component mounts or user changes
  useEffect(() => {
    if (user) {
      console.log("User detected, fetching movie and TV show selections...");
      fetchSelectedShows();
    }
  }, [user]); // Only run when the user changes
  
  





  return {
    tvModalVisible,
    searchModalVisible,
    searchType,
    searchQuery,
    searchResults,
    loading,
    selectedMovies,
    selectedTVShows,
    toggleTVfaves,
    handleContainerClick,
    handleShowSelect,
    handleSearch,
    setSearchModalVisible,
    handleTVClose,
  };
};
