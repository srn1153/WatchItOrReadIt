import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { db } from '../../firebaseConfig'; 
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

const filledStar = require('../../assets/images/filled-star.png'); // Path to your filled star image
const unfilledStar = require('../../assets/images/unfilled-star.png'); // Path to your unfilled star image


const { user } = useAuth(); // Get the current logged-in user 

const StarRating = ({ user }) => {  
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const db = getFirestore();  // Initialise Firestore
  
    // Fetch the existing rating from Firebase on component mount
    useEffect(() => {
      const fetchRating = async () => {
        try {
          const docRef = doc(db, 'ratings', `${user}`);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const data = docSnap.data();
            setRating(data.rating);
          }
        } catch (error) {
          console.error('Error fetching rating:', error);
        } finally {
          setIsLoading(false);
        }
      };
  //Fetch Rating
      fetchRating();
    }, [db, user]);
  
    // Save the rating to Firebase
    const saveRatingToFirebase = async (newRating) => {
      try {
        const docRef = doc(db, 'ratings', `${user}`); 
        await setDoc(docRef, { rating: newRating }, { merge: true });
      } catch (error) {
        console.error('Error saving rating:', error);
      }
    };
  
    // Handle when a star is pressed
    const handlePress = (newRating) => {
      setRating(newRating);
      saveRatingToFirebase(newRating);
    };
  
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handlePress(star)}>
            <Image
              source={star <= rating ? filledStar : unfilledStar}
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
      width: 40,
      height: 40,
      marginRight: 5,
    },
  });
  
  export default StarRating; 