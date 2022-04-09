import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';

// component to create a progress bar to show upload status, placed in Upload Form
// takes in file and setFile as props (destructured).
const ProgressBar = ({ file, setFile }) => {
    
    // Destruct url and progress from file (received as props) using useStorage hook.
    // That means when we get file from Upload form inside ProgressBar, we pass it to 
    // useStorage hook which takes it and returns url and progress
    const { url, progress } = useStorage(file);
    
    // runs when url is updated which happens once file is uploaded. 
    // Then updates file (using setFile) to none 
    useEffect(() => {
        if (url) {
            setFile(null);            
        }
    }, [url, setFile])

    // add animation to progress bar using framer motion (imported). 
    // make div a motion.div and add animation attribute
    return (
        <motion.div className='progress-bar' 
        initial={{ width: 0 }}
        animate={{ width: progress + '%' }}
        />
    )
}

export default ProgressBar;