import React, { useState }  from 'react'; 
import { StyleSheet } from 'react-native';
import { AuthContextProvider } from './src/context/authContext';
import AppNavigation from './AppNavigation'

const App = () => {
  return (
    <AuthContextProvider>
      <AppNavigation />
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({ 
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  },
}); 

export default App;