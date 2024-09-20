import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native'
import Logo from '../../../assets/images/login.png'
import CustomInput from '../../components/CustomInput'
import Button from '../../components/Button'
import { useAuth } from '../../context/authContext'
import { useNavigation } from '@react-navigation/native'

const SigninScreen = () => {
  //Holding username, password and email input values
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  //Created to store the state of the keyboard
  const[keyboardVisible, setKeyboardVisible] = useState(true); 

  //Accessing the signup function from authContext
  const {signUp} = useAuth()

  //Creating a useNavigation instance to switch screens if singup is successful
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

  //Created a function to handle when the signup button is pressed
  const onSignInPressed = async () => {
    //If email, password or username textfields are empty
    if(!email || !password || !username){
      //Alert is displayed to the user to prompt them to fill the textfields
      Alert.alert('Sign Up', "Please fill all text fields!")
    }

    console.log("Creating Firebase signup functioanlity here")

    //Calling the signUp function from authContext 
    const response = await signUp(email, password, username)
    console.log("Got results", response) //Print out the results
    
    if(response.success){ //If signUp was successful
      navigation.navigate('Home') //Navigate to the home screen 
    }else{//Otherwise display error
      console.log("Sign up error:", response.msg)
    }
  }
    
  //Ensuring that the keyboard does not cover the textfields for signup information
  //Creating CustomInput text fields for information needed to signup 
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ScrollView contentContainerStyle={[styles.content, keyboardVisible ? styles.keyboardVisible : {}]}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.text}>Sign up here!</Text>

      <CustomInput 
      placeholder="Username" 
      value={username} 
      setValue={setUsername} 
      secureTextEntry={false}
      />

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
      <Button text="Sign up" onPress={onSignInPressed} type="primary" />

      <Button text="Already have an account? Log in here!" onPress={() => navigation.navigate('Login')} type="tertiary"/>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

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
    marginTop: 0,  //Adjusting the margin when keyboard is visible
  },
  text: {
    marginTop: -20, 
    fontWeight: 'bold',   
    fontSize: 20,       
    color: 'grey', 
    marginBottom: 10, 
  }
});

export default SigninScreen