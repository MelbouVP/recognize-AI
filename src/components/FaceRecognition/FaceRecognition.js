import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxDimensions }) =>
 {
     console.log(boxDimensions)
    return (
            <div className='center mb4 mt4'>
                <div className='relative'>
                    <img
                    id='inputImage'
                    src={imageUrl} 
                    alt=''
                    height="auto" 
                    width="300"
                    />
                    <div className='face-box' style={{
                        top: boxDimensions.topRow, 
                        right: boxDimensions.rightColumn, 
                        bottom: boxDimensions.bottomRow, 
                        left: boxDimensions.leftColumn
                        }}>
                    </div>
                </div>
            </div>
    )
}


export default FaceRecognition;