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
    // console.log(event.target.value);
    this.setState({
      input: event.target.value
    })
  }

  calculateFaceLocation = (data) => {
    // console.log(data);
    const clarifaiFaces = data.outputs[0].data.regions.map(face => {
      return face.region_info.bounding_box
    });
    console.log(clarifaiFaces);
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // const image = document.getElementById('inputImage');
    // const width = Number(image.width);
    // const height = Number(image.height);
    // return {
    //   left: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   right: width - (clarifaiFace.right_col * width),
    //   bottomRow: height - (clarifaiFace.bottom_row * height)
    // }
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
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      this.displayFaceBox(this.calculateFaceLocation(response));
    }).catch(err => console.log(err));
  }

  onBrainClick = () => {
    this.setState({
      input: 'http://images.indianexpress.com/2018/01/nicolas-cage-759.jpg'
    }, this.onButtonSubmit)
    // setTimeout(this.onButtonSubmit, 100);
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
