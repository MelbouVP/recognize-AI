import React from 'react';


// 1. SignIn Component is a sign in form, which either redirects 
// to register page (registrationForm component) if user wants to register
// or to main page if signed in



class SignIn extends React.Component {
    // SignIn component receives prop - onRouteChange method that routes to other components
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            CredentialError: false
        }
    }


    // 1. User's entered email saved to the state
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    // 1. User's entered password is saved to state
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }


    // 1. Once user submits sign in form, information is sent to the backend-server
    // for processing.
    // 2. If user entered correct user information, then loadUser method is called which
    // loads user's data into the App's state,
    // and onRouteChange method is called
    // with value of 'loggedIn' that routes to the main page.
    onSubmitSignIn = () => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if(regex.test(this.state.signInEmail) && this.state.signInPassword.length >= 8) {
            fetch('http://localhost:3000/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
                .then(response => response.json())
                .then( user => {
                    console.log(user)
                    if(user.id){
                        this.props.loadUser(user);
                        this.props.onRouteChange('loggedIn')
                    } else {
                        this.validateSignIn()
                    }
                });
        } else {
            this.validateSignIn()
        }
    }

    validateSignIn = () => {
        this.setState({
            CredentialError: true,
            signInEmail: '',
            signInPassword: ''
          }, () => {
            setTimeout( () => {
                this.setState({
                    CredentialError: false
                })
            }, 4000)
          });
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 shadow-3 ba dark-gray b--black-10 mv3 w-100 w-50-m w-25-l mw6 center">
                <main className="pa3 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt1">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="br3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            value={this.state.signInEmail}
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="br3 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            value={this.state.signInPassword}
                            onChange={this.onPasswordChange}
                            />
                        </div>
                        {this.state.CredentialError && <div className='white pa1'>Invalid email and/or password.</div>}
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmitSignIn} className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="pointer f6 link dim black db">Sign up</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}


export default SignIn;