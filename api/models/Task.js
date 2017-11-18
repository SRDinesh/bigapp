/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

	  	user_id: {
	  		model: 'User'
	  	},
	  	task_name: {
	  		type: 'string'
	  	},
	  	task_end_date: {
	  		type: 'datetime'
	  	},
	  	discription: {
	  		type: 'text'
	  	},
	  	active_status: {
	  		type: 'integer',
	  		size: 2
	  	},
	  	delete_status: {
	  		type: 'integer',
	  		size: 2
	  	},
	  	created_by: {
	  		model: 'User'
	  	},
	  	updated_by: {
	  		model: 'User'
	  	}
  	},

  	beforeCreate: function(user, cb) {
      	user.active_status = 1; 
      	user.delete_status = 0;
      	cb(null, user);
	},
};

