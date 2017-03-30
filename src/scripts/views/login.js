import React from 'react'
import Banner from './components/banner'
import ACTIONS from '../ACTIONS'

var Login = React.createClass({
	render: function() {
		return (
			<div className='login'>
				<h1>the To Do's</h1>
				<LoginForm />
				<RegisterForm />
			</div>
		)
	}
})

var LoginForm = React.createClass({
	_handleSubmit: function(evtObj){
		var formEl = evtObj.target
		ACTIONS.logUserIn(formEl.email.value, formEl.password.value)
	},
	render: function(){
		return (
			<div className='register-form'>
			<h2>Login</h2>
			<form onSubmit={this._handleSubmit}>
				<input className='loginInput' type='text' name='email' placeholder='enter your email' /> <br />
				<input className='loginInput' type='password' name='password' placeholder='enter your password' /> <br />
				<button className='loginButton' type='submit'>Submit</button>
			</form>
			</div>
		)
	}
})

var RegisterForm = React.createClass({
	_handleSubmit: function(evtObj){
		evtObj.preventDefault()
		var formEl = evtObj.target
		var userData = {
			name: formEl.yourName.value,
			email: formEl.email.value,
			password: formEl.password.value
		}
		ACTIONS.registerUser(userData)
		formEl.reset()
	},
	render: function(){
		return (
			<div className='registerForm'>
			<h2>Register</h2>
			<form onSubmit={this._handleSubmit}>
				<input className='loginInput' type='text' name='yourName' placeholder='enter your name' /><br />
				<input className='loginInput' type='text' name='email' placeholder='enter your email' /><br />
				<input className='loginInput' type='password' name='password' placeholder='enter your password' /> <br />
				<button className='loginButton' type='submit'>Submit</button>
			</form>
			</div>
		)
	}
})



export default Login