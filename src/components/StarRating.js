import React, { useState, useEffect } from 'react'; // Import React hooks
import { View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'; // UI components
import { useAuth } from '../context/authContext' // Context hook to get the current logged-in user
import { db } from '../../firebaseConfig'; // Import Firebase firestore instance
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firebase functions to interact with the Firestore database

const filledStar = require('../../assets/images/filled-star.png'); 
const unfilledStar = require('../../assets/images/unfilled-star.png'); 

const StarRating = ({ item.id, item.type }) => {  // item.id = The ID of the movie/tv show/book & item.type = The type of item movie/tv show/book
  const [rating, setRating] = useState(0); //Stores the users current rating (from 1 to 5)
  const [isLoading, setIsLoading] = useState(true); //Manages the loading state while fetching data from the Firestore
  const { user } = useAuth();  

  // Fetch the existing rating from Firebase
  useEffect(() => {
    const fetchRating = async () => {
      if (!user) return;  // Makes sure user is logged in
      try {
        const ratingDoc = doc(db, "users", user.uid, "ratings", `${item.type}_${item.id}`);
        const docSnap = await getDoc(ratingDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRating(data.rating); // If a rating exists, set it
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      } finally {
        setIsLoading(false); // End the loading state after data is fetched 
      }
    };

    fetchRating();
  }, [db, user, item.id, item.type]);  // Refetch rating when user or item changes
  
  // Save the rating to Firebase

  const saveRatingToFirebase = async (newRating) => {
    if (!user) return; // Makes sure user is logged in
    try {
      const ratingDoc = doc(db, "users", user.uid, "ratings", `${item.type}_${item.id}`);
      await setDoc(ratingDoc, { rating: newRating }, { merge: true }); // Save or update the rating
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  // Handle star press
  const handlePress = (newRating) => {
    setRating(newRating); // Update the local rating immediately for a better UX
    saveRatingToFirebase(newRating); // Save the rating to Firebase
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#f7524b" />;
  }

  // Star Rating UI
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handlePress(star)}>
          <Image
            source={star <= rating ? filledStar : unfilledStar} //Display filled or unfilled star based on rating
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    width: 5,
    height: 5,
    marginRight: 5,
  },
});

export default StarRating;
