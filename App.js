import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WriteReviewScreen from './screens/WriteReviewScreen';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

export default function App() {
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
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => navigation.navigate('WriteReview')}
              >
                <AntDesign name="plus" size={18} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="WriteReview" component={WriteReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
