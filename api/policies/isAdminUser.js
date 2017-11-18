/**
 * isAdminAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
  var token;
 
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    

    if (parts.length === 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json(401, {err: 'No Authorization header was found'});
  }
	
  jwToken.verify(token, function (err, token) {
    
    if (err) return res.json(401, {err: err});

  	User.findOne().where({ or : [ { user_type  :2}, {user_type: 1  } ] }).where({id:token.id})
    .exec( function (err, data) {
       if(err) return res.json(403, {err: 'You dont have access'});
        
      if(data) {
        req.token = token; 
        next();
      }  else { 
        res.json(401,{err: 'You dont have access'});
      }     
  	});
  });
  
};