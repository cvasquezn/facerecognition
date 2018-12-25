import React from 'react'
import Tilt from 'react-tilt'
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
  return (
    <div className = " ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner">
          <img style={{paddingTop: '40px'}}  alt='logo' src = {brain}/>
        </div>
      </Tilt>

    </div>
  );
}//end Logo

export default Logo
