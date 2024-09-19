import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WriteReviewScreen from './screens/WriteReviewScreen';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

const Index = () => {
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
                style={styles.headerButton}
                onPress={() => navigation.navigate('WriteReview')}
              >
                <AntDesign name="plus" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#333', // Customize header background color
            },
            headerTintColor: '#fff', // Customize header text and icon color
          })}
        />
        <Stack.Screen name="WriteReview" component={WriteReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
    padding: 5,
  },
});

export default Index;
