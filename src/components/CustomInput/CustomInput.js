import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

//Created for custom textfields and can use it for usernames, emails or passwords 
const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput 
      value = {value}
      onChangeText={setValue}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        background: 'white', 
        width: '80%', 
        padding: 15, 

        borderColor: '#e8e8e8', 
        borderWidth: 1, 
        borderRadius: 5,

        paddingHorizontal: 10, 
        marginVertical: 10, 

        fontSize: 15, 
    },
})

export default CustomInput