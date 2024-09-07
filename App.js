import React from 'react'; 
import { SafeAreaView, StyleSheet, Text } from 'react-native';
//import AppwriteService from './appwrite/service';
import SigninScreen from './src/screens/SigninScreeen'; 

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <SigninScreen /> 
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  },
}); 

export default App;