<<<<<<< HEAD
=======
import { StatusBar } from 'expo-status-bar';
>>>>>>> 60b88cbe136ebc18b8b7b50db9d2c46549ebe4e7
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
<<<<<<< HEAD
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
// import * as Font from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native' 

const HomeScreen = () => {
  const navigation = useNavigation();

  // const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    async function loadFonts() {
      // try {
      //   await SplashScreen.preventAutoHideAsync();
      //   await Font.loadAsync({
      //     'ibm-plex-mono': require('./assets/fonts/IBMPlexMono-Regular.ttf'),
      //   });
      //   setFontsLoaded(true);
      // } catch (e) {
      //   console.error(e);
      // } finally {
      //   if (fontsLoaded) {
      //     SplashScreen.hideAsync();
      //   }
      // }
    }

    loadFonts();
  }, []); // Removed dependency on fontsLoaded

  // if (!fontsLoaded) {
  //   return <Text>Loading...</Text>;
  // }

  return (
    <View>
=======
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
>>>>>>> 60b88cbe136ebc18b8b7b50db9d2c46549ebe4e7
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate('WriteReview')}
        >
        <AntDesign name="plus" size={18} color="white" />
      </TouchableOpacity>
<<<<<<< HEAD
    </View>
  );
}

const styles = StyleSheet.create({
  plusButton: {
=======
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
>>>>>>> 60b88cbe136ebc18b8b7b50db9d2c46549ebe4e7
    marginRight: 15,
    backgroundColor: 'grey',
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

<<<<<<< HEAD
export default HomeScreen;
=======
export default HomeScreen
>>>>>>> 60b88cbe136ebc18b8b7b50db9d2c46549ebe4e7

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
// import * as Font from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native' 

const HomeScreen = () => {
  const navigation = useNavigation();

  // const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    async function loadFonts() {
      // try {
      //   await SplashScreen.preventAutoHideAsync();
      //   await Font.loadAsync({
      //     'ibm-plex-mono': require('./assets/fonts/IBMPlexMono-Regular.ttf'),
      //   });
      //   setFontsLoaded(true);
      // } catch (e) {
      //   console.error(e);
      // } finally {
      //   if (fontsLoaded) {
      //     SplashScreen.hideAsync();
      //   }
      // }
    }

    loadFonts();
  }, []); // Removed dependency on fontsLoaded

  // if (!fontsLoaded) {
  //   return <Text>Loading...</Text>;
  // }

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

export default HomeScreen;
