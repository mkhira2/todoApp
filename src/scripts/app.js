import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import User from './models/userModel.js'
import AllTasks from './views/allTasks'
import Complete from './views/complete'
import Login from './views/login'

const app = function() {
  var ToDoRouter = Backbone.Router.extend({
  	routes: {
      "login" : "handleLoginView",
  		"tasks/user/:id" : "handleToDoView",
  		"complete" : "handleCompletedView",
  		"*default" : "handleLoginView"
  	},
    handleLoginView: function() {
      ReactDOM.render(<Login />, document.querySelector('.container'))
    },
  	handleToDoView: function(id) {
  		ReactDOM.render(<AllTasks userID={id}/>, document.querySelector('.container'))
  	},
  	handleCompletedView: function() {
  		ReactDOM.render(<Complete />, document.querySelector('.container'))
  	},
  })

  new ToDoRouter()
  Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..