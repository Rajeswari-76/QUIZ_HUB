import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy_api_key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy_domain",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://dummy-db.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy_project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy_bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "dummy_sender",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "dummy_app_id"
};


const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
