import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
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
      boxes:[],
      route: 'signin'
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
    const images = ['http://images.indianexpress.com/2018/01/nicolas-cage-759.jpg', 'http://a.espncdn.com/photo/2011/0328/soc_g_usats_576.jpg', 'https://img.etimg.com/thumb/msid-63429151,width-643,imgsize-59945,resizemode-4/brad-pitt-and-jennifer-aniston-may-give-their-relationship-another-chance.jpg', 'https://i.ytimg.com/vi/qxRxHpaR--Y/hqdefault.jpg', 'https://gabworthy.com/wp-content/uploads/2015/06/Charlie-Sheen-actor-mug-shot-728x730.jpg', 'https://images-production.global.ssl.fastly.net/uploads/photos/file/254389/celeb-mugshots-shia-labouf.png?auto=compress&crop=top&fit=clip&h=500&q=55&w=698', 'http://www.rantlifestyle.com/wp-content/uploads/2014/04/2.-Lindsay-Lohan.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Grant_DeVolson_Wood_-_American_Gothic.jpg/1200px-Grant_DeVolson_Wood_-_American_Gothic.jpg', 'https://cdn.shopify.com/s/files/1/1307/5697/products/product-image-413387377_1024x1024.jpg?v=1511217017',
    'https://peniazesucas.sk/wp-content/uploads/2015/11/Donald-Trump.png'
  ];
    const image = images[Math.floor(Math.random()*images.length)];
    this.setState({
      input: image
    }, this.onButtonSubmit)
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        { this.state.route === 'home' ?
          <div>
            <Navigation onRouteChange={this.onRouteChange}/>
            <p className="heading washed-blue i">
              {'The Magic Brain will detect faces in images'}
            </p>
            <p className="f4 washed-blue i">
              {'(click the brain to see it in action)'}
            </p>
          </div>
           :
          <div>
            <p className="home-heading washed-blue i">
              {'The Magic Brain will detect faces in images'}
            </p>
            <p className="f4 washed-blue i">
              {'(click the brain to see it in action)'}
            </p>
          </div>
        }



        { this.state.route === 'signin' ?
          <article class="cf">
            <div class="fl w-50 tc">
              <SignIn onRouteChange={this.onRouteChange}/>
            </div>
            <div class="fl w-50 tc">
              <Logo onBrainClick={this.onBrainClick}/>
              <Rank />
            </div>
          </article>
          :
          <article class="cf">
            <div class="fl w-100 tc">
              <Logo onBrainClick={this.onBrainClick}/>
              <Rank />
            </div>
          </article>
        }
        <ImageLinkForm value={this.state.input} onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onBrainClick={this.onBrainClick}/>
        <FaceRecognition boxes={this.state.boxes} imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
