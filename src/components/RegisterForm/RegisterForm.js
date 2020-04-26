import React from 'react';


// 1. RegistrationForm Component is a register form that
// redirects to main page when user registers

class RegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }


    // 1. User's entered email saved to the state
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    // 1. User's entered password is saved to state
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    // 1. User's entered name is saved to state
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then( user => {
                this.props.loadUser(user)
                user && this.props.onRouteChange('loggedIn')
            })
    }


    render() {
        return (
            <article className="br3 shadow-3 ba dark-gray b--black-10 mv3 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                            className="br3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name" 
                            onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="br3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
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
                            onChange={this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                        onClick={this.onSubmitSignIn}
                        className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register me!" />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}


export default RegisterForm;