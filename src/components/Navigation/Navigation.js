import React from 'react';
import Logo from './../Logo/Logo';

const Navigation = () => {
    return (
        <nav style={{display: 'flex', justifyContent: 'space-between', marginRight: '2rem', marginTop: '1rem', marginBottom: '2rem', height: '120px'}}>
            <Logo />
            <p className='f3 link dim white underline pa3 pointer' > Sign out </p>
        </nav>
    )
}

export default Navigation;