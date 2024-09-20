import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth} from 'firebase/auth'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from 'firebase/firestore'; 

//Firebase Database configuration - including necessary information  
const firebaseConfig = {
  apiKey: "AIzaSyC6dqQ_PRr6qQY9xXe3U7vIdvywRE9uQLU",
  authDomain: "watchitorreadit-eb212.firebaseapp.com",
  projectId: "watchitorreadit-eb212",
  storageBucket: "watchitorreadit-eb212.appspot.com",
  messagingSenderId: "1093590013449",
  appId: "1:1093590013449:web:56fff05ca913339e314ad8"
};

//Initialising Firebase
const app = initializeApp(firebaseConfig);

//Saving user authentication with 'AsyncStorage'
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

//Creating Firebase instance to access cloud-hosted database 
export const db = getFirestore(app)
//Creating a reference to 'user' collection for future use
export const userRef = collection(db, 'users')
//Creating a reference to 'rooms' collection to manage future data 
export const roomRef = collection(db, 'rooms')
