var path = require('path');
var auth = require('./middlewares/authorization');
// authenticate user at here
var authenticate = auth.authenticateToken;
//

module.exports = function (app, passport, auth) {
    var users = require(path.join(__dirname, 'users'));
    console.log('api routing..');
    /* REST API */
    app.post('/api/users/login', passport.authenticate('local', {
        session: false //use token to authenticate api access
    }), users.login);
    app.get('/api/test/ping', function (req, res) {
        console.log('pong..');
        res.json({
            status: 1,
            message: 'pong'
        });
    });
}