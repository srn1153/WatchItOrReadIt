import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigation from './AppNavigation';
import { AuthContextProvider } from './src/context/authContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthContextProvider>
      <AppNavigation />
    </AuthContextProvider>
  );
}

export default App;
