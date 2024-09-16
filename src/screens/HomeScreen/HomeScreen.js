import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

//Created for temporary use, will modify once I have merged branches with team 
//Created to test if my navgiation code was working efficiently
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
  });

export default HomeScreen