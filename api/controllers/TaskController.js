/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

	addTask: function (req,res){
		var data = req.allParams();
		var user = req.token.id;
		data.created_by = req.token.id;

		Task.count({user_id:user,task_name:data.task_name}).then(count => {
			if(count > 0){
				res.json(400, {"statusCode": 400, "apiStatus": false, "result": "Task name is already Exists"});
			}else{
				Task.create(data).then(data => res.json(200, {"statusCode": 200, "apiStatus": true, "result": "Created Successfully"}))
				.fail(error => res.json(400, {"statusCode": 400, "apiStatus": false, "result": error}));
			}
		})
		.fail(error => res.json(400, {"statusCode": 400, "apiStatus": false, "result": error}));		
	},

	listTask: function(req, res){
		var data = req.params.all();
		var user = req.token.id;
		var searchQuery = {};
		searchQuery.delete_status = 0;

		if(req.token.user_type != 1)
    		searchQuery.user_id = user;

		if(data.id)
			searchQuery.id = data.id;

		if(data.start_date)
			searchQuery.createdAt = { ">=" : new Date(data.start_date)};

		if(data.end_date)
			searchQuery.createdAt = { "<=" : new Date(data.end_date)};

		Task.find(searchQuery)
		.then(list => res.json(200,{"statusCode": 200, "apiStatus": true, "result": list}))
		.fail(error => res.json(400,{"statusCode": 400, "apiStatus": false, "result": error}));
	},

	editTask: function(req,res){
	    var data = req.params.all();
	    var user = req.token.id;
	    data.updated_by = user;
    	var updateQuery = {};
    	updateQuery.id = data.id;

    	if(req.token.user_type != 1)
    		updateQuery.user_id = user;

	    Task.update(updateQuery, data).then(resData => {
	    	if(resData.length > 0)
	      		res.json(200, {"statusCode": 200, "apiStatus": true, "result": "Updated Successfully"});
	      	else
      			res.json(400, {"statusCode": 400, "apiStatus": false, "result": "Invalid Credential"});
	    })
	    .fail(errData => res.json(400,{"statusCode": 400, "apiStatus": false, "result": errData}));
	},

	deleteTask: function (req,res){
    	var data = req.params.all();
    	var user = req.token.id;
    	var updateQuery = {};
    	updateQuery.id = data.id;

    	if(req.token.user_type != 1)
    		updateQuery.user_id = user;    	
    	
		Task.update(updateQuery, {updated_by:user,delete_status: 1}).then(resData => {
			if(resData.length > 0)
	      		res.json(200, {"statusCode": 200, "apiStatus": true, "result": "Deleted Successfully"});
	      	else
      			res.json(400, {"statusCode": 400, "apiStatus": false, "result": "Invalid Credential"});
	    })
	    .fail(errData => res.json(400,{"statusCode": 400, "apiStatus": false, "result": errData}));
  	},
	
};





