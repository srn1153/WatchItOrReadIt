import React, { useState }  from 'react'; 
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import SigninScreen from './src/screens/SigninScreen';
import LoginScreen from './src/screens/LoginScreen';
import { AuthContextProvider } from './src/context/authContext';


const App = () => {
  const [showSigninScreen, setShowSigninScreen] = useState(false); 
  
  return (
    <AuthContextProvider>
      <SafeAreaView style={styles.root}>
        {showSigninScreen ? (
          <SigninScreen setShowSigninScreen={setShowSigninScreen} />
        ) : (
          <LoginScreen setShowSigninScreen={setShowSigninScreen} />
        )}
      </SafeAreaView>
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