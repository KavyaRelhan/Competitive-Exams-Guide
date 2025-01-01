import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAx8l5qjdxiRA3Z3QRxqONtglv0jv5TDNk",
    authDomain: "competitive-exams-info.firebaseapp.com",
    projectId: "competitive-exams-info",
    storageBucket: "competitive-exams-info.firebasestorage.app",
    messagingSenderId: "127081817095",
    appId: "1:127081817095:web:cc7b1477aee5eeb1a736a2"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = getMessaging(firebaseApp);

export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "BJi22BjjTUfvm52WaW1qyiVUI_dYGkE-PZbVtj7-y2jstlO8skMG9ldWCwSQt2ETGbY2G65wEzJvJuid-bNk5WM" });
    if (token) {
      console.log("User FCM Token:", token);
      return token;
    } else {
      console.error("No registration token available. Request permission to generate one.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
