import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import WriteReviewScreen from './src/screens/WriteReviewScreen';
import NavigationBar from './src/components/NavigationBar';
import AppNavigation from './AppNavigation';
import { AuthContextProvider } from './src/context/authContext';
//import Navigation from './Navigation'       <Navigation />

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthContextProvider>
      <AppNavigation />
    </AuthContextProvider>
  );
}

export default App;
