const Joi = require('joi');
const userSchema = require('./schema');

module.exports.smokeTest = {
    path: '/smoke-test', 
    method: 'GET', 
    config: {
        handler: (request, h) => {
            return "hello world";
        }
    }
};

const add = (request, reply) => {
    let email = request.payload.email;
    console.log(email);
    return {
        message: 'Your account has been verified'
    };
};

module.exports.add = {
    path: '/user', 
    method: 'POST',
    handler: add,    
    options: {
        response: {
            status: {
                201: userSchema
            }
        },
        tags: ['api'],
        validate: {
            payload: userSchema            
        }
    }
     
};