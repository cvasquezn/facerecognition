import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';


const particlesOptions = {//for particles
  particles: {
    number: {
      value: 130,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
}

const initialState = {
  input:'',
  imageURL:'',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


class App extends Component {
  constructor(){
    super();
    this.state= initialState;
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  // }

  loadUser = (data) => {
    console.log("cargando usuario");
    this.setState ( { user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }  

  calculateFaceLocation = (data) => {
    console.log("respuesta");
    console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
        // bottom_row: 0.75696754
        // left_col: 0.20186703
        // right_col: 0.7957487
        // top_row: 0.31085533
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');

    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.right_col*height),
    }

  }//end calculateFaceLocation function

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box:box })

  }

  onInputChange = (event) => {
    //console.log(event.target.value); //permite obtener el valor del input donde esta el método

    this.setState({input: event.target.value})

  }//end onInputChange

  onButtonSubmit = () => {
    this.setState( {imageURL:this.state.input} );

        fetch('http://localhost:3000/imageurl' , {
                method:'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  input: this.state.input,
                })//end body
              })
        .then( response => response.json() )
        .then( (response)=>{ //if recieve response from clarifai, will update the entries of the user into database
            console.log('after grap response of clarifai');
            console.log(response);

            if(response){
              console.log("onButtonSubmit-respuesta desde clarifai")
              fetch('http://localhost:3000/image' , {
                method:'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: this.state.user.id,
                })//end body
              })
                .then( response => response.json() ) //this then its to handle the response from de server aferter to do request put. This its important para update entries in the browser in the rank component 
                .then( count => {
                    //this.setState( {user: { entries: count }}) //using this way after apply setState its going to empty all other attribute of de object user
                    console.log("numero de entries recibidas en onButtonSubmit");
                    console.log(count.entries);
                    this.setState( Object.assign(this.state.user, {entries: count.entries}));//using this way it's not going to empty other attribute it menas just update attribute assign
                    }
                  )//end last then
                .catch( (err)=>console.log(err) ); //always have ctach to handle error after a fetch

            }//end if 

            this.displayFaceBox(this.calculateFaceLocation(response)) 
          })
        .catch( (err)=>console.log(err) )
  //end call API-end models.predict and manipulate the response

  } // end onButtonSubmit

  onRouteChange = (route) => {

    if(route === 'signout'){
      this.setState(initialState);
    } else if(route === 'home'){
      this.setState({ isSignedIn: true })
    } 
    this.setState({ route: route });

  }// end onRouteChange

  render() {
    return (
      <div className="App">
        <Particles className = 'particles'
          params={particlesOptions}
        />
        <Navigation 
          isSignedIn={this.state.isSignedIn} 
          onRouteChange={this.onRouteChange}
        />
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank 
                name = {this.state.user.name}
                entries = {this.state.user.entries}
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition 
                box={this.state.box} 
                imageURL={this.state.imageURL} 
              />
          </div>
          : ( this.state.route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}//end class

export default App;
