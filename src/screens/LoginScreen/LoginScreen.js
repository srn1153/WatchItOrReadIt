import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import Logo from '../../../assets/images/login.png'
import CustomInput from '../../components/CustomInput'
import Button from '../../components/Button'

const LoginScreen = ({ setShowSigninScreen }) => {

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const[keyboardVisible, setKeyboardVisible] = useState(true); 

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(false); 
    }); 

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(true); 
    }); 

    return () => {
      keyboardDidHideListener.remove(); 
      keyboardDidShowListener.remove(); 
    };
  }, []); 

  const onLogInPressed = () => {
    console.log("create appwrite log in functionality here")
  }

  const onSignupPressed = () => {
    setShowSigninScreen(true); 
  }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ScrollView contentContainerStyle={[styles.content, keyboardVisible ? styles.keyboardVisible : {}]}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.text}>Welcome!</Text>

      <CustomInput 
      placeholder="Username" 
      value={username} 
      setValue={setUsername} 
      secureTextEntry={false}
      />

      <CustomInput 
      placeholder="Password" 
      value={password} 
      setValue={setPassword} 
      secureTextEntry={true}
      />

      <Button text="Login" onPress={onLogInPressed} type="primary" />

      <Button text="Don't have an account? Sign up here!" onPress={onSignupPressed} type="tertiary"/>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  logo: {
    marginTop: -68, 
    height: Dimensions.get('window').height * 0.55, 
    width: '100%',
    resizeMode: 'contain',
  },
  content: {
    marginTop: Dimensions.get('window').height * -0.18, 
    alignItems: 'center', 
    paddingBottom: 30, 
  },
  keyboardVisible: {
    marginTop: 0, 
  },
  text: {
    marginTop: -20, 
    fontWeight: 'bold',   
    fontSize: 20,       
    color: 'grey', 
    marginBottom: 10, 
  }
});

export default LoginScreen