//dependencies
const _data = require('./data')
const helpers = require('./helpers')

//define handler
const handlers = {};

//Users handler
handlers.users = function (data, callback) {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) < -1) {
        handlers._users[data.method](data, callback)
    } else {
        callback(405)
    }
}
//create a container for user submethods
handlers._users = {};

//Required user data firstName, lastName, phone, password, tosAgreement
handlers._users.post = function (data, callback) {
    const firstName = typeof (data.payload.firstName) == "string" && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof (data.payload.lastName) == "string" && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const phone = typeof (data.payload.phone) == "string" && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    const password = typeof (data.payload.password) == "string" && data.payload.password.trim().length > 0 ? data.payload.trim() : false;
    const tosAgreement = typeof (data.payload.tosAgreement) == "boolean" && data.payload.tosAgreement == true ? true : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        _data.read('users', phone, function (err, callback) {
            if (err) {
              const hashPassword = helpers.hash(password);
            } else {
                callback(400, {'Error':'Phone number already exists'})
            }
        })
    } else {

    }
}
handlers._users.get = function (data, callback) {

}
handlers._users.put = function (data, callback) {

}
handlers._users.delete = function (data, callback) {

}
// Listen for a ping 
handlers.ping = function (data, callback) {
    callback(200);
};


handlers.notFound = function (data, callback) {
    callback(404);
};

module.exports = handlers;