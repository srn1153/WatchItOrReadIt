import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'


//Creating a button for multiple use
//Passing through onPress, text, and type so I can use the function in multiple different ways
const Button = ({ onPress, text, type }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 5, 
        padding: 15, 
        paddingHorizontal: 30, 
        borderRadius: 20, 
    },
    //Different background for primary container
    container_primary: {
      backgroundColor: "#2196F3",
    }, 
    //Different text for body use
    text: {
        fontSize: 15,       
        color: 'white', 
    },
    //Different text for primary use
    text_primary: {
      fontWeight: 'bold',
    },
    //Different text for tertiary use
    text_tertiary: {
      color: "#2196F3", 
    }
})

export default Button