// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxsSobpXnYuTN6Q6AkzFJ4UqpmtVoTgck",
  authDomain: "n322-class.firebaseapp.com",
  projectId: "n322-class",
  storageBucket: "n322-class.appspot.com",
  messagingSenderId: "516523063134",
  appId: "1:516523063134:web:f23fbd815e16626dfa41cf",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let auth;
// Initialize Firebase
if (Platform.OS === "web") {
  // For web, use a different persistence method
  auth = initializeAuth(app);
} else {
  // For mobile, use React Native AsyncStorage
  const app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export { auth, db };
