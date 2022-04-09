import React from 'react';
import { motion } from 'framer-motion';

// Modal component - used to show selected images. Accepts selectedImg as a prop (destructed).
// Displays selected image when clicked on (from image grid). 
// Also accepts update function of selectedImg as a prop.
const Modal = ({ selectedImg, setSelectedImg }) => {

    // function to close modal when backdrop is clicked. Using onClick function on backdrop,
    // selectedImg is set to null using its update function, which causes the modal to close (from App).
    // Before updating selectedImg, it checks that click was on backdrop only and not on the img
    // of the model. This is done by checking (using if) if the target of the (click) event 
    // contains (using contains() method) the class backdrop, which only the backdrop does. 
    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null);
        }
    }

    // returns a div with a backdrop to fade out the website in background.
    // On top of background is the image which is selected. 
    // backdrop div has a onClick function called handleClick which is defined above. 
    // Add animation to modal using imported framer motion library
    // make div a motion.div and change opacity of backdrop animate using initial and (final) 
    // animate values. Also animate img by making it a motion.img and setting initial and 
    // (final) animate values. y:-100vh makes image start from -100vh offset.
    return ( 
        <motion.div className='backdrop' onClick={ handleClick }
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        >
            <motion.img src={selectedImg} alt='enlarged pic' 
                initial={{ y: '-100vh' }}
                animate={{ y: 0 }}
            />
        </motion.div>
     );
}
 
export default Modal;