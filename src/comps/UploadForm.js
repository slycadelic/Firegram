import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

// functional component used for uploading pics .. returns jsx
const UploadForm = () => {

    // create useState hooks to manage state of file and error.
    const [file, setFile] = useState(null);
    const types = ['image/png', 'image/jpeg'];
    const [error, setError] = useState(null);

    // select 1 (or 1st ) file and store as selected. check file type or if it is null (no file selected)
    // and updated file state using useState hook created above. If not correct type, update error state and 
    // set file to null.  
    const changeHandler = (e) => {

        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select image png or jpeg');
        }
    }

    // Every time input added - changeHandler function triggers and updates file and error states. Based on 
    // states of file and error, output div created, which contains error message if error is true (not null)
    // or filename if file has value. Progress bar also created using ProgressBar component if file has value.
    // Once progress is 100%, url is obtained from useStorage and Progress bar is removed as file is updated to 
    // null in ProgressBar component using setFile method. Hence it takes file and setFile as props. 
    return (
        <form>
            <label>
            <input type='file' onChange={changeHandler} />
            <span>+</span>
            </label>
            <div className='output'>
                {error && <div className='error'>{ error }</div> }
                { file && <div>{ file.name }</div> }
                { file && <ProgressBar file={file} setFile={setFile} /> }
            </div>
        </form>
    )
}

export default UploadForm;