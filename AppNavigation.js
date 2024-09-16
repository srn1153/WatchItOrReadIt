import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import { AuthContext } from "./src/context/authContext";

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const [initialising, setInitialising] = useState(true)

    useEffect(() => {
        if(isAuthenticated !== undefined) {
            setInitialising(false)
        }
    }, [isAuthenticated])

    if(initialising){
        return null
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Login'}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name = "Login" component={LoginScreen} />
                <Stack.Screen name = "Signup" component={SignupScreen} />
                <Stack.Screen name = "Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation