import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

//const Stack = createStackNavigator();

const HomeScreen = () => {
  const navigation = useNavigation()

  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // useEffect(() => {
  //   async function loadFonts() {
  //     try {
  //       await SplashScreen.preventAutoHideAsync();
  //       await Font.loadAsync({
  //         'ibm-plex-mono': require('./assets/fonts/IBMPlexMono-Regular.ttf'),
  //       });
  //       setFontsLoaded(true);
  //     } catch (e) {
  //       console.error(e);
  //     } finally {
  //       if (fontsLoaded) {
  //         SplashScreen.hideAsync();
  //       }
  //     }
  //   }

  //   loadFonts();
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <SafeAreaView style={styles.safeArea}> 
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate('WriteReview')}
        >
        <AntDesign name="plus" size={18} color="white" />
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create ({
  safeArea: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }, 
  plusButton:{
    marginRight: 15,
    backgroundColor: 'grey',
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen
