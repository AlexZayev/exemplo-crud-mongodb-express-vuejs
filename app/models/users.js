let db = require('../libs/db_connections')();
let Schema = require('mongoose').Schema;

module.exports = function (app) {
    let user_schema = Schema({
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true}
    });

    return db.model('users', user_schema);
}