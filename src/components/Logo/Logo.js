import React from 'react';
import Tilt from 'react-tilt';
import brain from './7635298021548402149-128.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='center'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 75 }} style={{ height: 180, width: 150 }} >
                <div className="Tilt-inner">
                    <img src={brain} alt='robot-brain'/>
                    <p className='logo-text'> RECOGNIZE AI</p>
                </div>
            </Tilt>
        </div>
    )
}


export default Logo;