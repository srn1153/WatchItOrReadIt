import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../../firebaseConfig';
import { db } from '../../firebaseConfig';

export const AuthContext = createContext(); 

export const AuthContextProvider = ({children})=> {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined); 

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user)=> {
            if(user) {
                setIsAuthenticated(true)
                setUser(user)
            }else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub

    }, [])

    const login = async (email, password) => {
        try {
            const userInfo = await signInWithEmailAndPassword(auth, email, password)
            console.log("Login successful: ", userInfo.user)
            return {success: true, data: userInfo.user}
        } catch (error) {
            console.log("Error logging in: ", error.message)
            return {success: false, msg: error.message}
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            return {success: true}
        } catch (error) {
            return {success: false, msg: error.message}
        }
    }

    const signUp = async (email, password, username) => {
        try {
            const userInfo = await createUserWithEmailAndPassword(auth, email, password)
            const user = userInfo.user
            console.log(`response.user`, user)

            await setDoc(doc(db, "users", user.uid), {
                username, 
                userid: user.uid
            })
            return {success: true, data: user}
        } catch (error) {
            return{success: false, msg: error.message}
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext)

    if(!value) {
        throw new Error("userAuth must be wrapped inside AuthContextProvider")
    }
    return value
}

