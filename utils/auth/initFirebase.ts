import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);

    // if (process.env.NODE_ENV === "development") {
    //   // SET LOG LEVEL : 'debug' || 'error' || 'silent'
    //   firebase.firestore.setLogLevel("silent");
    //   firebase.firestore().settings({
    //     host: "localhost:8080",
    //     ssl: false,
    //   });
    // }
  }
}
