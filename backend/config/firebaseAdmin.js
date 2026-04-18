const admin = require("firebase-admin");

// Initialize Firebase Admin with a placeholder. The user must provide their service account key.
// const serviceAccount = require("./serviceAccountKey.json");

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DB_URL
//   });
//   console.log("Firebase Admin Initialized");
// } catch (error) {
//   console.error("Firebase Admin Error:", error);
// }

module.exports = admin;
