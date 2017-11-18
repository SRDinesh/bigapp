/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');
module.exports = {

  attributes: {

	  	user_type: {   // 1 is admin and 2 is user
	  		type: 'integer'
	  	},
	  	user_name: {
	  		type: 'string'
	  	},
	  	email: {
	  		type: 'email',
	  		required: true,
	  		unique: true
	  	},
	  	password: {
	  		type: 'string'
	  	},
	  	active_status: {
	  		type: 'integer'
	  	},
	  	delete_status: {
	  		type: 'integer'
	  	},
	  	userTask: {
	  		collection: 'Task',
      		via: 'user_id'
	  	}
  	},

  	beforeCreate: function(user, cb) {
	    bcrypt.hash(user.password, null, null, function(err, hash) {
	      	if (err) return cb(err);
	      	user.active_status = 1; 
	      	user.delete_status = 0;
	      	user.password = hash;
	      	cb(null, user);
	    });
	},

	beforeUpdate: function(user, cb) {
	    if(user.password) {
	      	bcrypt.hash(user.password, null, null, function(err, hash) {
		        if (err) return cb(err);
		        user.active_status = 1; 
		        user.password = hash;
		        cb(null, user);
		    });
	    } else {
	      cb(null, user);
	    }
	},

	comparePassword : function (password, user, cb) {
	    bcrypt.compare(password, user.password, function (err, match) {
	      	if(err) {
	        	cb(err);
	      	} else  if(match == false){
	        	cb(null,match,null);
	      	}else{
	        	cb(null, match, user);
	      	}
	    });
  	},
};

