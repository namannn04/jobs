import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import {
  initializeFirestore,
  enableIndexedDbPersistence,
  connectFirestoreEmulator,
  CACHE_SIZE_UNLIMITED
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBU-aDg_ve8jDGMVE1g5i4-TO7DjL14hvc",
  authDomain: "moulliproject-46d77.firebaseapp.com",
  projectId: "moulliproject-46d77",
  storageBucket: "moulliproject-46d77.appspot.com",
  messagingSenderId: "748782343590",
  appId: "1:748782343590:web:e88358cac9264f1e9e2b67",
  measurementId: "G-H4T791CRRT",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// ✅ Use initializeFirestore instead of getFirestore
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
})

const auth = getAuth(app)

// Configure Firestore for better offline support
const configureFirestore = async () => {
  try {
    await enableIndexedDbPersistence(db)
    console.log("Firestore persistence enabled with unlimited cache size")
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.")
    } else if (err.code === 'unimplemented') {
      console.warn("The current browser does not support all of the features required to enable persistence")
    } else {
      console.error("Error enabling Firestore persistence:", err)
    }
  }
}

if (typeof window !== 'undefined') {
  configureFirestore()
}

// Emulators setup
const useEmulators = false

if (useEmulators) {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
  console.log('Using Firebase emulators for local development')
}

export { app, auth, db }
