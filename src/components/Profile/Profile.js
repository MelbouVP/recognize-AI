import React from 'react';
import './Profile.css';


const Profile = ({deleteProfile, profileDeleted, onRouteChange, user}) => {
        const { name, email, joined } = user;
        console.log(profileDeleted)
        return (
            <article className="br3 shadow-3 ba dark-gray b--black-10 mv3 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <div className="measure">
                            { !profileDeleted ?
                                <div>
                                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                        <legend className="tl f3 fw6 ph0 mh0">
                                            <span style={{fontSize: '32px', cursor: 'pointer', padding: '5px'}} onClick={() => onRouteChange('loggedIn')} > ‹ </span>
                                            Profile Information
                                        </legend>
                                        <div className="tl mt3">
                                            <label className="fw6 lh-copy f5" htmlFor="email-address">Name: </label>
                                            {name}
                                        </div>
                                        <div className="tl mv3">
                                            <label className="fw6 lh-copy f5" htmlFor="password">Email: </label>
                                            {email}
                                        </div>

                                        <div className="tl mt3">
                                            <label className="fw6 lh-copy f5" htmlFor="email-address">Joined: </label>
                                            {joined}
                                        </div>
                                        </fieldset>
                                        
                                        <input type='checkbox' id='click' style={{display: 'none'}} />
                                        <label className='button' htmlFor='click' >
                                            <p className='f4 fw8 button-theme link'> Delete profile </p>
                                        </label>
                                        
                                        <div className='modal' >
                                            <div className='modal__content' id='deleteprofile'>
                                                <h3>Delete this profile?</h3>
                                                <label htmlFor='click'>
                                                    <p onClick={deleteProfile} className='link deleteBtn' > Yes </p>
                                                </label>
                                                <label htmlFor='click' className='button' >
                                                    <p className='button-theme link deleteBtn' > No </p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='overlay' ></div>
                                </div>
                            :
                                <h2>Your profile has been deleted.</h2>
                            }
                    </div>
                </main>
            </article>
        )
    }

export default Profile;