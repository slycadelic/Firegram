import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

// Set up a connection between our application and the firestore db. To actively listen for documents to be 
// added to the db. Retrieve the documents and cycle through them in a component and output each one of them
// to be shown in ImageGrid using the url stored in this db. Can also order them by date uploaded/created 
// using the createdAt field. 
// This is a custom hook to do the above.
const useFirestore = (collection1) => {

    // manage state of docs using useState hook.  
    const [docs, setDocs] = useState([]);
    
    // db communication inside a useEffect hook to run every time there is a change
    // to the collection (dependency). 
    // Connection made using collection method which creates a reference to the 
    // collection in the db. collection is the input argument of this useFirestore
    // hook. The reference is updated to order the images by date of creation. Done
    // using query and orderby methods (of firestore) on the collection reference.
    // Order by using desc property ensures newest first.  
    useEffect(() => {

        const q = collection(projectFirestore, collection1);
        const docRef = query(q, orderBy("createdAt", 'desc'));
        // onSnapshot method: fires a callback function every time a collection 
        // changes. also fires once initially. 
        // the callback function takes in a snapshot object which represents a 
        // snapshot of the database at that moment. Therefore we are listening 
        // to real-time data updates. 
        // Inside the function, we create an array of document. then cycle through 
        // the documents currently in the database at that time from snap, and add
        // their data to the document array, additionally including their id. 
        // Finally, update the docs state with the document array using setDocs method.
        const unsub = onSnapshot(docRef, (snap) => {
            let documents = [];
            snap.forEach(doc1 => {
                documents.push({...doc1.data(), id: doc1.id});
            });
            setDocs(documents);
        });
        
        // Finally unscubscribre to the real-time updates using the unsub function 
        // which is created using the onSnapshot method.
        return () => unsub();

    }, [collection1])

    // Return docs
    return { docs };

}

export default useFirestore;