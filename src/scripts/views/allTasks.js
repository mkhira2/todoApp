import React from 'react'
import Backbone from 'backbone'
import Banner from './components/banner'
import STORE from '../STORE'
import ACTIONS from '../ACTIONS'

var AllTasks = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchAllTasks(this.props.userID)
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
	handleSubmit: function(evtObj) {
		evtObj.preventDefault()
		var formInput = evtObj.target
		var taskData = {
			task: formInput.newTask.value,
		}
		ACTIONS.addTask(taskData)

		formInput.reset()
	},
	render: function() {
		return (
			<div className='allTasks'>
				<h1>the To Do's</h1>
				<Banner tasks={this.state.tasksCollection}/>
				<div className='contentWrapper'>
					<div className='formWrapper'>
						<form onSubmit={this.handleSubmit} className='todoForm'>
						  <input className='textInput' name='newTask' type="text" placeholder="add a new task"/>
						  <input className='button' name='submit' type="submit" value="submit" />
						  <h3 className='title'>Incomplete Tasks</h3>
						</form>
					</div>
					<TaskList tasks={this.state.tasksCollection}/>
				</div>
			</div>
		)
	}
})

var TaskList = React.createClass({
	makeSingleTasks: function(model) {
		if (model.get('complete') === false) {
			return (
				<SingleTask taskModel={model} key={model.cid} />
			)
		}
	},
	render: function() {
		return (
			<div className='taskList'>
				{this.props.tasks.map(this.makeSingleTasks)}
			</div>
		)
	}
})

var SingleTask = React.createClass({
	handleToggle: function() {
		ACTIONS.toggleComplete(this.props.taskModel)
	},
	render: function() {

		return (
			<div className="singleTask" >
				<div className='taskDiv'>
					<p>{this.props.taskModel.get('task')}</p>
				</div>
				<div className='buttonDiv'>
					<button className='close' onClick={this.handleToggle}>done</button>
				</div>	
			</div>
		)
	}
})

export default AllTasks