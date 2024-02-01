import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUU0BGSMp6FtKhI2lcPrfBc2bshZvQOV0",
    authDomain: "sellapp-8c660.firebaseapp.com",
    projectId: "sellapp-8c660",
    storageBucket: "sellapp-8c660.appspot.com",
    messagingSenderId: "828753889284",
    appId: "1:828753889284:web:2b4e83335cb7f29abf0d51"
  };
  
  const app = initializeApp(firebaseConfig);

  const firestoreDb = getFirestore(app);

export { firestoreDb }; 


