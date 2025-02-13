import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4U0epeUh0O1jouBaSXrzWrzky8pz-MiY",
  authDomain: "elysian-788ca.firebaseapp.com",
  projectId: "elysian-788ca",
  storageBucket: "elysian-788ca.firebasestorage.app",
  messagingSenderId: "508504993935",
  appId: "1:508504993935:web:9dfcd6f2139d9c287680fa",
  measurementId: "G-LM5V20QBZ4"
};

export default defineNuxtPlugin(() => {
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication
  const auth = getAuth(firebaseApp);

  // Provide Firebase and Auth services globally in the app
  return {
    provide: {
      firebaseApp,
      auth,
    },
  };
});
