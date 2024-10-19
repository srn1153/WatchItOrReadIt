import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import WriteReviewScreen from "./src/screens/WriteReviewScreen"; 
import { AuthContext } from "./src/context/authContext";
import NavigationBar from './src/components/NavigationBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ItemDetailScreen from './src/screens/ItemDetailScreen'; 
import ProfileScreen from './src/screens/ProfileScreen';
import ListScreen from './src/screens/ListScreen' 
import ListSearchScreen from './src/screens/ListSearchScreen'

//Creating an instance of createNativeStackNavigator, to handle screen stacking
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator(); 

const AppNavigation = () => {
    //Creating an isAuthenciated variable to hold the status of authentication from the AuthContext file
    const { isAuthenticated } = useContext(AuthContext)
    //Creating a status variable to see if the authentication is still in progress
    const [initialising, setInitialising] = useState(true)

    //Using useEffect to check changes in the authentication status, this runs everytime 'isAuthenticated' changes
    useEffect(() => { 
        //If isAuthenciated is undefined then set the initialising variable to false
        if(isAuthenticated !== undefined) {
            setInitialising(false)
        }
    }, [isAuthenticated])

    //Return nothing, if the initialising variable is still processing
    if(initialising){
        return null
    }

    //Making default screen displayed as the 'Login' page
    //Defining Login, Signup and HomeScreen screens in the stack
    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <Stack.Navigator>
                <Stack.Screen name="Back" component={NavigationBar} options={{ headerShown: false }} />
                <Stack.Screen name="WriteReview" component={WriteReviewScreen} options={{ headerShown: false, headerTintColor: 'black'}}/>
                <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={{ headerTransparent: true, headerTitle: '', headerTintColor: 'white' }}/>
                <Stack.Screen name="ProfileRoom" component={ProfileScreen} options={{ headerStyle: {backgroundColor: 'black'}, headerTitle: '', headerTintColor: 'white' }}/>
                <Stack.Screen name="List" component={ListScreen} />
                <Stack.Screen name="ListSearchScreen" component={ListSearchScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
                </Stack.Navigator>
            ) : (
                <Stack.Navigator
                initialRouteName={'Login'}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name = "Login" component={LoginScreen} />
                <Stack.Screen name = "Signup" component={SignupScreen} />
            </Stack.Navigator>
            )} 
        </NavigationContainer>
    )
}

export default AppNavigation