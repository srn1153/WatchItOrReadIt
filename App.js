import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WriteReviewScreen from './screens/WriteReviewScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Main' }} />
        <Stack.Screen name="WriteReview" component={WriteReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
