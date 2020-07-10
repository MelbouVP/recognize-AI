import React from 'react';
import Tilt from 'react-tilt';
import brain from './7635298021548402149-128.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='align-left'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 75 }} style={{ height: 120, width: 150 }} >
                <div className="Tilt-inner">
                    <img src={brain} alt='robot-brain' height='80px'/>
                    <p className='logo-text'> RECOGNIZE AI</p>
                </div>
            </Tilt>
        </div>
    )
}


export default Logo;