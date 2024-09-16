import React  from 'react'; 
import { StyleSheet } from 'react-native';
import { AuthContextProvider } from './src/context/authContext';
import AppNavigation from './appNavigation'

//Entry point for app, initial screen displayed is the login page
const App = () => {
  return (
    //using AuthContextProvider to access AppNavigation
    <AuthContextProvider>
      <AppNavigation />
    </AuthContextProvider>
  );
};

//remove this?
const styles = StyleSheet.create({ 
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  },
}); 

export default App;