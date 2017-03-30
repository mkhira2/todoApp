import Backbone from 'backbone'
import {Tasks} from './models/tasksModel.js'
import User from './models/userModel.js'
import STORE from './STORE'

var ACTIONS = {
	addTask: function(taskData) {
		taskData.user_id = User.getCurrentUser().get('_id')
		var newTask = new Tasks(taskData)
		newTask.save()
			.then(
				function(response) {
					ACTIONS.fetchAllTasks(taskData.user_id)
				},
				function(error) {
					alert('problem adding task')
				}
			)
	},

	checkForUser: function(){
		if(User.getCurrentUser() === null){
			return '#login'
		}
		else if (User.getCurrentUser().get('name') === undefined) {
			return '#login'
		}
		return `#tasks/user/${User.getCurrentUser().get('_id')}`
	},

	deleteTask: function(models) {
		var userID = User.getCurrentUser().get('_id')
		models.destroy()
			.done(ACTIONS.fetchAllTasks(userID))
			.fail(function(error) {
					alert('problem deleting task')
					console.log(error)
				})
	},

	fetchAllTasks: function(inputID) {
		var tasksColl = STORE.get('tasksCollection')
		tasksColl.fetch({
			data: {
				user_id: inputID
			}
		})
			.then(function(){
				STORE.set({
					tasksCollection: tasksColl
				})
			})
	},

	loginName: function(){
		if(User.getCurrentUser() === null){
			return 'Welcome!'
		}
		else if (User.getCurrentUser().get('name') === undefined) {
			return 'Welcome!'
		}
		return `Welcome ${User.getCurrentUser().get('name')}!`
	},

	logout: function(){
		User.logout()
		.done(
			function(response){
				alert('logged out')
				location.hash = 'login'
			}
		)
		.fail(
			function(error){
				alert('problem logging out')
				console.log(error)
			}
		)
	},

	logUserIn: function(email, password) {
		User.login(email, password)
		.done(
			function(response){
				alert('logged in!')
				console.log(response)
				location.hash = ACTIONS.checkForUser()
			}
		)
		.fail(
			function(error){
				alert('problem logging in')
				console.log(error)
			}
		)
	},

	registerUser: function(userData) {
		User.register(userData)
		.done(
			function(res){
				alert(`new user ${res.email} registered!`)
				console.log(res)
				ACTIONS.logUserIn(userData.email, userData.password)
			}
		)
		.fail(
			function(error){
				alert('problem registering user')
				console.log(error)
			}
		)
	},

	toggleComplete: function(models) {
		var userID = User.getCurrentUser().get('_id')
		models.set({
			complete: models.get('complete') ? false : true
		})
		models.save()
			.done(function(resp) {
				ACTIONS.fetchAllTasks(userID)
			})
			.fail(function(error) {
				alert('problem changing status')
				console.log(error)
			})
	}
}

export default ACTIONS