import React, { useState, useEffect } from 'react'; // Import React hooks
import { View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'; // UI components
import { useAuth } from '../context/authContext' // Context hook to get the current logged-in user
import { db } from '../../firebaseConfig'; // Import Firebase firestore instance
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firebase functions to interact with the Firestore database

const filledStar = require('../../assets/images/filled-star.png'); 
const unfilledStar = require('../../assets/images/unfilled-star.png'); 

const StarRating = ({ item }) => {  // item is passed as a prop
  const { id, type } = item;  // Destructure id and type from item
  const [rating, setRating] = useState(0); // Stores the user's current rating (from 1 to 5)
  const [isLoading, setIsLoading] = useState(true); // Manages the loading state while fetching data from the Firestore
  const { user } = useAuth();  // Get the currently logged-in user

    // Fetch the existing rating from Firebase
    useEffect(() => {
      const fetchRating = async () => {
        if (!user) return;  // Ensure the user is logged in
        try {
          const ratingDoc = doc(db, "users", user.uid, "ratings", `${type}_${id}`);  // Use id and type for Firestore document
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
    }, [db, user, id, type]);  // Refetch rating when user, id, or type changes
  
    // Save the rating to Firebase
    const saveRatingToFirebase = async (newRating) => {
      if (!user) return; // Ensure the user is logged in
      try {
        const ratingDoc = doc(db, "users", user.uid, "ratings", `${type}_${id}`);  // Save the rating with id and type
        await setDoc(ratingDoc, { rating: newRating }, { merge: true }); // Save or update the rating
      } catch (error) {
        console.error('Error saving rating:', error);
      }
    };
  

    // Handle star press
    const handlePress = (newRating) => {
      setRating(newRating); // Update the local rating immediately for better UX
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
            source={star <= rating ? filledStar : unfilledStar} // Display filled or unfilled star based on rating
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
    width: 10, // Adjusted star size to make it more visible
    height: 10, // Adjusted star size to make it more visible
    marginRight: 5,
  },
});
export default StarRating;