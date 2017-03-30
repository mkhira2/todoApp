import React from 'react'
import User from '../../models/userModel.js'
import ACTIONS from '../../ACTIONS'

var Banner = React.createClass({
	render: function() {
		return (
			<header>
				<div className='header'>
				</div>
				<div className='welcome'>
					{ACTIONS.loginName()}
				</div>
				<div className='nav'>
					<Nav tasks={this.props.tasks}/>
				</div>
			</header>
		)
	}
})

var Nav = React.createClass({
	render: function() {
		return (
			<nav>
				<a href={ACTIONS.checkForUser()}>undone</a>
				<a href={'#complete'}>done</a>
				<a onClick={ACTIONS.logout}>logout</a>
			</nav>
		)
	}
})

export default Banner