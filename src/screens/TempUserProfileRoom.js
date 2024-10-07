import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const TempUserProfileRoom = () => {
  return (
    <View>
      <Text>TempUserProfileRoom</Text>
    <TouchableOpacity>
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