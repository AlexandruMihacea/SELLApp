import { collection, addDoc, getDoc, getDocs, query, where } from "firebase/firestore"; 
import { firestoreDb } from "../firebase.js";
import { upload } from "../Services/uploadPictures.js";

const controller = {
    getAllUsers: async (req,res) => {
        const users = [];
        const querySnapshot = await getDocs(collection(firestoreDb, 'users'));
        querySnapshot.forEach(element => {
            users.push(element.data());
        });
        res.send(users);
    },

    getUser: async (req,res) => {
        const email = req.body.email; 
        const usersRef = collection(firestoreDb, 'users');
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            res.send(userDoc);
        } else {
            res.send("Utilizatorul nu a fost găsit.");
        }
    },

    addUser: async (req,res) => {
        try{

            const {nume, prenume, email} = req.body;
            let condition = true;

            if(nume == ""){
                condition = false;
                res.send("Numele este obligatoriu!")
            }else if(prenume == ""){
                condition = false;
                res.send("Prenumele este obligatoriu!");
            }else if(email == ""){
                condition = false;
                res.send("emailul este obligatoriu!");
            }

            if(condition){
                const downloadLink = await upload(req);
                const docRef = await addDoc(collection(firestoreDb,"users"),{
                    nume: nume,
                    prenume: prenume,
                    email: email, 
                    imagineProfilUrl: downloadLink
                })
                console.log("Document written with ID: ", docRef.id);
                res.send("Profil creat cu succes!")
            }
        }catch(err){
            console.error(err)
        }
    }
}


export {controller};