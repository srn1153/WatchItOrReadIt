import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Logo from '../../../assets/images/login.png'

const SigninScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text>Signin Screen</Text>
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
    height: '55%', 
    width: '100%',
    marginTop: -48, 
  },
});

export default SigninScreen