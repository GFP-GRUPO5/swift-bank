// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
// @ts-ignore
import { Auth, getAuth, getReactNativePersistance, initializeAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


let app: FirebaseApp
let auth: Auth

if(!getApps().length) {
  app = initializeApp(firebaseConfig)
  auth = initializeAuth(app, {
    persistence: getReactNativePersistance(AsyncStorage)
  })
} else {
  app = getApps()[0]
  auth = getAuth(app)
}

export {
  app,
  auth
};
