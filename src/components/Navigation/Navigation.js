import React from 'react';
import Logo from './../Logo/Logo';

const Navigation = ( { onRouteChange, isLogged }) => {
    const navStyle = {
        display: 'flex', 
        justifyContent: 'space-between', 
        marginRight: '2rem', 
        marginTop: '1rem', 
        marginBottom: '2rem', 
        height: '120px'
    }

const LoggedStyle = {
    display: 'flex',
    flexDirection: 'row'
}


    // 1. Based on the state's isLogged value, conditionally renders
    // the available links in navigation bar.
    return (
        <nav style={navStyle}>
            <Logo />
            { isLogged === true ?
                <div style={LoggedStyle}>
                    <p 
                    onClick={() => onRouteChange('signIn')}
                    className='f3 link dim white underline pa3 pointer' 
                    > Sign out </p>
                </div>
            :
                <div style={LoggedStyle}>
                    <p 
                    onClick={() => onRouteChange('signIn')}
                    className='f3 link dim white underline pa3 pointer' 
                    > Sign in </p>
                    <p 
                    onClick={() => onRouteChange('register')}
                    className='f3 link dim white underline pa3 pointer' 
                    > Register </p>
                </div>
            }   
        </nav>
    )
}

export default Navigation;