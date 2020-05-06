import React from 'react';


// 1. RegistrationForm Component is a register form that
// redirects to main page when user registers

class RegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            validateRegistration: false,
            validationErrorMsg: ''
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

    onRegisterSubmit = () => {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if(this.state.name.length >= 4 && 
            this.state.password.length >= 8 &&
            regex.test(this.state.email)) {

            console.log('Registered')
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
                    if(user.id){
                        this.props.loadUser(user)
                        user && this.props.onRouteChange('loggedIn')
                    } else {
                        this.validateRegistration('Invalid email adress.')
                    }
                })
        } else if(this.state.name.length < 4) {
           this.validateRegistration('Name must be atleast 4 characters long.')
        } else if(!regex.test(this.state.email)){
            this.validateRegistration('Please use valid email format.')
        } else if(this.state.password.length < 8){
            this.validateRegistration('Password must be atleast 8 characters long.')
        }
    }
    
    validateRegistration = (ErrorMsg) => {
        this.setState({
            validateRegistration: true,
            name: '',
            email: '',
            password: '',
            validationErrorMsg: ErrorMsg
          }, () => {
            setTimeout( () => {
                this.setState({
                    validateRegistration: false
                })
            }, 4000)
          });
    }

    render() {
        return (
            <article className="br3 shadow-3 ba dark-gray b--black-10 w-100 w-50-m w-25-l mw6 center">
                <main className="pa3 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="w5 ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt2">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name*</label>
                            <input 
                            className="br3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            value={this.state.name} 
                            required
                            onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email*</label>
                            <input 
                            className="br3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address" 
                            value={this.state.email}  
                            id="email-address"
                            required
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password*</label>
                            <input 
                            className="br3 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            value={this.state.password} 
                            id="password"
                            required
                            onChange={this.onPasswordChange}
                            />
                        </div>
                        <div>
                        {this.state.validateRegistration && <p className='white mb2 tc'>{this.state.validationErrorMsg}</p>}
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                        onClick={this.onRegisterSubmit}
                        className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register me!" />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}


export default RegisterForm;