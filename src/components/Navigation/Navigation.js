import React from 'react';
import '../../App.css';

const Navigation = () => {
  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p className='signout avenir f3 link dim black pa2 pointer bt bl bb b--washed-blue bw1 br2 br--left'>Sign Out</p>
    </nav>
  )
}

export default Navigation;
