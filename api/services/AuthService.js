

module.exports = {

	userLogin: function(email, password, callback) {
		
		User.findOne({email: email, delete_status: 0}).exec(function (err, user) {
			if (err)
		  		callback(err);
		  	if (!user) {
		  		var pass = {};
				pass.match = false;
				callback(null,pass);
		 	} else {
		  		// Password comparision 
			  	User.comparePassword(password, user, function (err, valid) {			     
			    	if (err)
			    		callback(err);			    
			   		if (valid == false || valid == null){
			    		var pass = {};
						pass.match = false;
						callback(null,pass);
			    	}else {
			     		callback(null,user);
			     	}
			   	});
		    }
		});
	},

};