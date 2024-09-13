import React, { useState }  from 'react'; 
import { SafeAreaView, StyleSheet } from 'react-native';
//import AppwriteService from './appwrite/service';
import SigninScreen from './src/screens/SigninScreen';
import LoginScreen from './src/screens/LoginScreen';


const App = () => {
  const [showLoginScreen, setShowLoginScreen] = useState(false); 
  
  return (
      <SafeAreaView style={styles.root}>
        {showLoginScreen ? (
          <LoginScreen setShowLoginScreen={setShowLoginScreen} />
        ) : (
          <SigninScreen setShowLoginScreen={setShowLoginScreen} />
        )}
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