import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    console.log(this.state);
    this.props.onRouteChange('home')
  }

  render(){
    const {onRouteChange} = this.props;
    return (
      <article id='sign-in-form' className="br2 ba dark-gray b--black-10 mv4 w-100 mw5 center shadow-2">
        <main className="pa3 black-80">
          <div>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={() => this.onSubmitSignIn()}/>
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} className="pointer f6 link dim black db">Register</p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default SignIn;
