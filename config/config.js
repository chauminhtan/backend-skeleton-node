var _ = require('underscore');
var path = require('path');
var User = require(path.join(__dirname, "..", "/models/user"));

// Load app configuration

module.exports = _.extend(
	require(__dirname + '/../config/env/all.js'),
	require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {});

module.exports.populateDb = function() {
	/* create a default user */
	User.count({}, function(err, count) {
		if (count === 0) {
			var user = new User({
				email: "tchau@waverleysoftware.com",
				name: "admin"
			});
			console.log('added admin automatically');
			user.setPassword("admin", function(err, hash) {
				user.save();
			});
		}
	});
};