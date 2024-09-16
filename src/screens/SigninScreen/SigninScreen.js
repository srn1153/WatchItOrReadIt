import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import Logo from '../../../assets/images/login.png'
import CustomInput from '../../components/CustomInput'
import Button from '../../components/Button'
import { useAuth } from '../../context/authContext'

const SigninScreen = ({ setShowSigninScreen }) => {

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const[keyboardVisible, setKeyboardVisible] = useState(true); 
  const {signUp} = useAuth()


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

  const onSignInPressed = async () => {
    console.log("Creating Firebase signup functioanlity here")

    const response = await signUp(email, password, username)

    console.log("Got results", response)
    if(!response.success){
      Alert.alert("Sign up error:", response.msg)
    }
  }

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

      <Button text="Already have an account? Log in here!" onPress={() => setShowSigninScreen(false)} type="tertiary"/>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

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

export default SigninScreen