import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import profileRoom from '../../assets/ProfileRoom/room1.png'; //importing the profile room image

export default function ProfileScreen() {
  const navigation = useNavigation(); //navigation object to navigate between screens 

  return (
    <View style={styles.container}>
      <Image source={profileRoom} style={styles.profileRoomImg} /> 
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('List')}>
        <Text style={styles.buttonText}>My Lists</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute', 
    bottom: 30, 
    alignSelf: 'center', 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
  },
  profileRoomImg: {
    flex: 1, 
    height: '100%',
    width: '100%',
    resizeMode: 'stretch', 
    position: 'absolute', 
  }
});