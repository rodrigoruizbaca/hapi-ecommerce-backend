module.exports = class ServiceError extends Error {
    constructor (message, status, code = 'GENERAL_ERROR') {
  
        // Calling parent constructor of base Error class.
        super(message);
        
        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;

        this.code = code;
    
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        
        // You can use any additional properties you want.
        // I'm going to use preferred HTTP status for this error types.
        // `500` is the default value if not specified.
        this.status = status || 500;
        console.error(message);
    }

    getJson() {
        return {
            "status": "FAILURE",
            "message": this.message,
            "code": this.code
        }
    }
}