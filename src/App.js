import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'a0535ef45dfd4d75b2498a2f651fafca'
})

const particlesOptions = {
  particles: {
    line_linked: {
			shadow: {
				enable: true,
				color: "#3CA9D1",
				blur: 5
			}
		},
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
}

class App extends Component {
  constructor(){
    super()

    this.state = {
      input: '',
      imageURL: '',
      boxes:[]
    }
  }
  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(face => {
      return face.region_info.bounding_box
    });
    return clarifaiFaces;
  }

  displayFaceBox = (boxes) => {
    console.log(boxes);
    this.setState({
      boxes: boxes
    })
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    ).then(response => {
      this.displayFaceBox(this.calculateFaceLocation(response));
    }).catch(err => console.log(err));
  }

  onBrainClick = () => {
    this.setState({
      input: 'http://images.indianexpress.com/2018/01/nicolas-cage-759.jpg'
    }, this.onButtonSubmit)
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation />
        <p className="heading washed-blue i">
          {'This Magic Brain will detect faces in images'}
        </p>
        <p className="f4 washed-blue i">
          {'(click the brain to see it in action)'}
        </p>
        <Logo onBrainClick={this.onBrainClick}/>
        <Rank />
        <ImageLinkForm value={this.state.input} onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onBrainClick={this.onBrainClick}/>
        <FaceRecognition boxes={this.state.boxes} imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
