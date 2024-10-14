import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../firebaseConfig'; 
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

const FollowUser = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const auth =getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if(!currentUser) return;

    const checkFollowingStatus = async () => {
      try {
        const currentUserDoc = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(currentUserDoc);
        if(docSnap.exists()) {
          const followingList = docSnap.data().following || [];
          setIsFollowing(followingList.includes(user.username));
        }     
      } catch (error) {
        console.error('Error fetching following.', error);
      }
    };
    checkFollowingStatus();
  }, [user.username, currentUser]);

const handleFollow = async () => {
  try {
    if (isFollowing) {
      await updateDoc(currentUserDoc, {
        following: arrayRemove(user.username),
      });
      setIsFollowing(true);
    }
  } catch (error) {
    console.error('Error following/unfollowing user.', error);
  }
};

return (
  <TouchableOpacity
    style={[styles.button, {backgroundColor: isFollowing ? '#41509A': '#90EE90'}]}
    onPress={handleFollow} >
      <Text style={styles.buttonText}>
        {isFollowing ? 'Unfollow' : 'Follow'}
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
    paddingVertical: 5, // Reduced vertical padding
    paddingHorizontal: 10, // Reduced horizontal padding
    borderRadius: 5,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    position: 'absolute',
    right: 10,
  },
  buttonText: {
    fontSize: 14, // Smaller font size
    color: '#000', // Change text color to black for better contrast
    textAlign: 'center',
  },
});

export default FollowUser;

