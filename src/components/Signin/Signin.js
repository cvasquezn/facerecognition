import React from "react";
import * as Config from '../../components/Config/Config'

class Signin extends React.Component {
// const Signin = ( { onRouteChange } ) => { // chang from const to components within state
  
  constructor(props){ //in orden to recieve parametros its necesary to put props in the constructor
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword:""
    }
  }

  onEmailChange = (event) =>{
     this.setState({ signInEmail: event.target.value });
  } //end onEmailChange

  onPasswordChange = (event) =>{

    this.setState({ signInPassword: event.target.value });

  }//end onPasswordChange

  onSubmitSignIn = () => {
    //console.log("submit");
    //console.log(this.state.signInEmail);
    // console.log(Config.URL_BACKEND);
    console.log(`${Config.URL_BACKEND}/signin`);
    // const user = {
    //   "id": 37,
    //   "name": "max",
    //   "email": "eve30@gmail.com",
    //   "entries": 0,
    //   "joined": "2019-01-29T20:35:46.000Z"
    //   }
    // this.props.loadUser(user)
    // this.props.onRouteChange('home');

    fetch(`${Config.URL_BACKEND}/signin` , {
      method:'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })//end body
    })//end fetch and then handle the response from server
      
      .then(response => response.json() )
      .catch(error => console.error('Error:', error))
      .then(user => {
        console.log("user obtenido");
        console.log(user);
        if(user.id){
          console.log("usuario valido-signin.js")
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })


      // .then(response => response.json() )
      // .then(user => {
      //   console.log("user obtenido");
      //   console.log(user);
      //   if(user.id){
      //     console.log("usuario valido-signin.js")
      //     this.props.loadUser(user)
      //     this.props.onRouteChange('home');
      //   }
      // })
  }//end onSubmitSignIn

  render(){
  //we recive props onRouteChange. 1 option to handles is to change from onClick={() => onRouteChange('home') to onClick={() => this.props.onRouteChange('home')
  //second option (the best) to handle props is const { onRouteChange } = this.props;
    const { onRouteChange } = this.props;
    return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="email-address"
                onChange={this.onEmailChange}
                />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                onChange={this.onPasswordChange}
                />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={this.onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange('register')}
              href="#0" className="f6 link dim black db pointer">
                Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );

  }//end render
} //end class


export default Signin
