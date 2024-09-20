import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native'
import Logo from '../../../assets/images/login.png'
import CustomInput from '../../components/CustomInput'
import Button from '../../components/Button'
import { AuthContext, useAuth } from '../../context/authContext'
import { useNavigation } from '@react-navigation/native' 

const LoginScreen =  () => {
  //Holding email and password input values 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  //Created to store the state of the keyboard
  const[keyboardVisible, setKeyboardVisible] = useState(true); 

  //Accessing the login function from authContext 
  const {login} = useAuth()

  //Creating a useNavigation instance to switch between screens if login is successful
  const navigation = useNavigation()

  //Creating event listeners for keyboard visibility
  useEffect(() => {
    //Creating a listener when the keyboard is shown
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      //Setting keyboard visibility to false (hide content when keyboard is shown)
      setKeyboardVisible(false); 
    }); 

    //Creating a listen when the keyboard is hidden
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      //Setting keyboard visibility to true (show content when keyboard is hidden)
      setKeyboardVisible(true); 
    }); 

    //Remove the listeners when the components unmount 
    return () => {
      keyboardDidHideListener.remove(); 
      keyboardDidShowListener.remove(); 
    };
  }, []); 

  //Created a function to handle when the login button is pressed
  const onLogInPressed = async () => {
    //if email and password has not been added into the custom input textfields
    if(!email || !password){
      //An alert displayed to the user to prompt them of the correct input 
      Alert.alert('Login', "Please add email and password to login!")
    }
    
    console.log("Creating firebase login functionality here")

    //Calling the login function from authContext
    const response = await login(email, password)
    console.log("Got results", response) //print out the results 
    
    if(response.success){ //If login was successful
      //Allowin authContext to redirect screen to homescreen  
    } else {
      console.log("Login error", response.msg) //displays error if otherwise
    }
  }

  //Ensuring that the keyboard does not cover the textfields for login information
  //Creating CustomInput text fields for information needed to login 
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ScrollView contentContainerStyle={[styles.content, keyboardVisible ? styles.keyboardVisible : {}]}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.text}>Welcome!</Text>
      
      <CustomInput 
      placeholder="Email" 
      value={email} 
      setValue={setEmail} 
      secureTextEntry={false}
      />

      <CustomInput 
      placeholder="Password" 
      value={password} 
      setValue={setPassword} 
      secureTextEntry={true}
      />

      <Button text="Login" onPress={onLogInPressed} type="primary" />

      <Button text="Don't have an account? Sign up here!" onPress={() => navigation.navigate('Signup')} type="tertiary"/>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  //Ensuring the correct positioning for the logo
  logo: {
    marginTop: -68, 
    height: Dimensions.get('window').height * 0.55, 
    width: '100%',
    resizeMode: 'contain',
  },
  //Ensuring the content does not overlap with the image
  content: {
    marginTop: Dimensions.get('window').height * -0.18, 
    alignItems: 'center', 
    paddingBottom: 30, 
  },
  keyboardVisible: {
    marginTop: 0, //Adjusting the margin when keyboard is visible
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