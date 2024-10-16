import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { db } from '../../firebaseConfig'; // Firestore instance
import { doc, getDoc, setDoc } from 'firebase/firestore'; 

export const useBookshelfModal = ({ userId }) => {
  const [bookshelfModalVisible, setBookshelfModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchType, setSearchType] = useState('book'); // 'book'
  const [searchQuery, setSearchQuery] = useState(''); // Search query input
  const [searchResults, setSearchResults] = useState([]); // Results from API
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedBooks, setSelectedBooks] = useState(Array(4).fill(null)); // Array for selected books
  const [currentContainerIndex, setCurrentContainerIndex] = useState(null); // Index of the current container being clicked

  // Toggle Bookshelf modal visibility
  const toggleBookshelf = () => setBookshelfModalVisible(!bookshelfModalVisible);

  // Handle the container click, show the search modal
  const handleContainerClick = (type, index) => {
    setSearchType(type);
    setCurrentContainerIndex(index);
    setSearchModalVisible(true);
    setBookshelfModalVisible(false);
  };

  // Handle selection of a book
  const handleBookSelect = (book) => {
    const updatedBooks = [...selectedBooks];
    updatedBooks[currentContainerIndex] = book; // Update the clicked book container with the selected item
    setSelectedBooks(updatedBooks);

    saveSelectedBooks(); // Save the selection to Firestore
    setSearchModalVisible(false); // Close the search modal
    setBookshelfModalVisible(true); // Show the Bookshelf modal again
  };

  // Function to search for books
  const handleSearch = async (text) => {
    if (!text.trim()) {
      setSearchQuery('');
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setSearchQuery(text);

    

    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
      setSearchResults(response.data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save the selected books to Firestore
  const saveSelectedBooks = async () => {
    if (userId) {
      try {
        const booksDoc = doc(db, "users", userId, "bookshelf", "selected");

        console.log("Saving selected books:", selectedBooks);

        await setDoc(booksDoc, {
          books: selectedBooks || [] // Save selected books array
        }, { merge: true });

        console.log("Book selection saved successfully!");
      } catch (error) {
        console.error("Error saving books selection:", error);
      }
    } else {
      console.log("User is not authenticated. Cannot save books.");
    }
  };

  // Trigger save when the modal closes
  const handleBookshelfClose = () => {
    saveSelectedBooks();
    setBookshelfModalVisible(false); // Close the bookshelf modal
  };

  // Fetch saved books from Firestore
  const fetchSelectedBooks = async () => {
    if (userId) {
      try {
        const booksDoc = doc(db, "users", userId, "bookshelf", "selected");
        const docSnap = await getDoc(booksDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Fetched books data:", data);
          setSelectedBooks(data.books || []); // Set the selected books
        } else {
          console.log("No book selections found.");
        }
      } catch (error) {
        console.error("Error fetching book selections:", error);
      }
    } else {
      console.log("User is not authenticated. Cannot fetch books.");
    }
  };

  // Fetch the books selection when the component mounts or user changes
  useEffect(() => {
    if (userId) {
      console.log("User detected, fetching book selections...");
      fetchSelectedBooks();
    }
  }, [userId]); // Only run when the user changes

  return {
    bookshelfModalVisible,
    searchModalVisible,
    searchType,
    searchQuery,
    searchResults,
    loading,
    selectedBooks,
    toggleBookshelf,
    handleContainerClick,
    handleBookSelect,
    handleSearch,
    setSearchModalVisible,
    handleBookshelfClose,
  };
};
