import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onSubmit = () => {
    console.log('click');
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
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
