import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';

// Component to show images in a grid. uses access to firestore db using useFirestore
// custom hook which takes the name of the collection we want to listen to. Returns
// docs object which contains imd data (id, url, createdAt) of each image in order. 
// Takes update function of selectedImg as a prop (destructured) as clicking on any image in 
// the grid should update the value of selectedImg in App (root) component. 
const ImageGrid = ({ setSelectedImg }) => {
    const { docs } = useFirestore('images');

    // Return a div with grid style (in css file). Inside the div, check if docs exist
    // and cycle through them. For each image, create a div with key as id from doc.
    // onClick function attached to this div, which sets the selectedImg value to url from doc.
    // Inside each image-wrap div, an img is placed with source as url from doc. 
    return (
        <div className='img-grid'>
            {docs && docs.map(doc => (
                // animation added to images using framer motion 
                // install first using npm install framer-hyphen motion
                // add motion. before div opening/closing tags and then add animation attributes.
                // using whileHover attribute, make image opacity from 0.8 (in css file) to 1.
                // using layout, make adding new image change layout with animation.
                // also make images animate using initial and animate attributes with respective styles.
                // use transition to control 
                <motion.div className='img-wrap' key={doc.id} 
                layout
                whileHover={{ opacity: 1 }}s
                onClick={() => setSelectedImg(doc.url)}
                >
                    <motion.img src={doc.url} alt='uploaded pic' 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    />
                </motion.div>
            ))}
        </div>
    )
}

export default ImageGrid;