import React, { useState }  from 'react'; 
import { SafeAreaView, StyleSheet } from 'react-native';
//import AppwriteService from './appwrite/service';
import SigninScreen from './src/screens/SigninScreen';
import LoginScreen from './src/screens/LoginScreen';


const App = () => {
  const [showSigninScreen, setShowSigninScreen] = useState(false); 
  
  return (
      <SafeAreaView style={styles.root}>
        {showSigninScreen ? (
          <SigninScreen setShowSigninScreen={setShowSigninScreen} />
        ) : (
          <LoginScreen setShowSigninScreen={setShowSigninScreen} />
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