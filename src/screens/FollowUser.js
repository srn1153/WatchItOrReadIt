import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../../firebaseConfig'; 
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth'; // Import firebase auth

const FollowUser = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false); // Track if the current user is following the user prop
  const auth = getAuth(); // Initialise firebase auth
  const currentUser = auth.currentUser; // Get the currently logged-in user

  useEffect(() => {
    if (!currentUser) return; // If the user is not logged in, exit if not

    // Function to check if the user is already followed
    const checkFollowingStatus = async () => {
      try {
        const currentUserDoc = doc(db, 'users', currentUser.uid); // Use the actual logged-in user's ID
        const docSnap = await getDoc(currentUserDoc);
        if (docSnap.exists()) {
          const followingList = docSnap.data().following || [];
          setIsFollowing(followingList.includes(user.username)); // Check if username is in the following list
        }
      } catch (error) {
        console.error('Error fetching following status:', error);
      }
    };

    checkFollowingStatus(); // Call the function to check following status when the component mounts
  }, [user.username, currentUser]);

  const handleFollow = async () => {
    if (!currentUser) return; // Ensure the user is logged in

    const currentUserDoc = doc(db, 'users', currentUser.uid); 
    try {
      if (isFollowing) {
        // Unfollow user
        await updateDoc(currentUserDoc, {
          following: arrayRemove(user.username), // Remove the followed user from the "following" array
        });
        setIsFollowing(false); // Update UI to reflect unfollow
      } else {
        // Follow user
        await updateDoc(currentUserDoc, {
          following: arrayUnion(user.username), // Add the followed user to the "following" array
        });
        setIsFollowing(true); // Update UI to reflect follow
      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  return (
    // Follow button
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: isFollowing ? '#EAB8E4' : '#D3D3D3' }]} // Change color based on following status
      onPress={handleFollow}
    >
      <Text style={styles.buttonText}>
        {isFollowing ? 'Following' : 'Follow'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligns the button to the right
    width: '100%',
    position: 'absolute',
    
  },
  button: {
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    borderRadius: 5,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    position: 'absolute',
    right: 10,
  },
  buttonText: {
    fontSize: 14, // Smaller font size
    color: '#000', 
    textAlign: 'center',
  },
});

export default FollowUser;

