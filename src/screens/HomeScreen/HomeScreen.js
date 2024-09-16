import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  
    return (
        <View  
        style={styles.container}
        >
            <Text>
            POTENTIAL HOME PAGE
            </Text>
        </View>
      );
    };

const styles = StyleSheet.create ({
    container: {
      flex: 1,
      marginTop: Dimensions.get('window').height * 0.5,
      alignItems: 'center',  
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

export default HomeScreen