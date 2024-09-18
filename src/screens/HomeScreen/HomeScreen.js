import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native' 

const HomeScreen = () => {
  const navigation = useNavigation()

  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    async function loadFonts() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'ibm-plex-mono': require('./assets/fonts/IBMPlexMono-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (e) {
        console.error(e);
      } finally {
        if (fontsLoaded) {
          SplashScreen.hideAsync();
        }
      }
    }

    loadFonts();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate('WriteReview')}
        >
        <AntDesign name="plus" size={18} color="white" />
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    marginRight: 15,
    backgroundColor: 'grey',
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen
