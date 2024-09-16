import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth} from 'firebase/auth'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyC6dqQ_PRr6qQY9xXe3U7vIdvywRE9uQLU",
  authDomain: "watchitorreadit-eb212.firebaseapp.com",
  projectId: "watchitorreadit-eb212",
  storageBucket: "watchitorreadit-eb212.appspot.com",
  messagingSenderId: "1093590013449",
  appId: "1:1093590013449:web:56fff05ca913339e314ad8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const userRef = collection(db, 'users')
export const roomRef = collection(db, 'rooms')
