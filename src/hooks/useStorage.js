import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// custom hook used to communicate with the storage service (and firestore db) of firebase. 
// Import references to the services 
// useStorage takes file as input that we are trying to upload
// It handles the file uploads. returns useful values about upload: progress, url and any error from upload.
const useStorage = (file) => {
    
    // create useState hooks to manage state of progress-bar, upload error and image url (returned from 
    // storage after upload completes)
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    // useEffect takes in a function as 1st argument and dependency as 2nd argument. 
    // function it takes is used to upload file and update states created above.
    // dependency is file - which is the file we want to upload. Therefore useEffect runs every time we upload
    // file using useStorage (this component).
    useEffect(() => {
        
        // reference to storage where file should be stored in firebase and its name. 
        const storageRef = ref(projectStorage, file.name);
        // creates a task using an imported firestore service. connects to the uploaded file by its storage
        // reference and file object. 
        const uploadTask = uploadBytesResumable(storageRef, file);
        // reference to the collection in the database where the data (img url and id) is to be stored. 
        // collection with name images is created first time and used subsequent times. 
        const collectionRef = collection(projectFirestore, 'images');

        // uploadTask.on() : listen for events on the task --> runs multiple times while upload is in progress.
        // 3 callback functions (optional) available.
        // 1st takes snap of progress and uses it to check bytes transferred (calculate % and update progress).
        // 2nd takes any error on upload and updates error object.
        // 3rd waits for upload to complete - then gets url using imported getDownloadURL method of firebase
        // also gets timestamp from server using serverTimestamp method (imported from firestore/firebase)
        // adds url and timestamp to db using reference created above and addDoc method of firestore. 
        // also updates url object using setUrl method.
        uploadTask.on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            // async before the function allows us to use await, which ensures that it will wait
            // at that point to fetch the URL, which it will get once download completes. 
            // But while it waits, it will not stop other processes (progress bar, snap) from running 
            // again and again.  
            const url = await getDownloadURL(storageRef, file); 
            const createdAt = serverTimestamp();
            addDoc(collectionRef, { url, createdAt });
            setUrl(url);
        })
    }, [file]);

    // return progress, url, and error from upload method.
    return { progress, url, error }
}
export default useStorage;