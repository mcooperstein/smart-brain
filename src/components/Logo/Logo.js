import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './logo-light.png';

const Logo = (props) => {
  return (
    <div style={{cursor: 'pointer'}} className='ma4 mt4 center' onClick={props.onBrainClick}>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 260, width: 200 }} >
       <div className="Tilt-inner pa3">
         <img style={{paddingTop: '40px', height: '150px', width: '120px'}} src={brain} alt='logo'/>
       </div>
      </Tilt>
    </div>
  )
}

export default Logo;
