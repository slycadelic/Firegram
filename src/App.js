import React, { useState } from 'react';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';

// the main 'root' component where all other components are placed
function App() {
  
  // useState hook used to manage state of selected image for showing in modal component. 
  // Initial value null as no image selected initially. 
  // selected image value is updated from image grid and so its update function
  // is passed to the ImageGrid component as a prop. 
  const [selectedImg, setSelectedImg] = useState(null);

  // Three main components added. A title, An uploadForm to upload images. And ImageGrid
  // to show images. Also has modal component which is created when a image is selected. 
  // Modal component only rendered if selectedImg is available. 
  return (
    <div className="App">
      <Title/>
      <UploadForm />
      <ImageGrid setSelectedImg={ setSelectedImg }/>
      { selectedImg && <Modal selectedImg={ selectedImg } setSelectedImg={ setSelectedImg }/> }
    </div>
  );
}
// Export to index.js 
export default App;