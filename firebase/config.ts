// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
// @ts-ignore
import { Auth, getAuth, getReactNativePersistance, initializeAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyC1k6_EoqOG2uAmNQJsHzNlQjsVltgNbc8",
  authDomain: "swiftbank-7e848.firebaseapp.com",
  projectId: "swiftbank-7e848",
  storageBucket: "swiftbank-7e848.firebasestorage.app",
  messagingSenderId: "266624384678",
  appId: "1:266624384678:web:dcfc3a91c4bf243b8f3e67",
  measurementId: "G-4VP51YFE5F"
};


let app: FirebaseApp;
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

