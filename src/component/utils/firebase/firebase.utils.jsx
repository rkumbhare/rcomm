
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} 
from "firebase/auth";
import {doc, getDoc, setDoc, getFirestore, collection, writeBatch, query, getDocs} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0WQIpBCtEHGGAOepSO1vNTQyV3QmrXh4",
  authDomain: "ecom-db-d25ee.firebaseapp.com",
  projectId: "ecom-db-d25ee",
  storageBucket: "ecom-db-d25ee.appspot.com",
  messagingSenderId: "508019118696",
  appId: "1:508019118696:web:d7a30f1e6697f22a98a1dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

// initialize firestore db
export const db = getFirestore();


export const signInWithGooglePopup = async () => {
    signInWithPopup(auth, provider)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}

export const signInWithGoogleRedirect = async () => {
    signInWithRedirect(auth, provider)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
}


export const createUserDocFromAuth = async (userAuth) => {
   const userDocRef = await doc(db, 'users', userAuth.uid);
   const userSnapshot = await getDoc(userDocRef);
   if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdOn = new Date();
        await setDoc(userDocRef, {displayName, email, createdOn});
   }else {
        console.log("user already exist with the email " + userAuth.email);
   }
   return userDocRef;
}

export const createAuthUserWithEmailPassword = async (email, password) => {
    if(!email || !password) return;
   const response =  await createUserWithEmailAndPassword(auth, email, password);
   return response.user;
}


export const signInWithEmailPassword = async (email, password) => {
    if(!email || !password) return;
   const response =  await signInWithEmailAndPassword(auth, email, password);
   return response;
}

export const signOutUser = async () => await signOut(auth);

/**
 * whenever the user auth state changed, will listen thru the listener 
 * auth will change when user signin signup or signout ->
 * the auth object state will get changed
 */
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);


export const createCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = await collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        console.log(object);
        const {title, items} = object;
        const docRef = doc(collectionRef, title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log("Created Collection & its documents successfully");
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = await collection(db, 'categories');
    const querySnapshot = await getDocs(query(collectionRef));
    const documents = querySnapshot.docs;
    // const categoryMap = {};
    // docs.forEach((document) => {
    //     console.log(document.data());
    //     categoryMap[document.data().title] = document.data().items;
    // });
    const categoryMap = documents.reduce((map, document) => {
        const {title, items} = document.data();
        map[title.toLowerCase()] = items;
        return map;
    }, {});
    return categoryMap;
}