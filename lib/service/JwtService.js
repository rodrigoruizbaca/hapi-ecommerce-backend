/**
 * For now this service is using a public and private keys generated from http://travistidwell.com/jsencrypt/demo/.
 * For production deployments may use AWS KMS and https://www.npmjs.com/package/jwt-kms
 */

const fs   = require('fs');
const jwt  = require('jsonwebtoken');
const path = require('path')
const Schmervice = require('schmervice');


const signOptions = {
    issuer:  'Rodrigo Ruiz',
    subject:  'Rodrigo Ruiz',
    audience:  'ALL',
    expiresIn:  "12h",
    algorithm:  "RS256"
};

module.exports = class JwtService extends Schmervice.Service {
    async generateToken(payload) {
        const filePath = path.join(__dirname, '..', '..', 'config', 'private.key');
        const privateKEY  = fs.readFileSync(filePath, 'utf8');        
        return await jwt.sign(payload, privateKEY, signOptions);
    }

    getExpiration() {
        return signOptions.expiresIn;
    }

    async verify(token) {
        const filePath = path.join(__dirname, '..', '..','config', 'public.key');
        const publicKEY  = fs.readFileSync(filePath, 'utf8'); 
        return await jwt.verify(token, publicKEY, signOptions);
    }
}

