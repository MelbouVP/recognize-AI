import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js'
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';


// load Clarifai API
const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_KEY
 });


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: []
    }
  }

  // Method is called for handling the response of Clarifai API
  detectFaceLocation = (data) => {
    const detectedFace = data.outputs[0].data.regions.map(el => el.region_info.bounding_box);

    this.setState({
      box: detectedFace
    })
  }

  // assignFaceLocation = (detectedFace) => {
  //   this.setState({
  //     box: detectedFace
  //   })
  // }


  // receive URL and store it in the state
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }


  // URL submission
  onSubmit = () => {

    // 1. store received input as imageURL in state, which is passed to FaceRecognition component
    // 2. reset box value which stores detected faces in order to
    // avoid showing face location boxes of previous URL picture inside of newly uploaded one
    this.setState({
      imageUrl: this.state.input, 
      box: [], 
    });

    // 1. call Clarifai API by passing callbacks - first callback 
    // receives Clarifai model ID (Clarfiai.FACE_DETECT_MODEL)
    // second callback, in this case,  receives the image URL
    // which comes from this.state.input property since passing this.state.imageURL 
    // would result in BAD REQUEST as setState() method is asynchrynous 
    // (Clarifai will run before setState assigned imageURL)

    // 2. Pass the response of clarifai API to the detectFaceLocation() method
    // to form an array of detected faces
    // which is stored in the state

    app.models
              .predict("a403429f2ddf4b49b307e318f00e528b", 
              this.state.input)
              .then(response => this.detectFaceLocation(response))
              .catch(err => console.log(err));
  }

  render() {

  // Particles parameters that control the look of particles
  // Particles are used for page background styling
    const particleOptions = {
      particles: {
        number: {
          value: 40,
          density: {
            enable: true,
            value_area: 200
          }
        }
      }
    }


    return (
      <div className="App">
        <Particles className='particles' params={particleOptions}/>
        <Navigation/>
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} faceBoxLocation={this.state.box} />
      </div>
    );
  }
}

export default App;
