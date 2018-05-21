import React from 'react';
import './SignIn.css';

const SignIn = (props) => {
  return (
    <article id='sign-in-form' className="br2 ba dark-gray b--black-10 mv4 w-100 mw5 center shadow-2">
      <main className="pa3 black-80">
        <form>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" for="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" for="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
            </div>
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={() =>props.onRouteChange('home')}/>
          </div>
          <div className="lh-copy mt3">
            <p onClick={() =>props.onRouteChange('register')} className="pointer f6 link dim black db">Register</p>
          </div>
        </form>
      </main>
    </article>
  )
}

export default SignIn;
