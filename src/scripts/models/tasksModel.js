import Backbone from 'backbone'

export var Tasks = Backbone.Model.extend({
	urlRoot: '/api/tasks',
	idAttribute: '_id'
})

export var TasksCollection = Backbone.Collection.extend({
	model: Tasks,
	url: '/api/tasks'
})

