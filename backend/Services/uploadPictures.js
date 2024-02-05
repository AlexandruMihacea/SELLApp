import {getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';

const storage = getStorage();

const upload =  async(req) => {
        if(!req.file || !req.file.originalname){
            return "";
        }else{
            const storageRef = ref(storage, `files/${req.file.originalname+ " "}`);

            const metadata = {
                contentType: req.file.mimetype,
            };

            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)

            const downloadLink = await getDownloadURL(snapshot.ref);

            console.log("Fisier uploadat cu succes!!")

            return downloadLink;
        }
        
}

export {upload};