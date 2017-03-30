import Backbone from 'backbone'
import {TasksCollection} from './models/tasksModel'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		tasksCollection: new TasksCollection()
	},

	get: function(prop) {
		return this.data[prop]
	},

	set: function(attributes) {
		this.data = Object.assign(this.data, attributes)
		this.trigger('dataUpdated')
	}
})

export default STORE