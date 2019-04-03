const ServiceError = require('./ServiceError');
const InvalidUsernamePasswordError = require('./InvalidUsernamePasswordError');
const DuplicateEntityError = require('./DuplicateEntityError');
const NotAuthorizedError = require('./NotAuthorizedError');

module.exports = { ServiceError, InvalidUsernamePasswordError, DuplicateEntityError, NotAuthorizedError };