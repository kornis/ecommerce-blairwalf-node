const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://accounts.google.com/.well-known/openid-configuration",
    }),
    issuer: "https://accounts.google.com",
    audience: "http://localhost:3000",
    algorithms: [ 'RS256' ]
});