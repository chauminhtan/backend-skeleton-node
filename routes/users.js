var path = require('path'),
    User = require(path.join(__dirname, "..", "/models/user")),
	extend = require('extend'),
	response = require('../include/response'),
	sendErr = response.sendErr,
	sendSuccess = response.sendSuccess;

module.exports = {
    login: function (req, res) {
        if (req.user) {
			// use email as payload in token
			User.createToken(req.user.email, function(err, token) {
				if (err) {
					res.json({
						message: 'Unable to generate token',
						status: 0
					});
				} else {
					/* success response */
					sendSuccess(res, {
						token: token,
						userId: req.user.id
					});
				}
			});
		} else {
			console.log("error authenticating");
			res.json({
				status: 0,
				message: 'Authentication Error'
			});
		}
    }
}