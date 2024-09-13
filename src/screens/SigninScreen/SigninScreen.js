import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native'
import Logo from '../../../assets/images/login.png'
import CustomInput from '../../components/CustomInput'
import Button from '../../components/Button'

const SigninScreen = () => {

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSignInPressed = () => {
    console.log("Sign in"); 
  }

  const onLogInPressed = () => {
    console.log("Go to login page"); 
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <ScrollView contentContainerStyle={styles.content}>
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

      <Button text="Have an account? Log in here!" onPress={onLogInPressed} type="tertiary"/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  logo: {
    position: 'absolute', 
    top: 0, 
    height: Dimensions.get('window').height * 0.39, 
    width: '100%',
    resizeMode: 'cover', 

  },
  content: {
    marginTop: Dimensions.get('window').height *0.39, 
    alignItems: 'center', 
    padding: 7, 
  },
  text: {
    padding: 7, 
    fontWeight: 'bold',   
    fontSize: 20,       
    color: 'grey', 
  }
});

export default SigninScreen