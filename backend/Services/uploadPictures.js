import {getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';

const storage = getStorage();

const upload =  async(req) => {
    const storageRef = ref(storage, `files/${req.file.originalname+ " "}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)

        const downloadLink = await getDownloadURL(snapshot.ref);

        console.log("Fle succes upload")

        return downloadLink;
}

export {upload};