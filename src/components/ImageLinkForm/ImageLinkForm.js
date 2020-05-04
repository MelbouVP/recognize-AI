import React from 'react';
import './ImageLinkForm.css'; 

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p className='f3'>
                Recognize-AI will detect faces in pictures that you have linked.
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input 
                    className='f4 pa2 w-70 center' type='text' 
                    placeholder='URL' 
                    onChange={onInputChange} 
                    />
                    <button 
                    className='w-25 grow f4 link ph3 pv2 dib white b--light-purple bg-light-purple' 
                    onClick={onSubmit}
                    > Detect </button>
                </div>
            </div>
        </div>
    )
}


export default ImageLinkForm;