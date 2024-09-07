import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Logo from '../../../assets/images/login.png'
import CustomInput from '../../components/CustomInput'

const SigninScreen = () => {

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text>Signin Screen!</Text>

      <CustomInput 
      placeholder="Username" 
      value={username} 
      setValue={setUsername} 
      //secureTextEntry={false}
      />
      
      <CustomInput 
      placeholder="Password" 
      value={password} 
      setValue={setPassword} 
      secureTextEntry={true}
      />

    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'flex-start',
    resizeMode: 'stretch',
    height: '50%', 
    width: '100%',
    maxWdith: 300, 
    marginTop: -50, 
  },
});

export default SigninScreen