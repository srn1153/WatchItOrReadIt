import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

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

    container_primary: {
      backgroundColor: "#2196F3",
    }, 

    text: {
        fontSize: 15,       
        color: 'white', 
    },

    text_primary: {
      fontWeight: 'bold',
    },

    text_tertiary: {
      color: "#2196F3", 
    }
})

export default Button