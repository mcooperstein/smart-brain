import React from 'react';
import './Register.css';

class Register extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onRegisterSubmit = () => {
    fetch('https://agile-fortress-66285.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id){
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
  }

  render(){
    const { onRouteChange } = this.props;
    return (
      <article id='sign-in-form' className="br2 ba dark-gray b--black-10 mv4 w-100 mw5 center shadow-2">
        <main className="pa3 black-80">
          <div>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                <input className="pa2 adjusted-input input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name1"  id="name1" onChange={this.onNameChange}/>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 adjusted-input input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 adjusted-input input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onRegisterSubmit}/>
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('signin')} className="pointer f6 link dim black db">Already a member? Sign In</p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Register;
