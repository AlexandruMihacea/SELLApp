import { collection, addDoc, getDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from "firebase/firestore"; 
import { firestoreDb } from "../firebase.js";
import { upload } from "../Services/uploadPictures.js";

const controller = {
    getAllProducts: async (req, res) => {
        const produse = [];
        const querySnapshot = await getDocs(collection(firestoreDb, 'produse'));
        querySnapshot.forEach(doc => {
            produse.push(doc.data());
        });
        res.send(produse);
    },

    getProduct: async (req, res) => {
        const { productId } = req.body;
        const docRef = doc(firestoreDb, 'produse', productId);
        const docSnap = await getDoc(docRef); 

        if (docSnap.exists()) {
            res.send(docSnap.data());
        } else {
            res.status(404).send({ message: 'Produsul nu a fost gasit!' });
        }
    },

    addProduct: async (req, res) => {
        const { titlu, descriere, pret, categorie, userId } = req.body;
        try {
            let condition = true;

            if(titlu == ""){
                condition = false;
                res.send("Titlu este obligatoriu!")
            }else if(descriere == ""){
                condition = false;
                res.send("Descrierea este obligatorie!")
            }else if(pret == ""){
                condition = false;
                res.send("Pretul este obligatoriu!");
            }else if(categorie == ""){
                condition = false;
                res.send("Categoria este obligatorie!")
            }

            if(condition){
                let downloadLink = await upload(req);
                const docRef = await addDoc(collection(firestoreDb, 'produse'), {
                titlu,
                descriere,
                pret,
                categorie,
                downloadLink,
                userId  
            });
            res.send({ message: 'Product a fost adaugat cu succes!', productId: docRef.id });
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error in adaugarea produsului!' });
        }
    },

    updateProduct: async (req, res) => {
        const { productId ,titlu, descriere, pret, categorie } = req.body;
        console.log(productId);
        try {
            const newDownloadLink = await upload(req); 
            
            const produsRef = doc(firestoreDb, 'produse', productId);
            const produsDoc = await getDoc(produsRef)
            const produsData = produsDoc.data();

            const updateProdus = {
                titlu: titlu || produsData.titlu,
                descriere: descriere || produsData.descriere,
                pret: pret || produsData.pret,
                categorie: categorie || produsData.categorie,
                downloadLink: newDownloadLink || produsData.downloadLink
            }

            await updateDoc(produsRef, updateProdus);

            res.send({ message: 'Product a fost updatat cu succes!' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error in updatarea produsului!' });
        }
    },

    deleteProduct: async (req, res) => {
        const { productId } = req.body;

        try {
            await deleteDoc(doc(firestoreDb, 'produse', productId));
            res.send({ message: 'Product a fost sters cu succes!' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error in stergerea produsulu!' });
        }
    },

    getProductsByUser: async (req, res) => {
        const { userId } = req.body;
        try {
            const q = query(collection(firestoreDb, 'produse'), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push(doc.data());
            });
            res.send(products);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error in gasirea produselor!' });
        }
    }
};

export {controller};
