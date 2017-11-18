/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	login: function(req, res){
	    var data = req.params.all();
	    var email = data.email;
	    var password = data.password;
	    AuthService.userLogin(email,password, function (err, user) {
	      	if(err)
	        	res.json(401,{"statusCode": 401, "apiStatus": false,"result": err});
	      	if(user.match == false){
	        	res.json(200, {"statusCode": 200, "apiStatus": false, "result": "Email/Password Wrong"});
	      	}else{
		        res.json(200,{ "statusCode": 200, "apiStatus": true,
		          user: user,
		          token: jwToken.issue({id : user.id,user_type: user.user_type,email:user.email})
		        });        
	      	}                    
	    });
  	},

  	siginUp: function(req,res){
  		var data = req.params.all();

  		User.create(data).then(resData => {
  			res.json(200, {"statusCode": 200, "apiStatus": true, "result": "Created Successfully"});
  		})
  		.catch(error => res.json(400,{"statusCode": 400, "apiStatus": false,"result": error}));
  	},

  	listUser: function(req,res){
  		var data = req.params.all();
  		var user = req.token.id;
  		var user_type = req.token.user_type;
  		var searchQuery = {};
  		searchQuery.delete_status = 0;

  		if(user_type != 1)
  			searchQuery.id = user;

  		User.find(searchQuery).populate('userTask').then(userData => {
  			res.json(200, {"statusCode": 200, "apiStatus": true, "result": userData});
  		})
  		.catch(error => res.json(400,{"statusCode": 400, "apiStatus": false,"result": error}));
  	}
	
};

