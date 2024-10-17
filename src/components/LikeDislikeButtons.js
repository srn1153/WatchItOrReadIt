import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 

const LikeDislikeButtons = ({ reviewId }) => {
  const [likeSelected, setLikeSelected] = useState(false);
  const [dislikeSelected, setDislikeSelected] = useState(false);

  useEffect(() => {
    const loadReaction = async () => {
      try {
        const storedReactions = JSON.parse(await AsyncStorage.getItem('reactions')) || {};
        if (storedReactions[reviewId]) {
          setLikeSelected(storedReactions[reviewId].like);
          setDislikeSelected(storedReactions[reviewId].dislike);
        }
      } catch (error) {
        console.error('Failed to load reaction:', error);
      }
    };
    loadReaction();
  }, [reviewId]);

  const saveReaction = async (like, dislike) => {
    try {
      const storedReactions = JSON.parse(await AsyncStorage.getItem('reactions')) || {};
      storedReactions[reviewId] = { like, dislike };
      await AsyncStorage.setItem('reactions', JSON.stringify(storedReactions));
    } catch (error) {
      console.error('Failed to save reaction:', error);
    }
  };

  const handleLikePress = () => {
    const newLikeState = !likeSelected;
    setLikeSelected(newLikeState);
    setDislikeSelected(false); // Ensure only one can be selected
    saveReaction(newLikeState, false);
  };

  const handleDislikePress = () => {
    const newDislikeState = !dislikeSelected;
    setDislikeSelected(newDislikeState);
    setLikeSelected(false); // Ensure only one can be selected
    saveReaction(false, newDislikeState);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLikePress}>
        <Image
          source={require('../../assets/images/like.png')}
          style={[styles.icon, likeSelected && styles.selected]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDislikePress}>
        <Image
          source={require('../../assets/images/dislike.png')}
          style={[styles.icon, dislikeSelected && styles.selected]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 24, // To be adjusted 
    height: 24,
    marginHorizontal: 10,
  },
  selected: {
    borderColor: '#f7524b',
    borderWidth: 2,
    borderRadius: 12,
  },
});

export default LikeDislikeButtons;
