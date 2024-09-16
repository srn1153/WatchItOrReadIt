import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from '../../firebaseConfig';
import { db } from '../../firebaseConfig';
import { Alert } from "react-native";

//Creating AuthContext to manage the user's authentication state 
export const AuthContext = createContext(); 

export const AuthContextProvider = ({children})=> {
    //Created to hold the current user
    const [user, setUser] = useState(null)
    //Created variable to store the status of the authenciation
    const [isAuthenticated, setIsAuthenticated] = useState(undefined); 

    //Using useEffect to handle if authentication changes 
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user)=> {
            if(user) { //if user has logged in successfully
                setIsAuthenticated(true) //sets authentation to true 
                setUser(user) //sets user to authenticated user
            }else { //Otherwise set to false and null
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub
    }, [])

    //Function created to handle email and password for logging in purposes
    const login = async (email, password) => {
        try {
            //Utilising Firebase signInWithEmailandPassword function 
            const userInfo = await signInWithEmailAndPassword(auth, email, password)
            console.log("Login successful: ", userInfo.user)
            return {success: true, data: userInfo.user} //returns user's data if login was successful
        } catch (error) {
            const msg = error.message
            //if error occurs I want the message to be user appropriate
            if(msg.includes('(auth/invalid-email)')) msg='Invalid email, please try again' 
            //add other errors into this function 
            Alert.alert("Login Error: ", msg) //Displaying user-friendly alert, to guide them to log in successfully
            return{success: false, msg} //returning the error 
        }
    }

    //Function created to handle if the user wants to log out
    const logout = async () => {
        try {
            //Using Firebase signOut function 
            await signOut(auth)
            return {success: true} //returns the success status
        } catch (error) {
            return {success: false, msg: error.message} //returns error message to see what went wrong
        }
    }

    //Function created to handle if the user wants to sign up with username, email and password
    const signUp = async (email, password, username) => {
        try {
            //Utilising Firebase createUserWithEmailAndPassword function for signing up
            const userInfo = await createUserWithEmailAndPassword(auth, email, password)
            const user = userInfo.user

            //Creating a document (setDoc) in the database under the 'users' collection 
            await setDoc(doc(db, "users", user.uid), {
                username, 
                userid: user.uid
            })
            return {success: true, data: user} //returning success status and user information
        } catch (error) {
            const msg = error.message
            //if error occurs I want the message to be user appropriate
            if(msg.includes('(auth/invalid-email)')) msg='Invalid email, please try again' 
            //add other errors into this function 
            Alert.alert("Signup Error: ", msg) //Displaying user-friendly alert, to guide them to sign up successfully
            return{success: false, msg} //returning the error
        }
    }

    //Providing functions and user authentication to the app
    return (
        <AuthContext.Provider value={{ user, login, signUp, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

//Hook created to easily access the authentication state and functions from AuthContext
export const useAuth = () => {
    const value = useContext(AuthContext)
    if(!value) {
        //Created to ensure the hook is used within AuthContextProvider
        throw new Error("useAuth must be wrapped inside AuthContextProvider")
    }
    return value //returning the functions and authentication 
}