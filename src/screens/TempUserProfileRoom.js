import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useAuth } from '../context/authContext'
import { useNavigation } from '@react-navigation/native'

import React from 'react'

const TempUserProfileRoom = () => {

  //Accessing the logout function from authContext
  const {logout} = useAuth()

  //Creating a useNavigation instance to switch screens if logout is successful
  const navigation = useNavigation()

  //Created a function to handle when the signup button is pressed
  const onLogOutPressed = async () => {
    console.log("Logout Button was pressed!")

    //Calling the logout function from authContext 
    const response = await logout()
    console.log("Results", response) //Print out the results
    
    if(response.success){ //If logout was successful
      navigation.navigate('Login') //Navigate to the home screen 
    }else{//Otherwise display error
      console.log("Logout error:", response.msg)
    }
  }

  //Adding button onto this temporary screen
  return (
    <View>
      <Text>TempUserProfileRoom</Text>
        <TouchableOpacity  onPress={onLogOutPressed}>
          <Image style={styles.image} source={require("../../assets/images/logoutButton.png")} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({ 
  image: {
    height: 25, 
    width: 25, 
    right: 15, 
    position: "absolute", 
  }
})

export default TempUserProfileRoom