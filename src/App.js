import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js'
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import RegisterForm from './components/RegisterForm/RegisterForm'
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
      box: [],
      route: 'signIn',
      isLogged: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (user) => {
    this.setState ({
      user: {...user}
      // user: {
      //   id: user.id,
      //   name: user.name,
      //   email: user.email,
      //   entries: user.entries,
      //   joined: user.joined
      // }
    });
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

    fetch('http://localhost:3000/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: this.state.input
                })
              })
              .then(response => response.json())
              .then(CLARIFAIresponse => {
                if(CLARIFAIresponse) {
                  fetch('http://localhost:3000/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                  })
                  .then(response => response.json())
                  .then(count => {
                    this.setState(prevState => {
                      return {
                        user: {
                          ...prevState.user,
                          entries: count
                        }
                      }
                    })
                  })
                  .catch(console.log)
                }

                this.detectFaceLocation(CLARIFAIresponse)
              })
              .catch(err => console.log(err));
  }


  // 1. Method resets face box location(-s) and when
  //  Clarifai API has already processed image URL
  // and browser is being resized in order to prevent incorrect display of
  // face box location(-s) on the picture.
  updateDimensions = () => {
    if(this.state.box.length > 0){
      this.setState({ box: []});
    }
  };


  componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
  }


  // 1. Methods handles routing in Navigation, SignIn and RegisterForm
  // components. There are 3 routes - 'signIn', 'loggedIn', 'register'.
  // 2. 'loggedIn' route is enabled when user either signs in SignIn component
  // or registers in RegisterForm component, renders main page.
  // 2.1 Also sets state's isLogged to (true/false), which is
  // is passed to Navigation component that uses this value to 
  // condionally render, which naviagtion links to show.
  // 2.2 Once the user is logged in, returns the main page.
  // 3. 'signIn' route is the default value, that is enabled either when user visits the page
  // or through Navigation component's 'Sign out' or through RegisterForm compononet's 'Sign in' link.
  // 3.1  > 2.1.
  // 4. 'register' route is enabled when user visits registerForm component either 
  // through the SignIn component or Naviagtion component's 'Register' link.
  //

  onRouteChange = (routeValue) => {
    if(routeValue === 'loggedIn'){
      this.setState({isLogged: true, box: [], imageUrl: ''})
    } else if (routeValue === 'signIn'){
      this.setState({isLogged: false})
    } 
    // else if (routeValue === 'register'){
    //   this.setState({isLogged: false})
    // }

    this.setState({route: routeValue})
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

    // 1. Based on the state's current route, conditionally renders components
    // 1.1 Shows main page if current route is 'loggedIn'.
    // 1.2 If current route isn't 'isLogged', then
    // another ternary operator checks if the current route is 'signIn'.
    // 1.3 At this stage there are two possible options - either the current route
    // is 'signIn', which then will render the signIn comoponent.
    // or 'register' which then will render the RegisterForm component.
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isLogged={this.state.isLogged} />
        {this.state.route === 'loggedIn' ?
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition imageUrl={this.state.imageUrl} faceBoxLocation={this.state.box} />
          </div>
        :
          (
            this.state.route === 'signIn' ?
              <div>
                <h2>
                    Recognize-AI will detect faces in pictures that you have linked.
                </h2>
                <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              </div>
            :
              <RegisterForm onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;
