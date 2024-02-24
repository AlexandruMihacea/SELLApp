import { collection, addDoc, getDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore"; 
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
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            userData.id = userDoc.id;
            res.send(userData);
        } else {
            res.send("Utilizatorul nu a fost găsit.");
        }
    },

    addUser: async (req,res) => {
        try{

            const {nume, prenume, email, locatie, telefon} = req.body;
            let condition = true;

            if(nume == ""){
                condition = false;
                res.send("Numele este obligatoriu!")
            }else if(prenume == ""){
                condition = false;
                res.send("Prenumele este obligatoriu!");
            }else if(email == ""){
                condition = false;
                res.send("Emailul este obligatoriu!");
            }else if(locatie == ""){
                condition = false;
                res.send("Locatia este obligatorie!");
            }else if(telefon == ""){
                condition = false;
                res.send("Locatia este obligatorie!");
            }

            if(condition){
                const downloadLink = await upload(req);
                const docRef = await addDoc(collection(firestoreDb,"users"),{
                    nume: nume,
                    prenume: prenume,
                    email: email,
                    locatie: locatie, 
                    telefon: telefon,
                    imagineProfilUrl: downloadLink
                })
                console.log("Document written with ID: ", docRef.id);
                res.send("Profil creat cu succes!")
            }
        }catch(err){
            console.error(err)
        }
    },

    updateUser: async(req,res)=> {
        const { userId ,nume, prenume, email, locatie, telefon } = req.body;
    
        const newDownloadLink = await upload(req);   

        try{
            const userRef = doc(firestoreDb, 'users', userId);
            const userDoc = await getDoc(userRef);
            const userData = userDoc.data();

            const updateData= {
                imagineProfilUrl: newDownloadLink || userData.imagineProfilUrl,
                nume: nume || userData.nume,
                prenume: prenume || userData.prenume,
                email: email || userData.email,
                telefon: telefon || userData.telefon,
                locatie: locatie || userData.locatie
            };

            await updateDoc(userRef, updateData);

            res.send({ message: 'Userul a fost updatat cu succes!' });


        }catch(err){
            console.error(err);
            res.status(500).send({ message: 'Eroare in updatarea datelor userlui!' });
        }
    },


    deleteUser: async (req,res) => {
        const {userId} = req.body;

        try{
            await deleteDoc(doc(firestoreDb, 'users', userId));
            res.send({message: "Userul a fost sters cu succes!"})

       }catch(err){
            console.error(err);   
            res.status(500).send({message: "Eroare in stergerea userului!"})
       }
    }


}


export {controller};