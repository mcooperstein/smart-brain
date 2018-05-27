import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Demographics from './components/FaceRecognition/Demographics';
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
      route: 'signin',
      isLoggedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      },
      age: [],
      gender: [],
      cultural: []
    }
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      },
      isLoggedIn: true
    })
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

  calculateAge = (data) => {
    const demographics = data.outputs[0].data.regions[0].data.face.age_appearance.concepts.map(face => {
      return face
    });
    return demographics;
  }

  calculateGender = (data) => {
    const demographics = data.outputs[0].data.regions[0].data.face.gender_appearance.concepts.map(face => {
      return face
    });
    return demographics;
  }

  calculateEthnicity = (data) => {
    const demographics = data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts.map(face => {
      return face
    });
    return demographics;
  }

  displayFaceBox = (boxes) => {
    console.log(boxes);
    this.setState({
      boxes: boxes
    })
  }

  displayAge = (demographics) => {
    // console.log(demographics);
    this.setState({
      age: demographics
    })
  }

  displayGender = (demographics) => {
    // console.log(demographics);
    this.setState({
      gender: demographics
    })
  }

  displayEthnicity = (demographics) => {
    // console.log(demographics);
    this.setState({
      cultural: demographics
    })
  }

  onButtonSubmit = async() => {
    await this.setState({imageURL: this.state.input})
    await app.models.predict(
      "c0c0ac362b03416da06ab3fa36fb58e3",
      this.state.input
    ).then(response => {
      // console.log(response);
      this.displayAge(this.calculateAge(response));
      this.displayGender(this.calculateGender(response));
      this.displayEthnicity(this.calculateEthnicity(response));
    }).catch(err => console.log(err));

    await app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    ).then(response => {
      // console.log(response);
      if(response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          // changes entries property without changing entire user object
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
      }
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
    this.setState({route: route}, () => {
      if(this.state.route !== 'home') {
        this.setState({
          isLoggedIn: false
        })
      }
    })
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



        { this.state.route === 'home' ?
            <article className="cf">
              <div className="fl w-100 tc">
                <Logo onBrainClick={this.onBrainClick}/>
                <Rank
                  user={this.state.user.name}
                  rank={'#1'}
                  entries={this.state.user.entries}
                  isLoggedIn={this.state.isLoggedIn}
                />
              </div>
            </article>
          :
          ( this.state.route === 'signin' ?
              <article className="cf">
                <div className="fl w-50 tc">
                  <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                </div>
                <div className="fl w-50 tc">
                  <Logo onBrainClick={this.onBrainClick}/>
                  <Rank
                    user={'Sign In to view your rank...'}
                    rank={'?'}
                    isLoggedIn={this.state.isLoggedIn}
                  />
                </div>
              </article> :
              <article className="cf">
                <div className="fl w-50 tc">
                  <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                </div>
                <div className="fl w-50 tc">
                  <Logo onBrainClick={this.onBrainClick}/>
                  <Rank
                    user={'Create a profile to start getting ranked...'}
                    rank={'?'}
                    isLoggedIn={this.state.isLoggedIn}
                  />
                </div>
              </article>
          )

        }
        <ImageLinkForm value={this.state.input} onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onBrainClick={this.onBrainClick}/>
        { this.state.imageURL === '' ? null : <Demographics boxes={this.state.boxes} age={this.state.age} gender={this.state.gender} cultural={this.state.cultural}/>}
        <FaceRecognition boxes={this.state.boxes} imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
