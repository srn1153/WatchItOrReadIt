import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Container for managing navigation state
import { createStackNavigator } from '@react-navigation/stack'; // Stack Navigator for screen transitions
import SearchScreen from './SearchScreen'; // Import the SearchScreen component
import ItemDetailScreen from './ItemDetailScreen'; // Import the ItemDetailScreen component
import { StyleSheet } from 'react-native';


// Create a Stack Navigator instance
const Stack = createStackNavigator();

// Navigation component that sets up the stack navigator
const Navigation = () => {
  return (
    // NavigationContainer to manage the navigation state of the app
    <NavigationContainer>
      
      {/* Stack Navigator to define the app's navigation structure */}
      <Stack.Navigator initialRouteName="Search">
        
        {/* Define the Search screen */}
        <Stack.Screen
          name="Search"
          component={SearchScreen} // Component to render for this screen
          options={{ headerShown: false }} // Hide header for SearchScreen
        />

        {/* Define the ItemDetail screen */}
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetailScreen} // Component to render for this screen
          options={{ headerShown: false }} // Hide header for 
        //   options={{ title: 'Details' }} // Set the title for ItemDetailScreen
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 0, // Ensure no margin is causing extra space
      paddingTop: 0, // Ensure no padding is causing extra space
    },
  });

  
export default Navigation;
