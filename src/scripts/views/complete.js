import React from 'react'
import Backbone from 'backbone'
import Banner from './components/banner'
import STORE from '../STORE'
import ACTIONS from '../ACTIONS'

var Complete = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchAllTasks()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	componentWillUnmount: function() {
		STORE.off()
	},
	getInitialState: function() {
		return STORE.data
	},
	render: function() {
		return (
			<div className='complete'>
				<h1>the To Do's</h1>
				<Banner />
				<div className='contentWrapper'>
					<div className='formWrapper'>
						<h3 className='title'>Completed Tasks</h3>
					</div>
					<CompletedList completedTasks={this.state.tasksCollection}/>
				</div>
			</div>
		)
	}
})

var CompletedList = React.createClass({
	makeCompletedTasks: function(model) {
		if (model.get('complete') === true) {
			return (
				<SingleCompletedTask taskModel={model} key={model.cid} />
			)
		}
	},
	render: function() {
		return (
			<div className='taskList'>
				{this.props.completedTasks.map(this.makeCompletedTasks)}
			</div>
		)
	}
})

var SingleCompletedTask = React.createClass({
	handleDelete: function() {
		ACTIONS.deleteTask(this.props.taskModel)
	},
	render: function() {
		return (
			<div className="singleTask">
				<div className='taskDiv'>
					<p>{this.props.taskModel.get('task')}</p>
				</div>
				<div className='buttonDiv'>
					<button className='close' onClick={this.handleDelete}>delete</button>
				</div>
			</div>
		)
	}
})

export default Complete