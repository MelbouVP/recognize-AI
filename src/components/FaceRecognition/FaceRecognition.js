import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faceBoxLocation }) => {


    // 1. Map through the detected face location/s
    // and calculate the box dimensions of the located face/s.
    // 1.1. Uses coordinates provided by Clarifai API together with 
    // image's width and height to calculate the location box(-es) of face(-s)


    // 2. Store constants inside map fucntion, because having them in global scope
    // crashes component since constants try to assign values to image element that hasn't
    // been submited yet.

    // 4. return an array of dimension(-s) for face box.

    const faceBoxDimensions = faceBoxLocation.map(el => {
        const inputImage = document.getElementById('inputImage');
        const imageWidth = Number(inputImage.width);
        const imageHeight = Number(inputImage.height);

        return {
                top: el.top_row * imageHeight,
                right: imageWidth - (el.right_col * imageWidth),
                bottom: imageHeight - (el.bottom_row * imageHeight),
                left: el.left_col * imageWidth
            }
    });

    //5. Map through face box dimension(-s) and assign them to a div styling,\
    // therefore displaying detected faces in the image

    const faceList = faceBoxDimensions.map(dimensions => {
        return (
            <div className='face-box' style={dimensions}></div>
        )
    })

        return (
            <div className='center mb4 mt4'>
                <div className='relative'>
                    <img
                    id='inputImage'
                    src={imageUrl} 
                    alt=''
                    height="auto" 
                    width="500"
                    />
                    {faceList}
                </div>
            </div>
        )
}


export default FaceRecognition;