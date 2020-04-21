import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js'
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_KEY
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }



  calculateFaceLocation = (data) => {
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImage = document.getElementById('inputImage');
    const imageWidth = Number(inputImage.width);
    const imageHeight = Number(inputImage.height);
    return {
      topRow: faceBox.top_row * imageHeight,
      rightColumn: imageWidth - (faceBox.right_col * imageWidth),
      bottomRow: imageHeight - (faceBox.bottom_row * imageHeight),
      leftColumn: faceBox.left_col * imageWidth
    }
  }

  detectFace = (boxDimensions) => {
    this.setState({
      box: boxDimensions
    })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
  
  
  this.setState({
    imageUrl: this.state.input, 
    box: {} 
  });

  app.models
            .predict("a403429f2ddf4b49b307e318f00e528b", 
            this.state.input)
            .then(response => this.detectFace(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
  
  
  }


  render() {
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
        <FaceRecognition imageUrl={this.state.imageUrl} boxDimensions={this.state.box} />
      </div>
    );
  }
}

export default App;
